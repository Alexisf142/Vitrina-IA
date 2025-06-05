// Esperar a que el DOM cargue completamente
document.addEventListener('DOMContentLoaded', function() {
    // Menú móvil toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    
    if(menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 0';
            navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '15px 0';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        }
    });
    
    // Testimonios slider
    const slides = document.querySelectorAll('.testimonio-slide');
    const prevBtn = document.getElementById('testimonio-prev');
    const nextBtn = document.getElementById('testimonio-next');
    let currentSlide = 0;
    
    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    }
    
    if(prevBtn && nextBtn && slides.length > 0) {
        showSlide(0); // Mostrar el primer slide
        
        prevBtn.addEventListener('click', () => {
            showSlide(currentSlide - 1);
        });
        
        nextBtn.addEventListener('click', () => {
            showSlide(currentSlide + 1);
        });
        
        // Auto slider
        setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000);
    }
    
    // Datos de muestra para la vitrina ganadera
    const ganadoData = [
        {
            id: 1,
            nombre: "Toro Brahman Puro",
            imagen: "static/image/Bovinos/bramha pruo.jpeg",
            raza: "Brahman",
            funcion: "Reproducción",
            salud: "Excelente",
            edad: "3 años",
            peso: "850 kg",
            precio: 22500000
        },
        {
            id: 2,
            nombre: "Toro Holstein",
            imagen: "static/image/Bovinos/Vaca Holstein.jpeg",
            raza: "Holstein",
            funcion: "Leche",
            salud: "Muy buena",
            edad: "4 años",
            peso: "600 kg",
            precio: 9200000
        },
        {
            id: 3,
            nombre: "Novillo Angus",
            imagen: "static/image/Bovinos/Novillo angus.jpeg",
            raza: "Angus",
            funcion: "Engorde",
            salud: "Buena",
            edad: "2 años",
            peso: "520 kg",
            precio: 7500000
        },
        {
            id: 4,
            nombre: "Ternero Hereford",
            imagen: "static/image/Bovinos/Ternero gereford.jpeg",
            raza: "Hereford",
            funcion: "Engorde",
            salud: "Excelente",
            edad: "1 año",
            peso: "280 kg",
            precio: 4700000
        },
        {
            id: 5,
            nombre: "Vaca Cebú",
            imagen: "static/image/Bovinos/Vaca cebuina.jpeg",
            raza: "Cebú",
            funcion: "Reproducción",
            salud: "Muy buena",
            edad: "5 años",
            peso: "580 kg",
            precio: 7800000
        },
        {
            id: 6,
            nombre: "Toro Charolais",
            imagen: "static/image/Bovinos/Charolais.jpeg",
            raza: "Charolais",
            funcion: "Reproducción",
            salud: "Excelente",
            edad: "4 años",
            peso: "950 kg",
            precio: 21000000
        }
    ];
    
    // Función para mostrar los ejemplares en la vitrina
    function mostrarGanado(data) {
        const ganadoGrid = document.getElementById('ganado-grid');
        if (!ganadoGrid) return;
        
        ganadoGrid.innerHTML = '';
        
        data.forEach(animal => {
            const card = document.createElement('div');
            card.className = 'ganado-card';
            
            // Formatear precio
            const precioFormateado = new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: 'COP',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(animal.precio);
            
            card.innerHTML = `
                <img src="${animal.imagen}" alt="${animal.nombre}">
                <div class="ganado-info">
                    <h3>${animal.nombre}</h3>
                    <div class="tags">
                        <span class="tag">${animal.raza}</span>
                        <span class="tag">${animal.funcion}</span>
                    </div>
                    <p class="precio">${precioFormateado}</p>
                    <div class="detalles">
                        <p>Salud: <span class="valor">${animal.salud}</span></p>
                        <p>Edad: <span class="valor">${animal.edad}</span></p>
                        <p>Peso: <span class="valor">${animal.peso}</span></p>
                    </div>
                    <a href="#detalles-${animal.id}" class="btn btn-primary">Ver Detalles</a>
                </div>
            `;
            
            ganadoGrid.appendChild(card);
        });
    }
    
    // Inicializar la vitrina con todos los ejemplares
    mostrarGanado(ganadoData);
    
    // Filtrar ganado
    const filtrarBtn = document.getElementById('filtrar');
    if (filtrarBtn) {
        filtrarBtn.addEventListener('click', function() {
            const razaSeleccionada = document.getElementById('raza').value;
            const funcionSeleccionada = document.getElementById('funcion').value;
            const precioSeleccionado = document.getElementById('precio').value;
            
            let resultadosFiltrados = [...ganadoData];
            
            // Filtrar por raza
            if (razaSeleccionada !== 'todas') {
                resultadosFiltrados = resultadosFiltrados.filter(animal => 
                    animal.raza.toLowerCase() === razaSeleccionada.toLowerCase());
            }
            
            // Filtrar por función
            if (funcionSeleccionada !== 'todas') {
                resultadosFiltrados = resultadosFiltrados.filter(animal => 
                    animal.funcion.toLowerCase() === funcionSeleccionada.toLowerCase());
            }
            
            // Filtrar por precio
            if (precioSeleccionado !== 'todos') {
                if (precioSeleccionado === 'bajo') {
                    resultadosFiltrados = resultadosFiltrados.filter(animal => animal.precio <= 1000000);
                } else if (precioSeleccionado === 'medio') {
                    resultadosFiltrados = resultadosFiltrados.filter(animal => 
                        animal.precio > 1000000 && animal.precio <= 3000000);
                } else if (precioSeleccionado === 'alto') {
                    resultadosFiltrados = resultadosFiltrados.filter(animal => animal.precio > 3000000);
                }
            }
            
            mostrarGanado(resultadosFiltrados);
        });
    }

    // Navegación suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Cerrar menú móvil si está abierto
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Formulario de contacto
    const contactForm = document.getElementById('contacto-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulación de envío de formulario
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                const nombre = document.getElementById('nombre').value;
                alert(`¡Gracias ${nombre}! Tu mensaje ha sido enviado correctamente. Nos pondremos en contacto contigo pronto.`);
                
                // Resetear formulario
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
    
    // Animación de aparición al scroll
    const animarAlScroll = () => {
        const elementos = document.querySelectorAll('.servicio-card, .paso, .ganado-card, .section-header');
        
        elementos.forEach(elemento => {
            const posicion = elemento.getBoundingClientRect().top;
            const alturaVentana = window.innerHeight;
            
            if (posicion < alturaVentana - 100) {
                elemento.style.opacity = '1';
                elemento.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Inicializar estilos para animación
    document.querySelectorAll('.servicio-card, .paso, .ganado-card, .section-header').forEach(elemento => {
        elemento.style.opacity = '0';
        elemento.style.transform = 'translateY(50px)';
        elemento.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Ejecutar animación al cargar y al hacer scroll
    window.addEventListener('load', animarAlScroll);
    window.addEventListener('scroll', animarAlScroll);

    // Objeto para simular la IA
    const VitrinalAI = {
        // Simula el análisis de imágenes de ganado (para demostración)
        analizarImagen: function(imagenUrl) {
            // En una implementación real, esto se conectaría a una API de IA
            // Para la demo, retornamos datos simulados
            return {
                raza: "Brahman",
                genotipo: "Puro",
                salud: "Excelente",
                funcion: "Reproducción",
                adaptabilidad: "Alta resistencia a climas cálidos",
                precio_estimado: 22500000
            };
        },
        
        // Método para mostrar el resultado del análisis (demo)
        mostrarResultadoAnalisis: function() {
            // Esta funcionalidad se implementaría en la versión con IA
            console.log("Módulo de análisis de IA preparado para futura implementación");
        }
    };
    
    // Registrar el objeto en el contexto global para uso futuro
    window.VitrinalAI = VitrinalAI;
});

document.getElementById('uploadForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const input = document.getElementById('imageInput');
    
    // Validar que se haya seleccionado un archivo
    if (!input.files || input.files.length === 0) {
      document.getElementById('result').innerText = 'Error: Por favor selecciona una imagen';
      return;
    }
    
    // Mostrar mensaje de carga
    document.getElementById('result').innerText = 'Procesando imagen...';
    
    const formData = new FormData();
    formData.append('image', input.files[0]);
  
    try {
      // Usar URL relativa para evitar problemas con CORS
      const response = await fetch('/predecir', {
        method: 'POST',
        body: formData
      });
      
      // Verificar si la respuesta es exitosa
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Verificar si hay un error en la respuesta
      if (data.error) {
        document.getElementById('result').innerText = 'Error: ' + data.error;
      } else {
        document.getElementById('result').innerText = 'Raza detectada: ' + data.raza;
      }
    } catch (error) {
      console.error('Error:', error);
      document.getElementById('result').innerText = 'Error en la conexión: ' + error.message;
    }
  });
