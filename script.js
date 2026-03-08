// TU SCRIPT ORIGINAL DE ANIMACIONES AL HACER SCROLL
document.addEventListener("DOMContentLoaded", () => {
    // --- Script original que tú tenías ---
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, observerOptions);

    // Seleccionamos más elementos para animar (manteniendo los tuyos)
    document.querySelectorAll('section, .card, .hierarchy-card, .operation-card, .gallery-img').forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "all 0.8s ease-out";
        observer.observe(el);
    });


    // --- Nuevas funcionalidades agregadas ---
    // Preloader que desaparece cuando la página carga
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = "0";
            setTimeout(() => {
                preloader.style.display = "none";
            }, 500);
        }, 800);
    });

    // Efecto de resaltado en el menú al hacer scroll
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Validación básica del formulario y mensaje de éxito
    const recruitmentForm = document.getElementById('recruitmentForm');
    recruitmentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(recruitmentForm);
        
        // Envía el formulario como antes
        fetch(recruitmentForm.action, {
            method: recruitmentForm.method,
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                recruitmentForm.reset();
                alert('¡Tu solicitud ha sido enviada exitosamente! Te contactaremos pronto por Discord.');
            } else {
                alert('Hubo un error al enviar tu solicitud. Por favor, intenta de nuevo más tarde.');
            }
        }).catch(error => {
            alert('Hubo un error al enviar tu solicitud. Por favor, intenta de nuevo más tarde.');
        });
    });

    // Efecto hover en imágenes de la galería
    const galleryImgs = document.querySelectorAll('.gallery-img');
    galleryImgs.forEach(img => {
        img.addEventListener('mouseenter', () => {
            img.style.transform = "scale(1.05)";
            img.style.filter = "brightness(1.2)";
        });
        img.addEventListener('mouseleave', () => {
            img.style.transform = "scale(1)";
            img.style.filter = "brightness(1)";
        });
    });
});
