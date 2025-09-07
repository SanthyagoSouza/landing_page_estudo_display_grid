<?php
/**
 * EXEMPLO DE INTEGRAÇÃO COM API PHP
 * 
 * Este arquivo mostra como adaptar a landing page para consumir sua API PHP REST
 */

// Configuração CORS (importante para funcionar com JavaScript)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json; charset=utf-8');

// Verificar método HTTP
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Exemplo de endpoint para posts
if ($_SERVER['REQUEST_METHOD'] === 'GET' && strpos($_SERVER['REQUEST_URI'], '/api/posts') !== false) {
    
    // Simular dados do banco de dados
    $posts = [
        [
            'id' => 1,
            'title' => 'Como Criar uma Landing Page Eficaz',
            'body' => 'Uma landing page bem estruturada pode aumentar significativamente suas conversões. Aqui estão as melhores práticas...',
            'userId' => 1,
            'created_at' => '2025-01-15'
        ],
        [
            'id' => 2,
            'title' => 'Tendências de Design para 2025',
            'body' => 'O design web está em constante evolução. Conheça as principais tendências que dominarão 2025...',
            'userId' => 2,
            'created_at' => '2025-01-14'
        ],
        [
            'id' => 3,
            'title' => 'Otimização de Performance Web',
            'body' => 'A velocidade do seu site impacta diretamente na experiência do usuário e no SEO. Veja como otimizar...',
            'userId' => 1,
            'created_at' => '2025-01-13'
        ],
        [
            'id' => 4,
            'title' => 'Integração de APIs com JavaScript',
            'body' => 'Aprenda como consumir APIs REST de forma eficiente usando JavaScript moderno e boas práticas...',
            'userId' => 3,
            'created_at' => '2025-01-12'
        ]
    ];
    
    // Aplicar limite se especificado
    $limit = isset($_GET['_limit']) ? (int)$_GET['_limit'] : count($posts);
    $posts = array_slice($posts, 0, $limit);
    
    echo json_encode($posts);
    exit();
}

// Exemplo de endpoint para usuários
if ($_SERVER['REQUEST_METHOD'] === 'GET' && strpos($_SERVER['REQUEST_URI'], '/api/users') !== false) {
    
    $users = [
        [
            'id' => 1,
            'name' => 'Santhyago Souza',
            'email' => 'santhyagoponciano@gmail.com',
            'company' => [
                'name' => 'SouzaDev Solutions'
            ],
            'website' => 'santhyago.dev'
        ],
        [
            'id' => 2,
            'name' => 'Maria Silva',
            'email' => 'maria@exemplo.com',
            'company' => [
                'name' => 'TechCorp'
            ],
            'website' => 'techcorp.com'
        ],
        [
            'id' => 3,
            'name' => 'João Santos',
            'email' => 'joao@exemplo.com',
            'company' => [
                'name' => 'Digital Agency'
            ],
            'website' => 'digitalagency.com'
        ]
    ];
    
    $limit = isset($_GET['_limit']) ? (int)$_GET['_limit'] : count($users);
    $users = array_slice($users, 0, $limit);
    
    echo json_encode($users);
    exit();
}

// Exemplo de endpoint para produtos
if ($_SERVER['REQUEST_METHOD'] === 'GET' && strpos($_SERVER['REQUEST_URI'], '/api/products') !== false) {
    
    $products = [
        [
            'id' => 1,
            'name' => 'Plano Básico',
            'price' => 29.90,
            'description' => 'Perfeito para começar seu projeto',
            'features' => [
                'Até 5 projetos',
                'Suporte por email',
                'Templates básicos',
                '1GB de armazenamento'
            ],
            'popular' => false
        ],
        [
            'id' => 2,
            'name' => 'Plano Profissional',
            'price' => 59.90,
            'description' => 'Ideal para profissionais',
            'features' => [
                'Projetos ilimitados',
                'Suporte prioritário',
                'Templates premium',
                '10GB de armazenamento',
                'Integração com APIs'
            ],
            'popular' => true
        ],
        [
            'id' => 3,
            'name' => 'Plano Empresarial',
            'price' => 99.90,
            'description' => 'Para grandes empresas',
            'features' => [
                'Tudo do Profissional',
                'Suporte 24/7',
                'Templates customizados',
                '100GB de armazenamento',
                'API dedicada',
                'Analytics avançado'
            ],
            'popular' => false
        ]
    ];
    
    $limit = isset($_GET['_limit']) ? (int)$_GET['_limit'] : count($products);
    $products = array_slice($products, 0, $limit);
    
    echo json_encode($products);
    exit();
}

// Exemplo de endpoint para depoimentos
if ($_SERVER['REQUEST_METHOD'] === 'GET' && strpos($_SERVER['REQUEST_URI'], '/api/testimonials') !== false) {
    
    $testimonials = [
        [
            'id' => 1,
            'name' => 'Ana Costa',
            'email' => 'ana@exemplo.com',
            'body' => 'Excelente trabalho! A equipe foi muito profissional e entregou exatamente o que precisávamos.',
            'rating' => 5
        ],
        [
            'id' => 2,
            'name' => 'Carlos Oliveira',
            'email' => 'carlos@exemplo.com',
            'body' => 'Serviço de qualidade superior. Recomendo para qualquer empresa que queira crescer online.',
            'rating' => 5
        ],
        [
            'id' => 3,
            'name' => 'Fernanda Lima',
            'email' => 'fernanda@exemplo.com',
            'body' => 'Atendimento excepcional e resultados que superaram nossas expectativas.',
            'rating' => 4
        ],
        [
            'id' => 4,
            'name' => 'Roberto Silva',
            'email' => 'roberto@exemplo.com',
            'body' => 'Profissionais competentes e comprometidos com o sucesso do cliente.',
            'rating' => 5
        ],
        [
            'id' => 5,
            'name' => 'Patricia Santos',
            'email' => 'patricia@exemplo.com',
            'body' => 'Transformaram nossa presença digital. Estamos muito satisfeitos com os resultados.',
            'rating' => 5
        ]
    ];
    
    $limit = isset($_GET['_limit']) ? (int)$_GET['_limit'] : count($testimonials);
    $testimonials = array_slice($testimonials, 0, $limit);
    
    echo json_encode($testimonials);
    exit();
}

// Endpoint para envio de formulário de contato
if ($_SERVER['REQUEST_METHOD'] === 'POST' && strpos($_SERVER['REQUEST_URI'], '/api/contact') !== false) {
    
    $input = json_decode(file_get_contents('php://input'), true);
    
    // Validação básica
    if (!isset($input['nome']) || !isset($input['email']) || !isset($input['mensagem'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Campos obrigatórios não preenchidos']);
        exit();
    }
    
    // Aqui você salvaria no banco de dados
    // Exemplo: salvarContato($input);
    
    // Simular salvamento
    $response = [
        'success' => true,
        'message' => 'Mensagem enviada com sucesso!',
        'data' => [
            'id' => rand(1000, 9999),
            'nome' => $input['nome'],
            'email' => $input['email'],
            'assunto' => $input['assunto'] ?? '',
            'mensagem' => $input['mensagem'],
            'created_at' => date('Y-m-d H:i:s')
        ]
    ];
    
    echo json_encode($response);
    exit();
}

// Endpoint não encontrado
http_response_code(404);
echo json_encode(['error' => 'Endpoint não encontrado']);
?>
