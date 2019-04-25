import { User } from '../../../sdk/user_pb';
import { Group } from '../../../sdk/group_pb';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { apiService, utilService } from '../../service/api.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  users: User.AsObject[] = [];
  groups: Group.AsObject[] = [];

  constructor(private router: Router) { }

  ngOnInit() {
    let stream1 = apiService.groupClient.list((new Group), apiService.metaData);
    stream1.on('data', response => {
      this.groups.push(response.toObject());
    });
    stream1.on('error', err => {
      alert(JSON.stringify(err));
      //this.load();
    });

    let stream = apiService.userClient.list((new User), apiService.metaData);
    stream.on('data', response => {
      this.users.push(response.toObject());
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

  gotoGroup() {
    this.router.navigateByUrl('group');
  }
}
