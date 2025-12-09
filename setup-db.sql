-- Script para crear base de datos y usuario para TrafficVision
-- Ejecutar con: mysql -u root -p < setup-db.sql

-- Crear base de datos
CREATE DATABASE IF NOT EXISTS movilidad CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Crear usuario específico (cambiar contraseña si lo deseas)
CREATE USER IF NOT EXISTS 'movilidad_user'@'localhost' IDENTIFIED BY 'movilidad_secure_pwd_2024';

-- Asignar permisos
GRANT ALL PRIVILEGES ON movilidad.* TO 'movilidad_user'@'localhost';

-- Aplicar cambios
FLUSH PRIVILEGES;

-- Mostrar resultado
SELECT 'Database and user created successfully!' AS result;
