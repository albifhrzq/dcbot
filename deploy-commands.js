const { REST, Routes } = require('discord.js');
require('dotenv').config();

const commands = [
    {
        name: 'catat',
        description: 'Mencatat pemasukan atau pengeluaran uang',
        options: [
            {
                name: 'tipe',
                description: 'Jenis transaksi',
                type: 3, // STRING
                required: true,
                choices: [
                    {
                        name: 'Uang Masuk',
                        value: 'Uang Masuk'
                    },
                    {
                        name: 'Uang Keluar',
                        value: 'Uang Keluar'
                    }
                ]
            },
            {
                name: 'jumlah',
                description: 'Jumlah uang (dalam rupiah)',
                type: 10, // NUMBER
                required: true
            },
            {
                name: 'keterangan',
                description: 'Keterangan transaksi',
                type: 3, // STRING
                required: true
            },
            {
                name: 'kategori',
                description: 'Kategori transaksi',
                type: 3, // STRING
                required: true,
                choices: [
                    { name: 'Makanan', value: 'Makanan' },
                    { name: 'Transportasi', value: 'Transportasi' },
                    { name: 'Belanja', value: 'Belanja' },
                    { name: 'Hiburan', value: 'Hiburan' },
                    { name: 'Kesehatan', value: 'Kesehatan' },
                    { name: 'Pendidikan', value: 'Pendidikan' },
                    { name: 'Investasi', value: 'Investasi' },
                    { name: 'Gaji', value: 'Gaji' },
                    { name: 'Bonus', value: 'Bonus' },
                    { name: 'Lainnya', value: 'Lainnya' }
                ]
            }
        ]
    },
    {
        name: 'saldo',
        description: 'Menampilkan ringkasan keuangan'
    },
    {
        name: 'riwayat',
        description: 'Menampilkan riwayat transaksi',
        options: [
            {
                name: 'limit',
                description: 'Jumlah transaksi yang ditampilkan (default: 10)',
                type: 4, // INTEGER
                required: false
            }
        ]
    },
    {
        name: 'hapus',
        description: 'Menghapus transaksi berdasarkan nomor baris',
        options: [
            {
                name: 'baris',
                description: 'Nomor baris transaksi yang akan dihapus',
                type: 4, // INTEGER
                required: true
            }
        ]
    }
];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
            body: commands,
        });

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();
