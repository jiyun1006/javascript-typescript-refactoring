import {NewsFeed, NewsDetail} from '../types';
import { NEWS_URL, CONTENT_URL } from '../config';

export class Api {
    // url: string;
    // ajax: XMLHttpRequest;
    // constructor(url: string) {
    //   this.url = url;
    //   this.ajax = new XMLHttpRequest();
    // }
  
    protected getRequest<AjaxResponse>(url: string): AjaxResponse {
      const ajax = new XMLHttpRequest();
      ajax.open('GET', url, false);
      ajax.send();
  
      return JSON.parse(ajax.response);
    }
  }
  
  export class NewsFeedApi extends Api{
    getData(): NewsFeed[] {
      return this.getRequest<NewsFeed[]>(NEWS_URL);
    }
  }
  
  export class NewsDetailApi extends Api{
    getData(id: string): NewsDetail {
      return this.getRequest<NewsDetail>(CONTENT_URL.replace('@id', id));
    }
  }