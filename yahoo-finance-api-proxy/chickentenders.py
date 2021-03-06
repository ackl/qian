from yahooquery import Ticker
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def default():
    return jsonify({ "message": "This is not the droid you're looking for" })

@app.route("/hi/")
def hi():
    return "Hi"

@app.route("/stock/")
def stock():
    return jsonify({ "message": "Missing symbol to lookup" }), 400

@app.route("/stock/<symbol>/")
def test(symbol):
    ticker = Ticker(symbol)

    data = ticker.all_modules[symbol]

    if type(data) is str:
        return jsonify({ "message": data }), 400
    else:
        return jsonify(data)

@app.route("/stock/<symbol>/quote")
def quote(symbol):
    ticker = Ticker(symbol)

    data = ticker.price[symbol]

    if type(data) is str:
        return jsonify({ "message": data }), 400
    else:
        return jsonify(data)

@app.route("/stock/<symbol>/history")
def history(symbol):
    ticker = Ticker(symbol)

    df = ticker.history()
    data = df.to_dict('records')
    dates = [i[1] for i in df.index]

    for i, x in enumerate(data):
        x['date'] = dates[i]

    return jsonify(data)

@app.route("/stock/<symbol>/history/<period>")
def history_with_period(symbol, period):
    ticker = Ticker(symbol)

    df = ticker.history(period)
    data = df.to_dict('records')
    dates = [i[1] for i in df.index]

    for i, x in enumerate(data):
        x['date'] = dates[i]

    return jsonify(data)

if __name__ == "__main__":
    app.run()
