let cart = [];

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn');
    const finalizeButton = document.getElementById('finalize-purchase');
    const popup = document.getElementById('popup');
    const cartCount = document.getElementById('cart-count');
    const closePopup = document.getElementById('close-popup');

    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            const card = event.target.closest('.card');
            const price = card.querySelector('.card-price').textContent;
            addToCart(price);
        });
    });

    finalizeButton.addEventListener('click', () => {
        if (cart.length > 0) {
            popup.classList.remove('hidden');
            cart = [];
            updateCartCount();
        } else {
            alert('Seu carrinho está vazio.');
        }
    });

    closePopup.addEventListener('click', () => {
        popup.classList.add('hidden');
    });

    function addToCart(price) {
        cart.push(price);
        updateCartCount();
        alert(`Item adicionado ao carrinho. Total de itens no carrinho: ${cart.length}`);
    }

    function updateCartCount() {
        cartCount.textContent = `(${cart.length})`;
    }
});
