const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
const fetch = require("cross-fetch");

module.exports = {
    name: "interactionCreate",
    async execute(interaction) {
        // Slash command handling
        if (interaction.isCommand() && interaction.commandName === "meme") {
            try {
                const response = await fetch("https://meme-api.com/gimme");
                const data = await response.json();

                const embed = new MessageEmbed()
                    .setTitle(data.title)
                    .setAuthor({
                        name: "Succubot",
                        iconURL: interaction.client.user.displayAvatarURL({ size: 1024 }),
                    })
                    .setDescription(`*[Posted](${data.postLink}) on r/${data.subreddit} by u/${data.author}*`)
                    .setImage(data.url)
                    .setFooter({
                        text: `Upvotes: ${data.ups}  NSFW: ${data.nsfw}  Spoiler: ${data.spoiler}`,
                    });

                const row = new MessageActionRow().addComponents(
                    new MessageButton()
                        .setCustomId("next_meme")
                        .setLabel("Next Meme")
                        .setStyle("PRIMARY")
                );

                await interaction.reply({ embeds: [embed], components: [row] });
            } catch (err) {
                console.error(err);
                await interaction.reply("❌ Failed to fetch meme.");
            }
        }

        // Button handling
        if (interaction.isButton() && interaction.customId === "next_meme") {
            try {
                const response = await fetch("https://meme-api.com/gimme");
                const data = await response.json();

                const embed = new MessageEmbed()
                    .setTitle(data.title)
                    .setAuthor({
                        name: "Succubot",
                        iconURL: interaction.client.user.displayAvatarURL({ size: 1024 }),
                    })
                    .setDescription(`*[Posted](${data.postLink}) on r/${data.subreddit} by u/${data.author}*`)
                    .setImage(data.url)
                    .setFooter({
                        text: `Upvotes: ${data.ups}  NSFW: ${data.nsfw}  Spoiler: ${data.spoiler}`,
                    });

                await interaction.update({ embeds: [embed] });
            } catch (err) {
                console.error(err);
                await interaction.reply("❌ Failed to fetch new meme.");
            }
        }
    },
};
