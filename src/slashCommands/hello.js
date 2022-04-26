const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hello')
		.setDescription('Replies with Hiii'),
	async execute(interaction) {
		await interaction.reply('Hiiiiiiiiiiii');
	},
};