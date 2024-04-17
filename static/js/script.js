let radarChart;
let polarAreaChart;
document.addEventListener('DOMContentLoaded', function () {
    fetch('/get_data')
        .then(response => response.json())
        .then(data => {
            // Data processing and visualization
            renderDribbleLengthChart(data);
            renderPassingPressureChart(data);
            renderBallControlPressureChart(data);
            renderPlayerCards(data[0]);
            renderRadarChart(data[0]);
            renderPolarAreaChart(data[0]);
        })
        .catch(error => console.error('Error fetching data:', error));
});

const renderDribbleLengthChart = data => {
    const heightGroups = ['145-150', '151-155', '156-160', '161-165', '166-170', '171-175', '176-180'];
    const dribbleSkillsByHeight = {};
    const dribbleSkillCounts = {};

    heightGroups.forEach(group => {
        dribbleSkillsByHeight[group] = 0;
        dribbleSkillCounts[group] = 0;
    });

    data.forEach(player => {
        const height = player.Length;
        const dribbleSkill = player['Dribble Skills'];

        const group = heightGroups.find(group => {
            const [min, max] = group.split('-');
            return height >= min && height <= max;
        });

        dribbleSkillsByHeight[group] += dribbleSkill;
        dribbleSkillCounts[group]++;
    });

    const meanDribbleSkills = heightGroups.map(group => {
        const totalDribbleSkills = dribbleSkillsByHeight[group];
        const count = dribbleSkillCounts[group];
        return count === 0 ? 0 : totalDribbleSkills / count;
    });

    const ctx = document.getElementById('dribbleLengthChart').getContext('2d');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: heightGroups,
            datasets: [{
                label: 'Mean Dribble Skills by Height',
                data: meanDribbleSkills,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    suggestedMin: 25,
                    suggestedMax: 35,
                    stepSize: 2
                }
            }
        }
    });
}


const renderPassingPressureChart=data=>{
    // Extracting required data for chart
    const midfielders = data.filter(({Position}) => {
        return Position.charAt(Position.length-1) === 'M'
    }).length;
    const defenders = data.filter(({Position}) => {
        return Position.charAt(Position.length-1) === 'B'
    }).length;
    const forwards = data.filter(({Position}) => {
        return Position.charAt(Position.length-1) === 'F'
    }).length;

    
    const ctx = document.getElementById('passingPressureChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Midfielders', 'Defenders', 'Forwards'],
            datasets: [{
                label: 'Passing Under Pressure',
                data: [midfielders, defenders, forwards],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true
        }
    });
}

function renderBallControlPressureChart(data) {
    const ctx = document.getElementById('ballControlPressureChart').getContext('2d');

    // Extracting required data for chart
    const ballControl = data.map(player => player['Ball Control']);
    const passingPressure = data.map(player => player['Passing Under Pressure']);

    new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Ball Control vs Passing Under Pressure',
                data: data.map(player => ({ x: player['Passing Under Pressure'], y: player['Ball Control'] })),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom'
                }
            }
        }
    });
}

function renderPlayerCards(player) {
    $('#playerCard').empty();
    $('#playerCard').append(playerCard(player));
};

function playerCard(player){
    let playerCardHtml =
        `
<div class="card player-card">
    <img src="/static/data/player_image.jpg" class="card-img-top player-img" alt="Image Not Found">
    <div class="card-body">
    <h5 class="card-title">${player.Player}</h5>
<div class="accordion" id="parentAccordion">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
        General Stats
    </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse" data-bs-parent="#parentAccordion">
      <div class="accordion-body">
        <p><strong>Position:</strong> ${player.Position}</p>
        <p><strong>Team:</strong> ${player.Team}</p>
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
        Physical Stats
      </button>
    </h2>
    <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#parentAccordion">
      <div class="accordion-body">
        <p><strong>Age:</strong> ${player.Age}</p>
        <p><strong>Height:</strong> ${player.Length}</p>
        <p><strong>Weight:</strong> ${player.Weight}</p>
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
        Match Stats
      </button>
    </h2>
    <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#parentAccordion">
      <div class="accordion-body">
        <div class="skill-bar">
            <p><strong>Dribble Skills:</strong></p>
            <div class="progress">
                <div class="progress-bar" role="progressbar" style="width: ${player['Dribble Skills']}%;" aria-valuenow="${player['Dribble Skills']}" aria-valuemin="0" aria-valuemax="100">${player['Dribble Skills']}%</div>
            </div>
        </div>
        <div class="skill-bar">
            <p><strong>Ball Control:</strong></p>
            <div class="progress">
                <div class="progress-bar" role="progressbar" style="width: ${player['Ball Control']}%;" aria-valuenow="${player['Ball Control']}" aria-valuemin="0" aria-valuemax="100">${player['Ball Control']}%</div>
            </div>
        </div>
        <div class="skill-bar">
            <p><strong>Passing under Pressure:</strong></p>
            <div class="progress">
                <div class="progress-bar" role="progressbar" style="width: ${player['Passing Under Pressure']}%;" aria-valuenow="${player['Passing Under Pressure']}" aria-valuemin="0" aria-valuemax="100">${player['Passing Under Pressure']}%</div>
            </div>
        </div>
      </div>
    </div>
  </div>
</div>
    </div>
</div>
`;
    return playerCardHtml;
}

async function renderRadarChart(player) {
        if(radarChart) radarChart.destroy();
        const radarChartCanvas = document.getElementById('radarChart');
        // Fetch percentile data from API
        const response = await fetch(`/percentiles?id=${player['id']}`);
        const data = await response.json();
        // Update radar chart
        radarChart = new Chart(radarChartCanvas, {
            type: 'polarArea',
            data: {
                labels: Object.keys(data),
                datasets: [{
                    label: player['Player'],
                    data: Object.values(data),
                    backgroundColor: [
                        'rgba(255, 99, 132,0.2)',
                        'rgba(75, 192, 192,0.2)',
                        'rgba(255, 205, 86,0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132,1)',
                        'rgba(75, 192, 192,1)',
                        'rgba(255, 205, 86,1)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scale: {
                    ticks: {
                        beginAtZero: true,
                        min: 0,
                        max: 100
                    }
                }
            }
        });
}

function renderPolarAreaChart(player) {
    if (polarAreaChart) polarAreaChart.destroy();
    const polarChartCanvas = document.getElementById('polarAreaChart');

    const bmiPlayer1 = calculateBMI(player.Weight, player.Length);
    polarAreaChart = new Chart(polarChartCanvas, {
        type: 'radar',
        data: {
            labels: ['BMI', 'Dribble Skills', 'Ball Control', 'Passing under Pressure'],
            datasets: [{
                label: player.Player,
                data: [
                    bmiPlayer1,
                    player['Dribble Skills'],
                    player['Ball Control'],
                    player['Passing Under Pressure']
                ],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scale: {
                ticks: {
                    beginAtZero: true,
                    min: 0,
                    max: 100
                }
            }
        }
    });
}

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

    const bmiPlayer1 = calculateBMI(player.Weight, player.Length);

    const newData = {
        label:player.Player,
        data:[
            bmiPlayer1,
            player['Dribble Skills'],
            player['Ball Control'],
            player['Passing Under Pressure']
        ]
    }

    polarAreaChart.data.datasets[1]= newData;
    polarAreaChart.update();
}

function calculateBMI(weight, length) {
    const heightMeters = length / 100;
    const bmi = weight / (heightMeters * heightMeters);
    return bmi;
}