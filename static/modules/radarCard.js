export const renderRadarChart = (playerName, data, radarChart) => {
    if (radarChart) radarChart.destroy();
    const radarChartCanvas = document.querySelector('#radarChart');
    const bgColor = window.getComputedStyle(radarChartCanvas).backgroundColor
    radarChart = new Chart(radarChartCanvas, {
        type: 'polarArea',
        data: {
            labels: Object.keys(data),
            datasets: [{
                label: playerName,
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
            scales: {
                r: {
                    grid: {
                        color: 'rgba(128,128,128,0.2)'
                    },
                    angleLines: {
                        color: 'rgba(128,128,128,0.2)'
                    },
                    ticks: {
                        backdropColor:bgColor,
                        beginAtZero: true,
                        min: 0,
                        max: 100,
                        color: '#808080',
                        font:{
                            size:10
                        }
                    },
                }
            },
            plugins: {
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
    return radarChart;
};
