from flask import Flask, render_template
app = Flask(__name__)

# two decorators, same function
@app.route('/')
@app.route('/index.html')
def index():
    return render_template('index.html', the_title='Tiger Home Page')

@app.route('/symbol.html')
def symbol():
    return render_template('symbol.html', the_title='Tiger As Symbol')

@app.route('/myth.html')
def myth():
    return render_template('myth.html', the_title='Tiger in Myth and Legend')
@app.route('/base.html')
def myth1():
    return render_template('base.html')

@app.route('/cards.html')
def myth2():
    return render_template('cards.html')

@app.route('/chart4.html')
def myth4():
    return render_template('chart4.html')
@app.route('/chart5.html')
def myth5():
    return render_template('chart5.html')
@app.route('/chart6.html')
def myth6():
    return render_template('chart6.html')
@app.route('/chart7.html')
def myth7():
    return render_template('chart7.html')

if __name__ == '__main__':
    app.run(debug=True)
