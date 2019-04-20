import * as grpcWeb from 'grpc-web';
import { Events } from '@ionic/angular';
import { User } from '../../../../sdk/user_pb';
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
  messages: Message.AsObject[] = []
  message = (new Message).toObject();
  peerUserId: string;

  constructor(private events: Events) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.peerUserId = utilService.userId;
    this.messages = apiService.msgCache.get(this.peerUserId)
    this.events.subscribe(this.peerUserId, (msg: Message.AsObject) => {
      console.log("event:", msg);
      if (this.messages == null) {
        this.messages = [];
      }
      this.messages.push(msg)
    });
  }

  ionViewWillLeave() {
    this.events.unsubscribe(this.peerUserId);
  }

  send() {
    let tsMessage = new Message();
    tsMessage.setContent(this.message.content);
    tsMessage.setFrom(apiService.getUser().id);
    tsMessage.setTo(this.peerUserId);
    let tt = new Timestamp();
    tt.fromDate(new Date())
    tsMessage.setCreated(tt);
    apiService.messageClient.send(tsMessage, apiService.metaData, (err: grpcWeb.Error, e: any) => {
      if (err) {
        alert(err.code + ':' + err.message);
      }
    });
    this.events.publish(tsMessage.toObject().to, tsMessage.toObject());
    this.message.content = '';
  }
}
