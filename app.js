const players = document.getElementById('players');

const state = {
    players: {},
    selectPlayer: null
};

async function getPlayers() {
    const playersResponse = await fetch('https://fsa-puppy-bowl.herokuapp.com/api/2307-ftb-et-web-ft/players');
    const playersJson = await playersResponse.json();
    state.players = playersJson.data.players;
    renderPlayers();
}

function renderPlayers() {
    const allPlayers = state.players.map((player) => {
        return `
        <a href='#${player.id}'>${player.name}</a>
    `
    }).join('');
    players.innerHTML = allPlayers;
}

window.addEventListener('hashchange', () => {
    const hash = parseInt(window.location.hash.slice(1));
    state.selectPlayer = state.players.find(player => player.id === hash);
    if (state.selectPlayer) {
        getSelectPlayer();
    }
});

async function getSelectPlayer() {
    const response = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2307-ftb-et-web-ft/players/${state.selectPlayer.id}`)
    const json = await response.json();
    state.selectPlayer = json.data.player;
    console.log(state.selectPlayer)
}

getPlayers();