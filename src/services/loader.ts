import { Injectable } from '@angular/core';
import { Platform, ToastController, AlertController, NavController, LoadingController } from 'ionic-angular';
import { Network } from "@ionic-native/network";

@Injectable()
export class CustomeLoader {

 constructor(public loadingCtrl: LoadingController, public alertCtrl: AlertController,
             public toastCtrl: ToastController,private platform: Platform) { 
 }

loader:any;
navigator: any;
Connection: any;

toast:any;

presentLoadingUnlimited(msg) {
   this.loader = this.loadingCtrl.create({
      content: msg
    });

    this.loader.present();
  }

  presentToastUnlimited(msg) {
    this.toast = this.toastCtrl.create({
      message: msg,
      position: 'bottom',
      cssClass:'tost-css'
    });
    this.toast.present();
  }

  dismissUnlimitedToast() {
        this.toast.dismiss().catch(() => console.log('ERROR CATCH: Unlimited Toast dismiss'));     
  }

presentLoadingWithLoaderMsg() {
   this.loader = this.loadingCtrl.create({
      content:'Loading...',
      duration: 15000,
      dismissOnPageChange: true
    });
    this.loader.present();
  }  

   presentLoading(msg) {
   this.loader = this.loadingCtrl.create({
      content: msg,
      duration: 15000,
      dismissOnPageChange: true
    });

    this.loader.present();
  }  

  dismissLoading() {
      this.loader.dismiss().catch(() => console.log('ERROR CATCH: LoadingController dismiss'));
  }

showAlertWithSubTitle(title,subTitle) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: ['OK'],
      cssClass: title
    });
    alert.present();
}

showAlertOnlyTSubitle(cssClass,title) {
    let alert = this.alertCtrl.create({
      subTitle: title,
      buttons: ['OK'],
      cssClass: cssClass
    });
    alert.present();
}

presentToast(pos, duration, msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      position: pos,
      duration: duration,
      cssClass:'tost-css'
    });
    toast.present();
  }


  // checkNetwork() {
  //       this.platform.ready().then(() => {
  //           var networkState = navigator.connection.type;
  //           var states = {};
  //           states[Connection.UNKNOWN]  = 'Unknown connection';
  //           states[Connection.ETHERNET] = 'Ethernet connection';
  //           states[Connection.WIFI]     = 'WiFi connection';
  //           states[Connection.CELL_2G]  = 'Cell 2G connection';
  //           states[Connection.CELL_3G]  = 'Cell 3G connection';
  //           states[Connection.CELL_4G]  = 'Cell 4G connection';
  //           states[Connection.CELL]     = 'Cell generic connection';
  //           states[Connection.NONE]     = 'No network connection';
  //           let alert = Alert.create({
  //               title: "Connection Status",
  //               subTitle: states[networkState],
  //               buttons: ["OK"]
  //           });
  //           this.navCtrl.present(alert);
  //       });
  //   }

  checkNetwork() {
    // if(!navigator.onLine) {
    //     let alert = this.alertCtrl.create({
    //       title:  "Connection Status",
    //       subTitle: "<string> Network.connection",
    //       buttons: ['OK']
    //     });
    //     alert.present();
    // }
    return navigator.onLine;
  }
}