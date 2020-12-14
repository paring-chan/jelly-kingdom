import {Command} from "discord-akairo";
import {Message} from "discord.js";

export default class extends Command {
    constructor() {
        super('owner__dokdo', {
            aliases: ['dok', 'dokdo']
        });
    }

    exec(msg: Message, args: any): any {}
}