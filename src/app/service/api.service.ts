import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ArticlesClient } from '../../sdk/article_grpc_web_pb';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  articleClient = new ArticlesClient(environment.apiUrl);

  metaData = { 'authorization-token': 'admin' };
}

export const apiService = new ApiService();