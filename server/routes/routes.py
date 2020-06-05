import json
from flask import Flask, Response
import data.db as db

app = Flask(__name__)


@app.route('/matchups')
@app.route('/matchups/<user>')
def post_match_ups(user=None):
    """
    post all match ups for user 'user'
    example url extension: '/matchups/atamargo@ufl.edu'
    """
    match_ups = db.get_all_match_ups(user)
    serializable_match_ups = []
    for match_up in match_ups:
        serializable_match_ups.append(match_up.dict())
    response = Response(json.dumps(serializable_match_ups))
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response


if __name__ == "__main__":
    app.run()
