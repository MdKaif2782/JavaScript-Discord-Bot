const {MessageActionRow,MessageButton} = require('discord.js')
module.exports = {
    name: 'interactionCreate',
    execute(interaction) {
        if(interaction.commandName==="button_test"){
            const row = new MessageActionRow().addComponents(
                new MessageButton()
                    .setCustomId('12')
                    .setLabel('Show my avatar')
                    .setStyle("PRIMARY"),
            new MessageButton()
                .setCustomId('22')
                .setLabel('Show your avatar')
                .setStyle("PRIMARY")
            );
            interaction.reply({content:"Click me please",components: [row]})
        }
        if (interaction.isButton() ){
            if (interaction.customId==='22') {
                interaction.reply({
                    content: `${interaction.message.author.avatarURL()}`
                })
            } else if (interaction.customId==='12'){
                interaction.reply({
                    content: `${interaction.user.avatarURL()}`
                })
            }
        }
    },
};