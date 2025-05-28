from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_mail import Mail, Message
import pickle
import pandas as pd

app = Flask(__name__)
CORS(app)


# Configure Flask-Mail
app.config.update(
    MAIL_SERVER='smtp.gmail.com',
    MAIL_PORT=587,
    MAIL_USE_TLS=True,
    MAIL_USERNAME='akumari252003@gmail.com',       # Replace with your Gmail
    MAIL_PASSWORD='cabm qfsp okgw ieuz'           # Use an App Password (NOT your Gmail password)
)

mail = Mail(app)

@app.route('/send_email', methods=['POST'])
def send_email():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    phone = data.get('phone')
    message = data.get('message')

    msg = Message(
        subject=f'New Contact Form Submission from {name}',
        sender=app.config['MAIL_USERNAME'],
        recipients=['akumari252003@gmail.com'],  # Your receiving email
        body=f"""
Name: {name}
Email: {email}
Phone: {phone}
Message:
{message}
"""
    )
    mail.send(msg)
    return jsonify({'status': 'success'}), 200

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
