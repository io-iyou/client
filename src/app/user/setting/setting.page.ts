import * as grpcWeb from 'grpc-web';
import { Router } from '@angular/router';
import { User } from '../../../sdk/user_pb';
import { Component, OnInit } from '@angular/core';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { apiService, utilService } from '../../service/api.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
  user = (new User).toObject();

  constructor(
    private router: Router,
    private imagePicker: ImagePicker) { }

  ngOnInit() {
  }

  select() {
    let options = {
      // Android only. Max images to be selected, defaults to 15. If this is set to 1, upon
      // selection of a single image, the plugin will return it.
      maximumImagesCount: 1,

      // max width and height to allow the images to be.  Will keep aspect
      // ratio no matter what.  So if both are 800, the returned image
      // will be at most 800 pixels wide and 800 pixels tall.  If the width is
      // 800 and height 0 the image will be 800 pixels wide if the source
      // is at least that wide.
      width: 100,
      height: 100,

      // quality of resized image, defaults to 100
      quality: 30,// (0-100),

      // output type, defaults to FILE_URIs.
      // available options are 
      // window.imagePicker.OutputType.FILE_URI (0) or 
      // window.imagePicker.OutputType.BASE64_STRING (1)
      outputType: 1
    };
    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        console.log('Image URI: ' + results[i]);
        this.user.icon = results[i];
      }
    }, (err) => { });
  }

  upload() {
    if (!utilService.getUser()) {
      alert('请登录');
      return
    }
    let tsUser = new User();
    tsUser.setId(utilService.getUser().id);
    tsUser.setIcon(this.user.icon);
    tsUser.setSignature(this.user.signature);
    apiService.userClient.update(tsUser, apiService.metaData, (err: grpcWeb.Error, response: User) => {
      if (err) {
        alert(JSON.stringify(err));
        //utilService.alert(JSON.stringify(err));
      } else {
        //alert(JSON.stringify(this.article));
        //this.modalController.dismiss();
        this.router.navigateByUrl('home');
      }
    })

  }
}
