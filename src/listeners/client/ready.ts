import {Listener} from "discord-akairo";
import {Message} from "discord.js";

export default class extends Listener {
    constructor() {
        super('client__ready', {
            emitter: 'client',
            event: 'ready'
        });
    }

    async exec() {
        console.log('Ready!')
    }
}