
const String version = "1.0.0";

#include <SPI.h>
#include <RF24.h>

#define CE_PIN 26
#define CSN_PIN 25

RF24 radio(CE_PIN, CSN_PIN);

const byte address[6] = "00001";

const int radioChannel = 43;

void setup() {
    Serial.begin(9600);
    if (!radio.begin()) {
        Serial.println("nRF24L01+ initialization failed!");
        while (1);
    }
    radio.openReadingPipe(1, address);
    radio.setPALevel(RF24_PA_LOW);
    radio.startListening();
    Serial.println("INIT ReceiverReady!");
    radio.setChannel(radioChannel);
    Serial.print("INIT RadioChannelSetTo");
    Serial.println(String(radioChannel));

    // configure pins for debug LED
    pinMode(5, OUTPUT);
    pinMode(17, OUTPUT);
    digitalWrite(5, HIGH);
    digitalWrite(17, LOW);
}

void loop() {
    if (radio.available()) {
        char text[32] = "";  // Buffer to hold incoming message
        radio.read(&text, sizeof(text));
        Serial.println(text); // print incoming line to serial
    }
}
