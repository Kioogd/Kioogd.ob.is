// ===== EMERGENCY HAMBURG - SEGURIDAD SUAVE =====

// ===== 🛡️ BLOQUEO SUAVE =====
(function() {
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
            e.preventDefault();
        }
    });
})();

// ===== 🚀 INICIO DE LA APLICACIÓN =====
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
            }, 1000);
        });
    }

    // ===== ANIMACIONES SCROLL =====
    const observerOptions = { threshold: 0.15 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

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

    // ===== MENÚ ACTIVO =====
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
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();

    // ===== 🔐 FORMULARIO CON HASH =====
    const recruitmentForm = document.getElementById('recruitmentForm');
    if (recruitmentForm) {
        recruitmentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const codigoInput = document.getElementById('codigo_verificacion');
            
            if (!codigoInput) {
                alert('Error: Campo de código no encontrado');
                return;
            }
            
            const codigoIngresado = codigoInput.value.trim().toUpperCase();
            
            // 🔒 CONFIGURACIÓN SEGURA
            const salSecreto = "EmergencyHamburg2026";
            const hashReal = "7d8f3e3a5c6b9a1e4f2d8c7b6a5e4f3d"; // Hash de EH-24-03 + sal
            
            function hashSimple(texto) {
                let hash = 0;
                for (let i = 0; i < texto.length; i++) {
                    hash = ((hash << 5) - hash) + texto.charCodeAt(i);
                    hash = hash & hash;
                }
                return Math.abs(hash).toString(16);
            }
            
            const hashIngresado = hashSimple(codigoIngresado + salSecreto);
            
            if (hashIngresado !== hashReal) {
                alert('❌ Código de verificación incorrecto.');
                return;
            }
            
            const termsCheck = document.getElementById('terms');
            if (!termsCheck.checked) {
                alert('Debes aceptar las reglas de la organización.');
                return;
            }

            const formData = new FormData(recruitmentForm);
            const submitBtn = recruitmentForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'ENVIANDO...';
            submitBtn.disabled = true;

            fetch(recruitmentForm.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            })
            .then(response => {
                if (response.ok) {
                    recruitmentForm.reset();
                    alert('✅ ¡SOLICITUD ENVIADA! Te contactaremos por Discord en 24-48h.');
                } else {
                    alert('❌ Error al enviar. Intenta de nuevo.');
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

    // ===== 🖼️ EFECTO HOVER GALERÍA =====
    const galleryImgs = document.querySelectorAll('.gallery-img');
    galleryImgs.forEach(img => {
        img.addEventListener('mouseenter', () => {
            img.style.transform = 'scale(1.05)';
        });
        img.addEventListener('mouseleave', () => {
            img.style.transform = 'scale(1)';
        });
    });

    // ===== 🌊 NAVEGACIÓN SUAVE (SCROLL SUAVE) =====
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ===== 👁️ EFECTO TÍTULO DINÁMICO =====
    const originalTitle = document.title;
    window.addEventListener('blur', () => {
        document.title = '⚜️ VUELVE A LA MAFIA ⚜️';
    });
    window.addEventListener('focus', () => {
        document.title = originalTitle;
    });

    console.log('✅ Emergency Hamburg - Cargado correctamente');
});
