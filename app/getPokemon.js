 export const APIpokemonMod = (pokemon) => {
    
    const baseURL = "https://pokeapi.co/api/v2/pokemon";
   
    // Concatena o nome do Pokémon à URL base
    const url = `${baseURL}/${pokemon}`;
   
    // Faz uma requisição usando a função fetch
    fetch(url)
        // Converte a resposta para JSON
        .then(response => response.json())
        // Manipula os dados obtidos (neste caso, imprime no console)
        .then(data => {
            console.log(data);
        });
}

