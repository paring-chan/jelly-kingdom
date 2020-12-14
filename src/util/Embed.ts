import {Message, MessageEmbed} from "discord.js";

export default class Embed {
    static create(msg: Message) {
        return new MessageEmbed().setFooter(msg.author.tag, msg.author.displayAvatarURL({dynamic: true})).setTimestamp(Date.now())
    }
}