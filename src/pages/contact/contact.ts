import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera} from '@ionic-native/camera';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {


public base64Image: string;

private imageSrc: string;

private location: any;

  constructor(public navCtrl: NavController, private geolocation: Geolocation, private camera: Camera) {

  }

  

  tezcan() {
  	this.geolocation.getCurrentPosition().then((resp) => {
     this.location  = resp.coords.latitude.toString() + "--" + resp.coords.longitude.toString();
	 console.log(resp.coords.latitude);
	 console.log(resp.coords.longitude);
	}).catch((error) => {
	  console.log('Error getting location', error);
	});
  }

  takePicture(){
    this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 1000,
        targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
        this.base64Image = "data:image/jpeg;base64," + imageData;
    }, (err) => {
        console.log(err);
    });
  }
  
  private openGallery (): void {
  let cameraOptions = {
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: this.camera.DestinationType.FILE_URI,      
    quality: 100,
    targetWidth: 1000,
    targetHeight: 1000,
    encodingType: this.camera.EncodingType.JPEG,      
    correctOrientation: true
  }

  this.camera.getPicture(cameraOptions)
    .then(file_uri => this.imageSrc = file_uri, 
    err => console.log(err));   
}

}
