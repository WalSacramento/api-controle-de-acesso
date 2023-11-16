#include <SPI.h>
#include <MFRC522.h>

// --- Mapeamento de Hardware ---
#define SS_PIN 10
#define RST_PIN 9
MFRC522 mfrc522(SS_PIN, RST_PIN); // Cria instância com MFRC522

// --- Variáveis Globais ---
char st[20];

void setup()
{
  Serial.begin(9600);

  SPI.begin(); // Inicia comunicação SPI bus
  mfrc522.PCD_Init();
}

void loop()
{
  if (Serial.available() > 0)
  {
    char comando = Serial.read();
    executarComando(comando);
  }

  if (!mfrc522.PICC_IsNewCardPresent())
  {
    return;
  }
  // Seleciona um dos cartões
  if (!mfrc522.PICC_ReadCardSerial())
  {
    return;
  }

  // Sua lógica do loop continua aqui
}

void executarComando(char comando)
{
  switch (comando)
  {
  case 'A':
    if (mfrc522.PICC_IsNewCardPresent() && mfrc522.PICC_ReadCardSerial())
    {
      for (byte i = 0; i < mfrc522.uid.size; i++)
      {
        if (i != 0)
        {
          Serial.print(" ");
        }
        if (mfrc522.uid.uidByte[i] < 0x10)
        {
          Serial.print("0");
        }
        Serial.print(mfrc522.uid.uidByte[i], HEX);
      }
    }
    break;

  case 'B':
    // Lógica para executar ação B
    Serial.println("Ação B executada");
    break;

    // Adicione mais casos conforme necessário
  }
}