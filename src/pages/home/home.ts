import { Component, ViewChild} from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Content } from 'ionic-angular';
//import { Http, Headers, RequestOptions } from '@angular/http';
import {HttpProvider} from '../../providers/http-provider';
import {News} from '../news/news';
import { Device } from '@ionic-native/device';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[HttpProvider]
})
export class HomePage {


  @ViewChild(Content) content: Content;
  newsData: any;
  loading: any;
  number = 0;

  // constructor(public navCtrl: NavController, public http: Http) {
  constructor(public navCtrl: NavController, private httpProvider:HttpProvider, public loadingCtrl: LoadingController, private device: Device) {

  	this.presentLoadingDefault(this.number);
  	

  }

  getdata(no){
  this.httpProvider.getJsonData('http://ikon.news/haberlerjson/'+no).subscribe(
    result => {
      this.newsData=result;
      // console.log("Success : "+this.newsData);
    },
    err =>{
      console.error("Error : "+err);
    } ,
    () => {
      // console.log('getData completed');
    }
  );
}

showNewsPage(id) {
    // this.navCtrl.push(News,id);

	  
    this.navCtrl.push(News, {
    	newsid: id
	});

}

doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.getdata(0);
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

getNews(newsid) {
	console.log(newsid);
}

presentLoadingDefault(no) {
  let loading = this.loadingCtrl.create({
    content: 'Haberler yükleniyor...'
  });

  if (no >= 0)
  	this.number = no;

  loading.present();

  setTimeout(() => {
    loading.dismiss();this.getdata(no);this.content.scrollToTop();
  }, 2000);
}

  // postRequest() {
  //   var headers = new Headers();
  //   headers.append("Accept", 'application/json');
  //   headers.append('Content-Type', 'application/json' );
  //   let options = new RequestOptions({ headers: headers });

  //   let postParams = {
  //     title: 'foo',
  //     body: 'bar',
  //     userId: 1
  //   }
    
  //   this.http.post("http://jsonplaceholder.typicode.com/posts", postParams, options)
  //     .subscribe(data => {
  //       console.log(data['_body']);
  //      }, error => {
  //       console.log(error);// Error getting the data
  //     });
  // }

  // getRequest() {
  //   var headers = new Headers();
  //   headers.append("Accept", 'application/json');
  //   headers.append('Content-Type', 'application/json' );
    
  //   this.http.get('https://randomuser.me/api/?results=10').subscribe(data => {
  //       console.log(data['_body']);

  //       this.posts = data['results'];

  //      }, error => {
  //       console.log(error);// Error getting the data
  //     });


    
  // }



}
