import * as grpcWeb from 'grpc-web';
import { Events } from '@ionic/angular';
import { Message } from '../../../../sdk/message_pb';
import { Component, OnInit } from '@angular/core';
import { apiService, utilService } from '../../../service/api.service';
import { Timestamp } from 'google-protobuf/google/protobuf/timestamp_pb';

@Component({
  selector: 'app-send',
  templateUrl: './send.page.html',
  styleUrls: ['./send.page.scss'],
})
export class SendPage implements OnInit {
  messages: Message.AsObject[];
  message = (new Message).toObject();
  peerUserId: string;

  constructor(private events: Events) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.peerUserId = utilService.userId;
    if (utilService.msgCache.get(this.peerUserId) == null) {
      utilService.msgCache.set(this.peerUserId, []);
    }
    this.messages = utilService.msgCache.get(this.peerUserId);
  }

  send() {
    let tsMessage = new Message();
    tsMessage.setContent(this.message.content);
    tsMessage.setFrom(utilService.getUser().id);
    tsMessage.setTo(this.peerUserId);
    let tt = new Timestamp();
    tt.fromDate(new Date())
    tsMessage.setCreated(tt);
    apiService.messageClient.send(tsMessage, apiService.metaData, (err: grpcWeb.Error, e: any) => {
      if (err) {
        alert(err.code + ':' + err.message);
      }
    });
    this.messages.push(tsMessage.toObject());
    this.message.content = '';
  }
}
