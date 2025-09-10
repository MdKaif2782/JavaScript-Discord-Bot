const { MessageActionRow, MessageButton } = require("discord.js");
const getDoujin = require("../../helper/nhentai");
const { default: axios } = require("axios");
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

        if (interaction.commandName === "nhentai") {
            i = 0;
            (async () => {
                await interaction.reply({ content: 'Fetching doujin from API....' })
                const code = await interaction.options.getInteger('code')
                let doujin;
                try {
                    doujin = await getDoujin(code)
                    const page1 = doujin.pages[0];
                    const res = await fetch(page1);
                    if(res.status==404){
                        if(page1.endsWith(".jpg")) {
                            for(let x=0;x<doujin.pages.length ;x++){
                                doujin.pages[x]=doujin.pages[x].replace("jpg","webp");
                            }
                        }else if(page1.endsWith(".png")){
                                doujin.pages[x]=doujin[x].replace("png","webp");
                        }
                    }
                    console.log("After transform: ",doujin)
                } catch (e) {
                    console.log(e);
                    return interaction.editReply({ content: "Failed to fetch doujin, make sure the code is correct and try again" })
                }
                console.log(doujin)
                if (doujin == undefined) {
                    return interaction.editReply({ content: "Not found doujin with the code" })
                }
                await interaction.deleteReply()
                await interaction.channel.send({ content: (await doujin).pages[i], components: [row] }).then(mes => {
                    mes.client.on("interactionCreate", async interaction2 => {
                        if (interaction2.isButton()) {
                            if (interaction2.customId === "countplus" && interaction2.message.id === mes.id) {
                                i = i + 1;
                                const row = await new MessageActionRow().addComponents(
                                    new MessageButton().setCustomId('countminus')
                                        .setLabel("Prev Page")
                                        .setStyle("PRIMARY"),
                                    new MessageButton().setCustomId('pageno')
                                        .setLabel(`${i + 1}/${doujin.pages.length}`)
                                        .setStyle("PRIMARY")
                                        .setDisabled(true),
                                    new MessageButton().setCustomId('countplus')
                                        .setLabel("Next Page")
                                        .setStyle("PRIMARY")
                                )

                                await interaction2.message.edit({ content: doujin.pages[i], components: [row] })
                            } else if (interaction2.customId === 'countminus' && interaction2.message.id === mes.id) {
                                i = i - 1;

                                const row = new MessageActionRow().addComponents(
                                    new MessageButton().setCustomId('countminus')
                                        .setLabel("Prev Page")
                                        .setStyle("PRIMARY"),
                                    new MessageButton().setCustomId('pageno')
                                        .setLabel(`${i + 1}/${doujin.pages.length}`)
                                        .setStyle("PRIMARY")
                                        .setDisabled(true),
                                    new MessageButton().setCustomId('countplus')
                                        .setLabel("Next Page")
                                        .setStyle("PRIMARY")
                                )


                                interaction2.message.edit({ content: doujin.pages[i], components: [row] })
                            }
                        }
                    })
                });

            })()
        }

    },
};