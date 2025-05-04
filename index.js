const { Client, Collection, Events, GatewayIntentBits, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const rollStats = require('./commands/rollstats');
const rollHP = require('./commands/rollhp');
const dotenv = require('dotenv');
dotenv.config();
// setup math random seed with actual datetime

const client = new Client(
	{ 
		intents: [
			GatewayIntentBits.Guilds, 
			GatewayIntentBits.GuildMessages, 
			GatewayIntentBits.MessageContent
		] 
	}
);

client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on(Events.MessageCreate, message => {
	const args = message.content.trim().split(' ');
	const command = args.shift().toLowerCase();
	
	if (command === 'rollstats') {
		const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('retry')
                    .setLabel('Volver a Intentar')
                    .setStyle('Primary')
            );
        message.reply({ content: rollStats(), components: [row] });
	} 
	else if (command === 'rollhp') {
		// get the hit dice from the message
		let dice = 0;
		let levelCount = 1;
		let constitution = 0;

		if (args.length > 0) {
			// check if it starts with 'd'
			if (args[0].startsWith('d')) {
				// get the number after the 'd'
				dice = parseInt(args[0].substring(1));
			} else {
				dice = parseInt(args[0]);
			}
		} else {
			message.reply(
				'Por favor ingresa un comando valido: `rollhp dX Y Z` o `rollhp X Y Z`, ' +
				'donde X es el numero de dados, Y es el nivel y Z es tu constitución. 🤦'
			);
			return;
		}

		// get the levels from the message
		if (args.length > 1) {
			levelCount = parseInt(args[1]);
		}

		// get the constitution from the message
		if (args.length > 2) {
			constitution = parseInt(args[2]);
		}
		
		message.reply(rollHP(dice, levelCount, constitution));
	}
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;

    const originalMessage = await interaction.message.fetchReference();
    if (interaction.customId === 'retry' && interaction.user.id === originalMessage.author.id) {
        await interaction.reply(
			{ 
				content: `${interaction.user}, ${rollStats()}`
			}
		);
    } else {
        await interaction.reply(
			{ 
				content: 'Tira tus propios stats, sapo.', 
				ephemeral: true 
			}
		);
    }
});

client.login(process.env.DISCORD_TOKEN);
