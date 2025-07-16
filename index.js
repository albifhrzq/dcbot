const { Client, GatewayIntentBits, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');
require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

// N8N Webhook URLs untuk setiap command
const WEBHOOK_URLS = {
    catat: `${process.env.N8N_WEBHOOK_URL}/catat`,
    saldo: `${process.env.N8N_WEBHOOK_URL}/saldo`,
    riwayat: `${process.env.N8N_WEBHOOK_URL}/riwayat`,
    hapus: `${process.env.N8N_WEBHOOK_URL}/hapus`
};

// Fungsi untuk mengirim data ke n8n
async function sendToN8N(endpoint, data) {
    try {
        const response = await axios.post(endpoint, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error sending to n8n:', error);
        throw error;
    }
}

// Fungsi untuk format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}

client.once('ready', () => {
    console.log(`Bot ${client.user.tag} sudah online!`);
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const { commandName } = interaction;
    const userId = interaction.user.id;
    const username = interaction.user.username;

    try {
        switch (commandName) {
            case 'catat':
                await handleCatatCommand(interaction, userId, username);
                break;
            case 'saldo':
                await handleSaldoCommand(interaction, userId, username);
                break;
            case 'riwayat':
                await handleRiwayatCommand(interaction, userId, username);
                break;
            case 'hapus':
                await handleHapusCommand(interaction, userId, username);
                break;
        }
    } catch (error) {
        console.error('Error handling command:', error);
        await interaction.reply({
            content: 'Terjadi kesalahan saat memproses perintah.',
            ephemeral: true,
        });
    }
});

async function handleCatatCommand(interaction, userId, username) {
    await interaction.deferReply({ ephemeral: true }); // Defer the reply immediately

    const tipe = interaction.options.getString('tipe');
    const jumlah = interaction.options.getNumber('jumlah');
    const keterangan = interaction.options.getString('keterangan');
    const kategori = interaction.options.getString('kategori');

    const data = {
        tipe,
        jumlah,
        keterangan,
        kategori,
        user: userId,
        username,
        tanggal: new Date().toISOString(),
    };

    try {
        console.log('Sending data to N8N:', data);
        const result = await sendToN8N(WEBHOOK_URLS.catat, data);
        console.log('Received response from N8N:', result);
        
        const embed = new EmbedBuilder()
            .setColor(tipe === 'Uang Masuk' ? '#00ff00' : '#ff0000')
            .setTitle('✅ Transaksi Berhasil Dicatat')
            .addFields(
                { name: 'Tipe', value: tipe, inline: true },
                { name: 'Jumlah', value: formatCurrency(jumlah), inline: true },
                { name: 'Kategori', value: kategori, inline: true },
                { name: 'Keterangan', value: keterangan, inline: false }
            )
            .setTimestamp();

        await interaction.editReply({ embeds: [embed], ephemeral: false }); // Use editReply
    } catch (error) {
        console.error('Error in handleCatatCommand:', error);
        await interaction.editReply({
            content: 'Gagal mencatat transaksi. Silakan coba lagi.',
            ephemeral: true,
        });
    }
}

async function handleSaldoCommand(interaction, userId, username) {
    await interaction.deferReply({ ephemeral: true }); // Defer the reply immediately

    const data = {
        user: userId,
        username,
    };

    try {
        console.log('Sending data to N8N for Saldo:', data);
        const result = await sendToN8N(WEBHOOK_URLS.saldo, data);
        console.log('Received response from N8N for Saldo:', JSON.stringify(result));
        
        // Ensure values are numbers
        const totalMasuk = Number(result.totalMasuk) || 0;
        const totalKeluar = Number(result.totalKeluar) || 0;
        const saldo = Number(result.saldo) || 0;
        
        console.log('Processed saldo values:', { totalMasuk, totalKeluar, saldo });
        
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('💰 Ringkasan Keuangan')
            .addFields(
                { name: 'Total Pemasukan', value: formatCurrency(totalMasuk), inline: true },
                { name: 'Total Pengeluaran', value: formatCurrency(totalKeluar), inline: true },
                { name: 'Saldo Akhir', value: formatCurrency(saldo), inline: true }
            )
            .setFooter({ text: `Data untuk ${username}` })
            .setTimestamp();

        await interaction.editReply({ embeds: [embed], ephemeral: false }); // Use editReply
    } catch (error) {
        console.error('Error in handleSaldoCommand:', error);
        await interaction.editReply({
            content: 'Gagal mengambil data saldo. Silakan coba lagi.',
            ephemeral: true,
        });
    }
}

async function handleRiwayatCommand(interaction, userId, username) {
    await interaction.deferReply({ ephemeral: true }); // Defer the reply immediately
    
    const limit = interaction.options.getInteger('limit') || 10;
    
    const data = {
        user: userId,
        username,
        limit,
    };

    try {
        console.log('Sending data to N8N for Riwayat:', data);
        const result = await sendToN8N(WEBHOOK_URLS.riwayat, data);
        console.log('Received response from N8N for Riwayat:', JSON.stringify(result));
        
        if (!result.transactions || result.transactions.length === 0) {
            console.log('No transactions found for user:', userId);
            await interaction.editReply({
                content: 'Tidak ada riwayat transaksi.',
                ephemeral: true,
            });
            return;
        }

        console.log(`Found ${result.transactions.length} transactions for user ${userId}`);
        
        // Log each transaction for debugging
        result.transactions.forEach((transaction, index) => {
            console.log(`Transaction ${index + 1}:`, JSON.stringify(transaction));
        });

        const embed = new EmbedBuilder()
            .setColor('#ffa500')
            .setTitle('📋 Riwayat Transaksi')
            .setFooter({ text: `Menampilkan ${result.transactions.length} transaksi terakhir` })
            .setTimestamp();

        let description = '';
        result.transactions.forEach((transaction, index) => {
            // Use either Tipe or tipe, whichever is available
            const tipe = transaction.Tipe || transaction.tipe;
            const jumlah = Number(transaction.Jumlah || transaction.jumlah) || 0;
            const kategori = transaction.Kategori || transaction.kategori;
            const keterangan = transaction.Keterangan || transaction.keterangan;
            const tanggal = transaction.Tanggal || transaction.tanggal;
            
            const icon = tipe === 'Uang Masuk' ? '💸' : '💰';
            description += `${icon} **${keterangan}**\n`;
            description += `${tipe} - ${formatCurrency(jumlah)}\n`;
            description += `Kategori: ${kategori} | ${tanggal}\n\n`;
        });

        embed.setDescription(description);
        await interaction.editReply({ embeds: [embed], ephemeral: false }); // Use editReply instead of reply
    } catch (error) {
        console.error('Error in handleRiwayatCommand:', error);
        await interaction.editReply({
            content: 'Gagal mengambil riwayat transaksi. Silakan coba lagi.',
            ephemeral: true,
        });
    }
}

async function handleHapusCommand(interaction, userId, username) {
    await interaction.deferReply({ ephemeral: true }); // Defer the reply immediately
    
    const rowNumber = interaction.options.getInteger('baris');
    
    const data = {
        user: userId,
        username,
        rowNumber,
    };

    try {
        console.log('Sending data to N8N for Hapus:', data);
        const result = await sendToN8N(WEBHOOK_URLS.hapus, data);
        console.log('Received response from N8N for Hapus:', result);
        
        if (result.success) {
            const embed = new EmbedBuilder()
                .setColor('#ff0000')
                .setTitle('🗑️ Transaksi Berhasil Dihapus')
                .setDescription(`Transaksi pada baris ${rowNumber} berhasil dihapus.`)
                .setTimestamp();

            await interaction.editReply({ embeds: [embed], ephemeral: false }); // Use editReply instead of reply
        } else {
            await interaction.editReply({
                content: 'Transaksi tidak ditemukan atau gagal dihapus.',
                ephemeral: true,
            });
        }
    } catch (error) {
        console.error('Error in handleHapusCommand:', error);
        await interaction.editReply({
            content: 'Gagal menghapus transaksi. Silakan coba lagi.',
            ephemeral: true,
        });
    }
}

// Login bot
client.login(process.env.DISCORD_TOKEN);
