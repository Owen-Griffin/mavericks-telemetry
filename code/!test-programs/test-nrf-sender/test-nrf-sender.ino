#include <SPI.h>
#include <RF24.h>

// Define nRF24L01+ connections
#define CE_PIN 26
#define CSN_PIN 25

RF24 radio(CE_PIN, CSN_PIN);

const byte address[6] = "00001"; // Address for communication

const int radioChannel = 43;

void setup() {
    Serial.begin(9600);
    if (!radio.begin()) {
        Serial.println("nRF24L01+ initialization failed!");
        while (1); // Halt if initialization fails
    }
    radio.openWritingPipe(address);
    radio.setPALevel(RF24_PA_LOW); // Low Power Level to start
    radio.stopListening(); // Set to Transmit mode
    Serial.println("nRF24L01+ ready!");
    radio.setChannel(radioChannel);
    Serial.print("INIT RadioChannelSetTo");
    Serial.println(String(radioChannel));
}

void loop() {
    const char text[] = "Hello, world!";
    bool success = radio.write(&text, sizeof(text));
    if (success) {
        Serial.println("Message sent!");
    } else {
        Serial.println("Transmission failed.");
    }
    delay(1000);
}
