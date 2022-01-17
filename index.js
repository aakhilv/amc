let Discord = require("discord.js");
let bot = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES] });
let fs = require("fs");
let prefix = ">";

bot.commands = new Discord.Collection();
let cmdfiles = fs.readdirSync("./cmds").filter(file => file.endsWith(".js"));
for (let file of cmdfiles) {
    let cmd = require(`./cmds/${file}`);
    bot.commands.set(cmd.name, cmd);
    console.log(`Loaded ${file}`);
};

bot.once("ready", async () => {
    console.log(`Loaded ${bot.user.username}`);
    bot.user.setActivity(`${prefix}help`);
});

bot.on("messageCreate", async msg => {
    if (!msg.content.startsWith(prefix) || msg.author.bot) return;

    let args = msg.content.slice(prefix.length).trim().split(/ +/);
    let cmd = args.shift().toLowerCase();

    if (!bot.commands.has(cmd)) return;

    try {
        bot.commands.get(cmd).exe(Discord, bot, msg, args);
    } catch (err) {
        console.log(err);
        msg.reply("There was an error executing this command.");
    };
});

bot.login("redacted");
