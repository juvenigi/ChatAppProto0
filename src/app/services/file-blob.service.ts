import {inject, Injectable} from '@angular/core';
import {RtcService} from "./rtc.service";
import {saveAs} from "file-saver";


export enum RTCHandshakeState {
  OFFER = "OFFER",
  ANSWER = "ANSWER",
  ACK = "ACK"
}

@Injectable({
  providedIn: 'root'
})
export class FileBlobService {

  private rtcService = inject(RtcService);

  /**
   * create a file from offer/answer
   */
  private serializeRtcConfig(cfg: any) {
    const blob: Blob = new File([JSON.stringify(cfg)], 'candidate.json', {type: "text/json"});
    saveAs(blob);
  }

// TODO check mime type, further validation, etc...
  public async getSerializedConfig(state: RTCHandshakeState, data?: File) {
    let string = data? await data.text() : '';
    switch (state) {
      case RTCHandshakeState.OFFER:
        this.rtcService.createOffer().then(offer => this.serializeRtcConfig(offer));
        break;
      case RTCHandshakeState.ANSWER:
        this.rtcService.setOfferAsRemote(string).then(ack => this.serializeRtcConfig(ack));
        break;
      default:
        throw new Error("Error: unsupported state" + state)
    }
  }

}
