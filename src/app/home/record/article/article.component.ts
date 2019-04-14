import * as grpcWeb from 'grpc-web';
import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Article } from '../../../../sdk/article_pb'
import { apiService } from '../../../service/api.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  article: Article.AsObject;
  tsArticle = new Article();
  //tsArticle.setContent(this.article.content);

  constructor(
    private camera: Camera,
    private navParams: NavParams,
    private modalController: ModalController) {
    this.article = this.navParams.get('article');
  }

  ngOnInit() { }

  add() {
    // let tsArticle = new Article();
    this.tsArticle.setContent(this.article.content);
    this.tsArticle.setImagesList(this.article.imagesList);
    apiService.articleClient.add(this.tsArticle, apiService.metaData, (err: grpcWeb.Error, response: Article) => {
      if (err) {
        alert(JSON.stringify(err));
        //utilService.alert(JSON.stringify(err));
      } else {
        //alert(JSON.stringify(this.article));
        this.modalController.dismiss();
      }
    });
  }

  plus() {
    //this.article.setTitle("记录");
    const options: CameraOptions = {
      quality: 100,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      var img = new Image();
      img.src = base64Image;
      img.onload = () => {
        var canvas = document.createElement('canvas');
        let width = img.width / 5
        let height = img.height / 5
        canvas.width = width;
        canvas.height = height
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        this.article.imagesList[this.article.imagesList.length] = canvas.toDataURL('image/jpeg', 0.7);
        //this.writeArticle();
      }
    }, (err) => {
      // Handle error
    });

  }

}

