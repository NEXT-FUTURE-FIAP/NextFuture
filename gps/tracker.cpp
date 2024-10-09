#include <HardwareSerial.h>
#include <TinyGPSPlus.h>
#include <DHT.h>  // Inclua a biblioteca DHT
#include <WiFi.h>
#include <PubSubClient.h>

const int RXPin = 16;   // Pino RX do GPS
const int TXPin = 17;   // Pino TX do GPS
const int DHTPin = 18;  // Pino do sensor DHT
const uint32_t GPSBaud = 9600;
TinyGPSPlus gps;

WiFiClient espClient;
PubSubClient client(espClient);
const char* mqtt_server = "id do servidor";
const char* ID_MQTT = "next_gps";
const char* TOPICO_SUBSCRIBE = "/TEF/next_gps/cmd";

HardwareSerial ss(1);
unsigned long previousMillis = 0; // armazena o tempo anterior
const long interval = 5000; // intervalo de 5 segundos

// Defina o tipo de sensor DHT que você está usando (DHT11, DHT22, etc.)
#define DHTTYPE DHT11
DHT dht(DHTPin, DHTTYPE);




void reconnectMQTT() {
    while (!client.connected()) {
        Serial.print("* Tentando se conectar ao Broker MQTT: ");
        Serial.println(mqtt_server);
        if (client.connect(ID_MQTT)) {
            Serial.println("Conectado com sucesso ao broker MQTT!");
            client.subscribe(TOPICO_SUBSCRIBE);
        } else {
            Serial.println("Falha ao reconectar no broker.");
            Serial.println("Haverá nova tentativa de conexão em 2s");
            delay(2000);
        }
    }
}



void setup() {
  Serial.begin(115200);
  delay(1000);
  Serial.println("Inicializado");
  
  ss.begin(GPSBaud, SERIAL_8N1, RXPin, TXPin);
  Serial.println("Inicializando o módulo GPS...");
  delay(2000); // Espera 2 segundos

  // Conectar ao Wi-Fi
  WiFi.begin("nome da rede wifi", "senha do wifi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Conectando ao Wi-Fi...");
  }
  Serial.println("Conectado ao Wi-Fi");

  // Configurar MQTT apenas após o Wi-Fi estar conectado
  client.setServer(mqtt_server, 1883);
  reconnectMQTT(); // Tenta conectar ao MQTT

  dht.begin(); // Inicializa o sensor DHT
}

void loop() {
  // Captura dados do GPS
  while (ss.available()) {
    char c = ss.read();
    gps.encode(c); // Codifica cada caractere para atualizar os dados do GPS
  }

  unsigned long currentMillis = millis(); // Captura o tempo atual

  // Envia a localização a cada 5 segundos
  if (currentMillis - previousMillis >= interval) {
    previousMillis = currentMillis; // Armazena o tempo atual

    // Verifica se a localização está disponível
    if (gps.location.isUpdated()) {
      Serial.print("Latitude: ");
      Serial.print(gps.location.lat(), 6);
      Serial.print(" Longitude: ");
      Serial.print(gps.location.lng(), 6);
    } else {
      Serial.println("Localização não atualizada");
    }

    Serial.print(" Velocidade: ");
    Serial.print(gps.speed.kmph());
    Serial.println(" km/h");
    Serial.print(" Satélites: ");
    Serial.println(gps.satellites.value());
    Serial.print(" Precisão HDOP: ");
    Serial.println(gps.hdop.value());

    // Lê a temperatura e a umidade do sensor DHT
    float h = dht.readHumidity();    // Lê a umidade
    float t = dht.readTemperature(); // Lê a temperatura em Celsius

    // Verifica se a leitura falhou
    if (isnan(h) || isnan(t)) {
      Serial.println("Falha na leitura do DHT!");
    } else {
      Serial.print("Temperatura: ");
      Serial.print(t);
      Serial.print(" °C, Umidade: ");
      Serial.print(h);
      Serial.println(" %");
    }
    if (!client.connected())
        reconnectMQTT();
    client.publish("/TEF/next_gps/attrs/lat", String(gps.location.lat(), 6).c_str());
    client.publish("/TEF/next_gps/attrs/long", String(gps.location.lng(), 6).c_str());
    client.publish("/TEF/next_gps/attrs/spe", String(gps.speed.kmph()).c_str());
    client.publish("/TEF/next_gps/attrs/t", String(t).c_str());
    client.publish("/TEF/next_gps/attrs/u", String(h).c_str());

  }
}