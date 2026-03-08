// ===== EMERGENCY HAMBURG - SCRIPT PROFESIONAL =====

document.addEventListener("DOMContentLoaded", () => {
    
    // ===== PRELOADER =====
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 800);
            }, 1000); // Tiempo para apreciar el logo
        });
    }

    // ===== ANIMACIONES SCROLL (INTERSECTION OBSERVER) =====
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                // Una vez animado, dejamos de observarlo
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elementos a animar
    const animatedElements = document.querySelectorAll(
        '.section-title, .divider, .history-content, .hierarchy-card, .operation-card, ' +
        '.rules-list li, .gallery-img, .recruitment-form, .hero-content'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
        observer.observe(el);
    });

    // ===== MENÚ ACTIVO SEGÚN SCROLL =====
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    function updateActiveLink() {
        let current = '';
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href').substring(1); // quita el #
            if (href === current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink(); // Llamada inicial

    // ===== FORMULARIO - ENVÍO CON FETCH =====
    const recruitmentForm = document.getElementById('recruitmentForm');
    if (recruitmentForm) {
        recruitmentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(recruitmentForm);
            
            // Validación rápida de términos (por si acaso)
            const termsCheck = document.getElementById('terms');
            if (!termsCheck.checked) {
                alert('Debes aceptar las reglas de la organización.');
                return;
            }

            // Animación de carga en el botón
            const submitBtn = recruitmentForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'ENVIANDO...';
            submitBtn.disabled = true;

            fetch(recruitmentForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    recruitmentForm.reset();
                    // Mensaje con estilo (podría ser un modal, pero usamos alert por simplicidad)
                    alert('✅ ¡SOLICITUD ENVIADA! Te contactaremos por Discord en 24-48h.');
                } else {
                    alert('❌ Error al enviar. Por favor intenta de nuevo o contacta por Discord.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('❌ Error de conexión. Verifica tu internet.');
            })
            .finally(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        });
    }

    // ===== EFECTO HOVER EN GALERÍA (MEJORADO) =====
    const galleryImgs = document.querySelectorAll('.gallery-img');
    galleryImgs.forEach(img => {
        img.addEventListener('mouseenter', () => {
            img.style.transform = 'scale(1.05)';
            img.style.transition = 'transform 0.4s ease';
        });
        img.addEventListener('mouseleave', () => {
            img.style.transform = 'scale(1)';
        });
    });

    // ===== SUAVIZADO EN CLICKS DE NAVEGACIÓN =====
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ===== PEQUEÑO EFECTO DE TÍTULO DINÁMICO (OPCIONAL) =====
    let titleText = document.title;
    let originalTitle = titleText;
    
    window.addEventListener('blur', () => {
        document.title = '⚜️ VUELVE A LA MAFIA ⚜️';
    });
    
    window.addEventListener('focus', () => {
        document.title = originalTitle;
    });

    console.log('🚀 Emergency Hamburg - Web de Élite cargada correctamente');
});
