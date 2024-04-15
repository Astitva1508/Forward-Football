from flask import Flask, render_template, jsonify,request
import pandas as pd
import numpy as np

app = Flask(__name__)

players_data = pd.read_excel('static/data/player_data.xlsx')
players_data.dropna(inplace=True)
players_data['id'] = players_data.reset_index(drop=True).index


@app.route('/')
def index():
    return render_template('index.html',players = players_data)

@app.route('/get_data')
def get_data():
    return jsonify(players_data.to_dict(orient='records'))

@app.route('/percentiles', methods=['GET'])
def calculate_percentiles():
    id = request.args.get('id')

    player = players_data[players_data['id'] == int(id)]

    if player.empty:
        return jsonify({'error': 'Player not found'}),404
    
    last_char = player['Position'].iloc[-1][-1]

    players_same_position = players_data[players_data['Position'].str[-1] == last_char]
    percentiles = {}
    for attribute in ['Dribble Skills', 'Ball Control', 'Passing Under Pressure']:
        if attribute == 'Dribble Skills' or attribute == 'Passing Under Pressure':
            rank = (players_same_position[attribute] >= player[attribute].iloc[0]).sum()
            percentile = (rank / len(players_same_position)) * 100
        else:
            rank = (players_same_position[attribute] <= player[attribute].iloc[0]).sum()
            percentile = (rank / len(players_same_position)) * 100
        percentiles[attribute] = percentile
    
    return jsonify(percentiles)


if __name__ == '__main__':
    app.run(debug=True)
