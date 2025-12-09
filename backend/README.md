# Backend — `movilidadVision`

Este módulo contiene la API desarrollada con Spring Boot y parte del código de acceso a datos. También en la carpeta `../videoProcess` hay scripts Python para el procesamiento de vídeo y conteo usando modelos YOLO/Ultralytics.

Resumen

- Lenguaje: Java
- Framework: Spring Boot (versión padre: 3.4.0)
- Java requerido: 21 (revisar `pom.xml`)
- Base de datos: MySQL (conector incluido)

Archivos importantes

- `pom.xml` — dependencias y configuración Maven.
- `mvnw`, `mvnw.cmd` — wrappers para ejecutar Maven sin instalarlo globalmente.
- `src/main/resources/application.properties` — configuración de la conexión a MySQL.

Configuración por defecto

En `src/main/resources/application.properties` hay valores por defecto de conexión; estos valores ahora admiten ser sobrescritos mediante variables de entorno (si existen):

```
spring.datasource.url=${SPRING_DATASOURCE_URL:jdbc:mysql://localhost:3306/movilidad}
spring.datasource.username=${SPRING_DATASOURCE_USERNAME:root}
spring.datasource.password=${SPRING_DATASOURCE_PASSWORD:12345678}
```

Se recomienda cambiar estas credenciales en un entorno de producción o utilizar variables de entorno.

Requisitos

- JDK 21 instalado y `JAVA_HOME` configurado.
- MySQL (versión compatible) con una base de datos llamada `movilidad` (o ajusta la URL en `application.properties`).

Ejecutar en Windows (PowerShell) — pasos para la primera vez

1. Instala MySQL

- Si no tienes MySQL instalado, descarga el instalador desde https://dev.mysql.com/downloads/installer/ y sigue las instrucciones. Asegúrate de recordar la contraseña del usuario `root` que configures.

2. Crear la base de datos y un usuario (ejemplo)

Abre PowerShell y, si tienes el cliente `mysql` en el PATH, ejecuta (te pedirá la contraseña de `root`):

```powershell
mysql -u root -p -e "CREATE DATABASE movilidad CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
mysql -u root -p -e "CREATE USER 'movilidad_user'@'localhost' IDENTIFIED BY 'tu_contraseña_segura';"
mysql -u root -p -e "GRANT ALL PRIVILEGES ON movilidad.* TO 'movilidad_user'@'localhost';"
mysql -u root -p -e "FLUSH PRIVILEGES;"
```

O bien entra al cliente interactivo:

```powershell
mysql -u root -p
# luego en el prompt de mysql:
CREATE DATABASE movilidad CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'movilidad_user'@'localhost' IDENTIFIED BY 'tu_contraseña_segura';
GRANT ALL PRIVILEGES ON movilidad.* TO 'movilidad_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

3. Configurar variables de entorno (PowerShell)

Puedes ejecutar la API sin editar archivos si defines las variables de entorno en la sesión actual de PowerShell:

```powershell
$env:SPRING_DATASOURCE_URL = 'jdbc:mysql://localhost:3306/movilidad'
$env:SPRING_DATASOURCE_USERNAME = 'movilidad_user'
$env:SPRING_DATASOURCE_PASSWORD = 'tu_contraseña_segura'
```

Nota: estas variables solo estarán disponibles en la sesión actual. Si cierras PowerShell tendrás que volver a definirlas o configurarlas de forma persistente en las variables del sistema.

4. Ejecutar la API (PowerShell)

```powershell
cd backend\movilidadVision
.\mvnw.cmd spring-boot:run
```

5. Verificar la API

Usa el navegador o PowerShell para hacer una petición de prueba:

```powershell
Invoke-RestMethod -Uri http://localhost:8080/actuator/health -Method GET
# o
curl http://localhost:8080/
```

6. (Opcional) Construir JAR y ejecutar

```powershell
cd backend\movilidadVision
.\mvnw.cmd clean package -DskipTests
java -jar target\apiMovilidadVision-0.0.1-SNAPSHOT.jar
```

Notas adicionales

- He actualizado `application.properties` para que soporte variables de entorno (si están presentes se usan, si no, se usan los valores por defecto). También añadí `backend/.env.example` y `.env.example` en la raíz para que tengas plantillas de variables.
- Si tienes problemas de conexión, revisa que MySQL esté corriendo, que el usuario tenga permisos y que no haya un firewall bloqueando el puerto 3306.
