document.addEventListener('DOMContentLoaded', () => {
    const finalizeButton = document.getElementById('finalize-purchase');
    const popup = document.getElementById('popup');
    const closePopupButton = document.getElementById('close-popup');
    const cartDetails = document.getElementById('cart-details');
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const clearCartButton = document.getElementById('clear-cart');
    const cartIcon = document.getElementById('icon-cart');
    const closeCartButton = document.getElementById('close-cart');
    const loginButton = document.getElementById('login-btn');
    const loginPopup = document.getElementById('popup-login');
    const closeLoginPopupButton = document.getElementById('close-login-popup');
    const submitLoginButton = document.getElementById('submit-login');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn')) || false;

    const user = { username: 'usuario', password: 'senha' };

    function updateCartCount() {
        cartCount.textContent = `(${cart.length})`;
    }

    function displayCartItems() {
        cartItems.innerHTML = '';
        if (cart.length > 0) {
            cart.forEach((item, index) => {
                const cartItemDiv = document.createElement('div');
                cartItemDiv.classList.add('cart-item');
                cartItemDiv.innerHTML = `
                    <img src="${item.imageSrc}" alt="${item.name}">
                    <div class="item-info">
                        <p>${item.name}</p>
                        <p>${item.price}</p>
                    </div>
                    <button class="remove-btn" data-index="${index}">Remover</button>
                `;
                cartItems.appendChild(cartItemDiv);
            });
            cartDetails.classList.remove('hidden');
        } else {
            cartDetails.classList.add('hidden');
        }
    }

    function addToCart(item) {
        if (!isLoggedIn) {
            alert('Você precisa estar logado para adicionar itens ao carrinho.');
            return;
        }
        cart.push(item);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        if (!cartDetails.classList.contains('hidden')) {
            displayCartItems();
        }
    }

    function removeFromCart(index) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        if (!cartDetails.classList.contains('hidden')) {
            displayCartItems();
        }
    }

    // Recupera o estado do carrinho do localStorage ao carregar a página
    updateCartCount();

    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', (event) => {
            if (event.target.classList.contains('btn')) {
                const card = event.target.closest('.card');
                const price = card.querySelector('.card-price').textContent;
                const name = card.querySelector('.card-title').textContent;
                const imageSrc = card.querySelector('.card-img').src;
                addToCart({ price, name, imageSrc });
            }
        });
    });

    finalizeButton.addEventListener('click', () => {
        if (cart.length > 0) {
            popup.classList.remove('hidden');
            cart = [];
            localStorage.removeItem('cart');
            updateCartCount();
            displayCartItems();
        } else {
            alert('Seu carrinho está vazio.');
        }
    });

    cartIcon.addEventListener('click', () => {
        cartDetails.classList.toggle('hidden');
        displayCartItems();
    });

    closePopupButton.addEventListener('click', () => {
        popup.classList.add('hidden');
    });

    closeCartButton.addEventListener('click', () => {
        cartDetails.classList.add('hidden');
    });

    clearCartButton.addEventListener('click', () => {
        cart = [];
        localStorage.removeItem('cart');
        updateCartCount();
        displayCartItems();
    });

    cartItems.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-btn')) {
            const index = event.target.getAttribute('data-index');
            removeFromCart(index);
        }
    });

    loginButton.addEventListener('click', () => {
        if (isLoggedIn) {
            isLoggedIn = false;
            localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
            loginButton.textContent = 'Login';
            // Limpa o carrinho ao deslogar
            cart = [];
            localStorage.removeItem('cart');
            updateCartCount();
            displayCartItems();
            alert('Você foi deslogado e seu carrinho foi limpo.');
        } else {
            loginPopup.classList.remove('hidden');
        }
    });

    closeLoginPopupButton.addEventListener('click', () => {
        loginPopup.classList.add('hidden');
    });

    submitLoginButton.addEventListener('click', () => {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        if (username === user.username && password === user.password) {
            isLoggedIn = true;
            localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
            loginButton.textContent = 'Logout';
            alert('Login bem-sucedido!');
            loginPopup.classList.add('hidden');
        } else {
            alert('Usuário ou senha incorretos.');
        }
    });

    if (isLoggedIn) {
        loginButton.textContent = 'Logout';
    } else {
        loginButton.textContent = 'Login';
    }
});
