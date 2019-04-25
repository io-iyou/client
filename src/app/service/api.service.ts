import { Injectable } from '@angular/core';
import { User } from '../../sdk/user_pb';
import { Message } from '../../sdk/message_pb';
import { environment } from '../../environments/environment';
import { ArticlesClient } from '../../sdk/article_grpc_web_pb';
import { UsersClient } from '../../sdk/user_grpc_web_pb';
import { GroupsClient } from '../../sdk/group_grpc_web_pb';
import { MessagesClient } from '../../sdk/message_grpc_web_pb';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  articleClient = new ArticlesClient(environment.apiUrl);
  userClient = new UsersClient(environment.apiUrl);
  groupClient = new GroupsClient(environment.apiUrl);
  messageClient = new MessagesClient(environment.apiUrl);

  metaData = { 'authorization-token': 'admin' };
}

export class UtilService {
  userId = '';
  msgCache = new Map<string, Message.AsObject[]>();

  constructor() { }

  getUser(): User.AsObject {
    let localUser = window.localStorage.getItem('user');
    if (!localUser) {
      //window.alert('请登录!')
      return null//(new User).toObject()
    }
    return JSON.parse(localUser)
  }

  setUser(user: User.AsObject) {
    window.localStorage.setItem('user', JSON.stringify(user));
  }
}

export const apiService = new ApiService();
export const utilService = new UtilService();