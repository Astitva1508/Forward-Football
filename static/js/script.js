import {renderPlayerCards} from '../modules/playerCard.js'
import { renderDribbleLengthChart } from '../modules/dribbleCard.js';
import { renderPassingPressureChart } from '../modules/passingPressureCard.js';
import { renderBallControlPressureChart } from '../modules/ballControlPressureCard.js';
import { renderRadarChart } from '../modules/radarCard.js';
import { renderPolarAreaChart } from '../modules/compareCard.js';

let radarChart;
let polarAreaChart;

document.addEventListener('DOMContentLoaded', ()=> {
    fetch('/get_data')
        .then(response => response.json())
        .then(data => {
            renderDribbleLengthChart(data);
            renderPassingPressureChart(data);
            renderBallControlPressureChart(data);
            renderPlayerCards(data[0]);
            renderRadarChart(data[0],radarChart);
            renderPolarAreaChart(data[0],polarAreaChart);
        })
        .catch(error => console.error('Error fetching data:', error));
});





document.getElementById('lightModeIcon').addEventListener('click', toggleMode);
document.getElementById('darkModeIcon').addEventListener('click', toggleMode);

function toggleMode() {
    const lightModeIcon = document.getElementById('lightModeIcon');
    const darkModeIcon = document.getElementById('darkModeIcon');
    const currentMode = lightModeIcon.style.display === 'none' ? 'dark' : 'light';
    document.body.classList.toggle('dark-theme');

    if (currentMode === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        lightModeIcon.style.display = 'inline'; 
        darkModeIcon.style.display = 'none'; 
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        lightModeIcon.style.display = 'none'; 
        darkModeIcon.style.display = 'inline';
    }
}


$('#searchCompareButton').on('click', async function (e) {
    let searchQuery = $("#searchInputCompare").val().toLowerCase();
    const response = await fetch(`/get_data`);
    const data = await response.json();
    
    fetch('/get_data')
        .then(response => response.json())
        .then(data => {
            // Filter players based on search query
            let filteredPlayers = data.filter(function (player) {
                return player.Player.toLowerCase().includes(searchQuery);
            });
            comparePlayers(filteredPlayers[0]);

        })
        .catch(error => console.error('Error fetching data:', error));
});

$('#searchInputButton').on('click', function (e) {
    let searchQuery = $("#searchInput").val().toLowerCase();
    console.log(searchQuery);
    const data  = 
    fetch('/get_data')
        .then(response => response.json())
        .then(data => {
            // Filter players based on search query
            let filteredPlayers = data.filter(function (player) {
                return player.Player.toLowerCase().includes(searchQuery);
            });
            if (length(filteredPlayers) > 0) {
                renderPlayerCards(filteredPlayers[0]);
                renderRadarChart(filteredPlayers[0])
                renderPolarAreaChart(filteredPlayers[0])
            }
        })
        .catch(error => console.error('Error fetching data:', error));
});


async function comparePlayers(player) {
    const heightMeters = player.Length / 100;
    const bmi = player.Weight / (heightMeters * heightMeters);

    const newData = {
        label:player.Player,
        data:[
            bmi,
            player['Dribble Skills'],
            player['Ball Control'],
            player['Passing Under Pressure']
        ]
    }

    polarAreaChart.data.datasets[1]= newData;
    polarAreaChart.update();
}