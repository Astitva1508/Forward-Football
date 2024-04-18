export function renderBallControlPressureChart(data) {
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