USE contactos_db;
CREATE TABLE productos (
id INT AUTO_INCREMENT PRIMARY KEY,
nombre VARCHAR(100) NOT NULL,
descripcion TEXT,
precio DECIMAL(10,2) NOT NULL,
categoria VARCHAR(100),
stock INT DEFAULT 0,
imagen VARCHAR(255)
);

INSERT INTO productos (nombre, descripcion, precio, categoria, stock, imagen)
VALUES
-- Tarjetas gráficas
('MSI RTX 5070Ti Gaming Trio 16gb',
 'Tarjeta gráfica MSI Gaming Trio con diseño térmico avanzado.',
 3899000,
 'Tarjetas gráficas',
 10,
 'img/msi_gaming%20trio_rtx_5070ti.jpg'),

('ASUS ROG Astral RTX 5080 16gb',
 'Tarjeta gráfica ASUS ROG Astral con refrigeración avanzada.',
 7199000,
 'Tarjetas gráficas',
 8,
 'img/nvidia_asus_rog_astral_rtx_5080.jpg'),

('ASUS ROG Strix RTX 5070Ti 16gb',
 'Tarjeta gráfica ASUS ROG Strix diseñada para alto rendimiento.',
 4299000,
 'Tarjetas gráficas',
 12,
 'img/nvidia_asus_rog_strix_rtx_5070ti.jpg'),

('MSI Vanguard RTX 5070Ti 16gb',
 'Edición MSI Vanguard con estilo audaz y rendimiento gaming.',
 4129000,
 'Tarjetas gráficas',
 7,
 'img/nvidia_Msi_vanguard_rtx_5070ti.jpg'),

('AMD Sapphire RX 9070 XT 16gb',
 'Tarjeta gráfica AMD con refrigeración robusta y buen desempeño.',
 3599000,
 'Tarjetas gráficas',
 15,
 'img/amd_sapphire_rx%209070xt.jpg'),

-- Periféricos
('Headset ASUS ROG Pelta',
 'Periférico gaming ASUS ROG con estilo moderno y gran ergonomía.',
 420000,
 'Periféricos',
 20,
 'img/asus-rog-pelta-1-G.jpg'),

('Mouse ASUS ROG Harpe Ace',
 'Mouse inalámbrico ASUS ROG con diseño ergonómico para gaming.',
 350000,
 'Periféricos',
 25,
 'img/asus_rog_harpe_ace_aim_lab_edition_schwarz_maus_wireless_01_3000px.png'),

('Mouse Logitech Pro X2 Superstrike',
 'Mouse avanzado Logitech para jugadores con gran precisión.',
 600000,
 'Periféricos',
 15,
 'img/logitech-pro-x2-superstrike-release-date-is-24th-of-v0-aw5th8pm44ag1.jpg'),

('Headset HyperX Cloud 3',
 'Audífonos HyperX Cloud con micrófono para comunicación clara.',
 360000,
 'Periféricos',
 18,
 'img/headset_hyperx_cloud%203.jpg'),

-- Almacenamiento
('SSD NVMe Gigabyte 1tb',
 'Memoria NVMe Gigabyte para mayor velocidad en boot y carga de juegos.',
 600000,
 'Almacenamiento',
 30,
 'img/nvme_gibabyte.png'),

('SSD NVMe Samsung 990 Pro 2tb',
 'Almacenamiento NVMe rápido de Samsung para mejorar el rendimiento del PC.',
 1200000,
 'Almacenamiento',
 20,
 'img/samsung_990_pro.jpg'),

-- Procesadores
('Procesador AMD Ryzen 9800',
 'Procesador AMD Ryzen de alto rendimiento para PC de gamers y creadores.',
 2299000,
 'Procesadores',
 12,
 'img/procesador_amd_ryzen_9800.webp'),

-- Placas base
('Motherboard Aorus x870e AM5',
 'Motherboard de gama alta para sistemas AMD Ryzen.',
 1200000,
 'Placas base',
 10,
 'img/motherboard_aorus_x870.jpg');