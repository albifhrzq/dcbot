const fs = require('fs');
const path = require('path');

// Fungsi untuk membaca dan memvalidasi environment variables
function validateEnvVariables() {
    const requiredVars = [
        'DISCORD_TOKEN',
        'CLIENT_ID',
        'N8N_WEBHOOK_URL',
        'GOOGLE_SHEET_ID'
    ];

    const missingVars = requiredVars.filter(varName => !process.env[varName]);

    if (missingVars.length > 0) {
        console.error('❌ Missing required environment variables:');
        missingVars.forEach(varName => {
            console.error(`   - ${varName}`);
        });
        console.error('\nPlease check your .env file or environment configuration.');
        process.exit(1);
    }

    console.log('✅ All required environment variables are present.');
}

// Fungsi untuk test koneksi ke n8n webhook
async function testN8NConnection() {
    const axios = require('axios');
    
    try {
        // Test endpoint yang paling ringan
        const response = await axios.post(`${process.env.N8N_WEBHOOK_URL}/saldo`, {
            user: 'test_user',
            username: 'test'
        }, {
            timeout: 5000
        });

        console.log('✅ n8n webhook connection successful');
        return true;
    } catch (error) {
        console.error('❌ n8n webhook connection failed:', error.message);
        return false;
    }
}

// Fungsi untuk test Discord bot token
async function testDiscordToken() {
    const { Client, GatewayIntentBits } = require('discord.js');
    
    const client = new Client({
        intents: [GatewayIntentBits.Guilds]
    });

    try {
        await client.login(process.env.DISCORD_TOKEN);
        console.log('✅ Discord bot token is valid');
        await client.destroy();
        return true;
    } catch (error) {
        console.error('❌ Discord bot token is invalid:', error.message);
        return false;
    }
}

// Main function
async function runHealthCheck() {
    console.log('🔍 Running health check...\n');

    // Validate environment variables
    validateEnvVariables();

    // Test Discord token
    const discordOk = await testDiscordToken();

    // Test n8n connection
    const n8nOk = await testN8NConnection();

    console.log('\n📋 Health Check Summary:');
    console.log(`Environment Variables: ✅`);
    console.log(`Discord Connection: ${discordOk ? '✅' : '❌'}`);
    console.log(`n8n Connection: ${n8nOk ? '✅' : '❌'}`);

    if (discordOk && n8nOk) {
        console.log('\n🎉 All systems are healthy! Bot is ready to run.');
        process.exit(0);
    } else {
        console.log('\n⚠️  Some systems are not healthy. Please fix the issues above.');
        process.exit(1);
    }
}

// Run health check jika file ini dijalankan langsung
if (require.main === module) {
    runHealthCheck().catch(console.error);
}

module.exports = {
    validateEnvVariables,
    testN8NConnection,
    testDiscordToken,
    runHealthCheck
};
