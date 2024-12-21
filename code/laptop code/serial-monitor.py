import serial
import time

# Replace 'COM3' with your serial port, and set BAD rate
ser = serial.Serial("COM3", 9600, timeout=1)

time.sleep(2)  # Give some time for the connection to establish

try:
    while True:
        # Read the incoming data from the serial port
        if ser.in_waiting > 0:
            line = ser.readline().decode("utf-8").rstrip()
            print(line)
except KeyboardInterrupt:
    print("Serial monitoring stopped.")
finally:
    ser.close()
