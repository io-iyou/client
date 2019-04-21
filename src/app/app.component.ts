import { Component } from '@angular/core';
import { Platform, Events } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { utilService } from './service/api.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  username = '登录';
  public appPages = [
    {
      title: '账号',
      url: '/home',
      icon: 'key'
    },
    {
      title: '对话',
      url: '/list',
      icon: 'list-box'
    },
    {
      title: '通知',
      url: '/list',
      icon: 'notifications'
    },
    {
      title: '帮助',
      url: '/list',
      icon: 'help'
    }
  ];

  constructor(
    private events: Events,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
    this.listenForLoginEvents();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleBlackTranslucent();
      this.splashScreen.hide();
    });
  }

  listenForLoginEvents() {
    this.events.subscribe('user:login', (username) => {
      this.username = username;
    });
    if (utilService.getUser()) {
      this.username = utilService.getUser().name;
    }
  }
}
