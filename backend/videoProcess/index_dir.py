import os
import subprocess
import json
import videoDataInsert as db
from datetime import datetime


def parse_video_name(video_name):
    """
    Función para extraer los datos del nombre del archivo de video.
    Formato esperado: CameraID_StartTime_EndTime.extension
    Ejemplo: 1_11-09-2024 10-45-00_11-09-2024 11-00-00.mp4
    """
    # Remover la extensión del archivo
    name_without_extension = os.path.splitext(video_name)[0]

    # Dividir el nombre del archivo por "_"
    try:
        parts = name_without_extension.split("_")
        camera_id = int(parts[0])  # ID de la cámara
        start_time = parts[1]      # Fecha y hora de inicio
        end_time = parts[2]        # Fecha y hora de fin
        return camera_id, start_time, end_time
    except (IndexError, ValueError) as e:
        print(f"Error al parsear el nombre del archivo {video_name}: {e}")
        return None, None, None

def main():
    # Directory path
    dirPath = input("Dir path: ")

    # Verify if path exists
    if not os.path.exists(dirPath):
        print("Directory not found.")
        return
    
    resultDirPath = "../ProcessedVideos"
    
    # Unique name for directory
    new_path = resultDirPath
    if os.path.exists(resultDirPath):
        counter = 1
        new_path = f"{resultDirPath}{counter}"
        
        while os.path.exists(new_path):
            counter += 1
            new_path = f"{resultDirPath}{counter}"
    
    os.makedirs(new_path)
    
    # Process all videos from directory
    for element in os.listdir(dirPath):
        if not element.lower().endswith(('.mp4', '.avi', '.mov')):
            print(f"Saltando {element}, no es un archivo de video.")
            continue

        # Extraer datos del título del video
        camera_id, start_time, end_time = parse_video_name(element)
        start_time = datetime.strptime(start_time, "%d-%m-%Y %H-%M-%S").strftime("%Y-%m-%d %H:%M:%S")
        end_time = datetime.strptime(end_time, "%d-%m-%Y %H-%M-%S").strftime("%Y-%m-%d %H:%M:%S")

        camerainfo = [camera_id, start_time, end_time]
        if camera_id is None:
            print(f"Saltando {element}, formato de nombre inválido.")
            continue

        video_path = os.path.join(dirPath, element)
        output_path = os.path.join(new_path, element)

        # Ejecutar el script YOLO
        result = subprocess.run(
            ["python", "yolo-count.py", video_path, output_path],
            capture_output=True,
            text=True
        )

        # Filter result
        stdout_lines = result.stdout.strip().split("\n")
        json_line = None
        for line in stdout_lines:
            if line.strip().startswith("{") and line.strip().endswith("}"):
                json_line = line.strip()
                break

        if json_line:
            try:
                # JSON decode
                output_data = json.loads(json_line)
                print(f"Processed video: {element}")
                print(f"amount in: {output_data.get('amount_in', 0)}")
                print(f"amount out: {output_data.get('amount_out', 0)}")
                print(f"objects in: {output_data.get('obj_in', {})}")
                print(f"objects out: {output_data.get('obj_out', {})}")
                print("------")
                db.insertData(camerainfo, output_data)
            except json.JSONDecodeError as e:
                print(f"Decode error JSON: {e}")
        else:
            print(f"Error to process {element}: JSON not found.")
            print(f"stdout: {result.stdout}")
            print(f"stderr: {result.stderr}")


if __name__ == "__main__":
    main()
