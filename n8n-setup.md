# Setup n8n

## 1. Deploy n8n di Railway
1. Login ke Railway.app
2. Klik "New Project"
3. Pilih "Deploy from GitHub repo"
4. Pilih repository n8n resmi atau fork
5. Atau gunakan template n8n yang sudah ada di Railway

## 2. Environment Variables untuk n8n
Tambahkan environment variables berikut di Railway:
```
N8N_BASIC_AUTH_ACTIVE=true
N8N_BASIC_AUTH_USER=admin
N8N_BASIC_AUTH_PASSWORD=your_secure_password
WEBHOOK_URL=https://your-n8n-instance.railway.app
GOOGLE_SHEET_ID=your_google_sheet_id
NODE_ENV=production
```

## 3. Import Workflow
1. Buka n8n dashboard
2. Klik "Import" di bagian atas
3. Upload file `n8n-workflow.json`
4. Atau copy-paste isi file ke import dialog

## 4. Setup Credentials
1. Buka "Credentials" di n8n
2. Tambahkan "Google Sheets OAuth2 API" credential
3. Ikuti proses OAuth untuk mengakses Google Sheets
4. Pastikan credential bernama "Google Sheets OAuth2 API"

## 5. Aktivasi Workflow
1. Pastikan semua node sudah dikonfigurasi dengan benar
2. Klik "Active" untuk mengaktifkan workflow
3. Test webhook URLs untuk memastikan berfungsi

## 6. Webhook URLs
Setelah deploy, Anda akan mendapatkan URL seperti:
- `https://your-n8n-instance.railway.app/webhook/catat`
- `https://your-n8n-instance.railway.app/webhook/saldo`
- `https://your-n8n-instance.railway.app/webhook/riwayat`
- `https://your-n8n-instance.railway.app/webhook/hapus`

## 7. Update Discord Bot
Update file `.env` Discord bot dengan:
```
N8N_WEBHOOK_URL=https://your-n8n-instance.railway.app/webhook
```

## 8. Testing
Test setiap endpoint dengan tools seperti Postman atau curl:
```bash
curl -X POST https://your-n8n-instance.railway.app/webhook/catat \
  -H "Content-Type: application/json" \
  -d '{
    "tipe": "Uang Masuk",
    "jumlah": 100000,
    "keterangan": "Test",
    "kategori": "Lainnya",
    "user": "123456789",
    "username": "testuser",
    "tanggal": "2024-01-15T10:30:00Z"
  }'
```

## 9. Monitoring
- Monitor logs di Railway dashboard
- Pastikan semua webhook berfungsi dengan baik
- Check Google Sheets untuk memastikan data masuk dengan benar

## 10. Troubleshooting
- Pastikan Google Sheets API sudah aktif
- Verifikasi credentials Google Sheets
- Check environment variables
- Monitor error logs di Railway
