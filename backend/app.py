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

case_id = None

@app.route('/submit-data', methods=['POST'])
def submit_data():
    global case_id
    data = request.json
    case_id = data['case']
    troubleshooting_collection.insert_one(data)
    return jsonify({'success': True})

@app.route('/submit-response', methods=['POST'])
def submit_response():
    response_data = request.json
    global case_id
    question = response_data['question']
    response = response_data['response']

    # Find the document with the matching case ID
    document = troubleshooting_collection.find_one({'case': case_id})

    if document:
        # Update the document with the new question and response pair
        document['questions_responses'] = document.get('questions_responses', {})
        document['questions_responses'][question] = response
        troubleshooting_collection.update_one({'case': case_id}, {'$set': {'questions_responses': document['questions_responses']}})
        return jsonify({'success': True})
    else:
        return jsonify({'success': False, 'message': 'No document found with the provided case ID'})

