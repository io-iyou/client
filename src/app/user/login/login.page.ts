import * as grpcWeb from 'grpc-web';
import { Events } from '@ionic/angular';
import { Router } from '@angular/router';
import { User } from '../../../sdk/user_pb';
import { Component, OnInit } from '@angular/core';
import { apiService, utilService } from '../../service/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user = (new User()).toObject();

  constructor(
    private events: Events,
    private router: Router) { }

  ngOnInit() {
    if (utilService.getUser()) {
      this.router.navigateByUrl('/home');
    }
  }

  login() {
    const tsUser = new User();
    tsUser.setTelephone(this.user.telephone);
    tsUser.setPassword(this.user.password);
    apiService.userClient.login(tsUser, apiService.metaData, (err: grpcWeb.Error, response: User) => {
      if (err) {
        console.log(err.code, err.message);
        alert('手机号或密码不正确.');
      } else {
        utilService.setUser(response.toObject());
        this.events.publish('user:login', response.getName());
        this.router.navigateByUrl('/home');
      }
      console.log(response);
    })
  }

  signup() {
    this.router.navigateByUrl('/signup');
  }

  logout() {
    //utilService.logout();
  }
}
