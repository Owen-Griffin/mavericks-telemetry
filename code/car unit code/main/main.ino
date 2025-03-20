// COPYRIGHT 2025 WESTMOUNT MAVERICKS EV RACE TEAM
// USE UNDER CREATIVE COMMONS ATTRIBUTION-NONCOMMERCIAL-SHAREALIKE 4.0 INTERNATIONAL LICENCE TERMS
// FOUND AT HTTPS://CREATIVECOMMONS.ORG/LICENCES/BY-NC-SA/4.0/
// WRITTEN BY OWEN GRIFFIN
// 2025 TELEMETRY CODE

const int serial_baud = 57600;
#include <Wire.h>
#include <RF24.h>
#include <Adafruit_MPU6050.h>
#include <Adafruit_ADS1X15.h>
#include <LiquidCrystal_I2C.h>

LiquidCrystal_I2C lcd(0x27, 20, 4);

#define CE_PIN 26
#define CSN_PIN 25
RF24 radio(CE_PIN, CSN_PIN);
const byte address[6] = "00001"; // Address for communication
const int radioChannel = 43; // radio channel

Adafruit_ADS1115 ads;
Adafruit_MPU6050 mpu;

// config wheel rpm sensor pin
#define WHEEL_RPM_SENSOR_PIN 12
const int wheelDiameter = 16;

struct xyzStruct {
  float x;
  float y;
  float z;
};
struct MPUReadingStruct {
  xyzStruct acceleration;
  xyzStruct gyro;
  float temp;
};

struct ADCReadingSingleStruct {
  float ain;
  float v;
};
struct ADCReadingStruct {
  ADCReadingSingleStruct A0;
  ADCReadingSingleStruct A1;
  ADCReadingSingleStruct A2;
  ADCReadingSingleStruct A3;
};

void setup() {
  // begin serial and i2c
  Serial.begin(serial_baud);
  Serial.println("INIT SerialReady");
  Wire.begin();

  // init lcd
  lcd.begin(20, 4);  // set lcd dimensions
  lcd.backlight();   // enable backlight
  lcd.setCursor(0,0);
  lcd.print("Initalizing...");
  Serial.println("INIT ScreenReady");

  // init mpu
  mpu.begin();
  mpu.setAccelerometerRange(MPU6050_RANGE_2_G);
  mpu.setGyroRange(MPU6050_RANGE_250_DEG);
  mpu.setFilterBandwidth(MPU6050_BAND_21_HZ);
  Serial.println("INIT MPUReady");

  // init ads
  ads.begin();

  // init wheel rpm sensor
  pinMode(WHEEL_RPM_SENSOR_PIN, INPUT);
  
  // init and config radio
  radio.begin();
  radio.openWritingPipe(address);
  radio.setPALevel(RF24_PA_HIGH); // set power level (MIN, LOW, HIGH, MAX)
  radio.stopListening(); // Set to Transmit mode
  radio.setChannel(radioChannel);
  Serial.print("INIT RadioChannelSetTo");
  Serial.println(String(radioChannel));
  Serial.println("INIT TransmitterReady");
}

ADCReadingStruct get_adc_voltages() {
  ADCReadingStruct result;

  result.A0.ain = ads.readADC_SingleEnded(0);
  result.A1.ain = ads.readADC_SingleEnded(1);
  result.A2.ain = ads.readADC_SingleEnded(2);
  result.A3.ain = ads.readADC_SingleEnded(3);
  result.A0.v = ads.computeVolts(result.A0.ain);
  result.A1.v = ads.computeVolts(result.A1.ain);
  result.A2.v = ads.computeVolts(result.A2.ain);
  result.A3.v = ads.computeVolts(result.A3.ain);

  Serial.print("AIN0: "); Serial.print(result.A0.ain); Serial.print("  "); Serial.print(result.A0.v); Serial.println("V");
  Serial.print("AIN1: "); Serial.print(result.A1.ain); Serial.print("  "); Serial.print(result.A1.v); Serial.println("V");
  Serial.print("AIN2: "); Serial.print(result.A2.ain); Serial.print("  "); Serial.print(result.A2.v); Serial.println("V");
  Serial.print("AIN3: "); Serial.print(result.A3.ain); Serial.print("  "); Serial.print(result.A3.v); Serial.println("V");
  
  return result;
}

float get_speed_from_rpm(float rpm) {
  return rpm * PI * wheelDiameter * 0.06;
}

void send_data(String string) {
  // Convert the String object to a C-style string (const char*)
  const char* text = string.c_str();

  // Try sending the message over the radio
  bool success = radio.write(text, strlen(text) + 1);  // +1 for the null-terminator

  if (success) {
    Serial.print("Message sent: ");
  } else {
    Serial.print("Transmission failed: ");
  }
  Serial.println(string);
}

void mainLoop() {
  while(true) {
    sensors_event_t a, g, temp;
    mpu.getEvent(&a, &g, &temp);
    Serial.print("Acceleration X: "); Serial.print(a.acceleration.x); Serial.print(", Y: "); Serial.print(a.acceleration.y); Serial.print(", Z: "); Serial.print(a.acceleration.z); Serial.println(" m/s^2");
    Serial.print("Rotation X: "); Serial.print(g.gyro.x); Serial.print(", Y: "); Serial.print(g.gyro.y); Serial.print(", Z: "); Serial.print(g.gyro.z); Serial.println(" rad/s");
    Serial.print("Temperature: "); Serial.print(temp.temperature); Serial.println(" degC");

    ADCReadingStruct ADCReading = get_adc_voltages();
      
    delay(1000);
  }
}

void loop() {
  lcd.setCursor(0,0);
  lcd.print("Initalized!");
  delay(1000);
  lcd.clear();
  mainLoop();
}
