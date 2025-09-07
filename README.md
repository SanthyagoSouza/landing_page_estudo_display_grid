# Landing Page Dinâmica

Uma landing page moderna e responsiva que consome dados de API para exibir conteúdo dinâmico.

## 🚀 Funcionalidades

- **SPA (Single Page Application)** - Navegação sem recarregar a página
- **Consumo de API** - Dados dinâmicos carregados via fetch
- **Design Responsivo** - Funciona em desktop, tablet e mobile
- **Estados de Loading** - Feedback visual durante carregamento
- **Tratamento de Erros** - Mensagens amigáveis para o usuário
- **Formulário de Contato** - Com validação e feedback
- **Carrossel Interativo** - Com controles e indicadores
- **Animações Suaves** - Transições e efeitos visuais

## 📁 Estrutura do Projeto

```
├── css/
│   ├── global.css          # Estilos globais e variáveis CSS
│   ├── menu.css            # Estilos do header e navegação
│   └── components.css      # Componentes reutilizáveis
├── pages/
│   ├── css/
│   │   ├── home.css        # Estilos da página home
│   │   ├── sobre.css       # Estilos da página sobre
│   │   └── contato.css     # Estilos da página contato
│   ├── home.html           # Página home
│   ├── sobre.html          # Página sobre
│   └── contato.html        # Página contato
├── js/
│   ├── api.js              # Configuração e métodos da API
│   └── route.js            # Roteamento e carregamento de páginas
├── img/
│   └── logo.png            # Logo da empresa
└── index.html              # Página principal
```

## 🔧 Configuração da API

### 1. Configurar URL da API

Edite o arquivo `js/api.js` e altere a configuração:

```javascript
const API_CONFIG = {
    baseURL: 'https://sua-api.com/api', // Substitua pela URL da sua API
    endpoints: {
        posts: '/posts',
        users: '/users',
        products: '/products',
        testimonials: '/comments'
    },
    timeout: 10000
};
```

### 2. Adaptar Endpoints

Ajuste os endpoints conforme sua API:

```javascript
// Exemplo para sua API PHP
const API_CONFIG = {
    baseURL: 'https://seudominio.com/api',
    endpoints: {
        posts: '/blog/posts.php',
        users: '/team/users.php',
        products: '/products/list.php',
        testimonials: '/testimonials/list.php'
    }
};
```

### 3. Estrutura de Dados Esperada

A API deve retornar dados no seguinte formato:

#### Posts
```json
[
    {
        "id": 1,
        "title": "Título do Post",
        "body": "Conteúdo do post...",
        "userId": 1
    }
]
```

#### Usuários
```json
[
    {
        "id": 1,
        "name": "Nome do Usuário",
        "email": "email@exemplo.com",
        "company": {
            "name": "Nome da Empresa"
        },
        "website": "exemplo.com"
    }
]
```

#### Produtos
```json
[
    {
        "id": 1,
        "name": "Nome do Produto",
        "price": 99.90,
        "description": "Descrição do produto",
        "features": ["Feature 1", "Feature 2"],
        "popular": true
    }
]
```

## 🎨 Personalização

### Cores e Tema

Edite as variáveis CSS em `css/global.css`:

```css
:root {
    --primary-color: #2563eb;      /* Cor principal */
    --primary-hover: #1d4ed8;      /* Cor principal hover */
    --secondary-color: #64748b;    /* Cor secundária */
    --accent-color: #f59e0b;       /* Cor de destaque */
    --text-dark: #1e293b;          /* Texto escuro */
    --text-light: #64748b;         /* Texto claro */
    --bg-light: #f8fafc;           /* Fundo claro */
    --bg-white: #ffffff;           /* Fundo branco */
}
```

### Conteúdo

- **Logo**: Substitua `img/logo.png`
- **Informações de Contato**: Edite `index.html` (footer)
- **Redes Sociais**: Atualize links no footer

## 📱 Responsividade

A landing page é totalmente responsiva com breakpoints:

- **Desktop**: > 1024px
- **Tablet**: 768px - 1024px
- **Mobile**: < 768px
- **Mobile Small**: < 480px

## 🚀 Como Usar

1. **Clone o repositório**
2. **Configure sua API** (edite `js/api.js`)
3. **Abra `index.html`** no navegador
4. **Teste a navegação** entre as páginas

## 🔗 Integração com API PHP

Para integrar com sua API PHP REST:

1. **Configure CORS** na sua API PHP
2. **Atualize a URL base** em `api.js`
3. **Ajuste os endpoints** conforme sua estrutura
4. **Teste os métodos** `getPosts()`, `getUsers()`, etc.

## 📝 Próximos Passos

- [ ] Implementar autenticação
- [ ] Adicionar mais validações no formulário
- [ ] Integrar com sistema de pagamento
- [ ] Adicionar analytics
- [ ] Implementar cache de dados
- [ ] Adicionar testes automatizados

## 🛠️ Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Estilos e animações
- **JavaScript ES6+** - Funcionalidades dinâmicas
- **Fetch API** - Consumo de dados
- **CSS Grid & Flexbox** - Layout responsivo

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
