import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AppUrls } from '../../services/appurls';

@Component({
  selector: 'page-memberDetails',
  templateUrl: 'memberDetails.html',
})
export class MemberDetails {

  constructor(public navCtrl: NavController, public appUrls:AppUrls, public navParams: NavParams) {
  }

memberMealCoupen:any;
isMemberDetailsLoaded:Boolean=false;

  ionViewDidLoad() {
      let memberId = this.navParams.get("memberId");
      this.getMemberDetails(memberId);
  }

  getMemberDetails(memberId) {
       this.appUrls.getMemberDetails(memberId,true).then(data => {
        if(data) {
            this.isMemberDetailsLoaded=true;
            this.memberMealCoupen=data;
        }
    });
  }

   scan() {
    this.appUrls.scanMeal();
}
}
