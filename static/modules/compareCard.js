export const renderPolarAreaChart = (player, polarAreaChart) => {
    if (polarAreaChart) polarAreaChart.destroy();
    const polarChartCanvas = document.querySelector('#polarAreaChart');
    const bgColor = window.getComputedStyle(polarChartCanvas).backgroundColor
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
            scales: {
                r: {
                    grid: {
                        color: 'rgba(128,128,128,0.2)'
                    },
                    angleLines:{
                        color: 'rgba(128,128,128,0.2)'
                    },
                    ticks:{
                        backdropColor:bgColor,
                        beginAtZero: true,
                        min: 0,
                        max: 100,
                        color:"#808080",
                        font:{
                            size:10
                        }
                    },
                    pointLabels:{
                        color:"#808080",
                        font:{
                            size:12
                        }
                    }
                }
            }, plugins: {
                legend: {
                    labels: {
                        font: {
                            size: 14,
                        },
                        color: "#808080"
                    }
                }
            }
        }
    });

    return polarAreaChart;
};
