from flask import Flask, jsonify, request
from flask_cors import CORS
import pickle
import pandas as pd

app = Flask(__name__)
CORS(app)

# Load the data
popular_df = pickle.load(open('popular.pkl', 'rb'))
pt = pickle.load(open('pt.pkl', 'rb'))  # pivot table of books
books = pickle.load(open('books.pkl', 'rb'))
similarity_score = pickle.load(open('similarity_score.pkl', 'rb'))

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


@app.route('/recommend_books', methods=['POST'])
def recommend():
    user_input = request.json.get('user_input')

    if user_input not in pt.index:
        return jsonify([])

    index = pt.index.get_loc(user_input)
    similar_items = sorted(
        list(enumerate(similarity_score[index])),
        key=lambda x: x[1],
        reverse=True
    )[1:6]

    data = []
    for i in similar_items:
        book_title = pt.index[i[0]]
        temp_df = books[books['Book-Title'] == book_title].drop_duplicates('Book-Title')
        if not temp_df.empty:
            data.append({
                "book-name": temp_df['Book-Title'].values[0],
                "author": temp_df['Book-Author'].values[0],
                "image": temp_df['Image-URL-M'].values[0]
            })

    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
