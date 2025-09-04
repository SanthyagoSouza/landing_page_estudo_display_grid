// import Loading from './script.js';

// Função para carregar uma página
async function carregarPagina(rota) {
    console.log('Carregando:', rota);
    try {
        const res = await fetch(`pages/${rota}.html`);
        if (!res.ok) {
            throw new Error(`Erro ao carregar página: ${res.status}`);
        }
        
        const content = await res.text();
        document.querySelector("#corpo").innerHTML = content;
        
        // Fechar menu mobile após navegação
        fecharMenuMobile();
        
        // Scroll suave para o topo
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
        console.error('Erro:', error);
        document.querySelector("#corpo").innerHTML = `
            <div style="text-align: center; padding: 2rem; color:rgb(90, 23, 23);">
                <h2>Erro ao carregar página</h2>
                <p>Não foi possível carregar a página solicitada.</p>
            </div>
        `;
    }
}

// Função para abrir/fechar menu mobile
function toggleMenuMobile() {
    const nav = document.querySelector('.nav');
    const toggle = document.querySelector('.mobile-menu-toggle');
    
    nav.classList.toggle('active');
    toggle.classList.toggle('active');
}

// Função para fechar menu mobile
function fecharMenuMobile() {
    const nav = document.querySelector('.nav');
    const toggle = document.querySelector('.mobile-menu-toggle');
    
    nav.classList.remove('active');
    toggle.classList.remove('active');
}

// Inicialização quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    // Carregar home como padrão
    carregarPagina('home');
    
    // Adicionar event listeners aos botões de navegação
    document.querySelectorAll(".nav-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const rota = btn.id;
            carregarPagina(rota);
        });
    });
    
    // Event listener para o toggle do menu mobile
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    if (mobileToggle) {
        mobileToggle.addEventListener('click', toggleMenuMobile);
    }
    
    // Fechar menu mobile ao clicar fora dele
    document.addEventListener('click', (e) => {
        const nav = document.querySelector('.nav');
        const toggle = document.querySelector('.mobile-menu-toggle');
        
        if (!nav.contains(e.target) && !toggle.contains(e.target)) {
            fecharMenuMobile();
        }
    });
    
    // Fechar menu mobile ao redimensionar a tela
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            fecharMenuMobile();
        }
    });
});

// Funções do Carrossel
let currentSlideIndex = 0;
const totalSlides = 5;

function showSlide(index) {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    
    // Remove active de todos os slides e indicadores
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Adiciona active ao slide e indicador atual
    if (slides[index]) {
        slides[index].classList.add('active');
    }
    if (indicators[index]) {
        indicators[index].classList.add('active');
    }
}

function changeSlide(direction) {
    currentSlideIndex += direction;
    
    // Loop infinito
    if (currentSlideIndex >= totalSlides) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = totalSlides - 1;
    }
    
    showSlide(currentSlideIndex);
}

function currentSlide(index) {
    currentSlideIndex = index - 1;
    showSlide(currentSlideIndex);
}

// Auto-play do carrossel
function startAutoPlay() {
    setInterval(() => {
        changeSlide(1);
    }, 5000); // Muda slide a cada 5 segundos
}

// Iniciar auto-play quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    // Aguarda um pouco para garantir que o conteúdo foi carregado
    setTimeout(() => {
        const carousel = document.querySelector('.carousel-container');
        if (carousel) {
            startAutoPlay();
        }
    }, 1000);
});

