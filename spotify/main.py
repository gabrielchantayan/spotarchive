import json
from flask import Flask, jsonify, request


app = Flask(__name__)


@app.route('/employees', methods=['GET'])
def get_employees():
 return jsonify(employees)


if __name__ == '__main__':
   app.run(port=22303)