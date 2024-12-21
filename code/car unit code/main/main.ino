void setup() {
  Serial.begin(9600);
}

float get_speed_from_rpm(float rpm, float wheelDiameter) {
  return rpm * PI * wheelDiameter * 0.06;
}

void send_data(float wheelRPM, float vehichleSpeed, float batteryVoltage, float motorVoltage, float shuntAmperage) {
  String package = ("{wheelRPM: " + String(wheelRPM) + ", vehichleSpeed: " + String(vehichleSpeed) + ", batteryVoltage: " + String(batteryVoltage) + ", motorVoltage: " + String(motorVoltage) + ", shuntAmperage: " + String(shuntAmperage) + "}");
  Serial.print("Sending Packet Via RF:");
  Serial.println(package);
}

void mainLoop() {
  while(true) {
    // Finally, send the data before taking a break, and then do it again
    send_data();
    delay(1000);
  }
}

void loop() {
  mainLoop();
}
