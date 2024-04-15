document.addEventListener('DOMContentLoaded', function () {
    fetch('/get_data')
        .then(response => response.json())
        .then(data => {
            // Data processing and visualization
            renderDribbleLengthChart(data);
            renderPassingPressureChart(data);
            renderBallControlPressureChart(data);
            renderPlayerCards(data[0]);
        })
        .catch(error => console.error('Error fetching data:', error));
});

const renderDribbleLengthChart=data=>{
    // Define height groups and initialize dictionaries to store dribble skills and counts for each group
    const heightGroups = ['145-150', '151-155', '156-160', '161-165', '166-170', '171-175', '176-180'];
    const dribbleSkillsByHeight = {};
    const dribbleSkillCounts = {};

    // Initialize dictionaries
    heightGroups.forEach(group => {
        dribbleSkillsByHeight[group] = 0;
        dribbleSkillCounts[group] = 0;
    });

    // Iterate through players to calculate total dribble skills and counts for each height group
    data.forEach(player => {
        const height = player.Length;
        const dribbleSkill = player['Dribble Skills'];

        // Find the appropriate height group for the player
        const group = heightGroups.find(group => {
            const [min, max] = group.split('-');
            return height >= min && height <= max;
        });

        // Add dribble skill to the total and increase count for the height group
        dribbleSkillsByHeight[group] += dribbleSkill;
        dribbleSkillCounts[group]++;
    });

    // Calculate mean dribble skills for each height group
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
                    stepSize:2
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

$('#searchInput').on('input', function (e) 
    {
    let searchQuery = $(this).val().toLowerCase();
        fetch('/get_data')
            .then(response => response.json())
            .then(data => {
                console.log(searchQuery)
                // Filter players based on search query
                let filteredPlayers = data.filter(function (player) {
                    return player.Player.toLowerCase().includes(searchQuery);
                });

                // Render filtered player cards
                renderPlayerCards(filteredPlayers[0]);
               
            })
            .catch(error => console.error('Error fetching data:', error)); 
});

function renderPlayerCards(player) {
    console.log(player);
    $('#playerCard').empty();
    $('#playerCard').append(playerCard(player));
};

function playerCard(player){
    let playerCardHtml =
        `
<div class="card player-card">
    <img src="/static/data/player_image.jpg" class="card-img-top player-img" alt="Image Not Found">
    <h5 class="card-title">${player.Player}</h5>
    <div class="card-body">
<div class="accordion" id="accordionPanelsStayOpenExample">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
        General Stats
    </button>
    </h2>
    <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show">
      <div class="accordion-body">
        <p><strong>Position:</strong> ${player.Position}</p>
        <p><strong>Team:</strong> ${player.Team}</p>
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
        Physical Stats
      </button>
    </h2>
    <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse">
      <div class="accordion-body">
        <p><strong>Age:</strong> ${player.Age}</p>
        <p><strong>Height:</strong> ${player.Length}</p>
        <p><strong>Weight:</strong> ${player.Weight}</p>
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
        Match Stats
      </button>
    </h2>
    <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse">
      <div class="accordion-body">
        <!-- Dribble Skills -->
        <div class="skill-bar">
            <p><strong>Dribble Skills:</strong></p>
            <div class="progress">
                <div class="progress-bar" role="progressbar" style="width: ${player['Dribble Skills']}%;" aria-valuenow="${player['Dribble Skills']}" aria-valuemin="0" aria-valuemax="100">${player['Dribble Skills']}%</div>
            </div>
        </div>
        <!-- Ball Control -->
        <div class="skill-bar">
            <p><strong>Ball Control:</strong></p>
            <div class="progress">
                <div class="progress-bar" role="progressbar" style="width: ${player['Ball Control']}%;" aria-valuenow="${player['Ball Control']}" aria-valuemin="0" aria-valuemax="100">${player['Ball Control']}%</div>
            </div>
        </div>
        <!-- Passing under Pressure -->
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
