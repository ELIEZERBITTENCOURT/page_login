// Função para obter usuários do localStorage
function getUsers() {
    const usersData = localStorage.getItem('users');
    if (!usersData) {
        // Criar usuários padrão
        const defaultUsers = {
            'admin': { password: 'admin123', name: 'Administrador', email: 'admin@exemplo.com' },
            'usuario': { password: '123456', name: 'Usuário Teste', email: 'usuario@exemplo.com' }
        };
        localStorage.setItem('users', JSON.stringify(defaultUsers));
        return defaultUsers;
    }
    return JSON.parse(usersData);
}

// Função para salvar usuários no localStorage
function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

let users = getUsers();

// Elementos do DOM
const loginSection = document.getElementById('loginSection');
const registerSection = document.getElementById('registerSection');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const showRegisterLink = document.getElementById('showRegister');
const showLoginLink = document.getElementById('showLogin');

// Função para mostrar mensagem
function showMessage(elementId, message, isError = true) {
    const element = document.getElementById(elementId);
    element.textContent = message;
    element.classList.remove('error-message', 'success-message');
    element.classList.add(isError ? 'error-message' : 'success-message');
    element.classList.add('show');
    setTimeout(() => {
        element.classList.remove('show');
    }, 4000);
}

// Alternar entre login e cadastro
showRegisterLink.addEventListener('click', function () {
    loginSection.classList.add('hidden');
    registerSection.classList.remove('hidden');
});

showLoginLink.addEventListener('click', function () {
    registerSection.classList.add('hidden');
    loginSection.classList.remove('hidden');
});

// Validação de senha em tempo real
const registerPassword = document.getElementById('registerPassword');
const reqLength = document.getElementById('reqLength');
const reqNumber = document.getElementById('reqNumber');

registerPassword.addEventListener('input', function () {
    const password = this.value;

    if (password.length >= 6) {
        reqLength.classList.add('met');
    } else {
        reqLength.classList.remove('met');
    }

    if (/\d/.test(password)) {
        reqNumber.classList.add('met');
    } else {
        reqNumber.classList.remove('met');
    }
});

// Validar cadastro
function validateRegistration(username, email, password, confirmPassword, name) {
    if (name.trim().length < 3) {
        showMessage('registerErrorMessage', 'Nome deve ter pelo menos 3 caracteres');
        return false;
    }

    if (users[username]) {
        showMessage('registerErrorMessage', 'Este usuário já existe!');
        return false;
    }

    if (username.length < 3) {
        showMessage('registerErrorMessage', 'Usuário deve ter pelo menos 3 caracteres');
        return false;
    }

    if (password.length < 6) {
        showMessage('registerErrorMessage', 'Senha deve ter pelo menos 6 caracteres');
        return false;
    }

    if (!/\d/.test(password)) {
        showMessage('registerErrorMessage', 'Senha deve conter pelo menos 1 número');
        return false;
    }

    if (password !== confirmPassword) {
        showMessage('registerErrorMessage', 'As senhas não coincidem!');
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showMessage('registerErrorMessage', 'E-mail inválido!');
        return false;
    }

    return true;
}

// Registrar novo usuário
registerForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('registerName').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const username = document.getElementById('registerUsername').value.trim();
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerPasswordConfirm').value;

    if (validateRegistration(username, email, password, confirmPassword, name)) {
        users[username] = {
            password: password,
            name: name,
            email: email
        };

        saveUsers(users);

        showMessage('registerSuccessMessage', 'Cadastro realizado com sucesso! Redirecionando...', false);

        setTimeout(() => {
            registerForm.reset();
            registerSection.classList.add('hidden');
            loginSection.classList.remove('hidden');
            document.getElementById('loginUsername').value = username;
        }, 2000);
    }
});

// Fazer login
loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;

    const user = users[username];

    if (!user) {
        showMessage('loginErrorMessage', 'Usuário não encontrado!');
        return;
    }

    if (user.password !== password) {
        showMessage('loginErrorMessage', 'Senha incorreta!');
        return;
    }

    // Salvar sessão do usuário
    const sessionData = {
        username: username,
        name: user.name,
        email: user.email,
        loginTime: new Date().getTime()
    };

    sessionStorage.setItem('currentUser', JSON.stringify(sessionData));

    if (rememberMe) {
        localStorage.setItem('rememberedUser', username);
    }

    // Redirecionar para dashboard
    window.location.href = 'dashboard.html';
});

// Verificar usuário lembrado
window.addEventListener('load', function () {
    const rememberedUser = localStorage.getItem('rememberedUser');
    if (rememberedUser && users[rememberedUser]) {
        document.getElementById('loginUsername').value = rememberedUser;
        document.getElementById('rememberMe').checked = true;
    }
});