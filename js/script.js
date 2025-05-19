// Funções de utilidade
function $(selector) {
    return document.querySelector(selector);
}

function $$(selector) {
    return document.querySelectorAll(selector);
}

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar relógios
    initClocks();
    
    // Inicializar menu responsivo
    initResponsiveMenu();
    
    // Inicializar galeria
    initGallery();
    
    // Inicializar Big Ben interativo
    initBigBen();
    
    // Inicializar animações de scroll
    initScrollAnimations();
    
    // Inicializar lazy loading para imagens
    initLazyLoading();
    
    // Inicializar horário de Londres
    updateLondonTime();
    setInterval(updateLondonTime, 1000);
});

// Inicialização dos relógios animados
function initClocks() {
    function updateClocks() {
        const now = new Date();
        const hours = now.getHours() % 12;
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        
        // Ângulos para os ponteiros
        const hourAngle = (hours * 30) + (minutes * 0.5); // 30 graus por hora + ajuste para minutos
        const minuteAngle = minutes * 6; // 6 graus por minuto
        const secondAngle = seconds * 6; // 6 graus por segundo
        
        // Atualizar todos os relógios
        const hourHands = $$('.hour-hand');
        const minuteHands = $$('.minute-hand');
        const secondHands = $$('.second-hand');
        
        hourHands.forEach(hand => {
            hand.style.transform = `rotate(${hourAngle}deg)`;
        });
        
        minuteHands.forEach(hand => {
            hand.style.transform = `rotate(${minuteAngle}deg)`;
        });
        
        secondHands.forEach(hand => {
            hand.style.transform = `rotate(${secondAngle}deg)`;
        });
    }
    
    // Atualizar imediatamente e depois a cada segundo
    updateClocks();
    setInterval(updateClocks, 1000);
}

// Inicialização do menu responsivo
function initResponsiveMenu() {
    const menuToggle = $('.menu-toggle');
    const navList = $('.nav-list');
    const header = $('.header');
    
    // Toggle do menu mobile
    menuToggle.addEventListener('click', function() {
        navList.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
    
    // Fechar menu ao clicar em um link
    const navLinks = $$('.nav-list a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navList.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
    
    // Mudar cor do header ao rolar - Corrigido para mobile
    window.addEventListener('scroll', function() {
        if (window.innerWidth > 768) {
            if (window.scrollY > 100) {
                header.style.backgroundColor = 'rgba(139, 69, 19, 0.95)';
                header.style.borderBottom = '2px solid var(--dourado-envelhecido)';
                navLinks.forEach(link => {
                    link.style.color = 'var(--branco-envelhecido)';
                });
                $('.logo h1').style.color = 'var(--branco-envelhecido)';
            } else {
                header.style.backgroundColor = 'rgba(245, 245, 220, 0.9)';
                header.style.borderBottom = '2px solid var(--dourado-envelhecido)';
                navLinks.forEach(link => {
                    link.style.color = 'var(--marrom-envelhecido)';
                });
                $('.logo h1').style.color = 'var(--marrom-envelhecido)';
            }
        }
    });
}

// Inicialização da galeria
function initGallery() {
    const galleryWrapper = $('.gallery-wrapper');
    const galleryItems = $$('.gallery-item');
    const galleryPrev = $('.gallery-prev');
    const galleryNext = $('.gallery-next');
    
    let currentIndex = 0;
    
    // Configurar largura inicial
    function setupGallery() {
        galleryItems.forEach(item => {
            item.style.minWidth = `${galleryWrapper.offsetWidth}px`;
        });
    }
    
    setupGallery();
    window.addEventListener('resize', setupGallery);
    
    // Navegação da galeria
    galleryPrev.addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
            updateGallery();
        }
    });
    
    galleryNext.addEventListener('click', function() {
        if (currentIndex < galleryItems.length - 1) {
            currentIndex++;
            updateGallery();
        }
    });
    
    function updateGallery() {
        const offset = -currentIndex * galleryWrapper.offsetWidth;
        galleryItems.forEach(item => {
            item.style.transform = `translateX(${offset}px)`;
        });
    }
}

// Inicialização do Big Ben interativo
function initBigBen() {
    const viewMechanismBtn = $('.view-mechanism');
    const viewNightBtn = $('.view-night');
    const playSoundBtn = $('.play-sound');
    const bigBenMechanism = $('.big-ben-mechanism');
    const closeMechanismBtn = $('.close-mechanism');
    const bigBenTower = $('.big-ben-tower');
    const hammer = $('.hammer');
    
    // Ver mecanismo
    viewMechanismBtn.addEventListener('click', function() {
        bigBenMechanism.style.opacity = '1';
        bigBenMechanism.style.visibility = 'visible';
    });
    
    // Fechar mecanismo
    closeMechanismBtn.addEventListener('click', function() {
        bigBenMechanism.style.opacity = '0';
        bigBenMechanism.style.visibility = 'hidden';
    });
    
    // Ver iluminação noturna
    viewNightBtn.addEventListener('click', function() {
        bigBenTower.classList.toggle('night-mode');
        
        if (bigBenTower.classList.contains('night-mode')) {
            bigBenTower.style.filter = 'brightness(0.7) sepia(0.5)';
            viewNightBtn.textContent = 'Ver de Dia';
        } else {
            bigBenTower.style.filter = 'none';
            viewNightBtn.textContent = 'Ver à Noite';
        }
    });
    
    // Ouvir badalar
    playSoundBtn.addEventListener('click', function() {
        // Animar o martelo
        hammer.style.animationPlayState = 'running';
        
        // Simular o som (como não temos o arquivo de áudio)
        console.log("Som do Big Ben tocando...");
        
        // Parar a animação após 4 segundos
        setTimeout(() => {
            hammer.style.animationPlayState = 'paused';
        }, 4000);
    });
}

// Inicialização das animações de scroll
function initScrollAnimations() {
    const fadeElements = $$('.fade-in');
    
    function checkFade() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight * 0.9) {
                element.classList.add('visible');
            }
        });
    }
    
    // Verificar elementos visíveis no carregamento inicial
    checkFade();
    
    // Verificar ao rolar
    window.addEventListener('scroll', checkFade);
}

// Inicialização do lazy loading para imagens
function initLazyLoading() {
    const lazyImages = $$('.lazy-load');
    
    function loadImage(img) {
        const src = img.getAttribute('src');
        if (src) {
            img.classList.add('loaded');
        }
    }
    
    function checkLazyImages() {
        lazyImages.forEach(img => {
            const rect = img.getBoundingClientRect();
            
            // Carregar imagem quando estiver próxima da viewport
            if (rect.top <= window.innerHeight * 1.5) {
                loadImage(img);
            }
        });
    }
    
    // Verificar imagens no carregamento inicial
    checkLazyImages();
    
    // Verificar ao rolar
    window.addEventListener('scroll', checkLazyImages);
}

// Atualização do horário de Londres
function updateLondonTime() {
    const londonTimeDisplay = $('.london-time-display');
    
    // Obter horário de Londres (UTC+1 ou UTC+0 dependendo do horário de verão)
    const now = new Date();
    
    // Determinar se é horário de verão no Reino Unido
    // Simplificação: horário de verão do último domingo de março ao último domingo de outubro
    const year = now.getUTCFullYear();
    
    // Último domingo de março
    const marchLastDay = new Date(Date.UTC(year, 2, 31));
    marchLastDay.setUTCDate(31 - marchLastDay.getUTCDay());
    
    // Último domingo de outubro
    const octoberLastDay = new Date(Date.UTC(year, 9, 31));
    octoberLastDay.setUTCDate(31 - octoberLastDay.getUTCDay());
    
    // Verificar se estamos no horário de verão
    const isDST = now > marchLastDay && now < octoberLastDay;
    
    // Ajustar para UTC+1 (horário de verão) ou UTC+0 (horário padrão)
    const offset = isDST ? 1 : 0;
    
    // Criar nova data com o offset correto
    const londonTime = new Date(now.getTime() + (offset * 60 * 60 * 1000));
    
    // Formatar a hora
    const hours = londonTime.getUTCHours().toString().padStart(2, '0');
    const minutes = londonTime.getUTCMinutes().toString().padStart(2, '0');
    const seconds = londonTime.getUTCSeconds().toString().padStart(2, '0');
    
    // Atualizar o display
    londonTimeDisplay.textContent = `${hours}:${minutes}:${seconds}`;
}

// Efeito parallax para o Big Ben
window.addEventListener('scroll', function() {
    const parallaxBg = $('.parallax-bg');
    const scrollPosition = window.scrollY;
    
    if (parallaxBg) {
        parallaxBg.style.backgroundPositionY = `${scrollPosition * 0.4}px`;
    }
});
