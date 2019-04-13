import * as grpcWeb from 'grpc-web';
import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { Article } from '../../../../sdk/article_pb'
import { apiService } from '../../../service/api.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  article: Article.AsObject;

  constructor(
    private navParams: NavParams,
    private modalController: ModalController) {
    this.article = this.navParams.get('article');
  }

  ngOnInit() { }

  add() {
    let tsArticle = new Article();
    tsArticle.setContent(this.article.content);
    tsArticle.setImagesList(this.article.imagesList);
    apiService.articleClient.add(tsArticle, apiService.metaData, (err: grpcWeb.Error, response: Article) => {
      if (err) {
        alert(JSON.stringify(err));
        //utilService.alert(JSON.stringify(err));
      } else {
        //alert(JSON.stringify(this.article));
        this.modalController.dismiss();
      }
    });
  }

}

