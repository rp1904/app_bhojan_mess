import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../services/authservice';
import { AppUrls } from '../../services/appurls';


import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { Dialogs } from '@ionic-native/dialogs';


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})

export class Profile {

  constructor(public navCtrl: NavController, public dialogs: Dialogs,
              public appUrls: AppUrls, public iab: InAppBrowser) {
        
  }

  isProfileLoaded:boolean=false;
  messProfile:any;

  ionViewDidLoad() {
    console.log("Mess Profile ionViewDidLoad()");
    this.getMessProfile();
  }

  getMessProfile() {
    this.appUrls.getMessProfile(true).then(data => {
      console.log("Mess Profile: "+data);
        if(data) {
            this.isProfileLoaded=true;
            this.messProfile=data;
        }
     });
  }

  changePassword() {

    let alert = this.appUrls.loading.alertCtrl.create({
    title: 'Change Password',
    inputs: [
      {
        name: 'oldPassword',
        placeholder: 'Old Password',
        type: 'password',
      },
      {
        name: 'newPassword',
        placeholder: 'New Password',
        type: 'password',
      },
      {
        name: 'cNewPassword',
        placeholder: 'Confirm New Password',
        type: 'password',
      }
    ],
    buttons: [
      {
        text: 'Change',
        handler: data => {
          if(data.oldPassword.trim() != '' || data.cNewPassword.trim() != '' || data.newPassword.trim() != '') {

             if(data.oldPassword.length < 5) {
                 this.appUrls.loading.presentToast('middle',3000,'Invalid Old Password !');
                 return false;
             }
             
             if(data.newPassword.length < 5) {
                 this.appUrls.loading.presentToast('middle',3000,'Password length should not be less than 5 !');
                 return false;
             }


             if(data.newPassword != data.cNewPassword) {
                 this.appUrls.loading.presentToast('middle',4000,'New Password and confirm password does not match !');
                 return false;
             }
            
            this.appUrls.changePassword(data.oldPassword,data.newPassword,true).then(result => {
                this.appUrls.loading.showAlertOnlyTSubitle(result.responseType,result.message);
            });
             
          } else {
              return false;
          }
        }
      },
      {
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      }
    ]
  });
  alert.present();

  }

 scan() {
    this.appUrls.scanMeal();
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

makePayment() {

   this.appUrls.loading.presentLoadingUnlimited("Connecting...");

   this.appUrls.makePayment().then(data=>{

       var redirect_url = data.payment_request.redirect_url;
       
        this.appUrls.loading.dismissLoading();
        var longurl = data.payment_request.longurl;
        var target = '_blank';
        
        const browser = this.iab.create(longurl,target,this.options);

        browser.on('loadstart').subscribe(data => {

            console.log(data);
            if(data.url === longurl) {
    
            this.dialogs.alert("Please Wait", "Its loading....")
                .then(() => console.log('Dialog dismissed'))
                .catch(e => console.log('Error displaying dialog', e));
                    console.log(data);
            }      
        });

        browser.on('loadstop').subscribe(data => {
            console.log(data);
            var redirectUrl = data.url.split("?")[0];
            console.log(redirectUrl);

            if(redirectUrl === redirect_url) {
                browser.close();
            }
        });

        browser.on('loadloaderror').subscribe(data => {
            console.log(data);
        });

        browser.on('exit').subscribe(data => {
            console.log(data);
        });
   })

}

}
