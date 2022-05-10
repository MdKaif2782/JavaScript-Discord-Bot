const nhentai = require('nhentai')
const {MessageActionRow, MessageButton} = require("discord.js");
const api = new nhentai.API();
module.exports = {
    name: 'interactionCreate',
    execute(client) {
        let i;

        const interaction = client
        const row = new MessageActionRow().addComponents(
            new MessageButton().setCustomId('countminus')
                .setLabel("Prev Page")
                .setStyle("PRIMARY"),
            new MessageButton().setCustomId('pageno')
                .setLabel(`${1}`)
                .setStyle("PRIMARY")
                .setDisabled(true),
            new MessageButton().setCustomId('countplus')
                .setLabel("Next Page")
                .setStyle("PRIMARY")
        )

        if(interaction.commandName==="nhentai") {
            i=0;
            (async ()=>{
                await interaction.reply({content: 'Fetching doujin from API....'})
                const code = await interaction.options.getInteger('code')
                const doujin = await api.fetchDoujin(`${code}`)
                await interaction.deleteReply()
                await interaction.channel.send({content: (await doujin).pages[i].url,components: [row]}).then(mes=>{
                    mes.client.on("interactionCreate", interaction2=>{
                        if (interaction2.isButton()){
                            if (interaction2.customId==="countplus" && interaction2.message.id===mes.id){
                                i=i+1;
                                const row = new MessageActionRow().addComponents(
                                    new MessageButton().setCustomId('countminus')
                                        .setLabel("Prev Page")
                                        .setStyle("PRIMARY"),
                                    new MessageButton().setCustomId('pageno')
                                        .setLabel(`${i+1}/${doujin.pages.length}`)
                                        .setStyle("PRIMARY")
                                        .setDisabled(true),
                                    new MessageButton().setCustomId('countplus')
                                        .setLabel("Next Page")
                                        .setStyle("PRIMARY")
                                )


                                interaction2.message.edit({content: doujin.pages[i].url,components:[row]})
                            } else if (interaction2.customId==='countminus'&& interaction2.message.id===mes.id){
                                i=i-1;

                                const row = new MessageActionRow().addComponents(
                                    new MessageButton().setCustomId('countminus')
                                        .setLabel("Prev Page")
                                        .setStyle("PRIMARY"),
                                    new MessageButton().setCustomId('pageno')
                                        .setLabel(`${i+1}/${doujin.pages.length}`)
                                        .setStyle("PRIMARY")
                                        .setDisabled(true),
                                    new MessageButton().setCustomId('countplus')
                                        .setLabel("Next Page")
                                        .setStyle("PRIMARY")
                                )


                                interaction2.message.edit({content: doujin.pages[i].url,components:[row]})



                            }
                        }
                    })
                });

            })()
        }

    },
};