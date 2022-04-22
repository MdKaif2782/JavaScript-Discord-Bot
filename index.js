const discord = require('discord.js');
const generateImage = require('./generateImage')

 const client = new discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MEMBERS"
    ]
})


client.on("ready",()=>{
    console.log(`logged in as ${client.user.tag}`)

})
//ping
client.on("messageCreate", (event)=>{
    if (event.content.toLowerCase()==="!ping"){
        event.reply("Pong!");
    }
})




    client.login("OTI0NTc4NzcwNzg1MDEzODAw.YcgnFA.n0PcDZ6a1h4c3zkhgIwpsBPzTH8")


const welcomeChannelId ="966699062051090452"

client.on("guildMemberAdd", async (member) => {
    const img = await generateImage(member)
    member.guild.channels.cache.get(welcomeChannelId).send({
        content: `<@${member.id}> Welcome to the server!`,
        files: [img]
    })
})








