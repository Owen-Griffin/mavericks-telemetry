from flask import Flask, render_template

app = Flask(__name__)


wheelRPM = 0
speed = 0
batteryVoltage = 0
motorVoltage = 0
shuntAmperage = 0


@app.route('/')
@app.route('/index')
def index():
    return render_template('main.html', wheelRPM = wheelRPM, speed = speed, batteryVoltage = batteryVoltage, motorVoltage = motorVoltage, shuntAmperage = shuntAmperage)

if __name__ == '__main__':
   app.run(debug = True)