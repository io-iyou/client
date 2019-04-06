import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { Article } from '../../../../sdk/article_pb'


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  article: Article.AsObject = (new Article()).toObject();
  imageBase64: string;

  constructor(private navParams: NavParams) {
    this.imageBase64= this.navParams.get('imageBase64');
   }

  ngOnInit() { }

}
