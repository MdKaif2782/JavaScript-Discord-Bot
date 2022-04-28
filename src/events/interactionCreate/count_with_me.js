module.exports = {
    name: 'ready',
    execute(client) {
        const guildId= "9245647179498291619";
        const guild = client.guilds.cache.get(guildId);

        let commands
        if (guild) {
            commands = guild.commands;
        }else{
            commands = client.application.commands
        }
        commands.create({
            name:'count_with_me',
            description: 'Testing the counting system'
        })
    },
};
