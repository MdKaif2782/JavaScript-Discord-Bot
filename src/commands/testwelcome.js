module.exports.run = (client,message)=>{


    async function sendWelcomeMessage(){
        const generateImage = await require('../generateImage')
        let server = await message.guild
        if (!server){
            console.log('Server not found')
            return;
        }
        let channel = await server.channels.cache.find(c => c.name === "welcome");
        if (!channel) {
            console.log("Channel not found")
            return;
        }
        const image = await generateImage(message.member)
        await channel.send({content:`Welcome to the server! <@${message.author.id}>`,
        files: [image]});
    }
    sendWelcomeMessage().then(r => {
        console.log(r)});
}