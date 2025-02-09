exports.run = async (client: any, message: any, args: string[]) => {

  let ownerID: any = process.env.OWNER_ID;
  const rebootEmbed: any = client.createEmbed();

  const unloadCommand: any = async (commandName: string) => {
    let command: any;
    if (client.commands.has(commandName)) {
      command = client.commands.get(commandName);
    } else if (client.aliases.has(commandName)) {
      command = client.commands.get(client.aliases.get(commandName));
    }
    if (!command) return `The command \`${commandName}\` could not be found.`;
  
    if (command.shutdown) {
      await command.shutdown(client);
    }
  
    const mod: any = require.cache[require.resolve(`../commands/$${commandName}`)];
    delete require.cache[require.resolve(`../commands/${commandName}.js`)];
    for (let i = 0; i < mod.parent.children.length; i++) {
      if (mod.parent.children[i] === mod) {
        mod.parent.children.splice(i, 1);
        break;
      }
    }
    return false;
  };

    if (message.author.id === ownerID) {

      await message.channel.send(rebootEmbed
      .setDescription("Bot is shutting down."));

      await Promise.all(client.commands.map((cmd: any) =>
        unloadCommand(cmd)
      ));
      process.exit(0);
    } else {
      message.channel.send(rebootEmbed
          .setDescription("In order to use this command, you must be a bot owner."))
          return;
    }
  };