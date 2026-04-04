// ===== Authentication System =====

// ===== Password Toggle Function =====
function togglePassword(inputId = 'password') {
    const input = document.getElementById(inputId);
    const toggleBtn = input.nextElementSibling;
    const icon = toggleBtn.querySelector('i');

    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// ===== Password Strength Checker =====
function checkPasswordStrength(password) {
    let strength = 0;
    let feedback = [];

    if (password.length >= 8) strength++;
    else feedback.push('At least 8 characters');

    if (/[a-z]/.test(password)) strength++;
    else feedback.push('Lowercase letter');

    if (/[A-Z]/.test(password)) strength++;
    else feedback.push('Uppercase letter');

    if (/[0-9]/.test(password)) strength++;
    else feedback.push('Number');

    if (/[^A-Za-z0-9]/.test(password)) strength++;
    else feedback.push('Special character');

    return { strength, feedback };
}

function updatePasswordStrength() {
    const password = document.getElementById('signupPassword').value;
    const strengthBar = document.getElementById('strengthBar');
    const strengthText = document.getElementById('strengthText');

    const { strength } = checkPasswordStrength(password);

    // Reset classes
    strengthBar.className = 'strength-bar';

    if (strength <= 1) {
        strengthBar.classList.add('weak');
        strengthText.textContent = 'Weak password';
        strengthText.style.color = '#dc3545';
    } else if (strength <= 3) {
        strengthBar.classList.add('medium');
        strengthText.textContent = 'Medium password';
        strengthText.style.color = '#ffc107';
    } else {
        strengthBar.classList.add('strong');
        strengthText.textContent = 'Strong password';
        strengthText.style.color = '#28a745';
    }

    strengthBar.style.width = (strength / 5) * 100 + '%';
}

// ===== Form Validation =====
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

function validatePassword(password) {
    return password.length >= 8;
}

// ===== Login Form Handler =====
function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;

    // Clear previous errors
    clearErrors();

    let isValid = true;

    // Validate email
    if (!email) {
        showError('email', 'Email is required');
        isValid = false;
    } else if (!validateEmail(email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }

    // Validate password
    if (!password) {
        showError('password', 'Password is required');
        isValid = false;
    }

    if (!isValid) return;

    // Simulate login process
    showLoading('loginForm', true);

    // Check if user exists in localStorage
    const users = JSON.parse(localStorage.getItem('cinemaHubUsers') || '[]');
    const user = users.find(u => u.email === email);

    setTimeout(() => {
        showLoading('loginForm', false);

        if (!user) {
            showToast('Account not found. Please sign up first.', 'error');
            return;
        }

        if (user.password !== password) {
            showError('password', 'Incorrect password');
            return;
        }

        // Successful login
        if (rememberMe) {
            localStorage.setItem('cinemaHubRemember', JSON.stringify({
                email: user.email,
                name: user.firstName + ' ' + user.lastName
            }));
        }

        localStorage.setItem('cinemaHubCurrentUser', JSON.stringify({
            email: user.email,
            name: user.firstName + ' ' + user.lastName,
            phone: user.phone
        }));

        showToast('Login successful! Redirecting...', 'success');

        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);

    }, 1500);
}

// ===== Sign Up Form Handler =====
function handleSignup(event) {
    event.preventDefault();

    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const terms = document.getElementById('terms').checked;

    // Clear previous errors
    clearErrors();

    let isValid = true;

    // Validate first name
    if (!firstName) {
        showError('firstName', 'First name is required');
        isValid = false;
    } else if (firstName.length < 2) {
        showError('firstName', 'First name must be at least 2 characters');
        isValid = false;
    }

    // Validate last name
    if (!lastName) {
        showError('lastName', 'Last name is required');
        isValid = false;
    } else if (lastName.length < 2) {
        showError('lastName', 'Last name must be at least 2 characters');
        isValid = false;
    }

    // Validate email
    if (!email) {
        showError('signupEmail', 'Email is required');
        isValid = false;
    } else if (!validateEmail(email)) {
        showError('signupEmail', 'Please enter a valid email address');
        isValid = false;
    }

    // Validate phone
    if (!phone) {
        showError('phone', 'Phone number is required');
        isValid = false;
    } else if (!validatePhone(phone)) {
        showError('phone', 'Please enter a valid phone number');
        isValid = false;
    }

    // Validate password
    if (!password) {
        showError('signupPassword', 'Password is required');
        isValid = false;
    } else if (!validatePassword(password)) {
        showError('signupPassword', 'Password must be at least 8 characters long');
        isValid = false;
    }

    // Validate confirm password
    if (!confirmPassword) {
        showError('confirmPassword', 'Please confirm your password');
        isValid = false;
    } else if (password !== confirmPassword) {
        showError('confirmPassword', 'Passwords do not match');
        isValid = false;
    }

    // Validate terms
    if (!terms) {
        showError('terms', 'You must agree to the terms and conditions');
        isValid = false;
    }

    if (!isValid) return;

    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('cinemaHubUsers') || '[]');
    const existingUser = users.find(u => u.email === email);

    if (existingUser) {
        showError('signupEmail', 'An account with this email already exists');
        return;
    }

    // Simulate signup process
    showLoading('signupForm', true);

    setTimeout(() => {
        showLoading('signupForm', false);

        // Create new user
        const newUser = {
            firstName,
            lastName,
            email,
            phone,
            password,
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        localStorage.setItem('cinemaHubUsers', JSON.stringify(users));

        // Auto login after signup
        localStorage.setItem('cinemaHubCurrentUser', JSON.stringify({
            email: newUser.email,
            name: newUser.firstName + ' ' + newUser.lastName,
            phone: newUser.phone
        }));

        showToast('Account created successfully! Welcome to CinemaHub!', 'success');

        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);

    }, 2000);
}

// ===== Error Handling =====
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const formGroup = field.closest('.form-group') || field.closest('.form-options');

    // Remove existing error
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) existingError.remove();

    // Add error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    formGroup.appendChild(errorDiv);

    // Add error styling
    field.classList.add('error');
}

function clearErrors() {
    // Remove all error messages
    document.querySelectorAll('.error-message').forEach(el => el.remove());
    document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
}

// ===== Loading State =====
function showLoading(formId, show) {
    const form = document.getElementById(formId);
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    if (show) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Please wait...';
    } else {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    }
}

// ===== Toast Notifications =====
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
        ${message}
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('show');
    }, 100);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Signup form
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);

        // Password strength checker
        const passwordInput = document.getElementById('signupPassword');
        if (passwordInput) {
            passwordInput.addEventListener('input', updatePasswordStrength);
        }
    }

    // Check for remembered user
    const remembered = JSON.parse(localStorage.getItem('cinemaHubRemember') || 'null');
    if (remembered && loginForm) {
        document.getElementById('email').value = remembered.email;
        document.getElementById('rememberMe').checked = true;
    }
});