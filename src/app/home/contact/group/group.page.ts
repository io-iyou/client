import * as grpcWeb from 'grpc-web';
import { User } from '../../../../sdk/user_pb';
import { Group } from '../../../../sdk/group_pb';
import { Component, OnInit } from '@angular/core';
import { apiService } from '../../../service/api.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.page.html',
  styleUrls: ['./group.page.scss'],
})
export class GroupPage implements OnInit {
  users: User.AsObject[] = []

  constructor() { }

  ngOnInit() {
    let stream = apiService.userClient.list((new User), apiService.metaData);
    stream.on('data', response => {
      let user = response.toObject();
      user['isChecked'] = true;
      this.users.push(user);
    });
    stream.on('error', err => {
      alert(JSON.stringify(err));
    });
  }

  add() {
    let tsGroup = new Group();
    tsGroup.setName('group-' + new Date());
    for (let j = 0; j < this.users.length; j++) {
      let user = this.users[j];
      if (user['isChecked']) {
        //alert(user.name);
        tsGroup.addMembers(user.id);
      }
    }
    apiService.groupClient.add(tsGroup, apiService.metaData, (err: grpcWeb.Error, response: Group) => {
      if (err) {
        alert(JSON.stringify(err));
      }
    });
  }
}
