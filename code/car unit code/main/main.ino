// COPYRIGHT 2025 WESTMOUNT MAVERICKS EV RACE TEAM
// USE UNDER CREATIVE COMMONS ATTRIBUTION-NONCOMMERCIAL-SHAREALIKE 4.0 INTERNATIONAL LICENCE TERMS
// FOUND AT HTTPS://CREATIVECOMMONS.ORG/LICENCES/BY-NC-SA/4.0/
// WRITTEN BY OWEN GRIFFIN
// 2025 TELEMETRY CODE



const int serial_baud = 57600;



// Include proper libraries
#include <Wire.h>
#include <RF24.h>
#include <Adafruit_MPU6050.h>
#include <Adafruit_ADS1X15.h>
#include <LiquidCrystal_I2C.h>



// define ADC, Gyroscope, LCD, Radio
Adafruit_ADS1115 ads;
const float voltageDividerFactor = 8.33; // R2/(R1+R2), 11/(1.5+11), 8.33
const float shuntVoltageDropMV = 50;

Adafruit_MPU6050 mpu;
LiquidCrystal_I2C lcd(0x27, 20, 4);

#define CE_PIN 26
#define CSN_PIN 25
RF24 radio(CE_PIN, CSN_PIN);
const byte address[6] = "00001"; // Address for communication
const int radioChannel = 43; // radio channel



// config wheel RPM sensor
#define WHEEL_RPM_SENSOR_PIN 12
const int wheelDiameter = 16;



// define proper structures
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
struct ADCReadingStruct {
  float battery0;
  float motor1;
  float shunt2;
};



// startup code
void setup() {
  // begin serial and i2c
  Serial.begin(serial_baud);
  Serial.println("INIT SerialReady");
  Wire.begin();
  Serial.println("INIT I2CReady");

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
  lcd.print(".");
  Serial.println("INIT MPUReady");

  // init ads
  ads.begin();
  lcd.print(".");
  Serial.println("INIT ACDReady");

  // init wheel rpm sensor
  pinMode(WHEEL_RPM_SENSOR_PIN, INPUT);
  lcd.print(".");
  Serial.println("INIT RPMSensorReady");
  
  // init and config radio
  radio.begin();
  radio.openWritingPipe(address);
  radio.setPALevel(RF24_PA_LOW); // set power level (MIN, LOW, HIGH, MAX)
  radio.stopListening(); // Set to Transmit mode
  radio.setChannel(radioChannel);
  lcd.print(".");
  Serial.println("INIT TransmitterReady");
  lcd.setCursor(0,1);
  lcd.print("Channel: ");
  lcd.print(String(radioChannel));
  Serial.print("INIT RadioChannelSetTo");
  Serial.println(String(radioChannel));

  lcd.setCursor(0,2);
  lcd.print("INIT COMPLETE");

  delay(5000);

  lcd.clear();
}

// define function to read ADC voltages
ADCReadingStruct get_adc_voltages() {
  ADCReadingStruct result;

  int adc0 = ads.readADC_SingleEnded(0);
  int adc1 = ads.readADC_SingleEnded(1);
  int adc2 = ads.readADC_SingleEnded(2);
  int adc3 = ads.readADC_SingleEnded(3);

  result.battery0 = voltageDividerFactor * ads.computeVolts(adc0);
  result.motor1 = voltageDividerFactor * ads.computeVolts(adc1);
  result.shunt2 = (1000 * ads.computeVolts(adc2)) / shuntVoltageDropMV;

  Serial.print("AIN0: "); Serial.print(adc0); Serial.print("  "); Serial.print("AIN1: "); Serial.print(adc1); Serial.print("  "); Serial.print("AIN2: "); Serial.print(adc2); Serial.print("  "); Serial.print("AIN3: "); Serial.println(adc3);
  
  Serial.print("Battery: "); Serial.print(result.battery0); Serial.println("V"); 
  Serial.print("Motor: "); Serial.print(result.motor1); Serial.println("V");
  Serial.print("Shunt: "); Serial.print(result.shunt2); Serial.println("A");
  
  return result;
}

// define fuction to calculate speed from wheel RPM
float get_speed_from_rpm(float rpm) {
  return rpm * PI * wheelDiameter * 0.06;
}

// define function to send data via nRF
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

// define main code loop
void mainLoop() {
  while(true) {
    // get sensor readings
    sensors_event_t a, g, temp;
    mpu.getEvent(&a, &g, &temp);
    Serial.print("Acceleration X: "); Serial.print(a.acceleration.x); Serial.print(", Y: "); Serial.print(a.acceleration.y); Serial.print(", Z: "); Serial.print(a.acceleration.z); Serial.println(" m/s^2");
    Serial.print("Rotation X: "); Serial.print(g.gyro.x); Serial.print(", Y: "); Serial.print(g.gyro.y); Serial.print(", Z: "); Serial.print(g.gyro.z); Serial.println(" rad/s");
    Serial.print("Temperature: "); Serial.print(temp.temperature); Serial.println(" degC");

    ADCReadingStruct ADCReading = get_adc_voltages();

    // display data
    lcd.setCursor(0,0);
    lcd.print("Motor: ");
    lcd.print(String(ADCReading.motor1));
    lcd.print("V");

    lcd.setCursor(0,1);
    lcd.print("Draw: ");
    lcd.print(String(ADCReading.shunt2));
    lcd.print("A");

    lcd.setCursor(0,2);
    lcd.print("Battery: ");
    lcd.print(String(ADCReading.battery0));
    lcd.print("V");
    
    delay(10);
  }
}

void loop() {
  lcd.setCursor(0,0);
  lcd.print("Initalized!");
  delay(1000);
  lcd.clear();
  mainLoop();
}
