document.addEventListener("DOMContentLoaded", () => {
    const API_URL = "http://localhost:3007/api";

    const institutionsContainer = document.getElementById("institutions-container");
    const roomsGrid = document.querySelector(".rooms-grid");
    const calendarRoomName = document.querySelector(".calendar-room-name");
    const calendarRoomDetails = document.querySelector(".calendar-room-details");
    const calendarDaysContainer = document.querySelector(".calendar-days");

    let selectedInstitution = null;
    let selectedRoom = null;

    // ==========================================================
    // AUX: ALTURA DEL HEADER PARA EL SCROLL PRECISO
    // ==========================================================
    function getHeaderHeight() {
        const header = document.querySelector(".site-header");
        return header ? header.offsetHeight : 0;
    }

    // ==========================================================
    // 1. CARGAR INSTITUCIONES DINÁMICAS
    // ==========================================================
    async function loadInstitutions() {
        try {
            const res = await fetch(`${API_URL}/institutions`);
            const institutions = await res.json();
            const institutionImages = {
                1: "img/biblio.png",
                2: "img/teatro.png",
                3: "img/polideportivo.png",
                4: "img/civico.png",
                5: "img/conservatorio.png"
                // puedes añadir los que quieras…
            };

            const defaultImage = "img/default.png";

            institutionsContainer.innerHTML = "";

            institutions.forEach((inst) => {
                const btn = document.createElement("button");
                btn.className = "map-card";

                btn.style.left = inst.pos_x + "%";
                btn.style.top = inst.pos_y + "%";
                btn.style.transform = "translate(-50%, -50%)";

                const imgSrc = institutionImages[inst.id] || defaultImage;

                btn.innerHTML = `
                    <div class="card-inner">
                        <img src="${imgSrc}" class="card-photo" alt="${inst.name}">
                        <h3>${inst.name}</h3>
                        <p>${inst.description || ""}</p>
                    </div>
                `;


                btn.addEventListener("click", () => selectInstitution(inst));
                institutionsContainer.appendChild(btn);
            });
        } catch (err) {
            console.error("Error cargando instituciones:", err);
        }
    }

    loadInstitutions();

    // ==========================================================
    // 2. SELECCIONAR INSTITUCIÓN -> CARGAR SALAS
    // ==========================================================
    async function selectInstitution(inst) {
        selectedInstitution = inst;
        selectedRoom = null;

        try {
            const res = await fetch(`${API_URL}/institutions/${inst.id}/rooms`);
            const data = await res.json();
            const rooms = data.rooms || [];

            renderRooms(rooms);

            const sectionRooms = document.querySelector(".section-rooms");
            const spacer = document.getElementById("rooms-spacer");

            // 1) Mostrar la sección
            sectionRooms.classList.add("show");

            // 2) Asegurar que hay espacio para hacer scroll
            spacer.classList.remove("hide");

            // 3) Scroll preciso después de que el layout se estabilice
            setTimeout(() => {
                const offset = getHeaderHeight() + 10;
                const topPos = sectionRooms.offsetTop - offset;

                window.scrollTo({
                    top: topPos,
                    behavior: "smooth"
                });
            }, 30);

        } catch (err) {
            console.error("Error cargando salas:", err);
        }
    }

    // ==========================================================
    // 3. RENDER DE SALAS
    // ==========================================================
    function renderRooms(rooms) {
        roomsGrid.innerHTML = "";

        rooms.forEach((room) => {
            const card = document.createElement("article");
            card.className = "room-card";

            let equipList = "";
            try {
                const eq = typeof room.equipment === "string"
                    ? JSON.parse(room.equipment)
                    : room.equipment;
                equipList = Array.isArray(eq) ? eq.join(", ") : "";
            } catch {
                equipList = "";
            }

            card.innerHTML = `
                <h3>${room.name}</h3>
                <p class="room-meta">${selectedInstitution.name} · ${room.capacity} personas</p>
                <p class="room-tags">${equipList}</p>
            `;

            card.addEventListener("click", () => selectRoom(room, card));
            roomsGrid.appendChild(card);
        });
    }

    // ==========================================================
    // 4. SELECCIONAR SALA -> MOSTRAR CALENDARIO SIN REBOTES
    // ==========================================================
    function selectRoom(room, cardElement) {
        selectedRoom = room;

        // Selección visual
        document.querySelectorAll(".room-card")
            .forEach((c) => c.classList.remove("selected"));
        cardElement.classList.add("selected");

        // Actualizar texto lateral
        calendarRoomName.textContent = room.name;

        let equipList = "";
        try {
            const eq = typeof room.equipment === "string"
                ? JSON.parse(room.equipment)
                : room.equipment;
            equipList = Array.isArray(eq) ? eq.join(", ") : "";
        } catch {
            equipList = "";
        }

        calendarRoomDetails.innerHTML = `
            <li>Edificio: ${selectedInstitution.name}</li>
            <li>Capacidad: ${room.capacity}</li>
            <li>Equipamiento: ${equipList}</li>
        `;

        renderCalendar();

        const sectionCalendar = document.querySelector(".section-calendar");
        const spacer = document.getElementById("rooms-spacer");

        // 1) Mostrar calendario (sin scroll todavía)
        sectionCalendar.classList.add("show");

        // 2) Quitar espaciador en el mismo frame
        requestAnimationFrame(() => {
            spacer.classList.add("hide");

            // 3) Una vez estable el layout → scroll sin rebotes
            requestAnimationFrame(() => {
                const offset = getHeaderHeight() + 10;
                const calPos = sectionCalendar.offsetTop - offset;

                window.scrollTo({
                    top: calPos,
                    behavior: "smooth"
                });
            });
        });
    }

    // ==========================================================
    // 5. CALENDARIO DEMO
    // ==========================================================
    function renderCalendar() {
        const daysInMonth = 28;
        const busyDays = [3, 9, 14, 22];

        calendarDaysContainer.innerHTML = "";

        for (let day = 1; day <= daysInMonth; day++) {
            const btn = document.createElement("button");
            btn.classList.add("day");
            btn.textContent = day;

            if (busyDays.includes(day)) {
                btn.classList.add("busy");
            } else {
                btn.classList.add("free");
            }

            btn.addEventListener("click", () => selectDate(btn));
            calendarDaysContainer.appendChild(btn);
        }
    }

    // ==========================================================
    // 6. SELECCIONAR DÍA
    // ==========================================================
    function selectDate(btn) {
        document.querySelectorAll(".day").forEach((d) => d.classList.remove("selected"));
        btn.classList.add("selected");

        const dia = btn.textContent;

        const form = document.getElementById("reservation-form");

        // Reset campos
        document.getElementById("res-name").value = "";
        document.getElementById("res-time").value = "";

        // Mostrar solo si no estaba visible
        const firstTimeOpen = !form.classList.contains("show");
        form.classList.add("show");

        if (firstTimeOpen) {
            form.scrollIntoView({ behavior: "smooth", block: "start" });
        }

        form.dataset.selectedDay = dia;
    }

    document.getElementById("res-confirm").addEventListener("click", () => {
        const name = document.getElementById("res-name").value.trim();
        const time = document.getElementById("res-time").value;
        const form = document.getElementById("reservation-form");
        const day = form.dataset.selectedDay;

        if (!name) {
            alert("Por favor, introduce tu nombre.");
            return;
        }

        if (!time) {
            alert("Selecciona una franja horaria.");
            return;
        }

        alert(`Reserva confirmada:\n\nDía: ${day}\nNombre: ${name}\nHora: ${time}`);
    });

});
