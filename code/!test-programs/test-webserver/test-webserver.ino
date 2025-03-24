#include <WiFi.h>

const char* ssid = "ESP23 Test Network";
const char* password = "123";


void setup() {
  Serial.begin(115200);

  Serial.print("Setting AP (Access Point)…");
  WiFi.softAP(ssid, password);

  IPAddress IP = WiFi.softAPIP();
  Serial.print("AP IP address: ");
  Serial.println(IP);
}

void loop(){
  //
}
