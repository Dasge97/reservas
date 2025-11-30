-- ======================================================
--   BASE DE DATOS: reservas_municipales
-- ======================================================

DROP DATABASE IF EXISTS reservas_municipales;
CREATE DATABASE reservas_municipales CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE reservas_municipales;

-- ======================================================
--   TABLA: institutions
-- ======================================================
CREATE TABLE institutions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    short_name VARCHAR(100) NOT NULL,
    description TEXT,
    image_url VARCHAR(255),
    pos_x FLOAT,
    pos_y FLOAT
);

-- ======================================================
--   TABLA: rooms
-- ======================================================
CREATE TABLE rooms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    institution_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100),
    capacity INT,
    equipment JSON,
    image_url VARCHAR(255),

    FOREIGN KEY (institution_id) REFERENCES institutions(id)
);

-- ======================================================
--   TABLA: reservations
-- ======================================================
CREATE TABLE reservations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    room_id INT NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    status VARCHAR(50) DEFAULT 'confirmed',

    FOREIGN KEY (room_id) REFERENCES rooms(id)
);

-- ======================================================
--   INSERTS — INSTITUTIONS (NOMBRES FICTICIOS)
-- ======================================================

INSERT INTO institutions (name, short_name, description, image_url, pos_x, pos_y) VALUES
('Biblioteca Nova Marella', 'biblioteca', 'Espacio de estudio y lectura.', 'img/biblioteca.jpg', 40.0, 25.0),
('Centre Cultural Vallblava', 'cultura', 'Centro cultural polivalente.', 'img/cultura.jpg', 62.0, 33.0),
('Poliesportiu Serra Alta', 'poliesportiu', 'Instalaciones deportivas municipales.', 'img/poliesportiu.jpg', 27.0, 58.0),
('Centre Civic Llumverda', 'civic', 'Salas para talleres y reuniones.', 'img/civic.jpg', 53.0, 70.0),
('Escola de Musica Vent de Mar', 'musica', 'Aulas y cabinas para musica.', 'img/musica.jpg', 73.0, 48.0);

-- ======================================================
--   INSERTS — ROOMS (SIN TILDES Y FICTICIOS)
-- ======================================================

-- 1. Biblioteca Nova Marella
INSERT INTO rooms (institution_id, name, type, capacity, equipment, image_url) VALUES
(1, 'Sala Estudi A01', 'estudio', 1, '["wifi","mesa","silencio"]', 'img/sala_estudi_a01.jpg'),
(1, 'Sala Grupo G02', 'grupo', 6, '["wifi","pantalla"]', 'img/grup_g02.jpg'),
(1, 'Sala Actos Marella', 'actos', 50, '["proyector","sonido","escenario"]', 'img/actos_marella.jpg'),
(1, 'Zona Multimedia', 'multimedia', 8, '["ordenadores","internet"]', 'img/multimedia.jpg');

-- 2. Centre Cultural Vallblava
INSERT INTO rooms (institution_id, name, type, capacity, equipment, image_url) VALUES
(2, 'Aula Formacion F01', 'formacion', 18, '["proyector","pizarra"]', 'img/formacion_f01.jpg'),
(2, 'Sala Polivalente Vega', 'polivalente', 28, '["mesas","sillas","climatizacion"]', 'img/polivalente_vega.jpg'),
(2, 'Sala Exposiciones Azul', 'exposiciones', 35, '["iluminacion"]', 'img/exposiciones_azul.jpg'),
(2, 'Aula Creativa', 'creativa', 14, '["mesas","materiales"]', 'img/aula_creativa.jpg');

-- 3. Poliesportiu Serra Alta
INSERT INTO rooms (institution_id, name, type, capacity, equipment, image_url) VALUES
(3, 'Pista Futbol Sala P1', 'futbol', 10, '["porterias","lineas"]', 'img/futbol_p1.jpg'),
(3, 'Pista Basquet P2', 'basquet', 10, '["cestas","marcado"]', 'img/basquet_p2.jpg'),
(3, 'Sala Fitness Verde', 'fitness', 18, '["colchonetas","equipo"]', 'img/fitness_verde.jpg'),
(3, 'Pista Padel Exterior 1', 'padel', 4, '["paredes","luz"]', 'img/padel_ext1.jpg'),
(3, 'Piscina Carril 3', 'piscina', 1, '["agua","carril"]', 'img/piscina3.jpg');

-- 4. Centre Civic Llumverda
INSERT INTO rooms (institution_id, name, type, capacity, equipment, image_url) VALUES
(4, 'Sala Reuniones CC01', 'reuniones', 12, '["pantalla","wifi"]', 'img/reuniones.jpg'),
(4, 'Aula Infantil Arcoiris', 'infantil', 15, '["materiales","mesas"]', 'img/arcoiris.jpg'),
(4, 'Sala Talleres Verde', 'talleres', 18, '["mesas","fregadero"]', 'img/talleres_verde.jpg'),
(4, 'Mini Auditorio Llum', 'auditorio', 45, '["escenario","luz"]', 'img/auditorio.jpg');

-- 5. Escola de Musica Vent de Mar
INSERT INTO rooms (institution_id, name, type, capacity, equipment, image_url) VALUES
(5, 'Cabina Ensayo M01', 'ensayo', 1, '["insonorizacion"]', 'img/ensayo_m01.jpg'),
(5, 'Aula Percusion', 'percusion', 5, '["bateria","timbales"]', 'img/percusion.jpg'),
(5, 'Aula Viento', 'viento', 6, '["atril","insonorizacion"]', 'img/viento.jpg'),
(5, 'Aula Cuerdas', 'cuerdas', 6, '["atriles","insonorizacion"]', 'img/cuerdas.jpg'),
(5, 'Sala Interpretacion Clara', 'interpretacion', 35, '["escenario","luz"]', 'img/interpretacion.jpg');
