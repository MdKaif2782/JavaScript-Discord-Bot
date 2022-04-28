module.exports.run = (client,message,args) => {
    message.channel.send("Pong!")
    console.log(`${message.author.tag} used ping command in ${message.guild}`)
}