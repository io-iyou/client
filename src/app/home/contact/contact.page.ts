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
    this.loadGroups();
    this.loadUsers();
  }

  loadGroups() {
    let stream = apiService.groupClient.list((new Group), apiService.metaData);
    stream.on('data', response => {
      this.groups.push(response.toObject());
    });
    stream.on('error', err => {
      alert(JSON.stringify(err));
      this.loadGroups();
    });
  }

  loadUsers() {
    let stream = apiService.userClient.list((new User), apiService.metaData);
    stream.on('data', response => {
      let user = response.toObject();
      user['isDisplay'] = false;
      this.users.push(user);
    });
    stream.on('error', err => {
      alert(JSON.stringify(err));
      this.loadUsers();
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
