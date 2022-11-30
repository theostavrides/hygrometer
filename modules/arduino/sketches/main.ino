#include "DHT.h"
#include "ArduinoJson.h"
#define DHTPIN 2     // Digital pin connected to the DHT sensor
#define DHTTYPE DHT22   // DHT 22  (AM2302), AM2321

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(9600);
  dht.begin();
}

void loop() {
  delay(360000); // Once per 6 min

  // Reading temperature or humidity takes about 250 milliseconds!
  // Sensor readings may also be up to 2 seconds 'old' (its a very slow sensor)
  float h = dht.readHumidity();
  // Read temperature as Celsius (the default)
  float t = dht.readTemperature();
  // Read temperature as Fahrenheit (isFahrenheit = true)
  float f = dht.readTemperature(true);

  // Check if any reads failed and exit early (to try again).
  if (isnan(h) || isnan(t) || isnan(f)) {
    Serial.println(F("Failed to read from DHT sensor!"));
    return;
  }
  
  DynamicJsonDocument doc(1024);
  doc["type"] = "TEMPERTURE_HUMUDITY_MEASUREMENT";
  doc["sensor"] = "AM2302_DHT22";
  doc["temperature"] = t;
  doc["humidity"] = h;
  serializeJson(doc, Serial);
  Serial.print("\n");
}