import { User } from '../../../../sdk/user_pb';
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
      this.users.push(response.toObject());
      //this.loadDistance(this.orders[i]);
      //this.orders = this.orders.slice(0, i);
    });
    stream.on('error', err => {
      alert(JSON.stringify(err));
      //this.load();
    });
  }

}
