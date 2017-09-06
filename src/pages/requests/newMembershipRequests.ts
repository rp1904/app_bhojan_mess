import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AppUrls } from '../../services/appurls';
import { MembershipRequestModel } from '../../models/MembershipRequestModel';
import { MealCoupenModel } from '../../models/MealCoupenModel';

@Component({
  selector: 'page-newMembershipRequests',
  templateUrl: 'newMembershipRequests.html',
})

export class NewMembershipRequests {

  constructor(public navCtrl: NavController,public appUrls: AppUrls){//, public mRequestModel:MembershipRequestModel) {
      
  }

requests:any;

result:any;

coupnId:string="";

coupens:any;

isCoupensEmpty:Boolean=false;

isRequestsEmpty:Boolean;

ionViewDidLoad() {
    
    this.getAllCoupens();
    this.appUrls.getAllNewMembershipRequests(true).then(data => {
        if(data) {
            this.requests=data;
            this.isRequestsEmpty=false;
        } else {
            this.isRequestsEmpty=true;
        }
        },
        err => {
            console.log("Error status : " + err);
        });
}

updateMembershipRequest(sts,memberId,index) {

    if(this.isCoupensEmpty) {
            this.appUrls.loading.showAlertOnlyTSubitle("Success","Please add meal coupens.");
    }

    if(sts=='A') {
        this.showCoupens(sts,memberId,index);
    } else {
        this.confirmRejection(sts,memberId,index);
    }
}

updateMR(sts,memberId,index,coupenId) {

  this.appUrls.updateMembershipRequest(sts,memberId,coupenId,true).then(data => {
        if(data) {
            
            this.result = data;
            this.appUrls.loading.presentToast("top",2000,this.result.message);
            if(index > -1){
                this.requests.splice(index, 1);
            } 

            if(this.requests.length<1) {
                 this.isRequestsEmpty=true;
            }
        }
        },
        err => {
            console.log("Error status : " + err);
        });
}

showCoupens(sts,memberId,index) {
    let alert = this.appUrls.loading.alertCtrl.create();
    alert.setTitle('Select Coupen');
    let flag=true;
    for (var x = 0; x < this.coupens.length; x++) {
         
         let detail = this.coupens[x].noOfMeals +" Meals, "+this.coupens[x].validity+" Days, "+this.coupens[x].amount+"/-";
         alert.addInput({
            type: 'radio',
            label: detail,
            value: this.coupens[x].coupenId,
            checked:flag
        });

        flag=false;
    }
   
    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
          if(data){
                this.updateMR(sts,memberId,index,data);      
          } else {
              this.appUrls.loading.showAlertWithSubTitle("Error","Please add meal coupen !");
          }
      }
    });
    alert.present();
  }

getAllCoupens(){
    this.appUrls.getAllMealCoupens(false).then(data => {
        if(data) {
            this.coupens=data;
            this.isCoupensEmpty = false; 
        } else {
            this.isCoupensEmpty = true;
        }
        },
        err => {
            console.log("Error status : " + err);
        });
  }

confirmRejection(sts,memberId,index) {
    let alert = this.appUrls.loading.alertCtrl.create();

    alert.setSubTitle('Are you sure want to reject this request ?');
    alert.addButton('No');
    alert.addButton({
      text: 'Yes',
      handler: data => {
        this.updateMR(sts,memberId,index,sts);
      }
    });
    alert.present();
  }

 scan() {
    this.appUrls.scanMeal();
}

}
