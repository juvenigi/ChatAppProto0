import {inject, Injectable} from "@angular/core";
import {RtcConfigurationService} from "../factory/rtc-configuration.service";
import {saveAs} from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class RtcService {

  private rtcConnection = inject(RtcConfigurationService);


  public async createOffer() {
    return JSON.stringify(await this.rtcConnection.localOffer());
  }

  public async setOfferAsRemote(offer: any) {
    let deserializedOffer: any
    try {
      deserializedOffer = JSON.parse(offer ?? "{}");
    } catch (error) {
      console.debug("Failed to parse offer", error)
    }

    const answer = this.rtcConnection.respondToOffer(deserializedOffer);
    return JSON.stringify(answer);
  }

  public async setAnswerAsRemote(answer: any) {
    let deserializedAnswer: any
    try {
      deserializedAnswer = JSON.parse(answer ?? "{}");
    } catch (e) {
      console.debug("Failed to parse answer", e)
    }

    await this.rtcConnection.establishConnection(deserializedAnswer);
  }
}
