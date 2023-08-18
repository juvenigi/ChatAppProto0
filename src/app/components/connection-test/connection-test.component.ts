import {Component, inject} from '@angular/core';
import {RtcService} from "../../services/rtc.service";

@Component({
  selector: 'app-connection-test',
  templateUrl: './connection-test.component.html',
  styleUrls: ['./connection-test.component.css']
})
export class ConnectionTestComponent {
  thisMachine = false;
  connections  = [];
  rtcService = inject(RtcService);

  constructor() {
//  this.rtcService.getHub()
  }

}
