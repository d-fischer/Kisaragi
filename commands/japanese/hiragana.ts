import Kuroshiro from "kuroshiro";
import KuromojiAnalyzer from "kuroshiro-analyzer-kuromoji";

exports.run = async (client: any, message: any, args: string[]) => {
    const kuroshiro = new Kuroshiro();
    await kuroshiro.init(new KuromojiAnalyzer());

    let input = client.combineArgs(args, 1);
    let result = await kuroshiro.convert(input, {mode: "spaced", to: "hiragana"});
    let cleanResult = result.replace(/<\/?[^>]+(>|$)/g, "");

    let hiraganaEmbed = client.createEmbed();
    hiraganaEmbed
    .setAuthor("kuroshiro", "https://kuroshiro.org/kuroshiro.png")
    .setTitle(`**Hiragana Conversion** ${client.getEmoji("kannaSip")}`)
    .setDescription(`${client.getEmoji("star")}${cleanResult}`);
    message.channel.send(hiraganaEmbed);
}