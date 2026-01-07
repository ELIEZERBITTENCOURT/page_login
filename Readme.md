# Sistema de Login e Dashboard

Sistema completo de autenticação e gerenciamento de usuários com dashboards diferenciados para administradores e usuários comuns.

## Índice

- [Características](#características)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Tecnologias](#tecnologias)
- [Instalação](#instalação)
- [Uso](#uso)
- [Funcionalidades](#funcionalidades)
- [Usuários Padrão](#usuários-padrão)
- [Documentação](#documentação)

## Características

- Sistema de login e cadastro de usuários
- Autenticação com validação de credenciais
- Dois níveis de acesso: Admin e Usuário
- Dashboard administrativo completo
- Dashboard para usuários comuns
- Gerenciamento de usuários (CRUD)
- Registro de atividades
- Persistência de dados com localStorage
- Design responsivo e moderno
- Validação de formulários em tempo real

## Estrutura do Projeto

```
projeto/
├── index.html                      # Página de login e cadastro
├── script.js                       # Lógica de autenticação
├── style.css                       # Estilos da página de login
│
├── admin-dashboard/                      # Dashboard Administrativo
│   ├── admin-dashboard.html
│   ├── admin-dashboard.css
│   └── admin-dashboard.js
│
└── user-dashboard/                 # Dashboard do Usuário
    ├── user-dashboard.html
    ├── user-dashboard.css
    └── user-dashboard.js
```

## Tecnologias

- **HTML5** - Estrutura das páginas
- **CSS3** - Estilização e layout responsivo
- **JavaScript (ES6+)** - Lógica e interatividade
- **LocalStorage API** - Persistência de dados
- **SessionStorage API** - Gerenciamento de sessão

## Instalação

### Opção 1: Download Direto

1. Clone ou baixe este repositório
2. Abra o arquivo `index.html` em um navegador moderno

### Opção 2: Servidor Local

```bash
# Usando Live Server (VS Code)
# Clique com botão direito em index.html > Open with Live Server
```

Acesse: `http://localhost:8000`

## Uso

### Primeiro Acesso

1. Abra `index.html` no navegador
2. Use um dos usuários padrão ou crie uma nova conta
3. Após login, você será redirecionado para o dashboard correspondente

### Criando Nova Conta

1. Clique em "Primeira vez aqui? **Criar uma conta**"
2. Preencha todos os campos:
   - Nome Completo (mínimo 3 caracteres)
   - E-mail válido
   - Usuário (mínimo 3 caracteres, único)
   - Senha (mínimo 6 caracteres, deve conter números)
3. Confirme a senha
4. Clique em "Cadastrar"

### Login

1. Digite seu usuário e senha
2. Marque "Lembrar-me" para pré-preencher na próxima vez
3. Clique em "Entrar"

## Funcionalidades

### Sistema de Autenticação

- Login com validação de credenciais
- Cadastro de novos usuários
- Validação de senha em tempo real
- Opção "Lembrar-me"
- Verificação de usuários duplicados
- Logout com limpeza de sessão

### Dashboard do Usuário

- Visualização de dados pessoais
- Avatar personalizado
- Informações de último acesso
- Cards informativos
- Interface limpa e intuitiva

### Dashboard Administrativo

#### Estatísticas em Tempo Real
- Total de usuários cadastrados
- Usuários ativos
- Novos usuários hoje
- Número de administradores

#### Gerenciamento de Usuários
- Visualizar todos os usuários em tabela
- Adicionar novos usuários
- Definir roles (Admin/Usuário)
- Excluir usuários
- Proteção contra auto-exclusão

#### Registro de Atividades
- Histórico das últimas 10 ações
- Timestamp de cada atividade
- Identificação do usuário responsável
- Tipos de atividade (sucesso, aviso, informação)

## Usuários Padrão

### Administrador
```
Usuário: admin
Senha: admin123
```

### Usuário Comum
```
Usuário: usuario
Senha: 123456
```

## Documentação

### Estrutura de Dados

#### Objeto de Usuário
```javascript
{
    "username": {
        password: "senha123",
        name: "Nome Completo",
        email: "email@exemplo.com",
        role: "admin" | "user",
        createdAt: "2026-01-07T13:00:00.000Z"
    }
}
```

#### Objeto de Sessão
```javascript
{
    username: "admin",
    name: "Administrador",
    email: "admin@exemplo.com",
    role: "admin",
    loginTime: 1704636000000
}
```

#### Objeto de Atividade
```javascript
{
    message: "Novo usuário criado",
    type: "success" | "warning" | "info",
    timestamp: "2026-01-07T13:00:00.000Z",
    user: "Administrador"
}
```

### Fluxo de Autenticação

```
1. Usuário preenche formulário de login
2. Sistema valida credenciais no localStorage
3. Se válido, cria sessão no sessionStorage
4. Verifica o role do usuário
5. Redireciona para dashboard correspondente:
   - Admin → /admin-dashboard/admin-dashboard.html
   - User → /user-dashboard/user-dashboard.html
```

### Validações Implementadas

#### Cadastro
- Nome: mínimo 3 caracteres
- Email: formato válido (regex)
- Usuário: mínimo 3 caracteres, único
- Senha: mínimo 6 caracteres, deve conter número
- Confirmação de senha: deve ser igual à senha

#### Login
- Usuário: deve existir no sistema
- Senha: deve corresponder ao usuário

### LocalStorage vs SessionStorage

**LocalStorage** (persistente):
- Dados de usuários
- Usuário "lembrado"
- Histórico de atividades

**SessionStorage** (temporário):
- Sessão do usuário logado
- Limpa ao fechar navegador

## Segurança

### Implementações Atuais
- Validação de inputs no frontend
- Verificação de permissões por role
- Proteção contra auto-exclusão (admin)
- Limpeza de sessão no logout

### Avisos Importantes

Este é um projeto **educacional/demonstrativo**. Para ambiente de produção, considere:

- **NÃO armazene senhas em texto simples**
  - Use bcrypt, Argon2 ou similar
  - Nunca salve senhas no localStorage

- **Implemente autenticação real**
  - Use JWT (JSON Web Tokens)
  - Backend com API REST segura
  - HTTPS obrigatório

- **Adicione camadas de segurança**
  - Rate limiting
  - CSRF protection
  - XSS sanitization
  - SQL injection prevention (se usar banco de dados)

- **Sessões seguras**
  - Timeout de sessão
  - Renovação de tokens
  - Logout automático

## Personalização

### Cores do Tema

```css
/* Gradiente principal */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Cores dos cards de estatísticas */
.blue { background: #e3f2fd; color: #2196f3; }
.green { background: #e8f5e9; color: #4caf50; }
.orange { background: #fff3e0; color: #ff9800; }
.purple { background: #f3e5f5; color: #9c27b0; }
```

### Modificar Validações

```javascript
// Em script.js

// Alterar tamanho mínimo da senha
if (password.length < 8) { // Era 6, agora 8
    showMessage('registerErrorMessage', 'Senha deve ter pelo menos 8 caracteres');
    return false;
}

// Adicionar requisito de letra maiúscula
if (!/[A-Z]/.test(password)) {
    showMessage('registerErrorMessage', 'Senha deve conter letra maiúscula');
    return false;
}
```

## Responsividade

O sistema é totalmente responsivo e funciona em:
- Smartphones (320px+)
- Tablets (768px+)
- Desktops (1024px+)
- Telas grandes (1400px+)

## Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto é livre para uso educacional e pessoal.
Desenvolvido como projeto educacional de sistema de autenticação e gerenciamento de usuários.

---

Se este projeto foi útil para você, considere dar uma estrela!

**Versão:** 1.0.0  
**Última atualização:** Janeiro 2026