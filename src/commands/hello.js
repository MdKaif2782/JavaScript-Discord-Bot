module.exports.run = (client,message,args) => {
    message.channel.send("Hiiiii!")
    console.log(`${message.author.tag} used hello command in ${message.guild}`)
}