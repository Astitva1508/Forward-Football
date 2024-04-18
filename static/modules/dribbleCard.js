export const renderDribbleLengthChart = data => {
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