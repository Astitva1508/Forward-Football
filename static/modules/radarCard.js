export const renderRadarChart = (playerName, data, radarChart) => {
    if (radarChart) radarChart.destroy();
    const radarChartCanvas = document.querySelector('#radarChart');
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
            scale: {
                ticks: {
                    beginAtZero: true,
                    min: 0,
                    max: 100
                }
            }
        }
    });
    return radarChart;
};
