from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename
from modelo import predecir_raza

app = Flask(__name__)
CORS(app)

# Configuración
UPLOAD_FOLDER = 'static/uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # Limitar tamaño a 16MB

# Asegurarse de que el directorio de uploads exista
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Ruta para la página principal
@app.route('/')
def index():
    return send_from_directory('.', 'Index.html')

# Rutas para archivos estáticos
@app.route('/Style.css')
def serve_css():
    return send_from_directory('.', 'Style.css')

@app.route('/Script.js')
def serve_js():
    return send_from_directory('.', 'Script.js')


# Ruta para procesar imágenes
@app.route('/predecir', methods=['POST'])
def predecir():
    # Depuración
    print("Solicitud recibida en /predecir")
    print(f"Archivos recibidos: {request.files}")
    
    # Verificar si hay archivos en la solicitud
    if 'image' not in request.files:
        print("No hay archivo 'image' en la solicitud")
        return jsonify({'error': 'No se envió ninguna imagen'}), 400
    
    file = request.files['image']
    
    # Verificar si se seleccionó un archivo
    if file.filename == '':
        print("Nombre de archivo vacío")
        return jsonify({'error': 'No se seleccionó ningún archivo'}), 400
    
    # Verificar formato permitido
    if not allowed_file(file.filename):
        print(f"Formato no permitido: {file.filename}")
        return jsonify({'error': 'Formato de archivo no permitido. Use: png, jpg, jpeg, gif'}), 400
    
    try:
        # Guardar el archivo
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        print(f"Archivo guardado en: {filepath}")
        
        # Analizar la imagen
        resultado = predecir_raza(filepath)
        print(f"Resultado de la predicción: {resultado}")
        
        return jsonify({'raza': resultado})
    
    except Exception as e:
        print(f"Error en el servidor: {str(e)}")
        return jsonify({'error': f'Error en el servidor: {str(e)}'}), 500

if __name__ == '__main__':
    print("Iniciando servidor Flask...")
    print(f"Carpeta de uploads: {os.path.abspath(UPLOAD_FOLDER)}")
    print("Accede a la aplicación en: http://localhost:5000")
    app.run(debug=True)