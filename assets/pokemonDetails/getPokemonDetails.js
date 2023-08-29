const urlParams = new URLSearchParams(window.location.search);
const idPokemon = urlParams.get('id');

const pokeDetailsContent = document.getElementById('pokeDetailsContent');

function convertResponseToPokemonWithDetails(pokeDetail) {
    const pokemon = new PokemonDetails();

    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types

    pokemon.types = types;
    pokemon.type = type;

    pokemon.photo = pokeDetail.sprites.other['official-artwork'].front_default;

    pokemon.height = pokeDetail.height;
    pokemon.weight = pokeDetail.weight;
    pokemon.abilities = pokeDetail.abilities.map((abilitySlot) => abilitySlot.ability.name);

    return pokemon;
}

function getPokemonDetails(idPokemon) {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`)
        .then((response) => response.json())
        .then((results) => convertResponseToPokemonWithDetails(results))
        .catch((error) => console.error(error))
        .finally(() => console.log('Requisição Detalhes concluída'));
}

function loadPageWithPokemonDetail(pokemon) {
    const newHtml = `
        <header class="header ${pokemon.type}">
            <header class="topHeader">
                <div class="headerButtonName">
                    <a href="../../index.html">
                        <img src="../images/arrow_back.png" alt="Botão Voltar">
                    </a>
                    <span class="name">${pokemon.name}</span>
                </div>
                <span>#${('000' + pokemon.number).slice(-3)}</span>
            </header>

        </header>        

        <section class="detailsContainer">
            <img class="pokeImg"
            src="${pokemon.photo}"
            alt="Foto ${pokemon.name}" />
            
            <ol class="typesList">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>

            <div class="details">
                <span>About</span>

                <div class="pokeStats">
                    <div class="pokeWeight">
                        <img src="../images/weight.png">
                        <span>${pokemon.weight} Kg</span>
                    </div>

                    <div class="pokeHeight">
                            <img src="../images/straighten.png">
                            <span>${pokemon.height} m</span>
                    </div>

                    <div class="pokeMoves">
                        ${pokemon.abilities.map((ability) => `<span>${ability}</span>`).join('')}
                    </div>
                </div>
        </div>
    `;

    pokeDetailsContent.innerHTML = newHtml;

}

getPokemonDetails(idPokemon)
    .then((response) => loadPageWithPokemonDetail(response));