# Discord Bot Catatan Keuangan

## Deskripsi
Bot Discord untuk mencatat keuangan pribadi dengan integrasi Google Sheets menggunakan n8n automation.

## Fitur
- `/catat` - Mencatat pemasukan/pengeluaran uang
- `/saldo` - Menampilkan rincian keuangan user
- `/riwayat` - Menampilkan riwayat transaksi
- `/hapus` - Menghapus riwayat transaksi tertentu

## Struktur Spreadsheet
- **Tipe**: Uang Masuk/Keluar
- **Jumlah**: Jumlah uang yang diinput
- **Keterangan**: Keterangan penggunaan uang
- **Kategori**: Kategori penggunaan
- **User**: Akun yang menggunakan layanan
- **Tanggal**: Tanggal transaksi

## Setup
1. Deploy n8n di Railway
2. Buat bot Discord dan dapatkan token
3. Setup Google Sheets API
4. Import workflow n8n
5. Konfigurasi credentials

## Stack
- n8n (Automation)
- Discord (Interface)
- Railway (Hosting)
- Google Sheets (Database)
