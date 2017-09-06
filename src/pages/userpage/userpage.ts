import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Platform } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AuthService } from '../../services/authservice';
import { AppUrls } from '../../services/appurls';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { Dialogs } from '@ionic-native/dialogs';

declare var cordova: any;

@Component({
  selector: 'page-userpage',
  templateUrl: 'userpage.html',
})

export class Userpage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private dialogs: Dialogs,
              public appUrls: AppUrls, public iab: InAppBrowser) {
        
  }

  options : InAppBrowserOptions = {
    location : 'no',//Or 'no' 
    hidden : 'no', //Or  'yes'
    clearcache : 'yes',
    clearsessioncache : 'yes',
    zoom : 'no',//Android only ,shows browser zoom controls 
    hardwareback : 'yes',
    mediaPlaybackRequiresUserAction : 'no',
    shouldPauseOnSuspend : 'no', //Android only 
    closebuttoncaption : 'Close', //iOS only
    disallowoverscroll : 'no', //iOS only 
    toolbar : 'yes', //iOS only 
    enableViewportScale : 'no', //iOS only 
    allowInlineMediaPlayback : 'no',//iOS only 
    presentationstyle : 'pagesheet',//iOS only 
    fullscreen : 'yes',//Windows only    
};

isPageLoaded = false;


 urlImage='';

 scan() {
    this.appUrls.scanMeal();
}

makePayment() {

   this.appUrls.loading.presentLoading("Connecting...");

   this.appUrls.makePayment().then(data=>{
       
        this.appUrls.loading.dismissLoading();
        var url = data.message;
        var target = '_blank';
        
        const browser = this.iab.create(url,target,this.options);

        browser.on('loadstart').subscribe(data => {
            this.dialogs.alert("Please Wait", "Its loading....")
                .then(() => console.log('Dialog dismissed'))
                .catch(e => console.log('Error displaying dialog', e));
                    console.log(data);
                });

        browser.on('loadstop').subscribe(data => {
            this.appUrls.loading.dismissLoading();
            console.log(data);
        });

        browser.on('loadloaderror').subscribe(data => {
            this.appUrls.loading.dismissLoading();
            console.log(data);
        });

        browser.on('exit').subscribe(data => {
            this.appUrls.loading.dismissLoading();
            console.log(data);
        });
   })

}

}
