// export const renderPlayerCards = (player) =>{
//     document.querySelector('#playerCard').empty();
//     document.querySelector('#playerCard').append(playerCard(player));
// };

export const renderPlayerCards = (player) => {
  const playerCardContainer = document.querySelector('#playerCard');
  playerCardContainer.innerHTML = playerCard(player);
};


export const playerCard = (player) =>{
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