// Função para carregar uma página
async function carregarPagina(rota) {
    console.log('Carregando:', rota);
    const corpo = document.querySelector("#corpo");
    
    try {
        // Mostrar loading
        showLoading(corpo);
        
        const res = await fetch(`pages/${rota}.html`);
        if (!res.ok) {
            throw new Error(`Erro ao carregar página: ${res.status}`);
        }
        
        const content = await res.text();
        corpo.innerHTML = content;
        
        // Carregar CSS específico da página
        await carregarCSS(rota);
        
        // Carregar dados dinâmicos baseado na rota
        await carregarDadosDinamicos(rota);
        
        // Fechar menu mobile após navegação
        fecharMenuMobile();
        
        // Scroll suave para o topo
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Adicionar animação de entrada
        corpo.classList.add('fade-in');
        setTimeout(() => corpo.classList.remove('fade-in'), 600);
        
    } catch (error) {
        console.error('Erro:', error);
        showError(corpo, 'Não foi possível carregar a página solicitada.');
    }
}

// Função para carregar dados dinâmicos baseado na página
async function carregarDadosDinamicos(rota) {
    try {
        switch(rota) {
            case 'home':
                await carregarDadosHome();
                break;
            case 'sobre':
                await carregarDadosSobre();
                break;
            case 'contato':
                await carregarDadosContato();
                break;
        }
    } catch (error) {
        console.error('Erro ao carregar dados dinâmicos:', error);
    }
}

// Carregar dados da página home
async function carregarDadosHome() {
    // Carregar features para a seção de recursos
    const features = [
        {
            title: "Desenvolvimento Web Moderno",
            content: "Criamos sites e aplicações web usando as tecnologias mais atuais do mercado, garantindo performance e experiência excepcionais.",
            icon: "💻"
        },
        {
            title: "Design Responsivo",
            content: "Todos os nossos projetos são desenvolvidos para funcionar perfeitamente em qualquer dispositivo, do desktop ao smartphone.",
            icon: "📱"
        },
        {
            title: "SEO Otimizado",
            content: "Implementamos as melhores práticas de SEO para garantir que seu site apareça nos primeiros resultados do Google.",
            icon: "🔍"
        },
        {
            title: "Suporte 24/7",
            content: "Oferecemos suporte técnico completo para garantir que seu projeto funcione perfeitamente a qualquer momento.",
            icon: "🛠️"
        }
    ];
    
    const featuresContainer = document.querySelector('#home-principal');
    
    if (featuresContainer) {
        featuresContainer.innerHTML = features.map((feature, index) => `
            <div class="home-section-text dynamic-card">
                <div class="feature-icon">${feature.icon}</div>
                <h2>${feature.title}</h2>
                <p>${feature.content}</p>
            </div>
        `).join('');
    }
    
    // Carregar depoimentos para o carrossel
    const testimonials = await apiService.getTestimonials(7);
    const carouselContainer = document.querySelector('.carousel-wrapper');
    
    if (carouselContainer && testimonials.length > 0) {
        carouselContainer.innerHTML = testimonials.map((testimonial, index) => `
            <div class="carousel-slide ${index === 0 ? 'active' : ''}">
                <div class="testimonial-card">
                    <div class="testimonial-header">
                        <div class="testimonial-avatar">${testimonial.avatar}</div>
                        <div class="testimonial-info">
                            <h3>${testimonial.name}</h3>
                            <p class="testimonial-position">${testimonial.position}</p>
                            <p class="testimonial-company">${testimonial.company}</p>
                        </div>
                        <div class="testimonial-rating">
                            ${'★'.repeat(testimonial.rating)}
                        </div>
                    </div>
                    <div class="testimonial-content">
                        <p>"${testimonial.content}"</p>
                    </div>
                    <div class="testimonial-project">
                        <span class="project-tag">${testimonial.project}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    // Carregar estatísticas para o hero
    const stats = await apiService.getStats();
    const heroStats = document.querySelector('.hero-stats');
    
    if (heroStats && stats) {
        heroStats.innerHTML = `
            <div class="stat">
                <span class="stat-number">${stats.projectsCompleted}+</span>
                <span class="stat-label">Projetos</span>
            </div>
            <div class="stat">
                <span class="stat-number">${stats.happyClients}+</span>
                <span class="stat-label">Clientes</span>
            </div>
            <div class="stat">
                <span class="stat-number">${stats.yearsExperience}+</span>
                <span class="stat-label">Anos</span>
            </div>
        `;
    }
    
    // Carregar produtos para a seção de preços
    const products = await apiService.getProducts(3);
    const pricesContainer = document.querySelector('.prices');
    
    if (pricesContainer && products.length > 0) {
        pricesContainer.innerHTML = products.map(product => `
            <div class="prices-text dynamic-card ${product.popular ? 'popular' : ''}" data-plan="${product.id}">
                ${product.popular ? '<div class="badge">Mais Popular</div>' : ''}
                <h1>${product.name}</h1>
                <p>${product.description}</p>
                <div class="price">${product.price.toFixed(2)}</div>
                <div class="beneficios">
                    <ul>
                        ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                <button class="action-btn" onclick="selectPlan(${product.id})">
                    ${product.popular ? 'Escolher Plano' : 'Comprar Agora'}
                </button>
            </div>
        `).join('');
        
        // Adicionar animação de entrada escalonada
        const priceCards = pricesContainer.querySelectorAll('.prices-text');
        priceCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            setTimeout(() => {
                card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }
}

// Carregar dados da página sobre
async function carregarDadosSobre() {
    try {
        const aboutData = await apiService.getAboutData();
        
        if (!aboutData) {
            showError(document.querySelector('#sobre-principal'), 'Erro ao carregar informações pessoais');
            return;
        }

        // Verificar se os dados necessários existem
        if (aboutData.personalInfo) {
            carregarInformacoesPessoais(aboutData.personalInfo, aboutData.socialLinks);
            carregarBio(aboutData.personalInfo);
        }
        
        if (aboutData.skills) {
            carregarHabilidades(aboutData.skills);
        }
        
        if (aboutData.education) {
            carregarEducacao(aboutData.education);
        }
        
        if (aboutData.experience) {
            carregarExperiencia(aboutData.experience);
        }
        
        if (aboutData.projects) {
            carregarProjetos(aboutData.projects);
        }
    } catch (error) {
        console.error('Erro ao carregar dados sobre:', error);
        showError(document.querySelector('#sobre-principal'), 'Erro ao carregar informações pessoais');
    }
}

// Carregar informações pessoais no hero
function carregarInformacoesPessoais(personalInfo, socialLinks) {
    const heroAvatar = document.querySelector('#hero-avatar');
    const heroName = document.querySelector('#hero-name');
    const heroTitle = document.querySelector('#hero-title');
    const heroSocial = document.querySelector('#hero-social');
    
    if (heroAvatar) {
        heroAvatar.innerHTML = `<div class="avatar">${personalInfo.avatar}</div>`;
    }
    
    if (heroName) {
        heroName.textContent = personalInfo.name;
    }
    
    if (heroTitle) {
        heroTitle.textContent = personalInfo.title;
    }
    
    if (heroSocial && socialLinks) {
        heroSocial.innerHTML = `
            <a href="${socialLinks.github}" target="_blank" class="social-link">
                <span class="social-icon">💻</span> GitHub
            </a>
            <a href="${socialLinks.linkedin}" target="_blank" class="social-link">
                <span class="social-icon">💼</span> LinkedIn
            </a>
            <a href="${socialLinks.instagram}" target="_blank" class="social-link">
                <span class="social-icon">📷</span> Instagram
            </a>
            <a href="mailto:${socialLinks.email}" class="social-link">
                <span class="social-icon">📧</span> Email
            </a>
        `;
    }
}

// Carregar bio
function carregarBio(personalInfo) {
    const bioContent = document.querySelector('#bio-content');
    
    if (bioContent && personalInfo) {
        bioContent.innerHTML = `
            <div class="bio-text">
                <p>${personalInfo.bio || 'Informações não disponíveis'}</p>
                <p>${personalInfo.description || 'Descrição não disponível'}</p>
                <div class="objective">
                    <h4>Objetivo Profissional</h4>
                    <p>${personalInfo.objective || 'Objetivo não disponível'}</p>
                </div>
            </div>
        `;
    }
}

// Carregar habilidades
function carregarHabilidades(skills) {
    const skillsGrid = document.querySelector('#skills-grid');
    
    if (skillsGrid && skills && Array.isArray(skills)) {
        const skillsByCategory = skills.reduce((acc, skill) => {
            if (!acc[skill.category]) {
                acc[skill.category] = [];
            }
            acc[skill.category].push(skill);
            return acc;
        }, {});
        
        skillsGrid.innerHTML = Object.entries(skillsByCategory).map(([category, categorySkills]) => `
            <div class="skill-category">
                <h3>${category}</h3>
                <div class="skill-items">
                    ${categorySkills.map(skill => `
                        <div class="skill-item">
                            <div class="skill-header">
                                <span class="skill-name">${skill.name || 'N/A'}</span>
                                <span class="skill-level">${skill.level || 0}%</span>
                            </div>
                            <div class="skill-bar">
                                <div class="skill-progress" style="width: ${skill.level || 0}%"></div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');
    }
}

// Carregar educação
function carregarEducacao(education) {
    const educationTimeline = document.querySelector('#education-timeline');
    
    if (educationTimeline && education && Array.isArray(education)) {
        educationTimeline.innerHTML = education.map(edu => `
            <div class="timeline-item">
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                    <div class="timeline-header">
                        <h3>${edu.course || 'Curso não informado'}</h3>
                        <span class="timeline-status status-${(edu.status || 'concluido').toLowerCase().replace('ç', 'c')}">${edu.status || 'Concluído'}</span>
                    </div>
                    <p class="timeline-institution">${edu.institution || 'Instituição não informada'}</p>
                    <p class="timeline-period">
                        ${edu.startYear || 'N/A'}${edu.endYear ? ` - ${edu.endYear}` : ' - Atual'}
                    </p>
                    <span class="timeline-type">${edu.type || 'Formação'}</span>
                </div>
            </div>
        `).join('');
    }
}

// Carregar experiência
function carregarExperiencia(experience) {
    const experienceTimeline = document.querySelector('#experience-timeline');
    
    if (experienceTimeline && experience && Array.isArray(experience)) {
        experienceTimeline.innerHTML = experience.map(exp => `
            <div class="timeline-item experience-item">
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                    <div class="timeline-header">
                        <h3>${exp.position || 'Posição não informada'}</h3>
                        <span class="timeline-company">${exp.company || 'Empresa não informada'}</span>
                    </div>
                    <p class="timeline-period">${exp.period || 'Período não informado'}</p>
                    <p class="timeline-description">${exp.description || 'Descrição não disponível'}</p>
                    <div class="timeline-technologies">
                        ${(exp.technologies || []).map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// Carregar projetos
function carregarProjetos(projects) {
    const projectsGrid = document.querySelector('#projects-grid');
    
    if (projectsGrid && projects && Array.isArray(projects)) {
        projectsGrid.innerHTML = projects.map(project => `
            <div class="project-card">
                <div class="project-header">
                    <h3>${project.name || 'Projeto não informado'}</h3>
                    <span class="project-status status-${(project.status || 'concluido').toLowerCase().replace('ç', 'c')}">${project.status || 'Concluído'}</span>
                </div>
                <p class="project-description">${project.description || 'Descrição não disponível'}</p>
                <div class="project-technologies">
                    ${(project.technologies || []).map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-actions">
                    <a href="${project.link || '#'}" target="_blank" class="project-link">
                        <span class="link-icon">🔗</span> Ver Projeto
                    </a>
                </div>
            </div>
        `).join('');
    }
}

// Carregar dados da página contato
async function carregarDadosContato() {
    // Configurar formulário de contato
    const form = document.getElementById('contatoForm');
    if (form) {
        form.addEventListener('submit', handleContatoSubmit);
    }
    console.log('Formulário de contato configurado...');
}

// Função para lidar com envio do formulário de contato
function handleContatoSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Simular envio (aqui você integraria com sua API)
    console.log('Dados do formulário:', data);
    
    // Mostrar feedback para o usuário
    showFormFeedback('Mensagem enviada com sucesso!', 'success');
    form.reset();
}

// Função para mostrar feedback do formulário
function showFormFeedback(message, type = 'success') {
    const form = document.getElementById('contatoForm');
    const existingFeedback = form.querySelector('.form-feedback');
    
    if (existingFeedback) {
        existingFeedback.remove();
    }
    
    const feedback = document.createElement('div');
    feedback.className = `form-feedback form-feedback--${type}`;
    feedback.innerHTML = `
        <div class="feedback-icon">${type === 'success' ? '✅' : '❌'}</div>
        <p>${message}</p>
    `;
    
    form.appendChild(feedback);
    
    // Remover feedback após 5 segundos
    setTimeout(() => {
        if (feedback.parentNode) {
            feedback.remove();
        }
    }, 5000);
}

// Função para seleção de planos
function selectPlan(planId) {
    // Remover seleção anterior
    document.querySelectorAll('.prices-text').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Adicionar seleção ao plano escolhido
    const selectedCard = document.querySelector(`[data-plan="${planId}"]`);
    if (selectedCard) {
        selectedCard.classList.add('selected');
        
        // Adicionar efeito visual
        selectedCard.style.transform = 'scale(1.05)';
        setTimeout(() => {
            selectedCard.style.transform = '';
        }, 300);
        
        // Mostrar modal de confirmação (simulado)
        showPlanModal(planId);
    }
}

// Função para mostrar modal de seleção de plano
function showPlanModal(planId) {
    const modal = document.createElement('div');
    modal.className = 'plan-modal';
    modal.innerHTML = `
        <div class="modal-overlay" onclick="closePlanModal()"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3>🎉 Plano Selecionado!</h3>
                <button class="close-btn" onclick="closePlanModal()">×</button>
            </div>
            <div class="modal-body">
                <p>Você selecionou o <strong>Plano ${planId === 1 ? 'Básico' : planId === 2 ? 'Profissional' : 'Empresarial'}</strong></p>
                <p>Em breve você será redirecionado para a página de pagamento.</p>
                <div class="modal-actions">
                    <button class="action-btn" onclick="proceedToPayment(${planId})">Continuar</button>
                    <button class="action-btn action-btn--secondary" onclick="closePlanModal()">Cancelar</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Animação de entrada
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

// Função para fechar modal
function closePlanModal() {
    const modal = document.querySelector('.plan-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// Função para prosseguir com pagamento
function proceedToPayment(planId) {
    // Aqui você integraria com seu sistema de pagamento
    console.log(`Processando pagamento para plano ${planId}`);
    alert(`Redirecionando para pagamento do Plano ${planId === 1 ? 'Básico' : planId === 2 ? 'Profissional' : 'Empresarial'}...`);
    closePlanModal();
}

// Exportar funções para uso global
window.selectPlan = selectPlan;
window.closePlanModal = closePlanModal;
window.proceedToPayment = proceedToPayment;

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

// Função para carregar CSS dinamicamente
async function carregarCSS(rota) {
    // Remover CSS anterior se existir
    const existingCSS = document.querySelector(`#css-${rota}`);
    if (existingCSS) {
        existingCSS.remove();
    }
    
    // Tentar diferentes caminhos para o CSS
    const possiblePaths = [
        `./pages/css/${rota}.css`,
        `pages/css/${rota}.css`,
        `/pages/css/${rota}.css`,
        `../pages/css/${rota}.css`
    ];
    
    let cssLoaded = false;
    
    for (const cssPath of possiblePaths) {
        try {
            const response = await fetch(cssPath);
            if (response.ok) {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = cssPath;
                link.id = `css-${rota}`;
                document.head.appendChild(link);
                console.log(`CSS carregado com sucesso: ${cssPath}`);
                cssLoaded = true;
                break;
            }
        } catch (error) {
            console.warn(`Tentativa falhada para ${cssPath}:`, error);
        }
    }
    
    if (!cssLoaded) {
        console.warn(`Não foi possível carregar CSS para ${rota} em nenhum dos caminhos testados`);
    }
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

