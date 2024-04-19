export const renderBallControlPressureChart = (data) => {
    const ctx = document.querySelector('#ballControlPressureChart').getContext('2d');

    new Chart(ctx, {
        type: 'scatter',
        label:"Passing Under Pressure ",
        data: {
            labels:data.map((player)=>player.Player),
            datasets: [{
                label:"Passing Under Pressure v/s Ball Control",
                data: data.map(player => ({ y: 100-player['Passing Under Pressure'], x: player['Ball Control'] })),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    grid:{
                        color: 'rgba(128,128,128,0.2)'
                    }
                },y:{
                    grid:{
                        color: "rgba(128,128,128,0.2)"
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
};
