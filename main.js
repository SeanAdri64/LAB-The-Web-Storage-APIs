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
      // Creamos un div con la info
      const divResultado = document.createElement("div");
      divResultado.innerHTML = `
        <div class="resultado">
          <p>${currentPokemon.pokeName}</p>
          <img src="${currentPokemon.pokeImg}" alt="${currentPokemon.pokeName}">
        </div>
      `
      
      // Muestra su imagen (sprites.front_default) y nombre en el <div> de resultados.
      const resultados = document.getElementById("resultados")
      resultados.appendChild(divResultado);
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
    if (favs.some(p => p.name === currentPokemon.pokeName)) {
        alert("Ese Pokémon ya está en tus favoritos.");
        return;
    }
    favs.push(currentPokemon);
    localStorage.setItem("favoritos", JSON.stringify(favs));
    updateFavoritesList();
    alert("Pokémon agregado a favoritos");
}
