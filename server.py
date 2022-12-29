
import json
from flask import Flask
from speech import *

import os
from flask import Flask, render_template, request, url_for, redirect
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.declarative import DeclarativeMeta

from sqlalchemy.sql import func

basedir = os.path.abspath(os.path.dirname(__file__))
app = Flask(__name__)


app.config['SQLALCHEMY_DATABASE_URI'] =\
    'sqlite:///' + os.path.join(basedir, 'database.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)


class PathCommands(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    command = db.Column(db.String(100), nullable=False)
    path = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.now())

    def __repr__(self):
        return f"['id':{self.id},'command':{self.command},'path':{self.path}]"


class AlchemyEncoder(json.JSONEncoder):

    def default(self, obj):
        if isinstance(obj.__class__, DeclarativeMeta):
            # an SQLAlchemy class
            fields = {}
            for field in [x for x in dir(obj) if not x.startswith('_') and x != 'metadata']:
                data = obj.__getattribute__(field)
                try:
                    # this will fail on non-encodable values, like other classes
                    json.dumps(data)
                    fields[field] = data
                except TypeError:
                    fields[field] = None
        # a json-encodable dict
            return fields

        return json.JSONEncoder.default(self, obj)


@app.route("/")
def hello():
    commands = PathCommands.query.all()
    serialized_list = json.dumps(commands, cls=AlchemyEncoder)
    command_confirmation = speak(serialized_list)
    return json.dumps(command_confirmation)


@app.route("/create")
def create():
    #     command = 'League of Legends'
    #     path = 'C:\Riot Games\Riot Client\RiotClientServices.exe'
    #     path_command = PathCommands(
    #         command=command,
    #         path=path
    #     )
    #     db.session.add(path_command)
    #     db.session.commit()
    #     return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}
    return json.dumps({'sucess': "under construction"}), 200, {'ContentType': 'application/json'}


@app.route("/delete/<command_id>")
def delete(command_id):
    command_id = command_id
    record = PathCommands.query.filter_by(id=command_id).first()
    if record:
        PathCommands.query.filter_by(id=command_id).delete()
        db.session.commit()
        return json.dumps({"message": "deleted " + command_id})
    else:
        return json.dumps({"message": "No record found"})


@app.route("/records")
def get_records():
    commands = PathCommands.query.all()
    serialized_list = json.dumps(commands, cls=AlchemyEncoder)
    return json.dumps(serialized_list)


@app.route('/handle_data', methods=['POST'])
def handle_data():
    data = request.json
    command = data["command_name"]
    path = data["path"]
    path_command = PathCommands(
        command=command,
        path=path)
    db.session.add(path_command)
    db.session.commit()
    return json.dumps({"message": "data handled"})


if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5000)
