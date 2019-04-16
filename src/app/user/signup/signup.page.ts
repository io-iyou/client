import * as grpcWeb from 'grpc-web';
import { Router } from '@angular/router';
import { User } from '../../../sdk/user_pb';
import { Component, OnInit } from '@angular/core';
import { apiService } from '../../service/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  user = (new User()).toObject();

  constructor(private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.router.navigateByUrl('/login');
  }

  signup() {
    if (!this.user.telephone) {
      alert('请输入电话！');
      return
    }
    const tsUser = new User();
    tsUser.setName(this.user.name);
    tsUser.setTelephone(this.user.telephone);
    tsUser.setPassword(this.user.password);
    apiService.userClient.add(tsUser, apiService.metaData, (err: grpcWeb.Error, response: User) => {
      if (err) {
        alert(err.message);
      } else {
        this.router.navigateByUrl('/login');
      }
      console.log(response);
    })
  }
}
