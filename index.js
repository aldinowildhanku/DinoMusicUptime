const Discord = require("discord.js")
const client = new Discord.Client({
    restTimeOffset: 0,
    disableMentions: "everyone"
})
const cron = require("cron");
const Distube = require("distube")
const distube = new Distube(client, { searchSongs: false, emitNewSongOnly: true,leaveOnFinish:false ,leaveOnEmpty: true, youtubeDL:true, updateYouTubeDL: false,highWaterMark: 1<<25})

const { token, prefix, apiKey } = require("./config.json")
const filters = ["3d","bassboost","echo","karaoke","nightcore","vaporwave","flanger"];
const server = client.guilds.cache.size;
let statuses = ["-help 👋🏻",`Music on ${server} servers 🤖` ,"Online 24 Jam 🕛"]
client.once("ready", () => {
    console.log(`${client.user.tag} has loggin bot`)
    setInterval(function(){

        let status = statuses[Math.floor(Math.random()*statuses.length)]
        client.user.setPresence({activity: {name: status,type: 'LISTENING'}, status:'online'})
    },3000)
    // client.user.setActivity({ type: "LISTENING", name: `music on ${server} servers` })

    const guild = client.guilds.cache.get('795293564623519814');
    const channel = guild.channels.cache.get('986892259062611989');
    channel.send('@everyone ');
    channel.send('Dino Musik UP Kembali');

    let scheduledMessage = new cron.CronJob('30 10 * * *', () => {
        const guild = client.guilds.cache.get('795293564623519814');
        const channel = guild.channels.cache.get('986892259062611989');
        channel.send('**Dino Musik** is scheduled to restart at 18.00 WIB.');
    });
    scheduledMessage.start()

    let scheduledMessage2 = new cron.CronJob('45 10 * * *', () => {
        const guild = client.guilds.cache.get('795293564623519814');
        const channel = guild.channels.cache.get('986892259062611989');
        channel.send('**Dino Musik** is scheduled to restart in 15 Minute.');
    });
    scheduledMessage2.start()

    let scheduledMessage3 = new cron.CronJob('55 10 * * *', () => {
        const guild = client.guilds.cache.get('795293564623519814');
        const channel = guild.channels.cache.get('986892259062611989');
        channel.send('**Dino Musik** is scheduled to restart in 5 Minute.');
    });
    scheduledMessage3.start()

    let scheduledMessage4 = new cron.CronJob('59 10 * * *', () => {
        const guild = client.guilds.cache.get('795293564623519814');
        const channel = guild.channels.cache.get('986892259062611989');
        channel.send('**Dino Musik** is scheduled to restart in 1 Minute.');
    });
    scheduledMessage4.start()

    let scheduledMessage5 = new cron.CronJob('00 11 * * *', () => {
        const guild = client.guilds.cache.get('795293564623519814');
        const channel = guild.channels.cache.get('986892259062611989');
        channel.send('**Dino Musik** is Restatring. . . . .')
    });
    scheduledMessage5.start()
    
})

const {Configuration, OpenAIApi} = require('openai');

const configuration = new Configuration({
    apiKey: apiKey,
});

const openai = new OpenAIApi(configuration);


client.on("message", async message => {
    if(message.author.bot){ return; }
    if(!message.guild) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (!command) return
    if(message.content.startsWith(prefix)){
        if(command === "say"){
            const user = message.author.username
            var text = message.content.split(' ').slice(1).join(' ');
            if(!text) return message.reply('Spicify')
             message.delete();
             var embed = new Discord.MessageEmbed()
                    .setAuthor(`Notification From ${user}`, message.author.displayAvatarURL({format: "gif",format : "png", dynamic : "true"}))
                    .setColor(0x00FFB8)
                    .setDescription(`${text}`)
                    .setTimestamp()
                    .setFooter('©!Mas Din#8216 • 1.1')
                    message.channel.send(embed)
        }
    // if (!message.member.voice.channel && command) return message.channel.send(`Kamu Harus Memasuki Voice Channel`)
    if(command === "help"){
        let embedhelp = new Discord.MessageEmbed()
        .setTitle("Donasi Pengembangan Dino Musik")
        .setURL('https://saweria.co/dinoku')
        .setColor("RANDOM")
        .setAuthor(`Request From ${message.author.username}`, message.author.displayAvatarURL({format: "gif",format : "png", dynamic : "true"}))
        .addField("Play Music & Add Music","``-play atau -p``", true)
        .addField("Search Music","``-search``", true)
        .addField("Now Playing","``-np``", true)
        .addField("Skip Music","``-skip atau -s``", true)
        .addField("List Queue","``-queue``", true)
        .addField("Stop Music","``-stop atau -leave``", true)
        // .addField("Pause Music","``-pause``", true)
        // .addField("Resume Music","``-resume``", true)
        .addField("Setting Volume","``-volume``", true)
        .addField("Music Loop","``-loop``", true)
        .addField("Seek","``-seek``", true)
        .addField("Autoplay","``-autoplay``", true)
        .addField("Jump","``-jump``", true)
        .addField("Chat AI","``-askdino``", true)
        .setTimestamp()
        .setFooter('©!Mas Din#8216 • 1.1')
        // return embedbuilder(client, message, `sBLUE`, `PING:`, `\`${client.ws.ping} ms\``)
        message.channel.send(embedhelp)
    }

    if (command == "askdino" || command=="askDino"){
        if(message.author.bot) return;
        const res = await openai.createCompletion({
            model: "text-davinci-002",
            max_tokens: 1000,
            temperature: 0.1,
            prompt: `Chat GPT is friendly chatbot.\n\
            ChatGPT : Hello there!\n\
            ${message.author.username}: ${message.content}\n\
            ChatGPT:`,
            stop: ["ChatGPT:", `${message.author.username}`]
            
        });
    
        message.channel.send({content: `${res.data.choices[0].text}`});
    }

    if(command === "play" || command === "p"){
        if (!message.member.voice.channel && command){
            return message.channel.send(`Kamu Harus Memasuki Voice Channel`)
        }else{
            embedbuilder(client, message, "YELLOW", "🔍Sedang Mencari!", args.join(" "))
        }
        
        return distube.play(message, args.join(" "));
    }

    if (command === "search" || command === "src") {

        // embedbuilder(client, message, "#fffff0", "Searching!", args.join(" "))

        let result = await distube.search(args.join(" "));

        let searchresult = "";

        for (let i = 0; i <= result.length; i++) {
            try {
                searchresult += await `**${i + 1}**. ${result[i].name} - \`${result[i].formattedDuration}\`\n`;
            } catch {
                searchresult += await " ";
            }
        }
        let searchembed = await embedbuilder(client, message, "#fffff0", "Current Queue!", searchresult)

        let userinput;

        await searchembed.channel.awaitMessages(m => m.author.id == message.author.id, { max: 1, time: 60000, errors: ["time"], }).then(collected => {
            userinput = collected.first().content;
            if (isNaN(userinput)) {
                embedbuilder(client, message, "RED", "Not a right number!", "so i use number 1!")
                userinput = 1;
            }
            if (Number(userinput) < 0 && Number(userinput) >= 15) {
                embedbuilder(client, message, "RED", "Not a right number!", "so i use number 1!")
                userinput = 1;
            }
            searchembed.delete({ timeout: Number(client.ws.ping) });
        }).catch(() => { console.log(console.error); userinput = 404 });
        if (userinput === 404) {
            return embedbuilder(client, message, "RED", "Something went wrong!")
        }
        embedbuilder(client, message, "#fffff0", "🔍Menambah Musik!", `[${result[userinput - 1].name}](${result[userinput - 1].url})`, result[userinput - 1].thumbnail)
        return distube.play(message, result[userinput - 1].url)
    }

    if(command === "np"){
        let qu = distube.getQueue(message)
        if(!qu) return embedbuilder(client, message, "RED", "There is nothing playing!");
        let curqu = qu.songs.map((song, id) =>
        `${song.name} - \`${song.formattedDuration}\``
        );
        return embedbuilder(client, message, "YELLOW", `🎵 Now Playing`,curqu)
       
    }

    if(command === "skip" || command === "s"){
        if (!message.member.voice.channel && command){
            return message.channel.send(`Kamu Harus Memasuki Voice Channel`)
        }else{
        embedbuilder(client, message, "YELLOW", "▶️ SKIPPED!", `Skipped the song`)
        }
        return distube.skip(message);
    } 
    if(command === "stop" || command === "leave"){
        if (!message.member.voice.channel && command){
            return message.channel.send(`Kamu Harus Memasuki Voice Channel`)
        }else{
        embedbuilder(client, message, "RED", "🚫 Stop!", `Meninggalkan Channel`)
        }
        return distube.stop(message);
    }

    // if(command === "pause"){
    //     if (!message.member.voice.channel && command){
    //         return message.channel.send(`Kamu Harus Memasuki Voice Channel`)
    //     }else{
    //     embedbuilder(client, message, "RANDOM", "⏸ Pause!", `Sedang Menjeda Lagu`)
    //     }
    //     return distube.pause(message);
    // }

    // if(command === "resume"){
    //     if (!message.member.voice.channel && command){
    //         return message.channel.send(`Kamu Harus Memasuki Voice Channel`)
    //     }else{
    //     embedbuilder(client, message, "RANDOM", "▶️ Resume!", `Melanjutkan Lagu`)
    //     }
    //     return distube.resume(message);
    // }

    if(command === "seek"){
        if (!message.member.voice.channel && command){
            return message.channel.send(`Kamu Harus Memasuki Voice Channel`)
        }else{
        embedbuilder(client, message, "GREEN", "Seeked!", `seeked the song for \`${args[0]} seconds\``)
        return distube.seek(message, Number(args[0]*1000));
        }
    }
    if (command === "autoplay" || command === "ap") {
        if (!message.member.voice.channel && command){
            return message.channel.send(`Kamu Harus Memasuki Voice Channel`)
        }else{
        let mode = distube.toggleAutoplay(message);
        return embedbuilder(client,message,"BLUE", "AUTOPLAY", "✅ Sukses Mengganti Autoplay Menjadi: `" + (mode ? "On" : "Off") + "`")
        }
    } 
    if(filters.includes(command)) {
        let filter = distube.setFilter(message, command);
        return embedbuilder(client, message, "YELLOW", "Adding filter!", filter)
    }
    if(command === "volume" || command === "vol"){
        if (!message.member.voice.channel && command){
            return message.channel.send(`Kamu Harus Memasuki Voice Channel`)
        }else{
        embedbuilder(client, message, "GREEN", "🔊 VOLUME!", `Mengganti Volume Menjadi \`${args[0]} %\``)
        return distube.setVolume(message, args[0]);
        }
    } 
    if (command === "queue" || command === "q"){

        let currentPage = 0;
        let queue = distube.getQueue(message);
        if (!queue) return embedbuilder(client, message, "RED", "There is nothing playing!");
       
        const embeds = QueueEmbed(queue.songs);
        const queueEmbed = await message.channel.send(`
        **Current Page - ${currentPage + 1}/${embeds.length}**`,
            embeds[currentPage]);

            try {
                await queueEmbed.react("⬅️");
                await queueEmbed.react("⏹");
                await queueEmbed.react("➡️");
            } catch (error) {
                console.error(error)
                
            }
            const filter = (reaction, user) =>
                ["⬅️", "⏹", "➡️"].includes(reaction.emoji.name) && message.author.id === user.id;
            const collector = queueEmbed.createReactionCollector(filter, { time: 60000 });
            collector.on("collect", async (reaction, user) => {
                try {
                    if (reaction.emoji.name === "➡️") {
                        if (currentPage < embeds.length - 1) {
                            currentPage++;
                            queueEmbed.edit(`**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds[currentPage]);
                        }
                    } else if (reaction.emoji.name === "⬅️") {
                        if (currentPage !== 0) {
                            --currentPage;
                            queueEmbed.edit(`**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds[currentPage]);
                        }
                    } else {
                        collector.stop();
                        reaction.message.reactions.removeAll();
                    }
                    await reaction.users.remove(message.author.id);
                } catch (error) {
                    console.error(error)
                    
                }
            })

        // let queue = distube.getQueue(message);
        // let curqueue = queue.songs.map((song, id) =>
        // `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``
        // ).join("\n");
        // return  embedbuilder(client, message, "GREEN", "Antrian Lagu Saat Ini!", curqueue)
    }
    if (command === "loop" || command === "repeat"){
        if(0 <= Number(args[0]) && Number(args[0]) <= 2){
            distube.setRepeatMode(message,parseInt(args[0]))
            embedbuilder(client, message, "GREEN", "🔂 Repeat mode set to:!", `${args[0].replace("0", "OFF").replace("1", "Repeat song").replace("2", "Repeat Queue")}`)
        }
        else{
            embedbuilder(client, message, "RED", "ERROR", `Mohon Masukan Nomor Di Antara **0** dan **2**   |   *(0: disabled, 1: Repeat a song, 2: Repeat all the queue)*`)
        }
    }
    if ( command === "jump"){
        let queue = distube.getQueue(message);
        if(0 <= Number(args[0]) && Number(args[0]) <= queue.songs.length){
            embedbuilder(client, message, "RED", "ERROR", `Jumped ${parseInt(args[0])} songs!`)
            return distube.jump(message, parseInt(args[0]))
            .catch(err => message.channel.send("Nomor Tidak Cocok"));
        }
        else{
            embedbuilder(client, message, "RED", "ERROR", `Please use a number between **0** and **${DisTube.getQueue(message).length}**   |   *(0: disabled, 1: Repeat a song, 2: Repeat all the queue)*`)
        }

    
    }
    }

})

//queue
const status = (queue) => `Volume: \`${queue.volume}\` | Filter: \`${queue.filter || "OFF"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode === 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``
//distube
distube
     .on("playSong", (message, queue, song) => {
        embedbuilder(client, message, "GREEN", "🎵 Memutar Lagu", `Song: [\`${song.name}\`](${song.url})  -  \`${song.formattedDuration}\` \n\nRequested by: ${song.user}\n${status(queue)}`, song.thumbnail)
     })
     .on("addSong", (message, queue, song) => {
        embedbuilder(client, message, "GREEN", "🎶 Menambah Lagu!", `Song: [\`${song.name}\`](${song.url})  -  \`${song.formattedDuration}\` \n\nRequested by: ${song.user}`)
     })
     .on("playList", (message, queue, playlist, song) => {
        embedbuilder(client, message, "GREEN", "Playling playlist", `Playlist: [\`${playlist.name}\`](${playlist.url})  -  \`${playlist.songs.length} songs\` \n\nRequested by: ${song.user}\n\nstarting playing Song: \`${song.name}\`  -  \`${song.formattedDuration}\`\n${status(queue)}`)
     })
     .on("addList", (message, queue, playlist) => {
        embedbuilder(client, message, "GREEN", "➕ Added a Playlist!", `Playlist: [\`${playlist.name}\`](${playlist.url})  -  \`${playlist.songs.length} songs\` to queue\n${status(queue)}`)
     })
     .on("searchResult", (message, result) => {
        let i = 0;
        embedbuilder(client, message, "YELLOW", "", `**Pilih Lagu Dibawah ini**\n${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*Masukan angka apapun terdapat di list, 60 detik akan terbatalkan sendiri*`)
    })
     // DisTubeOptions.searchSongs = true
     .on("searchCancel", (message) =>  embedbuilder(client, message, "RED", `❌ Searching Dibatalkan`, "")
     )
     .on("error", (message, err) => embedbuilder(client, message, "RED", "An error encountered:", err)
     )
     .on("empty", message => embedbuilder(client, message,"RANDOM","Channel Sedang Kosong, Bot Meninggalkan Channel"))
     .on("finish", message => embedbuilder(client,message,"RANDOM","Apakah Ada Lagu Lagi Yang Ingin Ditambahkan?"))
     .on("initQueue", queue => {
        queue.autoplay = false;
        queue.volume = 100;
    });
     


function embedbuilder(client, message, color, title, description,thumbnail){
    let embed = new Discord.MessageEmbed()
    .setColor(color)
    .setTimestamp()
    .setFooter('©!Mas Din#8216 • Version 1.1')
    if(title) embed.setTitle(title);
    if(description) embed.setDescription(description);
    if(thumbnail) embed.setThumbnail(thumbnail);
    return message.channel.send(embed);
}

function QueueEmbed(queue) {
    try{   let embeds = [];
    let k = 10;
    //defining each Pages
    for (let i = 0; i < queue.length; i += 10) {
        const current = queue.slice(i, k)
        let j = i;
        k += 10;
        const info = current.map((track) => `**${++j} -** [\`${track.name}\`](${track.url})`).join("\n")
        const embed = new Discord.MessageEmbed()
            .setTitle("Server Queue")
            .setColor("#fffff0")
            .setDescription(`**Current Song - [\`${queue[0].name}\`](${queue[0].url})**\n\n${info}`)
            .setFooter('©!Mas Din#8216 • Version 1.1')
        embeds.push(embed);
    }
    //returning the Embed
    return embeds;
}catch (error){
    console.error
 }

}

client.login(token)