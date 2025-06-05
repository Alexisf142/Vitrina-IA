import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout
import os

# Parámetros
TAMANO_IMG = (224, 224)
BATCH_SIZE = 16
EPOCHS = 10
DATASET_DIR = r'C:\Aleee\entrega corte 2\entrega corte 2\Vitrina Ganadera\IA\dataset'  # Asegúrate de que esta carpeta exista en la misma ubicación que tu script

# Preprocesamiento y carga de imágenes
datagen = ImageDataGenerator(
    rescale=1./255,
    validation_split=0.2
)

# Corrección 1: Elimina la duplicación de 'dataset' en los parámetros
train_data = datagen.flow_from_directory(
    directory=DATASET_DIR,  # Solo pasa la ruta una vez
    target_size=TAMANO_IMG,
    batch_size=BATCH_SIZE,
    class_mode='categorical',
    subset='training'
)

val_data = datagen.flow_from_directory(
    directory=DATASET_DIR,  # Solo pasa la ruta una vez
    target_size=TAMANO_IMG,
    batch_size=BATCH_SIZE,
    class_mode='categorical',
    subset='validation'
)

# Guardar etiquetas
labels = list(train_data.class_indices.keys())
with open("labels.txt", "w") as f:
    for label in labels:
        f.write(label + "\n")

# Modelo CNN
model = Sequential([
    Conv2D(32, (3, 3), activation='relu', input_shape=(224, 224, 3)),
    MaxPooling2D(2, 2),
    Conv2D(64, (3, 3), activation='relu'),
    MaxPooling2D(2, 2),
    Conv2D(128, (3, 3), activation='relu'),
    MaxPooling2D(2, 2),
    Flatten(),
    Dropout(0.5),
    Dense(128, activation='relu'),
    Dense(len(labels), activation='softmax')  # Corrección 2: Usa len(labels) en lugar de train_data.class_indices
])

model.compile(optimizer='adam',
              loss='categorical_crossentropy',
              metrics=['accuracy'])

# Entrenamiento
history = model.fit(  # Corrección 3: Guarda el historial para graficar luego
    train_data,
    epochs=EPOCHS,
    validation_data=val_data
)

# Guardar modelo
model.save("modelo_entrenado.h5")
print("✅ Modelo guardado como modelo_entrenado.h5")