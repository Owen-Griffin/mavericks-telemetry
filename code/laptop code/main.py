from flask import Flask, render_template
from flask_socketio import SocketIO
import time
import serial
import threading
import logging
from datetime import datetime
import random

# init application and websockets
app = Flask(__name__)
socketio = SocketIO(app)

# define sensor data variables
wheelRPM = 0
speed = 0
batteryVoltage = 0
motorVoltage = 0
shuntAmperage = 0

# init serial information
SERIAL_PORT = "COM3" # RUN "Get-WMIObject Win32_SerialPort | Format-Table Name,DeviceID,Description" in powershell to get port
BAUDRATE = 57600

# init logging
current_time = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")  # name file
logging.basicConfig(
    filename=f'./code/laptop code/logs/log_{current_time}.log',
    filemode='a',
    format='%(asctime)s - %(levelname)s - %(message)s', # formatting
    level=logging.INFO
)


# function (for thread) that reads from the serial port and prints to terminal
def read_serial():
    try: # try to open serial port
        ser = serial.Serial(SERIAL_PORT, BAUDRATE, timeout=1)
        print(f"Connected to {SERIAL_PORT} at {BAUDRATE} baud.")
        logging.info(f"Connected to {SERIAL_PORT} at {BAUDRATE} baud.")

        while True:
            if ser.in_waiting > 0:
                rawLine = ser.readline()
                print(f'RAW LINE: {rawLine}')
                line = rawLine.decode("latin-1", errors="ignore").rstrip()
                print(f"[SERIAL] {line}")
                process_serial_input(line)
            time.sleep(0.1)

    except serial.SerialException as e: # if it fails, log why it failed
        print(f"Error opening serial port: {e}")
        logging.CRITICAL(f"FAILED TO OPEN SERIAL PORT {e}")

# sets value to reading based on serial line
def process_serial_input(serialLine):
    global wheelRPM
    global speed
    global batteryVoltage
    global motorVoltage
    global shuntAmperage

    dataCode = serialLine.split()[0]
    match dataCode:
        case 'RPM':
            print('RPM reading detected')
            logging.info(f'RPM reading detected: "{serialLine}"')
            wheelRPM = dataCode.split()[1]
        case 'SPD':
            print('Speed reading detected')
            logging.info(f'Speed reading detected: "{serialLine}"')
            speed = dataCode.split()[1]
        case 'BATTV':
            print('Battery voltage reading detected')
            logging.info(f'Battery voltage reading detected: "{serialLine}"')
            batteryVoltage = dataCode.split()[1]
        case 'MOTV':
            print('Motor voltage reading detected')
            logging.info(f'Motor voltage reading detected: "{serialLine}"')
            motorVoltage = dataCode.split()[1]
        case 'SHAMP':
            print('Shunt amperage reading detected')
            logging.info(f'Shunt amperage reading detected: "{serialLine}"')
            shuntAmperage = dataCode.split()[1]
        case _:
            print('Unknown input detected!')
            logging.warning(f'Unknown input detected: "{serialLine}"')
    
# render homepage to user
@app.route("/")
@app.route("/index")
def index():
    return render_template(
        "main.html",
        wheelRPM=wheelRPM,
        speed=speed,
        batteryVoltage=batteryVoltage,
        motorVoltage=motorVoltage,
        shuntAmperage=shuntAmperage,
    )

# sends readings to frontend via websocket
def websocket_send_data():
    while True:
        # temporary random values
        # TODO: remove this
        wheelRPM = random.randint(100, 300)
        speed = random.randint(10, 30)
        batteryVoltage = random.randint(10, 26)
        motorVoltage = random.randint(10, 26)
        shuntAmperage = random.randint(0, 50)
        socketio.emit(
            "updateData",
            {
                "time": time.time(),
                "wheelRPM": wheelRPM,
                "speed": speed,
                "batteryVoltage": batteryVoltage,
                "motorVoltage": motorVoltage,
                "shuntAmperage": shuntAmperage,
            },
        )
        socketio.sleep(1)


if __name__ == "__main__":
    logging.info('Logging started.')

    # Begin serial port monitoring
    serialReaderThread = threading.Thread(target=read_serial)
    serialReaderThread.daemon = True  # exit thread when program is closed
    serialReaderThread.start()
    logging.info('Serial reader initiated.')

    # init flask with websockets application
    socketio.start_background_task(websocket_send_data)
    socketio.run(app, debug=True)
    logging.info('Flask/websocket application began.')