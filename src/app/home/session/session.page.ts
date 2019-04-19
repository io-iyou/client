import { Router, NavigationExtras } from '@angular/router';
import { User } from '../../../sdk/user_pb';
import { Events } from '@ionic/angular';
import { Message } from '../../../sdk/message_pb';
import { Component, OnInit } from '@angular/core';
import { apiService, utilService } from '../../service/api.service';

@Component({
  selector: 'app-session',
  templateUrl: './session.page.html',
  styleUrls: ['./session.page.scss'],
})
export class SessionPage implements OnInit {
  // users: User.AsObject[] = [];
  // messages: Message.AsObject[] = []
  msgCache = apiService.msgCache;//new Map<string, Message.AsObject[]>();

  constructor(
    private router: Router,
    private events: Events, ) { }

  ngOnInit() {
    if (!apiService.getUser().id) {
      alert('请登录');
      return
    }
    let tsUser = new User();
    tsUser.setId(apiService.getUser().id)
    let stream = apiService.messageClient.receive(tsUser, apiService.metaData);
    stream.on('data', response => {
      let msg = response.toObject();
      if (this.msgCache.get(msg.from) == null) {
        // apiService.msgCache.set(msg.from, []);
        this.msgCache.set(msg.from, []);
      }
      // apiService.msgCache.get(msg.from).push(msg);
      this.msgCache.get(msg.from).push(msg)
      this.events.publish(msg.from, msg);
    });
    stream.on('error', err => {
      alert(JSON.stringify(err));
      //this.load();
    });
  }

  gotoSend(userId: string) {
    utilService.userId = userId;
    this.router.navigateByUrl('send');
  }

}
