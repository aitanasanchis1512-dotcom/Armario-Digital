// Base de datos local simulada con algunas prendas iniciales
let closet = [
    { name: "Blazer Amarillo", category: "superior", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=300" },
    { name: "Falda a Cuadros", category: "inferior", image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=300" },
    { name: "Zapatos Tacón Blanco", category: "calzado", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=300" }
];

const form = document.getElementById('clothing-form');
const closetGrid = document.getElementById('closet-grid');
const generateBtn = document.getElementById('generate-outfit');
const outfitResult = document.getElementById('outfit-result');

// Función para mostrar la ropa en la pantalla
function renderCloset() {
    closetGrid.innerHTML = '';
    closet.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'item-card';
        card.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h4>${item.name}</h4>
            <p><small>${item.category}</small></p>
        `;
        closetGrid.appendChild(card);
    });
}

// Agregar nueva prenda desde el formulario
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('item-name').value;
    const category = document.getElementById('item-category').value;
    const image = document.getElementById('item-image').value;

    closet.push({ name, category, image });
    renderCloset();
    form.reset();
});

// Simulación de la IA combinando ropa (Estilo Clueless)
generateBtn.addEventListener('click', () => {
    const superiors = closet.filter(i => i.category === 'superior');
    const inferiors = closet.filter(i => i.category === 'inferior');
    const shoes = closet.filter(i => i.category === 'calzado');

    if (superiors.length === 0 || inferiors.length === 0) {
        outfitResult.innerHTML = "<p>¡Necesitas al menos una parte superior y una inferior para crear un outfit!</p>";
        return;
    }

    // Elegir aleatoriamente piezas para simular el motor de sugerencias de la IA
    const randomSup = superiors[Math.floor(Math.random() * superiors.length)];
    const randomInf = inferiors[Math.floor(Math.random() * inferiors.length)];
    const randomShoe = shoes.length > 0 ? shoes[Math.floor(Math.random() * shoes.length)] : null;

    outfitResult.innerHTML = `
        <h3>🤖 Sugerencia de la IA:</h3>
        <p>¡Perfecto para hoy! Aquí tienes tu combinación:</p>
        <div style="display: flex; justify-content: center; gap: 10px; margin-top: 10px;">
            <div><img src="${randomSup.image}" width="70" style="border-radius:5px;"><br><small>${randomSup.name}</small></div>
            <div><img src="${randomInf.image}" width="70" style="border-radius:5px;"><br><small>${randomInf.name}</small></div>
            ${randomShoe ? `<div><img src="${randomShoe.image}" width="70" style="border-radius:5px;"><br><small>${randomShoe.name}</small></div>` : ''}
        </div>
    `;
});

// Cargar el armario al iniciar
renderCloset();
