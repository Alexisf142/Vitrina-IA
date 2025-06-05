import os
import cv2
import numpy as np
import tensorflow as tf

# Cargar modelo y etiquetas
modelo = tf.keras.models.load_model("modelo_entrenado.h5")
with open("labels.txt", "r") as f:
    etiquetas = [line.strip() for line in f.readlines()]

def predecir_raza(image_path):
    try:
        if not os.path.exists(image_path):
            return "Error: Archivo no encontrado"

        # Leer imagen con OpenCV
        img = cv2.imread(image_path)

        if img is None:
            return "Error: No se pudo leer la imagen"

        # Convertir BGR (OpenCV) a RGB
        img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

        # Redimensionar a 224x224
        img_resized = cv2.resize(img_rgb, (224, 224))

        # Normalizar y convertir a tensor
        img_array = img_resized / 255.0
        img_array = np.expand_dims(img_array, axis=0)

        # Predecir
        pred = modelo.predict(img_array)
        index = np.argmax(pred)
        return etiquetas[index]

    except Exception as e:
        return f"Error en el procesamiento: {str(e)}"
