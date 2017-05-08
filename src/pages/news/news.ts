import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import {HttpProvider} from '../../providers/http-provider';
import { LocalNotifications } from '@ionic-native/local-notifications';

/**
 * Generated class for the News page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
  providers:[HttpProvider]
})
export class News {

	number = this.navParams.get('newsid');

	newsTitle: any;
	newsSpot: any;
	newsContent: any;
	newsImage: any;

	loading: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private httpProvider:HttpProvider,public loadingCtrl: LoadingController , private localNotifications: LocalNotifications, public alertCtrl: AlertController) {

  		this.presentLoading(this.number);

  		

  }

  public showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Notification Scheduled!',
      subTitle: 'Give me 5 second!',
      buttons: ['OK']
    });
    alert.present();
  }

   public schedule() {
   		this.showAlert();
        this.localNotifications.schedule({
            title: "Test Title",
            text: "Delayed Notification",
            at: new Date(new Date().getTime() + 5 * 1000),
            sound: 'file://sound.mp3'
        });
    }

  

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad News');
  // }
    getdata(no){
  		this.httpProvider.getJsonData('http://ikon.news/haber/detay/json/'+no).subscribe(
	    result => {
	      this.newsTitle=result.title;
	      this.newsSpot=result.spot;
	      this.newsContent=result.content;
	      this.newsImage=result.image;
	      //console.log("Success : "+this.newsData);
	    },
	    err =>{
	      console.error("Error : "+err);
	    } ,
	    () => {
	      // console.log('getData completed');
	    }
	  );
	}


  presentLoading(no) {
  	
  let loading = this.loadingCtrl.create({
    content: 'Haber detayı yükleniyor...'
  });

  this.getdata(no);

  if (no >= 0)
  	this.number = no;

  loading.present();

  setTimeout(() => {
    loading.dismiss();
  }, 2000);
}
}
