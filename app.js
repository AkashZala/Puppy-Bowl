const display = document.querySelector('.display');
const intro = document.getElementById('intro');

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
            <h2>${player.name}</h2>
            <p>${player.breed}</p>
            </a>
        `
    }).join('');
    display.innerHTML = allPlayers;
    intro.innerHTML = 'Click A Puppy For More Information:';

    const selectPlayer = playerList.find(player => player.id === hash);

    if (selectPlayer) {
        let selectHtml = `
        <a id="back" href=#> < All Puppies</a>
        <div id=selectContainer>
        <h1>${selectPlayer.name}</h1>
        <p>Breed: ${selectPlayer.breed}</p>
        <h2>Status: Currently on the ${selectPlayer.status}</h2>
        <img src='${selectPlayer.imageUrl}'/>
        </div>
        `
        display.innerHTML = selectHtml;
        intro.innerHTML = '';
    }
}

window.addEventListener('hashchange', () => {
    renderPlayers();
});


getPlayers();