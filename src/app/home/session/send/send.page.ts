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

  constructor(private events: Events) { }

  ngOnInit() {
    this.messages = apiService.msgCache.get(utilService.userId)
    this.events.subscribe(utilService.userId, (msg: Message.AsObject) => {
      this.messages.push(msg)
    });
  }

  send() {
    let tsMessage = new Message();
    tsMessage.setContent(this.message.content);
    tsMessage.setFrom(apiService.getUser().id);
    tsMessage.setTo(utilService.userId);
    let tt = new Timestamp();
    tt.fromDate(new Date())
    tsMessage.setCreated(tt);
    apiService.messageClient.send(tsMessage, apiService.metaData, (err: grpcWeb.Error, e: any) => {
      if (err) {
        alert(err.code + ':' + err.message);
      }
    })
  }

}
