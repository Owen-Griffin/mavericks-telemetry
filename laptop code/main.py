from flask import Flask, render_template

app = Flask(__name__)


wheelRPM = 0
speed = 0


@app.route('/')
@app.route('/index')
def index():
    return render_template('main.html', wheelRPM = wheelRPM, speed = speed)

if __name__ == '__main__':
   app.run(debug = True)