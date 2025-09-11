const { MessageActionRow, MessageButton } = require("discord.js");
module.exports.run = (client, message) => {
    const { performance } = require('perf_hooks');
    const startTime = performance.now();
    const fetch = require('cross-fetch')
    const { MessageEmbed } = require('discord.js')
    async function getMeme() {
        try{
        const response = await fetch('https://meme-api.com/gimme')
        const data = await response.json()
        const embed = await new MessageEmbed()
            .setTitle(data.title)
            .setAuthor("Succubot", client.user.displayAvatarURL({ size: 1024 }))
            .setDescription(`*[Posted](${data.postLink}) on r/${data.subreddit} by u/${data.author}*`)
            .setImage(data.url)
            .setFooter(`Upvotes: ${data.ups}  NSFW: ${data.nsfw}  Spoiler: ${data.spoiler}\nResponse time: ${(performance.now() - startTime).toFixed(1)} ms`)
        console.log(data);
        const row = await new MessageActionRow().addComponents(
            await new MessageButton().setCustomId('next_meme')
                .setLabel("Next Meme")
                .setStyle("PRIMARY")
        )
        message.channel.send({ embeds: [embed], components: [row] });
    } catch(err) {
        console.log(err.message);
        message.channel.send(err.message)
    }
    } getMeme()
}