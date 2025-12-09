import mysql.connector

# Conexión a la base de datos
conection = mysql.connector.connect(
    host="localhost",       # Dirección del servidor
    user="root",            # Usuario de la base de datos
    password="",            # Contraseña del usuario
    database="movilidad"    # Nombre de la base de datos
)

if conection.is_connected():
    print("Conexión exitosa a la base de datos")
