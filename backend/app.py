#Run these commands in a terminal to start flask app in this directory
"""set FLASK_ENV="development" FLASK_DEBUG=1
(reloads flask automatically when changes are made to this file)"""
#set FLASK_APP=app.py
#flask run

from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson.json_util import dumps

app = Flask(__name__)
CORS(app)

# Set up connection to MongoDB
client = MongoClient("mongodb+srv://abhay:abhay123@reactflask.sbhxzds.mongodb.net/?retryWrites=true&w=majority")
db = client['reactflaskdb']
login_collection = db['idpwd']
troubleshooting_collection = db['Troubleshooting']

@app.route('/login', methods=['POST'])
def login():
    username = request.json['username']
    password = request.json['password']
    user = login_collection.find_one({"username": username, "password": password})
    if user:
        # Convert MongoDB document to JSON and return
        return dumps({'success': True})
    else:
        return dumps({'success': False})

@app.route('/submit-data', methods=['POST'])
def submit_data():
    data = request.json
    troubleshooting_collection.insert_one(data)
    return jsonify({'success': True})
