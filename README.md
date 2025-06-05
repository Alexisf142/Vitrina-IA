
# 🐄 Vitrina Ganadera con IA

Este proyecto es una **vitrina ganadera inteligente** que permite la identificación automática de razas bovinas mediante imágenes. Utiliza técnicas de inteligencia artificial (IA) para el reconocimiento visual de razas a través de un modelo previamente entrenado.

---

## 📌 Objetivo

Facilitar la identificación y clasificación de razas bovinas mediante un sistema automatizado que utilice visión por computadora, mejorando procesos de trazabilidad, selección genética y comercialización de ganado.

---

## 🧠 Componentes Principales

### 🔹 `app.py`
Servidor web (basado en Flask) que permite al usuario cargar imágenes y ver los resultados de la predicción del modelo.

### 🔹 `modelo.py`
Contiene la lógica de carga del modelo IA para realizar las predicciones.

### 🔹 `entrenat.py`
Script para el entrenamiento del modelo de clasificación de razas bovinas utilizando imágenes almacenadas en el directorio `dataset/`.

### 🔹 `dataset/`
Contiene imágenes clasificadas por carpetas según la raza (e.g., `Angus/`, `Brahman/`, etc.).

### 🔹 `Index.html`, `Style.css`, `Script.js`
Interfaz de usuario web que permite al usuario cargar imágenes, mostrar resultados, y estilizar la aplicación.

---

## ⚙️ Requisitos

- Python 3.7 o superior
- Flask
- scikit-learn
- OpenCV (`cv2`)
- NumPy
- Pillow

Instala las dependencias ejecutando:

```bash
pip install -r requirements.txt
```

---

## 🚀 Cómo Usar

1. Clona o descarga este repositorio.
2. Asegúrate de tener todas las dependencias instaladas.
3. Ejecuta la aplicación:

```bash
python app.py
```

4. Abre tu navegador y ve a `http://127.0.0.1:5000`.
5. Sube una imagen de un bovino y obtén la predicción de su raza.

---

## 📦 Estructura del Proyecto

```
Vitrina Ganadera/
│
├── app.py
├── entrenat.py
├── modelo.py
├── dataset/
│   ├── Angus/
│   ├── Brahman/
│   └── ...
├── Index.html
├── Style.css
├── Script.js
└── README.md
```

---

## 🔍 Ejemplo de Uso

- Sube una imagen como `vaca1.jpg`.
- El sistema devuelve: `"Raza Predicha: Brahman"`.

---

## 👨‍💻 Autores

Andrés Leonardo Morales Romero 
Andrés Esteban Suarez Montes 
Andrey Joan Medina Hernández 
Laura Alejandra Tovar Mosquera 
Alexis Fernando Cuevas Rosillo 

---

## 📜 Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.
