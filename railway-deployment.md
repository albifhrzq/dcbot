# Railway Deployment Configuration

## Environment Variables yang Diperlukan:
- `DISCORD_TOKEN`: Token bot Discord
- `CLIENT_ID`: Client ID aplikasi Discord
- `N8N_WEBHOOK_URL`: URL webhook n8n (tanpa trailing slash)
- `GOOGLE_SHEET_ID`: ID Google Sheets
- `NODE_ENV`: production

## Cara Deploy di Railway:

### 1. Setup Repository
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo>
git push -u origin main
```

### 2. Deploy di Railway
1. Login ke Railway.app
2. Klik "New Project"
3. Pilih "Deploy from GitHub repo"
4. Pilih repository Anda
5. Tambahkan environment variables
6. Deploy

### 3. Setup Domain (Opsional)
Railway akan memberikan domain otomatis seperti:
`your-app-name.railway.app`

## Start Command
Railway akan otomatis menjalankan `npm start` dari package.json

## Port Configuration
Railway akan otomatis mengatur PORT environment variable
