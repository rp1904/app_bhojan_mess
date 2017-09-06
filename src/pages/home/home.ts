import {
  Component
} from '@angular/core';
import {
  NavController
} from 'ionic-angular';
import {
  AppUrls
} from '../../services/appurls';
import {
  Userpage
} from '../userpage/userpage';
import {
  Signup
} from '../signup/signup';

import {
  Storage
} from '@ionic/storage';

import { Device } from '@ionic-native/device';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public appUrls: AppUrls, public storage: Storage, public device:Device) {}

  messCode: any;
  rate = '3.7';
  meal:any;
  mealType:string='veg';
  vegRating='3.5';
  nonVegRating='4';
  vegMenu:string[];
  nonVegMenu:string[];

  ionViewDidLoad() {
    this.appUrls.getMessCode(false).then(data => {
      if (data) {
        this.messCode = data;
      }
    });

     this.appUrls.getOpenedMeals(true).then(data => {

         if(data.responseType != 'Error') {
          this.meal=data;
          this.vegMenu = data.vegDefaultMenu.split(",");

          for (let item of data.vegItems.split(",")) {
            this.vegMenu.push(item);
          }
          for (let item of data.vegExtra.split(",")) {
            this.vegMenu.push(item);
          }
          
          if(data.isNonVeg) {
  
              this.nonVegMenu = data.nonVegDefaultMenu.split(",");
  
              for (let item of data.nonVegItems.split(",")) {
                this.nonVegMenu.push(item);
              }
              for (let item of data.nonVegExtra.split(",")) {
                this.nonVegMenu.push(item);
              }
          }
        }
    });
  }


  rateMeal(rating) {
      console.log('Rating ====>>> ', rating);
  }



  getDeviceDetails(){

    var deviceInfo:string = 
    "Cordova: " + this.device.cordova +
    ", Platform: " + this.device.platform +
    ", Version: " + this.device.version +
    ", UUID: " + this.device.uuid +
    ", Manufacturer: " + this.device.manufacturer +
    ", Model: " + this.device.model +
    ", Is Virtual: " + this.device.isVirtual ;

    this.appUrls.loading.showAlertOnlyTSubitle("Success",deviceInfo);
    
  }

  scan() {
    this.appUrls.scanMeal();
}

}
