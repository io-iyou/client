import { Router } from '@angular/router';
import { Component, Injector } from '@angular/core';
import { Platform, MenuController, Events } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { utilService } from './service/api.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  user = utilService.getUser();
  public appPages = [
    {
      title: '账号',
      url: '/setting',
      icon: 'key'
    },
    {
      title: '对话',
      url: '/home',
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
    private router: Router,
    private injector: Injector,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
    this.listenForLoginEvents();

    if (!utilService.getUser()) {
      this.router.navigateByUrl('/login');
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleBlackTranslucent();
      this.splashScreen.hide();
    });
  }

  listenForLoginEvents() {
    this.events.subscribe('user:login', (username) => {
      this.user = utilService.getUser();
    });
  }

  // gotoSetting() {
  //   this.router.navigateByUrl("setting");
  //   this.injector.get(MenuController).close();
  // }
}