export function renderPolarAreaChart(player,polarAreaChart) {
    if (polarAreaChart) polarAreaChart.destroy();
    const polarChartCanvas = document.getElementById('polarAreaChart');

    const heightMeters = player.Length / 100;
    const bmi = player.Weight / (heightMeters * heightMeters);
    polarAreaChart = new Chart(polarChartCanvas, {
        type: 'radar',
        data: {
            labels: ['BMI', 'Dribble Skills', 'Ball Control', 'Passing under Pressure'],
            datasets: [{
                label: player.Player,
                data: [
                    bmi,
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
