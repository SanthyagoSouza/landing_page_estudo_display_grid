// Configuração da API
const API_CONFIG = {
    baseURL: 'https://jsonplaceholder.typicode.com', // API de exemplo - substitua pela sua
    endpoints: {
        posts: '/posts',
        users: '/users',
        products: '/products',
        testimonials: '/comments'
    },
    timeout: 10000
};

// Classe para gerenciar requisições da API
class ApiService {
    constructor(config) {
        this.baseURL = config.baseURL;
        this.timeout = config.timeout;
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);

        try {
            const response = await fetch(url, {
                ...options,
                signal: controller.signal,
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                }
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            clearTimeout(timeoutId);
            throw error;
        }
    }

    // Métodos específicos para diferentes tipos de dados
    async getPosts(limit = 4) {
        try {
            const posts = await this.request(`${API_CONFIG.endpoints.posts}?_limit=${limit}`);
            return posts.map(post => ({
                id: post.id,
                title: post.title,
                content: post.body,
                excerpt: post.body.substring(0, 100) + '...',
                author: `User ${post.userId}`
            }));
        } catch (error) {
            console.error('Erro ao carregar posts:', error);
            return [];
        }
    }

    async getUsers(limit = 3) {
        try {
            const users = await this.request(`${API_CONFIG.endpoints.users}?_limit=${limit}`);
            return users.map(user => ({
                id: user.id,
                name: user.name,
                email: user.email,
                company: user.company.name,
                website: user.website
            }));
        } catch (error) {
            console.error('Erro ao carregar usuários:', error);
            return [];
        }
    }

    async getTestimonials(limit = 5) {
        try {
            // Simulando delay da API
            await new Promise(resolve => setTimeout(resolve, 500));
            
            const testimonials = [
                {
                    id: 1,
                    name: "Maria Silva",
                    company: "TechCorp Solutions",
                    position: "CEO",
                    avatar: "👩‍💼",
                    content: "Incrível trabalho! Nossa presença digital aumentou 300% após o novo site. A equipe foi muito profissional e entregou exatamente o que precisávamos.",
                    rating: 5,
                    project: "Site Corporativo + E-commerce"
                },
                {
                    id: 2,
                    name: "João Santos",
                    company: "StartupInovadora",
                    position: "Fundador",
                    avatar: "👨‍💻",
                    content: "Desenvolvimento ágil e resultados excepcionais. O aplicativo web que criaram para nós revolucionou nosso atendimento ao cliente.",
                    rating: 5,
                    project: "Aplicação Web Completa"
                },
                {
                    id: 3,
                    name: "Ana Costa",
                    company: "Consultoria ABC",
                    position: "Diretora de Marketing",
                    avatar: "👩‍🎨",
                    content: "Profissionais excepcionais! O design responsivo e a otimização SEO fizeram toda a diferença. Nossas conversões aumentaram 250%.",
                    rating: 5,
                    project: "Landing Page + SEO"
                },
                {
                    id: 4,
                    name: "Carlos Oliveira",
                    company: "E-commerce Plus",
                    position: "Gerente de Vendas",
                    avatar: "👨‍💼",
                    content: "Suporte 24/7 e qualidade impecável. A plataforma de e-commerce que desenvolveram é robusta e fácil de usar. Recomendo!",
                    rating: 5,
                    project: "Plataforma E-commerce"
                },
                {
                    id: 5,
                    name: "Fernanda Lima",
                    company: "Agência Digital XYZ",
                    position: "Diretora Criativa",
                    avatar: "👩‍🎯",
                    content: "Parceria de sucesso! A integração com APIs e o sistema de gestão que criaram otimizaram nossos processos internos.",
                    rating: 5,
                    project: "Sistema de Gestão + APIs"
                },
                {
                    id: 6,
                    name: "Roberto Silva",
                    company: "Restaurante Sabor",
                    position: "Proprietário",
                    avatar: "👨‍🍳",
                    content: "Site moderno e funcional que aumentou nossos pedidos online em 400%. A experiência do usuário é fantástica!",
                    rating: 5,
                    project: "Site + Sistema de Pedidos"
                },
                {
                    id: 7,
                    name: "Patricia Santos",
                    company: "Clínica Saúde Total",
                    position: "Administradora",
                    avatar: "👩‍⚕️",
                    content: "Sistema de agendamento online que facilitou muito nossa rotina. Interface intuitiva e pacientes adoraram a praticidade.",
                    rating: 5,
                    project: "Sistema de Agendamento"
                }
            ];
            
            return testimonials.slice(0, limit);
        } catch (error) {
            console.error('Erro ao carregar depoimentos:', error);
            return [];
        }
    }

    async getStats() {
        try {
            // Simulando delay da API
            await new Promise(resolve => setTimeout(resolve, 300));
            
            return {
                projectsCompleted: 127,
                happyClients: 89,
                yearsExperience: 6,
                supportHours: "24/7",
                averageRating: 4.9,
                successRate: 98
            };
        } catch (error) {
            console.error('Erro ao carregar estatísticas:', error);
            return {
                projectsCompleted: 100,
                happyClients: 50,
                yearsExperience: 5,
                supportHours: "24/7",
                averageRating: 4.8,
                successRate: 95
            };
        }
    }

    async getAboutData() {
        try {
            // Simulando delay da API
            await new Promise(resolve => setTimeout(resolve, 400));
            
            return {
                personalInfo: {
                    name: "Santhyago Souza Ponciano",
                    title: "Desenvolvedor Full-stack",
                    avatar: "👨‍💻",
                    bio: "Olá, meu nome é Santhyago Souza Ponciano. Sou desenvolvedor Front-End, atualmente em constante evolução e aprimoramento técnico. Possuo experiência prática com HTML, CSS, JavaScript, React, PHP e Python, atuando no desenvolvimento de interfaces web responsivas, dinâmicas e orientadas à experiência do usuário.",
                    description: "Tenho como característica a busca contínua por soluções eficientes, organização de código e boas práticas de desenvolvimento. Além da área de Front-End, estou expandindo minha atuação para Back-End e automação industrial, com foco em projetos que exijam integração, lógica estruturada e escalabilidade.",
                    objective: "Meu objetivo é contribuir com soluções tecnológicas que aliem performance, usabilidade e valor estratégico para os negócios."
                },
                education: [
                    {
                        id: 1,
                        course: "Engenharia da Computação",
                        institution: "Faculdade Descomplica",
                        status: "Cursando",
                        startYear: 2024,
                        type: "Graduação"
                    },
                    {
                        id: 2,
                        course: "Técnico em Automação Industrial",
                        institution: "Cedtec",
                        status: "Cursando",
                        startYear: 2025,
                        type: "Técnico"
                    },
                    {
                        id: 3,
                        course: "Análise e Desenvolvimento de Sistemas",
                        institution: "Faculdade Descomplica",
                        status: "Concluído",
                        startYear: 2024,
                        endYear: 2024,
                        type: "Graduação"
                    },
                    {
                        id: 4,
                        course: "Banco de Dados SQL",
                        institution: "Danki Code",
                        status: "Concluído",
                        startYear: 2024,
                        endYear: 2024,
                        type: "Formação"
                    },
                    {
                        id: 5,
                        course: "HTML Web Developer",
                        institution: "Dio.me",
                        status: "Concluído",
                        startYear: 2023,
                        endYear: 2023,
                        type: "Formação"
                    },
                    {
                        id: 6,
                        course: "Excel do Básico ao Avançado, Macro, VBA e Power BI",
                        institution: "Udemy",
                        status: "Cursando",
                        startYear: 2025,
                        type: "Curso"
                    }
                ],
                experience: [
                    {
                        id: 1,
                        position: "Analista de Suporte N2",
                        company: "Open Manager",
                        period: "Setembro 2023 – Atual",
                        description: "Responsável pelo suporte técnico via Zendesk, telefone e WhatsApp para o ERP da empresa. Atuação em emissão de NF-e, análise de erros do SPED, implantação de sistema, treinamentos internos e apoio no levantamento de requisitos para desenvolvimento.",
                        technologies: ["Zendesk", "ERP", "NF-e", "SPED", "Suporte Técnico"]
                    },
                    {
                        id: 2,
                        position: "Assistente de Tecnologia da Informação (HelpDesk)",
                        company: "Grupo Coutinho",
                        period: "Janeiro 2023 – Agosto 2023",
                        description: "Atendimento remoto via TeamViewer e presencial para suporte aos sistemas Senior, MEGAerp, Consinco WMS, Wfrota. Configuração de impressoras móveis, suporte a PDVs e gestão de solicitações no Fluig.",
                        technologies: ["TeamViewer", "Senior", "MEGAerp", "Consinco WMS", "Fluig"]
                    },
                    {
                        id: 3,
                        position: "Assistente de Infraestrutura",
                        company: "Grupo Coutinho",
                        period: "Janeiro 2022 – Janeiro 2023",
                        description: "Gestão da equipe elétrica, controle de materiais, orçamentos e ordens de serviço via Fluig. Acompanhamento de vistorias e controle de planilhas de despesas e almoxarifado.",
                        technologies: ["Fluig", "Gestão de Equipe", "Controle de Materiais", "Orçamentos"]
                    }
                ],
                skills: [
                    { name: "HTML5", level: 95, category: "Frontend" },
                    { name: "CSS3", level: 90, category: "Frontend" },
                    { name: "JavaScript", level: 85, category: "Frontend" },
                    { name: "React", level: 80, category: "Frontend" },
                    { name: "PHP", level: 75, category: "Backend" },
                    { name: "Python", level: 70, category: "Backend" },
                    { name: "SQL", level: 85, category: "Database" },
                    { name: "Excel/VBA", level: 90, category: "Office" }
                ],
                projects: [
                    {
                        id: 1,
                        name: "Sistema de Gestão ERP",
                        description: "Desenvolvimento de módulos para sistema ERP com integração de APIs",
                        technologies: ["PHP", "JavaScript", "MySQL"],
                        link: "https://github.com/santhyago/erp-system",
                        status: "Em Desenvolvimento"
                    },
                    {
                        id: 2,
                        name: "Landing Page Responsiva",
                        description: "Landing page moderna com design responsivo e otimização SEO",
                        technologies: ["HTML5", "CSS3", "JavaScript"],
                        link: "https://github.com/santhyago/landing-page",
                        status: "Concluído"
                    },
                    {
                        id: 3,
                        name: "Dashboard de Analytics",
                        description: "Dashboard interativo para análise de dados com gráficos dinâmicos",
                        technologies: ["React", "Chart.js", "API REST"],
                        link: "https://github.com/santhyago/dashboard-analytics",
                        status: "Concluído"
                    },
                    {
                        id: 4,
                        name: "API REST em PHP",
                        description: "API completa para gerenciamento de usuários e autenticação",
                        technologies: ["PHP", "MySQL", "JWT"],
                        link: "https://github.com/santhyago/api-rest-php",
                        status: "Concluído"
                    }
                ],
                socialLinks: {
                    github: "https://github.com/santhyago",
                    linkedin: "https://linkedin.com/in/santhyago-souza",
                    instagram: "https://instagram.com/santhyago.souzadev",
                    email: "santhyagoponciano@gmail.com"
                }
            };
        } catch (error) {
            console.error('Erro ao carregar dados sobre:', error);
            return null;
        }
    }

    async getProducts(limit = 3) {
        try {
            // Simulando dados de produtos já que a API de exemplo não tem
            const mockProducts = [
                {
                    id: 1,
                    name: "Plano Básico",
                    price: 29.90,
                    description: "Perfeito para começar",
                    features: [
                        "Até 5 projetos",
                        "Suporte por email",
                        "Templates básicos",
                        "1GB de armazenamento"
                    ],
                    popular: false
                },
                {
                    id: 2,
                    name: "Plano Profissional",
                    price: 59.90,
                    description: "Ideal para profissionais",
                    features: [
                        "Projetos ilimitados",
                        "Suporte prioritário",
                        "Templates premium",
                        "10GB de armazenamento",
                        "Integração com APIs"
                    ],
                    popular: true
                },
                {
                    id: 3,
                    name: "Plano Empresarial",
                    price: 99.90,
                    description: "Para grandes empresas",
                    features: [
                        "Tudo do Profissional",
                        "Suporte 24/7",
                        "Templates customizados",
                        "100GB de armazenamento",
                        "API dedicada",
                        "Analytics avançado"
                    ],
                    popular: false
                }
            ];
            return mockProducts.slice(0, limit);
        } catch (error) {
            console.error('Erro ao carregar produtos:', error);
            return [];
        }
    }
}

// Instância global da API
const apiService = new ApiService(API_CONFIG);

// Função para mostrar loading
function showLoading(element) {
    element.innerHTML = `
        <div class="loading-container">
            <div class="loading-spinner"></div>
            <p>Carregando...</p>
        </div>
    `;
}

// Função para mostrar erro
function showError(element, message = 'Erro ao carregar dados') {
    element.innerHTML = `
        <div class="error-container">
            <div class="error-icon">⚠️</div>
            <h3>Ops! Algo deu errado</h3>
            <p>${message}</p>
            <button onclick="location.reload()" class="retry-btn">Tentar novamente</button>
        </div>
    `;
}

// Exportar para uso global
window.apiService = apiService;
window.showLoading = showLoading;
window.showError = showError;
