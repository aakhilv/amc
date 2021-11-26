module.exports = {
    name: "new",
    async exe(Discord, bot, msg, args) {
        let fetch = require("node-fetch");
        let db = "https://aakhilv.me/assets/amc.json";

        let f = i => i.user.id == msg.author.id;
        let col = msg.channel.createMessageComponentCollector({ filter: f, time: 300000 });

        fetch(db).then(res => res.json()).then(json => {
            for (let x = json.length - 1; x > 0; x--) {
                let y = Math.floor(Math.random() * x);
                let t = json[x];
                json[x] = json[y];
                json[y] = t;
            };

            let r = json[Math.floor(Math.random() * json.length)];

            let s = r.s;
            let p = r.p.split("*").join("\\*");
            let a = r.a;
            let c = r.c;
            let e, b;

            if (r.i) {
                e = new Discord.MessageEmbed()
                    .setDescription(`\`(A)\` ${c[0]}\n\`(B)\` ${c[1]}\n\`(C)\` ${c[2]}\n\`(D)\` ${c[3]}\n\`(E)\` ${c[4]}`)
                    .setImage(r.i)
                    .setFooter(s);
            } else {
                e = new Discord.MessageEmbed()
                    .setDescription(`\`(A)\` ${c[0]}\n\`(B)\` ${c[1]}\n\`(C)\` ${c[2]}\n\`(D)\` ${c[3]}\n\`(E)\` ${c[4]}`)
                    .setFooter(s);
            };

            b = new Discord.MessageActionRow()
                .addComponents(
                    new Discord.MessageButton()
                        .setCustomId("A")
                        .setLabel("A")
                        .setStyle("SECONDARY"),
                    new Discord.MessageButton()
                        .setCustomId("B")
                        .setLabel("B")
                        .setStyle("SECONDARY"),
                    new Discord.MessageButton()
                        .setCustomId("C")
                        .setLabel("C")
                        .setStyle("SECONDARY"),
                    new Discord.MessageButton()
                        .setCustomId("D")
                        .setLabel("D")
                        .setStyle("SECONDARY"),
                    new Discord.MessageButton()
                        .setCustomId("E")
                        .setLabel("E")
                        .setStyle("SECONDARY"),
                );

            msg.reply({ content: `**${p}**`, embeds: [e], components: [b] });

            col.on("collect", async i => {
                await col.stop();

                let aVal = "SECONDARY", bVal = "SECONDARY", cVal = "SECONDARY", dVal = "SECONDARY", eVal = "SECONDARY";

                if (i.customId == "A") aVal = "DANGER";
                if (i.customId == "B") bVal = "DANGER";
                if (i.customId == "C") cVal = "DANGER";
                if (i.customId == "D") dVal = "DANGER";
                if (i.customId == "E") eVal = "DANGER";
                if ("A" == a) aVal = "SUCCESS";
                if ("B" == a) bVal = "SUCCESS";
                if ("C" == a) cVal = "SUCCESS";
                if ("D" == a) dVal = "SUCCESS";
                if ("E" == a) eVal = "SUCCESS";

                b = new Discord.MessageActionRow()
                    .addComponents(
                        new Discord.MessageButton()
                            .setCustomId("A")
                            .setLabel("A")
                            .setStyle(aVal)
                            .setDisabled(true),
                        new Discord.MessageButton()
                            .setCustomId("B")
                            .setLabel("B")
                            .setStyle(bVal)
                            .setDisabled(true),
                        new Discord.MessageButton()
                            .setCustomId("C")
                            .setLabel("C")
                            .setStyle(cVal)
                            .setDisabled(true),
                        new Discord.MessageButton()
                            .setCustomId("D")
                            .setLabel("D")
                            .setStyle(dVal)
                            .setDisabled(true),
                        new Discord.MessageButton()
                            .setCustomId("E")
                            .setLabel("E")
                            .setStyle(eVal)
                            .setDisabled(true),
                    );

                if (i.customId == a) {
                    if (r.i) {
                        e = new Discord.MessageEmbed()
                            .setDescription(`\`(A)\` ${c[0]}\n\`(B)\` ${c[1]}\n\`(C)\` ${c[2]}\n\`(D)\` ${c[3]}\n\`(E)\` ${c[4]}`)
                            .setImage(r.i)
                            .setColor("GREEN")
                            .setFooter(s);
                    } else {
                        e = new Discord.MessageEmbed()
                            .setDescription(`\`(A)\` ${c[0]}\n\`(B)\` ${c[1]}\n\`(C)\` ${c[2]}\n\`(D)\` ${c[3]}\n\`(E)\` ${c[4]}`)
                            .setColor("GREEN")
                            .setFooter(s);
                    };
                } else {
                    if (r.i) {
                        e = new Discord.MessageEmbed()
                            .setDescription(`\`(A)\` ${c[0]}\n\`(B)\` ${c[1]}\n\`(C)\` ${c[2]}\n\`(D)\` ${c[3]}\n\`(E)\` ${c[4]}`)
                            .setImage(r.i)
                            .setColor("RED")
                            .setFooter(s);
                    } else {
                        e = new Discord.MessageEmbed()
                            .setDescription(`\`(A)\` ${c[0]}\n\`(B)\` ${c[1]}\n\`(C)\` ${c[2]}\n\`(D)\` ${c[3]}\n\`(E)\` ${c[4]}`)
                            .setColor("RED")
                            .setFooter(s);
                    };
                };
                try {
                    await i.update({ content: `**${p}**`, embeds: [e], components: [b] });
                } catch (err) {
                    console.log(err);
                };
            });
        });
    },
};
