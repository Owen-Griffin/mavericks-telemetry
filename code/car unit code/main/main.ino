// import I2C, screen, and gryo/accel (mpu) libraries
#include <Wire.h>
#include <LiquidCrystal_I2C.h>
LiquidCrystal_I2C lcd(0x27, 20, 4); // define screen
#include <Adafruit_Sensor.h>
#include <Adafruit_MPU6050.h>
Adafruit_MPU6050 mpu;
#include <Adafruit_ADS1X15.h>
Adafruit_ADS1115 ads;

// import and config for nRF
#include <SPI.h>
#include <RF24.h>
#define CE_PIN 26
#define CSN_PIN 25
RF24 radio(CE_PIN, CSN_PIN);
const byte address[6] = "00001"; // Address for communication
const int radioChannel = 43; // radio channel

// config wheel rpm sensor pin
#define WHEEL_RPM_SENSOR_PIN 12

// config vehicle setup
const int wheelDiameter = 20; // set diameter of wheel with sensor

// init structs
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
  Serial.begin(57600);
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
  int16_t adc0, adc1, adc2, adc3;
  float volts0, volts1, volts2, volts3;
  adc0 = ads.readADC_SingleEnded(0);
  adc1 = ads.readADC_SingleEnded(1);
  adc2 = ads.readADC_SingleEnded(2);
  adc3 = ads.readADC_SingleEnded(3);
  volts0 = ads.computeVolts(adc0);
  volts1 = ads.computeVolts(adc1);
  volts2 = ads.computeVolts(adc2);
  volts3 = ads.computeVolts(adc3);
  Serial.print("AIN0: "); Serial.print(adc0); Serial.print("  "); Serial.print(volts0); Serial.println("V");
  Serial.print("AIN1: "); Serial.print(adc1); Serial.print("  "); Serial.print(volts1); Serial.println("V");
  Serial.print("AIN2: "); Serial.print(adc2); Serial.print("  "); Serial.print(volts2); Serial.println("V");
  Serial.print("AIN3: "); Serial.print(adc3); Serial.print("  "); Serial.print(volts3); Serial.println("V");
  
  ADCReadingStruct result;
  result.A0.ain = adc0;
  result.A1.ain = adc0;
  result.A2.ain = adc0;
  result.A3.ain = adc0;
  result.A0.v = volts0;
  result.A1.v = volts1;
  result.A2.v = volts2;
  result.A3.v = volts3;
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
  lcd.setCursor(0,0);
  lcd.print("Initalized!");
  delay(1000);
  lcd.clear();
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
  mainLoop();
}
