import sys
import json  # Importamos el módulo json para formatear la salida
from ultralytics import YOLO
import supervision as sv
import numpy as np
import os
import logging

"""
sys.stdout = open(os.devnull, 'w')  
sys.stderr = open(os.devnull, 'w')  
"""
# El resto de tu código sigue aquí

# Modelo y ruta del video
MODEL = "yolo11n.pt"
model = YOLO(MODEL).to('cuda')
model.fuse()

# Silenciar los logs de YOLOv8
logging.getLogger("ultralytics").setLevel(logging.WARNING)


# Diccionario de clases
CLASS_NAMES_DICT = model.model.names

# Variables de línea y clases seleccionadas
LINE_START = sv.Point(0, 300)
LINE_END = sv.Point(1920, 300)
selected_classes = [0, 1, 2, 3, 5, 7]  # Ejemplo: car, truck, bus, etc.

# Obtener rutas de video de la línea de comandos
SOURCE_VIDEO_PATH = sys.argv[1]
TARGET_VIDEO_PATH = sys.argv[2]

# Crear instancias para seguimiento y anotación
byte_tracker = sv.ByteTrack()
line_zone = sv.LineZone(start=LINE_START, end=LINE_END)
box_annotator = sv.BoxAnnotator(thickness=4)
trace_annotator = sv.TraceAnnotator(thickness=4, trace_length=50)
line_zone_annotator = sv.LineZoneAnnotator(thickness=4)

# Diccionarios para guardar los objetos que entran y salen
objects_in = {}
objects_in["car"] = 0
objects_in["truck"] = 0
objects_in["bus"] = 0
objects_in["bicycle"] = 0
objects_in["motorbicycle"] = 0
objects_in["person"] = 0

objects_out = {}
objects_out["bus"] = 0
objects_out["truck"] = 0
objects_out["car"] = 0
objects_out["bicycle"] = 0
objects_out["motorbicycle"] = 0
objects_out["person"] = 0

# Función de callback para procesar cada frame
def callback(frame: np.ndarray, index: int) -> np.ndarray:
    results = model(frame, verbose=False)[0]
    detections = sv.Detections.from_ultralytics(results)
    detections = detections[np.isin(detections.class_id, selected_classes)]
    detections = byte_tracker.update_with_detections(detections)
    
    # Actualizar línea de conteo y lista de objetos
    line_zone.trigger(detections)
    for i in range(len(detections.class_id)):
        object_name = CLASS_NAMES_DICT[detections.class_id[i]]
        if line_zone.in_count > sum(objects_in.values()):
            objects_in[object_name] = objects_in.get(object_name, 0) + 1
        if line_zone.out_count > sum(objects_out.values()):
            objects_out[object_name] = objects_out.get(object_name, 0) + 1

    # Anotación en el frame
    annotated_frame = trace_annotator.annotate(scene=frame, detections=detections)
    annotated_frame = box_annotator.annotate(scene=annotated_frame, detections=detections)
    return line_zone_annotator.annotate(annotated_frame, line_counter=line_zone)

# Procesar el video
sv.process_video(
    source_path=SOURCE_VIDEO_PATH,
    target_path=TARGET_VIDEO_PATH,
    callback=callback
)

# Supongamos que tienes un diccionario con los resultados
resultados = {
    "amount_in": line_zone.in_count,
    "amount_out": line_zone.out_count,
    "obj_in": objects_in,
    "obj_out": objects_out
}

# Imprimir el JSON
print(json.dumps(resultados))
