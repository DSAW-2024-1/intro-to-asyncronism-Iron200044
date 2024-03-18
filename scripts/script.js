const btnCargarMas = document.getElementById('btn-cargar-citas');
const inputNombre = document.getElementById('input-nombre');
const inputNumero = document.getElementById('input-numero');
const btnFiltrarQuotes = document.getElementById('btn-filtrar-quotes');
const contenedor = document.getElementById('contenedor-personajes');

async function obtenerDatosSimpsons(count, character) {
    let endpoint = `https://thesimpsonsquoteapi.glitch.me/quotes`;

    if (count) {
        endpoint += `?count=${count}`;
    }else {
        endpoint += `?count=12`;
    }
    if (character) {
        endpoint += `&character=${character}`;
    }

    try {
        const respuesta = await fetch(endpoint);

        if (!respuesta.ok) {
            throw new Error('Ocurrió un error al obtener los datos');
        }

        const datos = await respuesta.json();
        return datos;
    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
}

async function mostrarPersonajes(count = null, character = null) {
    
    const datos = await obtenerDatosSimpsons(count, character);

    datos.forEach(personaje => {
        const div = document.createElement('div');
        div.classList.add('flex', 'flex-col', 'items-center', 'w-80', 'border', 'border-gray-300', 'rounded-md', 'mt-6', 'max-w-xs', 'justify-center');
        
        const img = document.createElement('img');
        img.src = personaje.image;
        img.alt = personaje.character;
        
        const h3 = document.createElement('h3');
        h3.textContent = personaje.character;
        
        const p = document.createElement('p');
        p.textContent = personaje.quote;
        
        div.appendChild(img);
        div.appendChild(h3);
        div.appendChild(p);
        
        contenedor.appendChild(div);
    });
    
}

//EventListener para el boton de "cargar mas"
document.getElementById('btn-cargar-citas').addEventListener('click', () => {
    mostrarPersonajes();
});

//EventListener para el boton de "filtrar"
document.getElementById('btn-filtrar-quotes').addEventListener('click', () => {
    const nombre = document.getElementById('input-nombre').value;
    const numero = document.getElementById('input-numero').value;
    contenedor.innerHTML = ''; // Limpiar contenedor
    mostrarPersonajes(numero, nombre);
});


// Mostrar las primeras 10 citas al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    mostrarPersonajes(); 
});

