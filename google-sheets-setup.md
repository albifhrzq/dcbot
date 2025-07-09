# Setup Google Sheets

## 1. Buat Google Sheets
1. Buka Google Sheets
2. Buat spreadsheet baru
3. Buat sheet bernama "Keuangan"
4. Tambahkan header di baris pertama:
   - A1: Tipe
   - B1: Jumlah
   - C1: Keterangan
   - D1: Kategori
   - E1: User
   - F1: Tanggal

## 2. Dapatkan Sheet ID
Dari URL Google Sheets:
`https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit`

Copy bagian `[SHEET_ID]` untuk digunakan sebagai `GOOGLE_SHEET_ID`

## 3. Setup Google Sheets API
1. Buka Google Cloud Console (https://console.cloud.google.com/)
2. Buat project baru atau pilih project yang sudah ada
3. Aktifkan Google Sheets API:
   - Buka "APIs & Services" > "Library"
   - Cari "Google Sheets API"
   - Klik "Enable"
4. Buat credentials:
   - Buka "APIs & Services" > "Credentials"
   - Klik "Create Credentials" > "OAuth 2.0 Client ID"
   - Pilih "Web application"
   - Tambahkan authorized redirect URIs sesuai dengan n8n instance Anda
   - Download JSON file credentials

## 4. Setup di n8n
1. Buka n8n dashboard
2. Pergi ke "Credentials"
3. Klik "Add Credential"
4. Pilih "Google Sheets OAuth2 API"
5. Upload file JSON atau masukkan Client ID dan Client Secret
6. Authorize akses ke Google Sheets

## 5. Permissions
Pastikan Google Sheets dapat diakses oleh:
- Service account (jika menggunakan service account)
- Atau akun yang digunakan untuk OAuth (jika menggunakan OAuth)

## Format Data di Spreadsheet
| Tipe | Jumlah | Keterangan | Kategori | User | Tanggal |
|------|--------|------------|----------|------|----------|
| Uang Masuk | 100000 | Gaji | Gaji | 123456789 | 2024-01-15T10:30:00Z |
| Uang Keluar | 50000 | Makan siang | Makanan | 123456789 | 2024-01-15T12:00:00Z |

## Tips:
- User ID menggunakan Discord User ID untuk identifikasi unik
- Tanggal menggunakan format ISO 8601
- Jumlah berupa angka (tidak ada format currency)
- Kategori sesuai dengan choices yang ada di Discord bot
