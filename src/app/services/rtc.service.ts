import {Injectable} from "@angular/core";
import {NetworkHub, Node} from "smoke-node";

@Injectable({
  providedIn: 'root'
})
export class RtcService {


  private connection = {
    url: "ws://localhost",
    port: 5050
  }

  constructor() {
    const endpoint = this.connection.url + ':' + this.connection.port;
    console.debug('connecting to hub:');
    const hub = new NetworkHub(endpoint);
    console.debug('instantiating nodes');
    let node1 = new Node({hub: hub});
    const socketPort = 1234;

    // console.debug("peers");
    // const peersSize = node1.network.getPeers().size;
    console.debug('creating server:');
    node1.sockets.createServer(client => {
      client.send("Hello there!");
      client.send("Hello");
      client.close();
    }).listen(socketPort);

    console.debug("connecting to server: ");
    node1.hub.address().then(selfAddress => {

      console.debug(selfAddress);
      node1.sockets.connect('3.0.0.0',socketPort).on("message", console.info);
      // node1.hub.configuration().then(console.debug);
      //
      // let peers = node1.network.getPeers();
      // console.debug(peers);
      // console.debug(selfAddress);
    });
  }
}
