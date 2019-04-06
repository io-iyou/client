import * as grpcWeb from 'grpc-web';
import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { ArticleComponent } from './article/article.component'
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Article } from '../../../sdk/article_pb'
import { apiService } from '../../service/api.service';

@Component({
  selector: 'app-record',
  templateUrl: './record.page.html',
  styleUrls: ['./record.page.scss'],
})
export class RecordPage {
  article = new Article();
  imageBase64: string;
  articles: Article.AsObject[] = [];

  constructor(
    private camera: Camera,
    private modalController: ModalController,
    private popoverController: PopoverController) {
    //this.articles[0] = { "created": "04.01.2019", "title": "标题", "image": "http://i3.cqnews.net/xfsc/attachement/jpg/site82/20110720/b8ac6f24467b0f90c51d5e.jpg", "content": "abc test" }
    //this.articles[1] = { "time": "04.01.2019", "title": "标题", "image": "http://img3.xiazaizhijia.com/walls/20160927/mid_dec5fdacc3059ca.jpg", "content": "abc test" }
    //this.articles[2] = { "time": "04.01.2019", "title": "标题", "mp4": "http://1254070582.vod2.myqcloud.com/2607b0c9vodtransgzp1254070582/a1cc8c7f5285890781256678829/v.f40.mp4", "content": "abc test" }
    //this.articles[3] = { "time": "04.01.2019", "title": "标题", "image": "https://goss3.vcg.com/creative/vcg/800/version23/VCG21400436589.jpg", "content": "abc test" }
    var i = 0;
    let stream = apiService.articleClient.listByUser(this.article, apiService.metaData);
    stream.on('data', response => {
      this.articles[i] = response.toObject();
      //this.loadDistance(this.orders[i]);
      i++;
      //this.orders = this.orders.slice(0, i);
    });
    stream.on('error', err => {
      console.log(err);
      //this.load();
    });
  }

  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  takePhoto() {
    this.article.setTitle("测试");
    this.article.setContent("abc test");
    this.camera.getPicture(this.options).then((imageData) => {
      //alert(imageData);
      // var reader = new FileReader();
      //reader.addEventListener("loadend", () => {
      this.article.setImage(this.urlBase64ToUint8Array(imageData));
      this.imageBase64 = "data:image/jpeg;base64," + imageData;
      //this.media.setName(imageData)
      //this.media.setContent(new Uint8Array(<ArrayBuffer>reader.result));        
      //alert(reader.result);
      //});
      //reader.readAsArrayBuffer(imageData);
      apiService.articleClient.add(this.article, apiService.metaData, (err: grpcWeb.Error, response: Article) => {
        if (err) {
          alert(JSON.stringify(err));
          //utilService.alert(JSON.stringify(err));
        } else {
          //this.ngOnInit();
        }
      });
    }, (err) => {
      alert(err);
    });
  }

  upload() {

  }

  urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  uint8ArrayToBase64(uint8Value: Uint8Array): string {
    var binary = '';
    //var bytes = new Uint8Array(buffer);
    for (var len = uint8Value.byteLength, i = 0; i < len; i++) {
      binary += String.fromCharCode(uint8Value[i]);
    }
    return "data:image/jpeg;base64," + window.btoa(binary);
  }

  async writeArticle() {
    const modal = await this.popoverController.create({
      component: ArticleComponent,
      componentProps: { imageBase64: this.imageBase64 }
    });
    return await modal.present();
  }
}
