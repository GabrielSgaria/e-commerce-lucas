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
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCartCount() {
        cartCount.textContent = `(${cart.length})`;
    }

    function displayCartItems() {
        cartItems.innerHTML = ''; // Limpa itens existentes
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
        cart.push(item);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        if (!cartDetails.classList.contains('hidden')) {
            displayCartItems(); // Atualiza itens do carrinho se a aba estiver visível
        }
    }

    function removeFromCart(index) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        if (!cartDetails.classList.contains('hidden')) {
            displayCartItems(); // Atualiza itens do carrinho após remover
        }
    }

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
        displayCartItems(); // Atualiza itens do carrinho quando a aba é clicada
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

    // Inicializa o carrinho
    updateCartCount();
    displayCartItems(); // Para mostrar os itens do carrinho se ele estiver aberto

    // Adiciona o listener para remoção de itens do carrinho
    cartItems.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-btn')) {
            const index = event.target.getAttribute('data-index');
            removeFromCart(index);
        }
    });
});
