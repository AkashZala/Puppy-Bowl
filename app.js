const display = document.querySelector('.display');
const intro = document.getElementById('intro');

const state = {
    playerList: [],
    player: null,
};

async function getPlayerList() {
    const playersResponse = await fetch('https://fsa-puppy-bowl.herokuapp.com/api/2307-ftb-et-web-ft/players');
    const playersJson = await playersResponse.json();
    state.playerList = playersJson.data.players;
    renderPlayerList();
}

function renderPlayerList() {
    const allPlayers = state.playerList.map((player) => {
        return `
            <a href='#${player.id}'>
            <h2>${player.name}</h2>
            <p>${player.breed}</p>
            </a>
        `
    }).join('');
    display.innerHTML = allPlayers;
    intro.innerHTML = 'Click A Player Puppy For More Information:';
}

window.addEventListener('hashchange', () => {
    render();
});

function getHash() {
    const hash = parseInt(window.location.hash.slice(1));
    state.player = state.playerList.find(player => player.id === hash);
}

async function renderPlayer() {
    const response = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2307-ftb-et-web-ft/players/${state.player.id}`);
    const json = await response.json();
    state.player = json.data.player;

    let selectHtml = `
        <a id="back" href=#> < All Puppies</a>
        <div id=selectContainer>
        <h1>${state.player.name}</h1>
        <h2>Team: ${state.player.team.name}</h2>
        <p>Breed: ${state.player.breed}</p>
        <h3>Status: Currently on the ${state.player.status}</h3>
        <img src='${state.player.imageUrl}'/>
        </div>
        `
    display.innerHTML = selectHtml;
    intro.innerHTML = '';
}

async function render() {
    await getPlayerList();
    getHash();
    if (state.player) {
        renderPlayer();
    } else {
        renderPlayerList();
    }
}

render();
