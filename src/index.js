const discord = require('discord.js');
const { TextChannel, Guild, GuildChannel} = require('discord.js')
const generateImage = require('./generateImage')

 const client = new discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MEMBERS"
    ]
})
const prefix = '!'
const fs = require('fs')
const path = require('path')
client.commands= new discord.Collection();
const commands = fs.readdirSync(path.resolve('src/commands')).filter(file => file.endsWith('.js'));

for (file of commands){
    const commandName= file.split('.')[0]
    const command = require(`./commands/${commandName}`);
    client.commands.set(commandName,command)
}


client.on("ready",()=>{
    console.log(`logged in as ${client.user.tag}`)

    const guildId= "924564717949829161";
    const guild = client.guilds.cache.get(guildId);

    let commands 
    if (guild) {
        commands = guild.commands;
    }else{
        commands = client.application.commands
    }
    commands.create({
        name:'ping',
        description: 'replies with pong'
    })

})

client.on("interactionCreate", (inetraction)=>{
    if(inetraction.commandName==="ping"){
        inetraction.reply({ content:"Pong!"});
    }
})



client.on("messageCreate", (message)=>{
    if (message.content.startsWith(prefix)){
        const args = message.content.slice(prefix.length).trim().split(/ +/g)
        const commandName = args.shift()
        const command = client.commands.get(commandName)
        if (!command) return message.reply("This command doesn't exist")
        command.run(client,message,args)
    }
})





const welcomeChannelId ="966699062051090452"

client.on('guildMemberAdd', member => {
    if (!member.guild) return;
    let guild = member.guild
    let channel = guild.channels.cache.find(c => c.name === "welcome");
  
    let membercount = guild.members
    if (!channel) return;
    
    let embed = new Discord.MessageEmbed() 
      .setColor("GREEN") 
      .setTitle("New Server Member!")
      .setDescription(`Welcome, ${member.user.tag} to **${guild.name}!**`)
      .setThumbnail(member.user.displayAvatarURL())
      //.setFooter(`You are the ${membercount}th member to join`);
    channel.send(embed);
  });

// client.on("guildMemberAdd", async (member) => {
//     const img = await generateImage(member)
//     client.guilds.cache.get(member.guild.id).channels.cache.
//     get(welcomeChannelId).send({content: `<@${member.id}> Welcome to the server!`,
//         files: [img]
//     })
// })

const token1 = "OTI0NTc4NzcwNzg1MDEzODAw.YcgnFA"
const token2 = ".d_wjS3yKKbHvSpWeJSRWAnj8cW"
client.login(token1+token2+"8")








