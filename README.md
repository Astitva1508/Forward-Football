# Forward Football Dashboard

## Overview

This is a football player analytics dashboard developed using Flask and Chart.js. The dashboard provides insights into various aspects of football players, including ball control, passing under pressure, dribble skills, and physical stats. Users can view individual player stats, compare players, and analyze percentile rankings.

## Getting Started

1. Clone the repository to your local machine

2. Install dependencies:
pip install -r requirements.txt

3. Run the Flask application:
python app.py

4. Access the dashboard in your web browser:
http://localhost:5000/


## File Structure

- `app.py`: Flask application file containing route definitions and data processing logic.
- `static/`: Directory containing static files (CSS, JavaScript, images).
- `templates/`: Directory containing HTML templates for rendering web pages.
- `static/data/player_data.xlsx`: Excel file containing player data.
- `static/styles/style.css`: CSS file for styling the dashboard.
- `static/js/script.js`: JavaScript file for client-side scripting.

## Dependencies

- Flask
- pandas
- Chart.js
- Bootstrap

## Usage

- The dashboard displays player statistics on the homepage.
- Users can search for specific players using the search bar.
- Players can be compared by entering the name of the second player in the comparison search bar.
- Additional insights and charts are available for analyzing player performance.

## Functions

### `renderBallControlPressureChart(data)`

Renders a scatter plot chart comparing passing under pressure versus ball control for each player.

### `renderPolarAreaChart(player, polarAreaChart)`

Renders a radar chart displaying various skills and physical stats of a single player, including dribble skills, BMI, passing under pressure, and ball control.
Comparison between different players is also possible.

### `renderDribbleLengthChart(data)`

Renders a bar chart showing the mean dribble skills based on player height groups.

### `renderPlayerCards(player)`

Renders player cards containing basic information, physical stats, and match stats for each player.

### `renderRadarChart(playerName, data, radarChart)`

Renders a polar area chart displaying the skills and stats of a single player in percentiles rankings compared to other players which play in the same position.

## Credits

- Data provided by Forward Football.
- Developed by Astitva.