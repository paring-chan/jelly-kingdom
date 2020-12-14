import { AkairoClient } from "discord-akairo";

export default class Client extends AkairoClient {
    constructor() {
        super({
            disableMentions: 'everyone',
        });
    }
}