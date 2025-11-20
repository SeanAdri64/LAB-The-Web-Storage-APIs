let pokeName
let pokeImg

async function searchPokemon() {
  // Obtiene el nombre del <input>.
  const nombrePokemon = document.getElementById("pokemon-input").value;

  // Usa fetch para pedir datos a la PokéAPI
  const url = `https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`

  await fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Si el Pokémon existe:
      // Guarda los datos en una variable global (para usarla luego al guardar).
      currentPokemon = {
        pokeName : data.name,
        pokeImg : data.sprites.front_default
      };
      console.log(pokeName, pokeImg)
      
      // Muestra su imagen (sprites.front_default) y nombre en el <div> de resultados.
      const resultados = document.getElementById("resultado")
      resultados.innerHTML =  `
        <img src="${currentPokemon.pokeImg}" alt="${currentPokemon.pokeName}">
        <p>${currentPokemon.pokeName}</p>
      `
    })
    .catch(function (error) {
      // Si no existe: Muestra un alert "Pokémon no encontrado.”
      currentPokemon = null;
      alert("¡Error! Pokémon no encontrado");
    });
}

// Favoritos
function saveFavorite() {
    if (!currentPokemon) {
        alert("Primero busca un Pokémon.");
        return;
    }
    let favs = JSON.parse(localStorage.getItem("favoritos")) || [];
    // Evitar repetidos
    if (favs.some(p => p.pokeName === currentPokemon.pokeName)) {
        alert("Ese Pokémon ya está en tus favoritos.");
        return;
    }
    favs.push(currentPokemon);
    localStorage.setItem("favoritos", JSON.stringify(favs));
    updateFavoritesList();
    alert("Pokémon agregado a favoritos");
}

function updateFavoritesList() {

    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];


    const contenedor = document.getElementById("favoritos");
    contenedor.innerHTML = "";

 
    favoritos.forEach(pokemon => {
        const card = document.createElement("div");
        card.classList.add("favorito-card");
        console.log(pokemon);
        card.innerHTML = `
            <img src="${pokemon.pokeImg}" width="80">
            <h4>${pokemon.pokeName}</h4>
        `;

        contenedor.appendChild(card);
    });
}


window.onload = updateFavoritesList;
