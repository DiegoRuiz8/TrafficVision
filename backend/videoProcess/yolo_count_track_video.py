import time  # Importamos el módulo time para medir el tiempo
from ultralytics import YOLO
import supervision as sv
import numpy as np
import os

MODEL = "yolov8x.pt"
model = YOLO(MODEL)
model
model.fuse()

# dict mapping class_id to class_name
CLASS_NAMES_DICT = model.model.names

# variables
LINE_START = sv.Point(0, 300)
LINE_END = sv.Point(1920, 300)
selected_classes = [2, 3, 5, 7]  # Ejemplo: car, truck, bus, etc.
TARGET_VIDEO_PATH = f"vehicle-counting-result-with-counter2.mp4"
SOURCE_VIDEO_PATH = "cars.mp4"
print(sv.VideoInfo.from_video_path(SOURCE_VIDEO_PATH))

# create BYTETracker instance
byte_tracker = sv.ByteTrack()

# create VideoInfo instance
video_info = sv.VideoInfo.from_video_path(SOURCE_VIDEO_PATH)

# create frame generator
generator = sv.get_video_frames_generator(SOURCE_VIDEO_PATH)

# create LineZone instance
line_zone = sv.LineZone(start=LINE_START, end=LINE_END)

# create instance of BoxAnnotator
box_annotator = sv.BoxAnnotator(thickness=4)

# create instance of TraceAnnotator
trace_annotator = sv.TraceAnnotator(thickness=4, trace_length=50)

# create LineZoneAnnotator instance
line_zone_annotator = sv.LineZoneAnnotator(thickness=4)

# Diccionarios para guardar los objetos que entran y salen
objects_in = {}
objects_out = {}

# define call back function to be used in video processing
def callback(frame: np.ndarray, index: int) -> np.ndarray:
    # Medir el tiempo de inicio del procesamiento del frame
    start_time = time.time()

    # model prediction on single frame and conversion to supervision Detections
    results = model(frame, verbose=False)[0]
    detections = sv.Detections.from_ultralytics(results)
    
    # only consider class id from selected_classes define above
    detections = detections[np.isin(detections.class_id, selected_classes)]
    
    # tracking detections
    detections = byte_tracker.update_with_detections(detections)
    
    labels = [
        f"#{tracker_id} {model.model.names[class_id]} {confidence:0.2f}"
        for confidence, class_id, tracker_id
        in zip(detections.confidence, detections.class_id, detections.tracker_id)
    ]
    
    annotated_frame = trace_annotator.annotate(
        scene=frame.copy(),
        detections=detections
    )
    
    annotated_frame = box_annotator.annotate(
        scene=annotated_frame,
        detections=detections
    )

    # update line counter and log object class if crossing line
    line_zone.trigger(detections)

    # Guardar los objetos que cruzan la línea (entrar o salir)
    for i in range(len(detections.class_id)):
        object_name = CLASS_NAMES_DICT[detections.class_id[i]]
        
        if line_zone.in_count > sum(objects_in.values()):
            # Agregar o incrementar objeto en la lista de entradas
            objects_in[object_name] = objects_in.get(object_name, 0) + 1
        
        if line_zone.out_count > sum(objects_out.values()):
            # Agregar o incrementar objeto en la lista de salidas
            objects_out[object_name] = objects_out.get(object_name, 0) + 1

    # Medir el tiempo de fin del procesamiento del frame
    end_time = time.time()
    processing_time = end_time - start_time

    # Imprimir el tiempo que tardó en procesar el frame
    print(f"Frame {index}: Tiempo de procesamiento: {processing_time:.4f} s")

    # return frame with box and line annotated result
    return line_zone_annotator.annotate(annotated_frame, line_counter=line_zone)

# process the whole video
sv.process_video(
    source_path=SOURCE_VIDEO_PATH,
    target_path=TARGET_VIDEO_PATH,
    callback=callback
)

# Imprimir resultados
print(f"Total de autos que entraron: {line_zone.in_count}")
print(f"Total de autos que salieron: {line_zone.out_count}")

# Mostrar los tipos de objetos que entraron y salieron
print(f"Tipos de objetos que entraron: {objects_in}")
print(f"Tipos de objetos que salieron: {objects_out}")
