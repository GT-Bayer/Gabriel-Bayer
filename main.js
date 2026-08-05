// CONFIGURATION OBJECT
const CONFIG = {
    github: 'https://github.com/GT-Bayer',
    linkedin: 'https://www.linkedin.com/in/gtbayer/',
    email: 'gabriel.bayer@outlook.com'
};

// ==========================================================================
// 1. LANGUAGE SETTINGS & INITIALIZATION
// ==========================================================================
function setLanguage(lang) {
    document.body.className = `lang-${lang}`;
    document.documentElement.lang = lang;
    localStorage.setItem('preferred-lang', lang);
    
    // Update active state in toggle button UI
    const btnEn = document.getElementById('lang-toggle-en');
    const btnEs = document.getElementById('lang-toggle-es');
    if (lang === 'en') {
        btnEn.classList.add('active-lang');
        btnEs.classList.remove('active-lang');
    } else {
        btnEs.classList.add('active-lang');
        btnEn.classList.remove('active-lang');
    }
}

// Initialize Language
const savedLang = localStorage.getItem('preferred-lang') || (navigator.language.startsWith('es') ? 'es' : 'en');
setLanguage(savedLang);

// Language Toggle Click Event
document.getElementById('lang-toggle').addEventListener('click', () => {
    const currentLang = document.body.classList.contains('lang-es') ? 'es' : 'en';
    setLanguage(currentLang === 'es' ? 'en' : 'es');
});

// ==========================================================================
// 2. INTERSECTION OBSERVER ANIMATION FALLBACK
// ==========================================================================
// Check if the browser supports CSS scroll-driven animations.
// If it does not support them (Safari, Firefox, etc.), fall back to IntersectionObserver.
if (!('animationTimeline' in document.documentElement.style)) {
    // Dynamic styles for fallback
    const style = document.createElement('style');
    style.innerHTML = `
        .reveal {
            opacity: 0.25 !important;
            transform: translateY(18px) !important;
            transition: opacity 0.7s ease, transform 0.7s ease !important;
            animation: none !important;
        }
        .reveal.reveal-active {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ==========================================================================
// 3. SCROLL-SPY NAVIGATION
// ==========================================================================
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar a');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY || window.pageYOffset;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        // Check if current scroll position lies within the section with an offset of 150px
        if (scrollPosition >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ==========================================================================
// 4. CONTACT DIALOG MODAL & TOASTS
// ==========================================================================
const contactModal = document.getElementById('contact-modal');
const closeModalBtn = document.getElementById('close-modal-btn');
const contactForm = document.getElementById('contact-form');
const openModalBtns = [
    document.getElementById('open-contact-btn'),
    document.getElementById('hero-contact-btn'),
    document.getElementById('panel-contact-btn')
];

// Open modal triggers
openModalBtns.forEach(btn => {
    if (btn) {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            contactModal.showModal();
        });
    }
});

// Close modal trigger
if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
        contactModal.close();
    });
}

// Close on backdrop click (Light Dismiss Fallback for Safari/Firefox)
contactModal.addEventListener('click', (e) => {
    const rect = contactModal.getBoundingClientRect();
    const isInDialog = (
        rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX && e.clientX <= rect.left + rect.width
    );
    if (!isInDialog) {
        contactModal.close();
    }
});

// Toast notification helper
function showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span class="toast-icon">✓</span><span>${message}</span>`;
    container.appendChild(toast);
    
    // Auto remove toast after animation
    setTimeout(() => {
        toast.classList.add('toast-out');
        toast.addEventListener('transitionend', () => {
            toast.remove();
        });
    }, 4000);
}

// Form Submission Event
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formAction = contactForm.getAttribute('action');
        const name = document.getElementById('form-name').value;
        const isEs = document.body.classList.contains('lang-es');
        
        // If it's a simulated action (placeholder '#' or empty)
        if (!formAction || formAction === '#') {
            simulateSubmit(name, isEs);
            return;
        }
        
        // Real AJAX submission using fetch (suitable for Formspree, FormSubmit, Web3Forms, etc.)
        const submitButton = contactForm.querySelector('.form-submit-btn');
        const originalBtnText = submitButton.innerHTML;
        
        submitButton.disabled = true;
        submitButton.innerHTML = isEs ? 'Enviando...' : 'Sending...';
        
        const formData = new FormData(contactForm);
        
        fetch(formAction, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                contactModal.close();
                contactForm.reset();
                const successMsg = isEs
                    ? `¡Gracias, ${name}! Tu mensaje ha sido enviado correctamente.`
                    : `Thank you, ${name}! Your message has been sent successfully.`;
                showToast(successMsg);
            } else {
                throw new Error('Form submission failed');
            }
        })
        .catch(error => {
            const errorMsg = isEs
                ? 'Hubo un error al enviar tu mensaje. Por favor intenta de nuevo.'
                : 'There was an error sending your message. Please try again.';
            showToast(errorMsg);
            console.error('Error submitting form:', error);
        })
        .finally(() => {
            submitButton.disabled = false;
            submitButton.innerHTML = originalBtnText;
        });
    });
}

function simulateSubmit(name, isEs) {
    contactModal.close();
    contactForm.reset();
    const successMsg = isEs
        ? `¡Gracias, ${name}! Tu mensaje ha sido enviado correctamente.`
        : `Thank you, ${name}! Your message has been sent successfully.`;
    showToast(successMsg);
}

// ==========================================================================
// 5. INTERACTIVE CYBER TERMINAL
// ==========================================================================
const terminalInput = document.getElementById('terminal-input');
const terminalCursor = document.getElementById('terminal-cursor');
const terminalBody = document.getElementById('terminal-body');

if (terminalInput && terminalBody) {
    // Focus terminal input when clicking anywhere inside the terminal container
    document.querySelector('.terminal-container').addEventListener('click', () => {
        terminalInput.focus();
    });

    // Handle cursor tracking for transparent input overlay
    terminalInput.addEventListener('input', () => {
        // Approximate character width in pixels for monospace font Fira Code (around 7.8px at 13px font size)
        const charWidth = 7.8;
        terminalCursor.style.left = `${terminalInput.value.length * charWidth}px`;
    });

    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const cmdText = terminalInput.value;
            terminalInput.value = '';
            terminalCursor.style.left = '0';
            
            if (cmdText.trim() !== '') {
                executeCommand(cmdText);
            }
        }
    });

    function printLine(text, type = 'output') {
        const line = document.createElement('div');
        line.className = `terminal-line ${type}`;
        line.textContent = text;
        
        // Insert line right before the input line container
        const inputLine = terminalBody.querySelector('.terminal-input-line');
        terminalBody.insertBefore(line, inputLine);
        
        // Auto scroll to bottom
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }

    function executeCommand(input) {
        const cleanInput = input.trim();
        printLine(`guest@gabrielbayer:~$ ${cleanInput}`, 'command');
        
        const args = cleanInput.toLowerCase().split(' ');
        const cmd = args[0];
        const isEs = document.body.classList.contains('lang-es');

        switch(cmd) {
            case 'help':
            case 'ayuda':
                if (isEs) {
                    printLine('Comandos disponibles:', 'warning');
                    printLine('  help / ayuda     - Muestra este menú de ayuda.');
                    printLine('  about / sobre    - Información sobre Gabriel Bayer.');
                    printLine('  skills           - Muestra las habilidades del toolkit.');
                    printLine('  projects         - Resumen de proyectos en progreso.');
                    printLine('  contact / correo - Abre el formulario de contacto o muestra redes.');
                    printLine('  scan             - Ejecuta un escaneo de seguridad (Nmap simulación).');
                    printLine('  clear / limpiar  - Limpia la pantalla de la terminal.');
                } else {
                    printLine('Available commands:', 'warning');
                    printLine('  help             - Show this help menu.');
                    printLine('  about            - Brief bio of Gabriel Bayer.');
                    printLine('  skills           - Display technical skills.');
                    printLine('  projects         - View current selected projects.');
                    printLine('  contact          - Open contact modal or print networks.');
                    printLine('  scan             - Run a simulated port/skill scan (Nmap simulation).');
                    printLine('  clear            - Clear the terminal screen.');
                }
                break;
                
            case 'about':
            case 'sobre':
                if (isEs) {
                    printLine('Gabriel Bayer - Estudiante de Ciberseguridad y Desarrollador Full Stack.', 'success');
                    printLine('Intereses: Linux, Redes, Automatización y Seguridad Web.');
                    printLine('Mentalidad: Orientado al aprendizaje continuo y a construir código seguro y estructurado.');
                } else {
                    printLine('Gabriel Bayer - Cybersecurity Student & Full Stack Web Developer.', 'success');
                    printLine('Interests: Linux, Networking, Automation, and Web Security.');
                    printLine('Mindset: Focused on continuous growth and writing secure, clean code.');
                }
                break;

            case 'skills':
                printLine('=== TECHNICAL TOOLKIT ===', 'warning');
                printLine('  [+] Frontend: HTML, CSS, JavaScript (Vanilla/ES6)');
                printLine('  [+] Tools: Git, GitHub, VS Code, Docker basics');
                printLine('  [+] CyberSecurity: Linux, Networking, Nmap, OWASP foundations');
                printLine('  [+] Soft Skills: Problem Solving, Teamwork, Communication');
                break;

            case 'projects':
                printLine('=== SELECTED PROJECTS ===', 'warning');
                printLine('  1. Bayer Scan (Security CLI) - Python / Bash / Nmap API');
                printLine('  2. CashMind (Finance Web App) - HTML / CSS / JS');
                printLine('  3. CareConnect (Healthcare Manager) - HTML / CSS / JS / Scrum');
                if (isEs) {
                    printLine('Escribe "scan" para ver detalles de los puertos expuestos de estos proyectos.');
                } else {
                    printLine('Type "scan" to see port audit details for these projects.');
                }
                break;

            case 'contact':
            case 'contacto':
            case 'correo':
                if (isEs) {
                    printLine(`Email: ${CONFIG.email}`);
                    printLine(`GitHub: ${CONFIG.github}`);
                    printLine(`LinkedIn: ${CONFIG.linkedin}`);
                    printLine('Abriendo formulario de contacto modal...', 'success');
                } else {
                    printLine(`Email: ${CONFIG.email}`);
                    printLine(`GitHub: ${CONFIG.github}`);
                    printLine(`LinkedIn: ${CONFIG.linkedin}`);
                    printLine('Opening contact modal form...', 'success');
                }
                setTimeout(() => {
                    contactModal.showModal();
                }, 800);
                break;

            case 'clear':
            case 'limpiar':
                // Clear all line elements before the input line
                const lines = terminalBody.querySelectorAll('.terminal-line');
                lines.forEach(l => l.remove());
                break;

            case 'scan':
                runSimulatedScan(isEs);
                break;

            default:
                if (isEs) {
                    printLine(`Comando no reconocido: "${cleanInput}". Escribe "help" para ver comandos.`, 'error');
                } else {
                    printLine(`Command not recognized: "${cleanInput}". Type "help" for a list of commands.`, 'error');
                }
                break;
        }
    }

    function runSimulatedScan(isEs) {
        // Disable input during scan
        terminalInput.disabled = true;
        terminalCursor.style.display = 'none';
        
        printLine(isEs ? 'Iniciando Bayer Scan v1.0.0...' : 'Starting Bayer Scan v1.0.0...', 'warning');
        
        let steps = [
            { text: isEs ? 'Iniciando descubrimiento de host...' : 'Initiating host discovery...', delay: 400 },
            { text: isEs ? 'Host activo (latencia 0.00034s).' : 'Host is up (0.00034s latency).', delay: 700 },
            { text: isEs ? 'Escaneando puertos de gabrielbayer.dev (127.0.0.1)...' : 'Scanning gabrielbayer.dev (127.0.0.1)...', delay: 1100 },
            { text: 'PORT      STATE  SERVICE', delay: 1600, type: 'warning' },
            { text: '22/tcp    open   ssh (Linux / Bash / Automation)', delay: 1850 },
            { text: '80/tcp    open   http (Semantic HTML / Clean CSS)', delay: 2100 },
            { text: '443/tcp   open   https (JavaScript Vanilla / ES6)', delay: 2350 },
            { text: '3000/tcp  open   development (Git / Docker basics)', delay: 2600 },
            { text: '9001/tcp  open   tor-orport (Nmap / OWASP Security)', delay: 2850 },
            { text: isEs ? 'Resultado: El host se encuentra SECURO. 5 puertos vulnerables a contratación abiertos.' : 'Audit report: Host is SECURE. 5 ports open and ready for hiring.', delay: 3200, type: 'success' },
            { text: isEs ? 'Escaneo completado: 1 IP escaneada en 3.20 segundos.' : 'Scan finished: 1 IP address scanned in 3.20 seconds.', delay: 3500 }
        ];

        steps.forEach(step => {
            setTimeout(() => {
                printLine(step.text, step.type || 'output');
                
                // If it's the last step, re-enable input
                if (step === steps[steps.length - 1]) {
                    terminalInput.disabled = false;
                    terminalCursor.style.display = 'block';
                    terminalInput.focus();
                }
            }, step.delay);
        });
    }
}
