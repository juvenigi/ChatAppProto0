import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class RtcConfigurationService {

  //TODO move configuration to environment vars
  private readonly configuration: RTCConfiguration = {iceServers: [{urls: 'stun: stun.l.google.com:19302'}]};
  private readonly peerConnection = new RTCPeerConnection(this.configuration);

  constructor() {
    this.logRtcEvents();
  }

  /**
   * Setup handler to deal with when a new IceCandidate is received
   * @private
   *
   */
  private logRtcEvents() {
    this.peerConnection.onicecandidate = (event: RTCPeerConnectionIceEvent) => console.debug(event);
    this.peerConnection.onconnectionstatechange = (event ) => console.debug(event);
  }

  public get rtcPeerConnection() {
    return this.peerConnection
  }

  /**
   * create an offer and set it as the local description
   */
  public async localOffer(): Promise<RTCSessionDescriptionInit> {
    console.debug('Step 1: LocalOffer');
    const offer = await this.peerConnection.createOffer()
    await this.peerConnection.setLocalDescription(offer);
    return offer;
  }

  public async respondToOffer(offer: any): Promise<RTCSessionDescriptionInit> {
    console.debug('Step 2: LocalOffer -> RemoteDescription');
    await this.peerConnection.setRemoteDescription(offer);
    const answer = await this.peerConnection.createAnswer();
    await this.peerConnection.setLocalDescription(answer);
    return answer;
  }

  public async establishConnection(answer: any): Promise<void> {
    await this.peerConnection.setRemoteDescription(answer);
  }
}
