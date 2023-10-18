import type * as Party from "partykit/server";

export default class Server implements Party.Server {
  constructor(readonly party: Party.Party) {}

  // optimistic start :)
  aduk = false;

  onConnect(conn: Party.Connection, ctx: Party.ConnectionContext) {
    conn.send(JSON.stringify({ aduk: this.aduk }));
  }

  onMessage(message: string, sender: Party.Connection) {
    try {
      const { aduk } = JSON.parse(message);
      if (typeof aduk === "boolean") {
        this.aduk = aduk;
        this.party.broadcast(JSON.stringify({ aduk, sender: sender.id }));
      }
    } catch (e) {
      console.log(e);
    }
  }
}

Server satisfies Party.Worker;
