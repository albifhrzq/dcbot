# Panduan Instalasi Lengkap

## Langkah 1: Persiapan
1. Buat akun di:
   - Discord Developer Portal
   - Google Cloud Console
   - Railway.app
   - Buat Google Sheets untuk database

## Langkah 2: Setup Google Sheets
1. Ikuti panduan di `google-sheets-setup.md`
2. Catat GOOGLE_SHEET_ID yang didapat

## Langkah 3: Setup Discord Bot
1. Ikuti panduan di `discord-bot-setup.md`
2. Catat DISCORD_TOKEN dan CLIENT_ID

## Langkah 4: Deploy n8n
1. Ikuti panduan di `n8n-setup.md`
2. Import workflow dari `n8n-workflow.json`
3. Catat webhook URLs

## Langkah 5: Deploy Discord Bot
1. Ikuti panduan di `railway-deployment.md`
2. Setup environment variables
3. Deploy bot ke Railway

## Langkah 6: Testing
1. Undang bot ke Discord server
2. Test semua commands:
   - `/catat tipe:Uang Masuk jumlah:100000 keterangan:Gaji kategori:Gaji`
   - `/saldo`
   - `/riwayat`
   - `/hapus baris:2`

## Environment Variables Summary
```
# Discord Bot (.env)
DISCORD_TOKEN=your_discord_bot_token
CLIENT_ID=your_discord_client_id
N8N_WEBHOOK_URL=https://your-n8n-instance.railway.app/webhook
GOOGLE_SHEET_ID=your_google_sheet_id
NODE_ENV=production

# n8n (Railway Environment)
N8N_BASIC_AUTH_ACTIVE=true
N8N_BASIC_AUTH_USER=admin
N8N_BASIC_AUTH_PASSWORD=your_secure_password
WEBHOOK_URL=https://your-n8n-instance.railway.app
GOOGLE_SHEET_ID=your_google_sheet_id
NODE_ENV=production
```

## Arsitektur Sistem
```
Discord Bot (Railway) 
    ↓ HTTP POST
n8n Webhook (Railway)
    ↓ Google Sheets API
Google Sheets (Database)
```

## Troubleshooting
1. **Bot tidak merespons**: Periksa DISCORD_TOKEN dan permissions
2. **Webhook error**: Periksa N8N_WEBHOOK_URL dan n8n status
3. **Google Sheets error**: Periksa credentials dan sheet permissions
4. **Data tidak tersimpan**: Periksa workflow n8n dan Google Sheets API

## Maintenance
- Monitor Railway logs untuk error
- Backup Google Sheets secara berkala
- Update dependencies secara berkala
- Monitor usage quota Google Sheets API
