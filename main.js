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
      pokeName = data.name
      pokeImg = data.sprites.front_default
      console.log(pokeName, pokeImg)
      
      // Creamos un div con la info
      const divResultado = document.createElement("div");
      divResultado.innerHTML = `
        <div class="resultado">
          <p>${pokeName}</p>
          <img src="${pokeImg}" alt="${pokeName}">
        </div>
      `
      
      // Muestra su imagen (sprites.front_default) y nombre en el <div> de resultados.
      const resultados = document.getElementById("resultados")
      resultados.appendChild(divResultado);
    })
    .catch(function (error) {
      // Si no existe: Muestra un alert "Pokémon no encontrado.”
      alert("¡Error! Pokémon no encontrado");
    });
}
