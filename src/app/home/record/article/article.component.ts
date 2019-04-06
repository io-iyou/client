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
  //imageBase64: string;

  constructor(private navParams: NavParams) {
    this.article = (<Article>this.navParams.get('article')).toObject();
    //this.imageBase64 = this.uint8ArrayToBase64((<Article>this.navParams.get('article')).getImage_asU8());
  }

  ngOnInit() { }

  uint8ArrayToBase64(uint8Value: Uint8Array): string {
    var binary = '';
    //var bytes = new Uint8Array(buffer);
    for (var len = uint8Value.byteLength, i = 0; i < len; i++) {
      binary += String.fromCharCode(uint8Value[i]);
    }
    return "data:image/jpeg;base64," + window.btoa(binary);
  }
}

