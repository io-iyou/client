import { File, FileEntry, IFile } from '@ionic-native/file/ngx';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Article } from '../../../sdk/article_pb'
import { apiService } from '../../service/api.service';
import { ArticleComponent } from './article/article.component'
import {
  MediaCapture, MediaFile, CaptureError,
  CaptureImageOptions, CaptureVideoOptions
} from '@ionic-native/media-capture/ngx';


@Component({
  selector: 'app-record',
  templateUrl: './record.page.html',
  styleUrls: ['./record.page.scss'],
})
export class RecordPage implements OnInit {
  article = new Article();
  //imageBase64: string;
  articles: Article.AsObject[] = [];

  constructor(
    private file: File,
    private mediaCapture: MediaCapture,
    private modalController: ModalController,
   /* private popoverController: PopoverController*/) {
    //this.articles[0] = { "created": "04.01.2019", "title": "标题", "image": "http://i3.cqnews.net/xfsc/attachement/jpg/site82/20110720/b8ac6f24467b0f90c51d5e.jpg", "content": "abc test" }
    //this.articles[1] = { "time": "04.01.2019", "title": "标题", "image": "http://img3.xiazaizhijia.com/walls/20160927/mid_dec5fdacc3059ca.jpg", "content": "abc test" }
    //this.articles[2] = { "time": "04.01.2019", "title": "标题", "mp4": "http://1254070582.vod2.myqcloud.com/2607b0c9vodtransgzp1254070582/a1cc8c7f5285890781256678829/v.f40.mp4", "content": "abc test" }
    //this.articles[3] = { "time": "04.01.2019", "title": "标题", "image": "https://goss3.vcg.com/creative/vcg/800/version23/VCG21400436589.jpg", "content": "abc test" }
  }

  ngOnInit() {
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
      alert(JSON.stringify(err));
      //this.load();
    });
  }

  // options: CameraOptions = {
  //   quality: 90,
  //   correctOrientation: true,
  //   //allowEdit: true,
  //   targetWidth: 600,
  //   targetHeight: 600,
  //   destinationType: this.camera.DestinationType.DATA_URL,
  //   //encodingType: this.camera.EncodingType.JPEG,
  //   mediaType: this.camera.MediaType.VIDEO
  // }

  takePhoto() {
    this.article.setTitle("测试");
    //this.article.setContent("abc test");
    let options: CaptureImageOptions = { limit: 1 }
    this.mediaCapture.captureImage(options)
      .then(
        (data: MediaFile[]) => {
          // console.log(data);
          this.file.readAsDataURL(data[0].fullPath.substr(0, data[0].fullPath.lastIndexOf('/') + 1), data[0].name).then(result => {
            // this.article.setImage(result);
            var img = new Image();
            img.src = result;
            img.onload = () => {
              var canvas = document.createElement('canvas');
              var ctx = canvas.getContext('2d');
              ctx.drawImage(img, 0, 0, img.width / 5, img.height / 5);
              var base64 = canvas.toDataURL('image/jpeg', 0.7);
              this.article.setImage(base64);
              this.writeArticle();
            }
          }).catch(err => {
            alert('error:' + JSON.stringify(err));
          });
        },
        (err: CaptureError) =>
          console.error(err)
      );
    //this.camera.getPicture(this.options).then((imageData) => {
    //alert(imageData);
    // var reader = new FileReader();
    //reader.addEventListener("loadend", () => {
    // this.article.setImage("data:image/jpeg;base64," + imageData);//this.urlBase64ToUint8Array(imageData));
    //this.upload(imageURI);
    //this.imageBase64 = "data:image/jpeg;base64," + imageData;
    //this.media.setName(imageData)
    //this.media.setContent(new Uint8Array(<ArrayBuffer>reader.result));        
    //alert(reader.result);
    //});
    //reader.readAsArrayBuffer(imageData);
    // this.writeArticle();
    //}, (err) => {
    //alert(err);
    //});
  }

  takeVideo() {
    let voptions: CaptureVideoOptions = { limit: 1 }
    this.mediaCapture.captureVideo(voptions)
      .then(
        (data: MediaFile[]) =>
          console.log(data),
        (err: CaptureError) =>
          console.error(err)
      );
  }

  async writeArticle() {
    const modal = await this.modalController.create({
      component: ArticleComponent,
      componentProps: { article: this.article.toObject() }
    });
    await modal.present();
    this.ngOnInit();
  }
}
