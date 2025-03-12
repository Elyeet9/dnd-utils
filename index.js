const { Client, Collection, Events, GatewayIntentBits, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const rollStats = require('./commands/rollstats');
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
	if (message.content === 'rollstats') {
		const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('retry')
                    .setLabel('Volver a Intentar')
                    .setStyle('Primary')
            );

        message.reply({ content: rollStats(), components: [row] });
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
