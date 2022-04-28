module.exports.run = (client,message,args)=>{
    message.channel.send(`Server name: ${message.guild}\n
Server ID: ${message.guildId}\n
Channel Name: ${message.channel.name}`)
}