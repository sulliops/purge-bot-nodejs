// Required variables
require("dotenv").config()
const Discord = require("discord.js")
const fs = require("fs")
const client = new Discord.Client()

// Prefix
const prefix = ("!purge")

// Timestamp variable
const timestamp = getDateTime()

// Bot ID variable
const idPurgeBot = "724720750774321192"

// On bot ready function
client.on("ready", () => {
  console.log(`Bot successfully logged in as @${client.user.tag}.`)
})

// Function to get current date and time
function getDateTime() {
  var date = new Date();
  var hour = date.getHours();
  hour = (hour < 10 ? "0" : "") + hour;
  var min = date.getMinutes();
  min = (min < 10 ? "0" : "") + min;
  var sec = date.getSeconds();
  sec = (sec < 10 ? "0" : "") + sec;
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  month = (month < 10 ? "0" : "") + month;
  var day = date.getDate();
  day = (day < 10 ? "0" : "") + day;
  return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;
}

// Command functions
client.on('message', function (message) {

  // Ping command
  if (message.content.startsWith(prefix) && message.content.includes("ping")) {
    message.channel.send(`If you're seeing this, the bot works.`)
  }

  // Restart command
  if (message.content.startsWith(prefix) && message.content.includes("restart")) {
    if (message.guild.me.hasPermission('ADMINISTRATOR')) {
      if (message.member.hasPermission('ADMINISTRATOR') || message.member.hasPermission('MANAGE_MESSAGES')) {
        message.channel.send(`**${timestamp}: \`${prefix} restart\`:** ${message.author} restarted the bot.`)
        resetBot(message.channel);
        function resetBot(channel) {
          message.channel.send(`**${timestamp}: \`${prefix} restart\`:** The bot is restarting.`)
            .then(msg => client.destroy())
            .then(() => client.login(process.env.BOT_TOKEN))
            .then(message.channel.send(`**${timestamp}: \`${prefix} restart\`:** The bot restarted successfully as <@${idPurgeBot}>.`))
        }
      } else {
        message.channel.send(`You don't have permission to execute this command.`)
      }
    } else {
      message.channel.send(`Purge Bot somehow doesn't have the necessary permissions to execute this command. Ensure the bot has an administrator role.`)
    }
  }

  // Delete channel command
  if (message.content.startsWith(prefix) && message.content.includes("channel")) {
    if (message.guild.me.hasPermission('ADMINISTRATOR')) {
      if (message.member.hasPermission('ADMINISTRATOR') || message.member.hasPermission('MANAGE_MESSAGES')) {
        message.channel.send(`What's the name of the channel you wish to delete? Use \`${prefix} cancel\` to cancel.`)
        const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 10000 });
        console.log(collector)
        collector.on('collect', message => {
          if (message.content.startsWith(prefix) && message.content.includes("cancel")) {
            message.channel.send(`Operation cancelled.`)
          } else {
            var delChannelName = message.guild.channels.cache.find(channel => channel.name === message.content.trim());
            if (typeof delChannelName == 'undefined') {
              message.channel.send(`There is no channel by that name. Operation cancelled.`)
            } else {
              delChannelName.delete()
              message.channel.send(`Channel "${message.content.trim()}" deleted.`)
            }
          }
          collector.stop()
        })
      } else {
        message.channel.send(`You don't have permission to execute this command.`)
      }
    } else {
      message.channel.send(`Purge Bot somehow doesn't have the necessary permissions to execute this command. Ensure the bot has an administrator role.`)
    }
  }

  // Deletelast command
  if (message.content.startsWith(prefix) && message.content.includes("last")) {
    if (message.guild.me.hasPermission('ADMINISTRATOR')) {
      if (message.member.hasPermission('ADMINISTRATOR') || message.member.hasPermission('MANAGE_MESSAGES')) {
        message.channel.bulkDelete(2)
      } else {
        message.channel.send(`You don't have permission to execute this command.`)
      }
    } else {
      message.channel.send(`Purge Bot somehow doesn't have the necessary permissions to execute this command. Ensure the bot has an administrator role.`)
    }
  }

  // Deletebulk command
  if (message.content.startsWith(prefix) && message.content.includes("bulk")) {
    if (message.guild.me.hasPermission('ADMINISTRATOR')) {
      if (message.member.hasPermission('ADMINISTRATOR') || message.member.hasPermission('MANAGE_MESSAGES')) {
        message.channel.send(`How many messages (1-95) would you like to delete? Use \`${prefix} cancel\` to cancel.`);
        const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 10000 });
        console.log(collector)
        collector.on('collect', message => {
          if (message.content.trim() === `${prefix} cancel`) {
            message.channel.send(`Operation cancelled.`)
          } else {
            if (isNaN(message.content.trim())) {
              message.channel.send(`Response must contain only a number between 1 and 95. Operation cancelled.`)
            } else {
              if (message.content.trim() > 95) {
                message.channel.send(`You cannot delete more than 95 messages. Operation cancelled.`)
              } else if (message.content.trim() < 1) {
                message.channel.send(`Answer cannot be less than 1. Operation cancelled.`)
              } else {
                var originalNum = parseFloat(message.content.trim())
                var numBulkDelete = parseFloat(3) + originalNum
                message.channel.bulkDelete(numBulkDelete).catch(err => message.channel.send(`Error: messages older than 14 days cannot be deleted by this bot. Operation cancelled.`))
              }
            }
          }
          collector.stop()
        })
      } else {
        message.channel.send(`You don't have permission to execute this command.`)
      }
    } else {
      message.channel.send(`Purge Bot somehow doesn't have the necessary permissions to execute this command. Ensure the bot has an administrator role.`)
    }
  }

  // Info command
  if (message.content.startsWith(prefix) && message.content.includes("info")) {
    const exampleEmbed = new Discord.MessageEmbed()
      .setColor('#7aa79e')
      .setTitle('Info')
      .setAuthor('Purge Bot', 'https://i.imgur.com/Cy4pnDN.png')
      .addFields(
        { name: 'Bot version:', value: '1.0.5' },
        { name: 'discord.js version:', value: '12.2.0 (stable)' },
        { name: 'Created by:', value: 'Owen Sullivan: https://sulliops.co' },
        { name: 'Commands list:', value: `Use \`${prefix} commands\`` },
      )
      .setTimestamp()

    message.channel.send(exampleEmbed);
  }

  // Help command
  if (message.content.startsWith(prefix) && message.content.includes("help")) {
    const exampleEmbed = new Discord.MessageEmbed()
      .setColor('#7aa79e')
      .setTitle('Help')
      .setAuthor('Purge Bot', 'https://i.imgur.com/Cy4pnDN.png')
      .addFields(
        { name: 'For support:', value: 'Fill out the contact form at https://sulliops.co/#contact' },
        { name: 'Full documentation:', value: 'https://sulliops.co/purge-bot/#documentation' },
        { name: 'Commands list:', value: `Use \`${prefix} commands\`` },
      )
      .setTimestamp()

    message.channel.send(exampleEmbed);
  }

  // Invite command
  if (message.content.startsWith(prefix) && message.content.includes("invite")) {
    const exampleEmbed = new Discord.MessageEmbed()
      .setColor('#7aa79e')
      .setTitle('Invite Bot')
      .setAuthor('Purge Bot', 'https://i.imgur.com/Cy4pnDN.png')
      .addFields(
        { name: 'Invite link:', value: 'To invite the bot to your server, use this invite link: https://discord.com/api/oauth2/authorize?client_id=724720750774321192&permissions=8&scope=bot' },
      )
      .setTimestamp()

    message.channel.send(exampleEmbed);
  }

  // Command list command
  if (message.content.startsWith(prefix) && message.content.includes("commands")) {
    const exampleEmbed = new Discord.MessageEmbed()
      .setColor('#7aa79e')
      .setTitle('Commands list')
      .setDescription('Commands marked with \'*\' can only be used by users with certain permissions.')
      .setAuthor('Purge Bot', 'https://i.imgur.com/Cy4pnDN.png')
      .addFields(
        { name: `${prefix} info`, value: 'Shows information about the bot.' },
        { name: `${prefix} help`, value: 'Shows support information.' },
        { name: `${prefix} commands`, value: 'Shows the various commands the bot can perform.' },
        { name: `${prefix} ping`, value: 'Pings the bot.' },
        { name: `${prefix} invite`, value: 'Displays the bot\'s invite link.' },
        { name: `*${prefix} last`, value: 'Deletes the previous message in a channel.' },
        { name: `*${prefix} bulk`, value: 'Deletes multiple (1-95) messages in a channel.' },
        { name: `*${prefix} channel`, value: 'Deletes a channel.' },
        { name: `*${prefix} restart`, value: 'Restarts the bot.' },
      )
      .setTimestamp()

    message.channel.send(exampleEmbed);
  }
});

// Login
client.login(process.env.BOT_TOKEN)
