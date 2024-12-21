#include <Wire.h>
#include <LiquidCrystal_I2C.h>

// for a 20x4 lcd
LiquidCrystal_I2C lcd(0x27, 20, 4);

void setup() {
  Serial.begin(9600);
  // Initialize the LCD
  lcd.begin(20, 4);  // set dims
  lcd.backlight();   // enable backlight

  // print test msg
  lcd.setCursor(0, 0);
  lcd.print("qwertyuiopasdfghjklz");
  lcd.setCursor(0, 1);
  lcd.print("QWERTYUIOPASDFGHJKLZ");
  lcd.setCursor(0, 2);
  lcd.print("qwertyuiopasdfghjklz");
  lcd.setCursor(0, 3);
  lcd.print("QWERTYUIOPASDFGHJKLZ!");

  Serial.println("inited");
}

void loop() {
  lcd.setCursor(0, 0);
  lcd.print("qwertyuiopasdfghjklz");
  lcd.setCursor(0, 1);
  lcd.print("QWERTYUIOPASDFGHJKLZ");
  lcd.setCursor(0, 2);
  lcd.print("qwertyuiopasdfghjklz");
  lcd.setCursor(0, 3);
  lcd.print("QWERTYUIOPASDFGHJKLZ!");
}
