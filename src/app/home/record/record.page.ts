import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Media } from '../../../sdk/multimedia_pb'


@Component({
  selector: 'app-record',
  templateUrl: './record.page.html',
  styleUrls: ['./record.page.scss'],
})
export class RecordPage {

  records = [];
  media = new Media();

  constructor(private camera: Camera) {
    this.records[0] = { "time": "04.01.2019", "title": "标题", "image": "http://i3.cqnews.net/xfsc/attachement/jpg/site82/20110720/b8ac6f24467b0f90c51d5e.jpg", "content": "abc test" }
    this.records[1] = { "time": "04.01.2019", "title": "标题", "image": "http://img3.xiazaizhijia.com/walls/20160927/mid_dec5fdacc3059ca.jpg", "content": "abc test" }
    this.records[2] = { "time": "04.01.2019", "title": "标题", "mp4": "http://1254070582.vod2.myqcloud.com/2607b0c9vodtransgzp1254070582/a1cc8c7f5285890781256678829/v.f40.mp4", "content": "abc test" }
    this.records[3] = { "time": "04.01.2019", "title": "标题", "image": "https://goss3.vcg.com/creative/vcg/800/version23/VCG21400436589.jpg", "content": "abc test" }
  }

  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.ALLMEDIA
  }

  takePhoto() {
    this.camera.getPicture(this.options).then((imageData) => {
      var reader = new FileReader();
      reader.addEventListener("loadend", () => {
        console.log("Successful file write: " + reader.result);
        this.media.setName(imageData)
        this.media.setContent(new Uint8Array(<ArrayBuffer>reader.result));
        alert(imageData);
        alert(reader.result);
      });
      reader.readAsArrayBuffer(imageData);
    }, (err) => {
      alert(err);
    });
  }

  upload() {

  }
}
