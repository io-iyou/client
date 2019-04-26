import { Router } from '@angular/router';
import { User } from '../../../sdk/user_pb';
import { Group } from '../../../sdk/group_pb';
import { Topic } from '../../../sdk/message_pb';
import { Component, OnInit } from '@angular/core';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import { apiService, utilService } from '../../service/api.service';

@Component({
  selector: 'app-session',
  templateUrl: './session.page.html',
  styleUrls: ['./session.page.scss'],
})
export class SessionPage implements OnInit {
  msgCache = utilService.msgCache;

  constructor(private router: Router) { }

  ngOnInit() {
    this.peersMessages();
    this.groupsMessages();
  }

  peersMessages() {
    let tsUser = new User();
    tsUser.setId(utilService.getUser().id);
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
      console.log(err);
      this.peersMessages();
    });


  }

  groupsMessages() {
    let stream = apiService.groupClient.list(new Empty(), apiService.metaData);
    stream.on('data', response => {
      let group = response.toObject();
      this.subscribeTopic(group);
    });
    stream.on('error', err => {
      console.log(err);
      this.groupsMessages();
    });
  }

  subscribeTopic(group: Group.AsObject) {
    let tsTopIc = new Topic();
    tsTopIc.setGroupid(group.id);
    let stream = apiService.messageClient.subscribe(tsTopIc, apiService.metaData);
    stream.on('data', response => {
      let topic = response.toObject();
      console.log(topic);
      if (this.msgCache.get(topic.groupid) == null) {
        this.msgCache.set(topic.groupid, []);
      }
      this.msgCache.get(topic.groupid).push(topic.message)
    });
    stream.on('error', err => {
      console.log(err);
      this.subscribeTopic(group);
    });
  }

  gotoSend(userId: string) {
    utilService.userId = userId;
    this.router.navigateByUrl('send');
  }
}
