export const renderPassingPressureChart = (data) => {
    const midfielders = data.filter(({ Position }) => Position.charAt(Position.length - 1) === 'M').length;
    const defenders = data.filter(({ Position }) => Position.charAt(Position.length - 1) === 'B').length;
    const forwards = data.filter(({ Position }) => Position.charAt(Position.length - 1) === 'F').length;

    const ctx = document.querySelector('#passingPressureChart').getContext('2d');
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
};
