from flask import Flask, jsonify
from flask_cors import CORS
import pickle
import pandas as pd

app = Flask(__name__)
CORS(app)

# Load the popular books DataFrame
popular_df = pickle.load(open('popular.pkl', 'rb'))

@app.route('/', methods=['GET'])
def get_popular_books():
    data = []
    for i in range(len(popular_df)):
        data.append({
            "book-name": popular_df.iloc[i]['Book-Title'],
            "author": popular_df.iloc[i]['Book-Author'],
            "image": popular_df.iloc[i]['Image-URL-M'],
            "num-rating": int(popular_df.iloc[i]['Num-Rating']),
            "avg-rating": float(popular_df.iloc[i]['Avg-Rating'])
        })
    return jsonify(data)

@app.route('/reco', methods=['GET'])
def recommend_ui():
    data = []
    
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)

