const {MessageActionRow,MessageButton}= require('discord.js')
module.exports = {
    name: 'interactionCreate',
    execute(client) {
        let i;
        const interaction = client
        if(interaction.commandName==="count_with_me"){
            i=0;
            const row = new MessageActionRow().addComponents(
                new MessageButton().setCustomId('countminus')
                    .setLabel("-1")
                    .setStyle("DANGER"),
                new MessageButton().setCustomId('countplus')
                    .setLabel("+1")
                    .setStyle("SUCCESS")
            )
            interaction.reply('testing the counting methode:')
            interaction.channel.send({content:`**COUNT:    [ ${i} ]**`,components: [row]}).then(mes=>{
                mes.client.on("interactionCreate", interaction2=>{
                    if (interaction2.isButton()){
                        if (interaction2.customId==="countplus" && interaction2.message.id===mes.id){
                            i=i+1;
                            interaction2.message.edit({content:`**COUNT:   [ ${i} ]**`})
                        } else if (interaction2.customId==='countminus'&& interaction2.message.id===mes.id){
                            i=i-1;
                            interaction2.message.edit({content:`**COUNT:  [ ${i} ]**`})
                        }
                    }
                })
            });
        }
    },
};