module.exports = {
    name: "help",
    async exe(Discord, bot, msg, args) {
        let e = new Discord.MessageEmbed()
            .setTitle("Help Menu")
            .addField(">help", "Pulls up a list of all possible commands.")
            .addField(">new", "Generates a random AMC problem from the database.")
            .setColor("#f9f9f9");

        msg.channel.send({ embeds: [e] });
    },
};
