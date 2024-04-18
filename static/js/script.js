import {renderPlayerCards} from '../modules/playerCard.js'
import { renderDribbleLengthChart } from '../modules/dribbleCard.js';
// import { renderPassingPressureChart } from '../modules/passingPressureCard.js';
import { renderBallControlPressureChart } from '../modules/ballControlPressureCard.js';
import { renderRadarChart } from '../modules/radarCard.js';
import { renderPolarAreaChart } from '../modules/compareCard.js';

const modeButton = document.querySelector("#mode");
const lightMode = document.querySelector("#lightModeIcon");
const darkMode = document.querySelector("#darkModeIcon");
const playerSearch = document.querySelector("#searchInput");
const comparisonSearch = document.querySelector("#searchInputCompare")
const playerSearchButton = document.querySelector("#searchInputButton");
const comparisonSearchButton = document.querySelector("#searchCompareButton")

let radarChart;
let polarAreaChart;

document.addEventListener('DOMContentLoaded', ()=> {
    fetch('/get_data')
        .then(response => response.json())
        .then(data => {
            renderDribbleLengthChart(data);
            // renderPassingPressureChart(data);
            renderBallControlPressureChart(data);
            renderPlayerCards(data[0]);
            polarAreaChart = renderPolarAreaChart(data[0],polarAreaChart);
            displayRadarChart(data[0]);
        })
        .catch(error => console.error('Error fetching data:', error));
});

const displayRadarChart = (player) => {
    fetch(`/percentiles?id=${player['id']}`)
        .then(response => response.json())
        .then(data => {
            radarChart = renderRadarChart(player['Player'], data, radarChart);
        }).catch(error => console.error('Error fetching data:', error));
};

modeButton.addEventListener('click', ()=>{
    const currentMode = document.documentElement.getAttribute('data-theme');
    document.body.classList.toggle('dark-theme');

    if (currentMode === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        lightMode.style.display = 'inline';
        darkMode.style.display = 'none';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        lightMode.style.display = 'none';
        darkMode.style.display = 'inline';
    }
});


comparisonSearchButton.addEventListener('click', (e) => {
    let searchQuery = comparisonSearch.value.toLowerCase();
    fetch('/get_data')
        .then(response => response.json())
        .then(data => {
            let filteredPlayers = data.filter(player => player.Player.toLowerCase().includes(searchQuery));
            if (filteredPlayers.length > 0) {
                comparePlayers(filteredPlayers[0]);
            }
        })
        .catch(error => console.error('Error fetching data:', error));
});

playerSearchButton.addEventListener('click', (e) => {
    let searchQuery = playerSearch.value.toLowerCase();
    fetch('/get_data')
        .then(response => response.json())
        .then(data => {
            let filteredPlayers = data.filter(player => player.Player.toLowerCase().includes(searchQuery));
            if (filteredPlayers.length > 0) {
                renderPlayerCards(filteredPlayers[0]);
                displayRadarChart(filteredPlayers[0])
                polarAreaChart = renderPolarAreaChart(filteredPlayers[0], polarAreaChart)
            }
        })
        .catch(error => console.error('Error fetching data:', error));
});


const comparePlayers = (player) => {
    const heightMeters = player.Length / 100;
    const bmi = player.Weight / (heightMeters * heightMeters);

    const newData = {
        label: player.Player,
        data: [
            bmi,
            player['Dribble Skills'],
            player['Ball Control'],
            player['Passing Under Pressure']
        ]
    };

    polarAreaChart.data.datasets[1] = newData;
    polarAreaChart.update();
};







