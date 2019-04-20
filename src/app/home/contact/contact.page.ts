import { User } from '../../../sdk/user_pb';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { apiService, utilService } from '../../service/api.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  users: User.AsObject[] = []

  constructor(private router: Router) { }

  ngOnInit() {
    var i = 0;
    let stream = apiService.userClient.list((new User), apiService.metaData);
    stream.on('data', response => {
      this.users[i] = response.toObject();
      //this.loadDistance(this.orders[i]);
      i++;
      //this.orders = this.orders.slice(0, i);
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
