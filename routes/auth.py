from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token, jwt_required, unset_jwt_cookies
from models.user import User
from werkzeug.security import generate_password_hash, check_password_hash

api = Blueprint('api_auth', __name__)

@api.route('/login', methods=['POST'])
def login():
    
    username = request.json.get('username')
    password = request.json.get('password')
    
    userFound = User.query.filter_by(username=username).first()
    
    if not userFound: return jsonify({ "message": "User not found"}), 401
    
    if not check_password_hash(userFound.password, password):
        return jsonify({ "message": "user/password is incorrect"}), 401
    
    access_token = create_access_token(identity=userFound.id)
    data = {
        "access_token": access_token,
        "user": userFound.serialize()
    }
    return jsonify(data), 200

@api.route('/register', methods=['POST'])
def register():

    username = request.json.get('username')
    password = request.json.get('password')
    password = generate_password_hash(password)
    
    userFound = User.query.filter_by(username=username).first()
    
    if userFound:
        return jsonify({ "message": "username already in use"}), 409

    userFound = User()
            
    userFound.username = username
    userFound.password = password

    userFound.save()
        
    data = {
        "user": userFound.serialize()
    }

    return jsonify(data), 200    