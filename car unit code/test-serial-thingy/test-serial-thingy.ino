void setup() {
  Serial.begin(9600);
}

void loop() {
  Serial.println("working");
  delay(500);
  Serial.println("RPM " + String(random(1, 101)));
  delay(1000);
  Serial.println("BATTV " + String(random(10, 27)));
  delay(500);
  Serial.println("MOTV " + String(random(10, 27)));
  delay(500);
}
