from flask import Flask, render_template, request, url_for, flash, redirect, jsonify
from urllib.parse import unquote
from preprocess import Preprocess as prep
import requests
import json


app = Flask(__name__)
app.config['SECRET_KEY'] = 'ChatbotApp'

@app.route('/')
def index():
    return render_template('index.html')


@app.route("/chat", methods=["GET","POST"])
def chat():
    if request.method == "POST":
        sentence = request.form['message']
        sentence = unquote(sentence)
        print(sentence)
        preproc_mess = prep.preproc(sentence)
        print(preproc_mess)
        return json.dumps(preproc_mess[0].tolist())

@app.route('/api', methods=['GET', 'POST'])
def api():
   if request.method == 'POST':
        tag = request.form['mydata']
        url = f'http://127.0.0.1:8000/api/target/apprenant/{tag}'
        response = requests.get(url)
        mess=response.json()
        print(response)
        return mess["data"]

if __name__ == '__main__':
    app.run(debug = True, port=5000)