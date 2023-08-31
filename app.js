const players = document.getElementById('players');
const selected = document.getElementById('select');

let playerList = {};

async function getPlayers() {
    const playersResponse = await fetch('https://fsa-puppy-bowl.herokuapp.com/api/2307-ftb-et-web-ft/players');
    const playersJson = await playersResponse.json();
    playerList = playersJson.data.players;
    renderPlayers();
}

function renderPlayers() {
    const hash = parseInt(window.location.hash.slice(1));
    const allPlayers = playerList.map((player) => {
        return `
            <a href='#${player.id}'>
            <p>${player.name}</p>
            <p>${player.breed}</p>
            </a>
        `
    }).join('');
    players.innerHTML = allPlayers;

    const selectPlayer = playerList.find(player => player.id === hash);

    if (selectPlayer) {
        let selectHtml = `
        <a href=#>go back</a>
        <div>
        <p>${selectPlayer.name}</p>
        <p>${selectPlayer.id}</p>
        <p>${selectPlayer.breed}</p>
        <p>${selectPlayer.status}</p>
        <img src='${selectPlayer.imageUrl}'/>
        </div>
        `
        selected.innerHTML = selectHtml;
        players.innerHTML = '';
    } else {
        selected.innerHTML = 'Choose a player for more information';
    }
}

window.addEventListener('hashchange', () => {
    renderPlayers();
});


getPlayers();