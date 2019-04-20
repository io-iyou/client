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
  msgCache = apiService.msgCache;

  constructor(private router: Router) { }

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
      console.log(msg);
      if (this.msgCache.get(msg.from) == null) {
        this.msgCache.set(msg.from, []);
      }
      this.msgCache.get(msg.from).push(msg)
    });
    stream.on('error', err => {
      alert(JSON.stringify(err));
      this.ngOnInit();
    });
  }

  gotoSend(userId: string) {
    utilService.userId = userId;
    this.router.navigateByUrl('send');
  }
}
