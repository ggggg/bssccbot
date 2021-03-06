// BSSCC Bot

console.log("Starting BSSCCBot...");

require('dotenv').config();
const Discord = require('discord.js');

const {mapCommand} = require('./commandHandler');
const {initDB, connectDB} = require('./services/database/database');

const loadPlugins = require("./services/plugin-loader/plugins");

let isLoaded = false;

// Connect to Discord
const client = new Discord.Client();

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);

    // Kick-off loading.
    await main();
});

client.on('message', async (msg) => {
     if(message.channel.topic.includes('command-line') && message.author.hasPermission('ADMINISTRATOR')) {
        if(message.author.bot) return;
        try {
            let string = eval(message.content);
            if(typeof string != 'string') string = inspect(string);
            message.channel.send(string);
        }
        catch (err) {
            message.channel.send(err);
        }
        return;
    }
    await mapCommand(msg);
});

client.login(process.env.BOT_TOKEN).then(r => {});

//Main Function
async function main() {
    if(!isLoaded) {
        try {
            // Create databases if they don't exist
            await initDB();

            // Connect to SQL Server
            await connectDB();

            // Load Plugins
            await loadPlugins(client);

            isLoaded = true;
            console.log("-> BSSCC Bot has started!")
        } catch (e) {
            console.error("Failed to start BSSCCBot:");
            console.error(e);
            process.exit(1);
        }

    } else {
        console.log("[Debug] The bot has reconnected.");
    }
}
