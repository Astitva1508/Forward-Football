from flask import Flask, render_template, jsonify
import pandas as pd

app = Flask(__name__)

# Read data from Excel file
players_data = pd.read_excel('static/data/player_data.xlsx')

players_data.dropna(inplace=True)

@app.route('/')
def index():
    return render_template('index.html',players = players_data)

@app.route('/get_data')
def get_data():
    # Convert players_data to JSON format and send to frontend
    return jsonify(players_data.to_dict(orient='records'))

if __name__ == '__main__':
    app.run(debug=True)
