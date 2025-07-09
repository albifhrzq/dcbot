# Setup Discord Bot

## 1. Buat Discord Application
1. Buka Discord Developer Portal (https://discord.com/developers/applications)
2. Klik "New Application"
3. Beri nama aplikasi (contoh: "Finance Bot")
4. Klik "Create"

## 2. Setup Bot
1. Pergi ke tab "Bot"
2. Klik "Add Bot"
3. Copy "Token" - ini akan digunakan sebagai `DISCORD_TOKEN`
4. Aktifkan "Message Content Intent" jika diperlukan
5. Nonaktifkan "Public Bot" jika tidak ingin bot bisa diundang oleh orang lain

## 3. Setup OAuth2
1. Pergi ke tab "OAuth2" > "General"
2. Copy "Client ID" - ini akan digunakan sebagai `CLIENT_ID`
3. Pergi ke "OAuth2" > "URL Generator"
4. Pilih scopes:
   - `bot`
   - `applications.commands`
5. Pilih bot permissions:
   - Send Messages
   - Use Slash Commands
   - Read Message History
   - Embed Links
6. Copy generated URL dan buka untuk mengundang bot ke server

## 4. Environment Variables
Tambahkan ke file `.env`:
```
DISCORD_TOKEN=your_bot_token_here
CLIENT_ID=your_client_id_here
```

## 5. Deploy Slash Commands
Setelah setup environment variables, jalankan:
```bash
node deploy-commands.js
```

## 6. Permissions yang Diperlukan
Bot memerlukan permissions berikut di Discord server:
- Send Messages
- Use Slash Commands
- Read Message History
- Embed Links
- View Channels

## 7. Testing
Setelah bot online, test dengan commands:
- `/catat` - untuk mencatat transaksi
- `/saldo` - untuk melihat saldo
- `/riwayat` - untuk melihat riwayat
- `/hapus` - untuk menghapus transaksi

## Notes:
- Bot akan merespons dengan embed yang menarik
- Setiap user memiliki data terpisah berdasarkan Discord User ID
- Data disimpan di Google Sheets melalui n8n automation
