const moves = [
    {
        navn: 'Stein',
        bilde: '<img src="img/stein.png"/>',
    },
    {
        navn: 'Saks',
        bilde: '<img src="img/saks.png"/>',
    },
    {
        navn: 'Papir',
        bilde: '<img src="img/papir.png"/>',
    },]
const players = [
    {
        navn: 'Deg',
        poeng: 0,
    },
    {
        navn: 'Math.random()',
        poeng: 0,
    },]

let screen = 'Trykk et bilde for å velge våpen!'
let weapons = '';
let contestants;
let selectedPlayer = '';
let selectedCpu = '';

updateView();
function updateView() {
    let html = '';
    weapons = '';
    contestants = '';
    weapons = readyWeapons();
    contestants = playerStatus();
    html = /*html*/ `
    <div  class="image"> ${screen} </div>
    <div class="movesImg"> ${weapons}</div>
    <button onclick="runRound()"> Start! </button>
    <div>${contestants}</div>
    `;
    document.getElementById('app').innerHTML = html;
}

function readyWeapons() {
    let weaponsSorter = '';
    for (let i = 0; i < moves.length; i++) {
        weaponsSorter += /*html*/ `
        <div class="movesName">
        <div onclick="selectWeapon(${i})"> ${moves[i].bilde} </div>
        <div> ${moves[i].navn} </div>
        </div>
        `;
    };
    return weaponsSorter;
}

function playerStatus() {
    let playerStatusSorter = '';
    for (let i = 0; i < players.length; i++) {
        playerStatusSorter += /*html*/ `
        <div> ${players[i].navn}:  ${players[i].poeng} poeng</div>
        `
    };
    return playerStatusSorter;
}
function selectWeapon(selection) {
    selectedPlayer = selection;
    screen = moves[selectedPlayer].bilde;
    updateView();
}
function computerSelect() {
    let cpuSelection = Math.floor(Math.random() * 3);
    console.log(cpuSelection)
    return cpuSelection;
}

function runRound() {
    if (selectedPlayer !== '') {
        selectedCpu = computerSelect()
        screen = moves[selectedPlayer].bilde + moves[selectedCpu].bilde;
        if (selectedPlayer < selectedCpu){
            if (selectedPlayer == 0 && selectedCpu == 2) players[1].poeng++;
            else players[0].poeng++;
        }
        else if (selectedCpu < selectedPlayer){
            if (selectedCpu == 0 && selectedPlayer == 2) players[0].poeng++;
            else players[1].poeng++;
        }
        else if (selectedPlayer == selectedCpu) screen += 'uavgjort'
        else screen = 'You broke this so bad you horrible person'
    } else screen = 'du må klikke et bilde'
    updateView()
    selectedPlayer = '';
}