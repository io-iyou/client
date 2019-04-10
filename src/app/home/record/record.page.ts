import * as grpcWeb from 'grpc-web';
import { finalize } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { File, FileEntry } from '@ionic-native/file/ngx';
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
export class RecordPage implements OnInit {
  article = new Article();
  //imageBase64: string;
  articles: Article.AsObject[] = [];

  constructor(
    private file: File,
    private camera: Camera,
    private http: HttpClient,
    private modalController: ModalController,
    private popoverController: PopoverController) {
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

  options: CameraOptions = {
    quality: 80,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  takePhoto() {
    this.article.setTitle("测试");
    this.article.setContent("abc test");
    this.camera.getPicture(this.options).then((imageURI) => {
      //alert(imageData);
      // var reader = new FileReader();
      //reader.addEventListener("loadend", () => {
      this.article.setImage(imageURI)//this.urlBase64ToUint8Array(imageData));
      this.upload(imageURI);
      //this.imageBase64 = "data:image/jpeg;base64," + imageData;
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
          alert(JSON.stringify(this.article.toObject()));
          this.ngOnInit();
        }
      });
    }, (err) => {
      alert(err);
    });
  }

  upload(fileURI: string) {
    this.file.resolveLocalFilesystemUrl(fileURI)
      .then(entry => {
        (<FileEntry>entry).file(file => this.readFile(file))
      })
      .catch(err => {
        alert(JSON.stringify(err));
        // this.presentToast('Error while reading file.');
      });
  }

  readFile(file: any) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const formData = new FormData();
      const imgBlob = new Blob([reader.result], {
        type: file.type
      });
      formData.append('file', imgBlob, file.name);
      var img = <HTMLImageElement>document.getElementById('abcdefg');
      //document.createElement("img")
      img.src = window.URL.createObjectURL(imgBlob);
      // this.uploadImageData(formData);
      this.http.post("http://localhost:8888/upload.php", formData)
        .pipe(
          finalize(() => {
            //loading.dismiss();
          })
        )
        .subscribe(res => {
          if (res['success']) {
            // this.presentToast('File upload complete.')
          } else {
            //this.presentToast('File upload failed.')
          }
        });
    };
    reader.readAsArrayBuffer(file);
  }

  async writeArticle() {
    const modal = await this.popoverController.create({
      component: ArticleComponent,
      componentProps: { article: this.article.toObject() }
    });
    return await modal.present();
  }
}
