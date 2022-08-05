# Purge Bot Documentation

## Information:
Purge Bot is a simple Discord bot built in `node.js` with a single purpose: erase. It possesses three primary capibilities: erase the last message in a channel, erase messages in bulk, and erase entire channels.

This documentation serves as a companion to the `!purge commands` list, providing extra context for commands and their abilities (as well as how to properly take adventage of them).

Purge Bot was created by <a href="https://sulliops.co">Owen Sullivan</a> as an alternative to widely used moderation bots with the idea that simplicity is key. While other moderation/cleanup bots have a variety of options for more advanced users, they can end up being difficult to understand for users who just want an easy experience. Purge Bot guides users through every step of each command (where necessary), allowing for more user-friendly moderation.

## Notes:
**Note:** All commands begin with the prefix <code>!purge</code>. Since there are no options to be passed to any available command, the bot will recognize all messages beginning with the prefix and including a valid command name as commands.

**Note:** Upon joining a server, the bot will outfit itself with a configuration role that gives the bot Administrator permissions. Should this role somehow be removed, any role with Administrator permissions will suffice. Commands will not work without Administrator permissions.

**Note:** Commands in **bold** can only be executed by users with permissions corresponding to the command's function, or by users with the Administrator permission.

## Command List:

* *Info:* Using `!purge info` will display an information panel with details about the bot's version, the bot's `discord.js` version, the bot's creator, and the `!purge commands` command.

* *Help:* Using `!purge help` will display an information panel with a link to the bot creator's contact form, a link to this documentation, and the `!purge commands` command.

* *Commands:* Using `!purge commands` will display an information panel with a list of commands with basic information about their uses.

* *Ping:* Using `!purge ping` will ping the bot to ensure it's online, and return a message to confirm its status.

* *Invite:* Using `!purge invite` will display an information panel with an invite link so that the bot may be added to other servers.

* ***Last:*** Using `!purge last` will delete the most recent message in a channel before the message containing the command. From a technical standpoint, it deletes two messages; from a practical standpoint, it deletes one previous message.

* ***Bulk:*** Using `!purge bulk` will prompt the user who executed the command to input a number between 1 and 95. Upon the user's numerical response, the bot will delete as many messages as were specified in the response plus the 3 messages necessary to initiate the operation (thus the 95 message cap). If the operation would try to delete messages that are older than 14 days, the operation will not complete successfully and the bot will provide an explanation as to why the operation did not complete successfully.

* ***Channel:*** Using `!purge channel` will prompt the user who executed the command to input the name of the channel they wish to delete. Upon the user's response, so long as the channel exists, the bot will delete the channel. If the channel does not exist, the operation will not complete successfully and the bot will provide an explanation as to why the operation did not complete successfully. If there is more than one channel by the same name, the bot will default to whichever channel comes first in the API channels array. To avoid accidentally deleting the wrong channel when two or more channels share the same name, the channel one wishes to delete should be renamed to a unique name prior to executing this command.

* ***Restart:*** Using `!purge restart` will restart the bot's `node.js` instance and provide a log of the restart event in whichever channel the command was executed in.
