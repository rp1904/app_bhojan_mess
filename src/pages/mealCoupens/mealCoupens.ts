import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppUrls } from '../../services/appurls';
import { MealCoupenModel } from '../../models/MealCoupenModel';

@Component({
  selector: 'page-mealCoupens',
  templateUrl: 'mealCoupens.html',
})
export class MealCoupens {

  constructor(public navCtrl: NavController, public appUrls:AppUrls,public mealCoupenModel: MealCoupenModel) {
     
  }

coupens:any;
isCoupensEmpty:Boolean;

  ionViewDidLoad() {
     this.getAllCoupens();
  }

removeCoupen(coupenId) {
  console.log(coupenId);
  this.getAllCoupens();
}

getAllCoupens(){
    this.appUrls.getAllMealCoupens(true).then(data => {
        if(data) {
            this.coupens=data;
            this.isCoupensEmpty = false;
        } else {
            this.isCoupensEmpty = true;
        }
        });
  }

addCoupen(){
  let alert = this.appUrls.loading.alertCtrl.create({
    title: 'Add Coupen',
    cssClass:'mc',
    inputs: [
      {
        name: 'noOfMeals',
        placeholder: 'No Of Meals',
        type: 'number'
      },
      {
        name: 'validity',
        placeholder: 'Validity',
        type: 'number'
      },
      {
        name: 'amount',
        placeholder: 'Amount',
        type: 'number'
      }
    ],
    buttons: [
      {
        text: 'Add',
        handler: data => {
          if(data.noOfMeals.trim()!='' && data.validity.trim()!='' && data.amount.trim()!='') {
                this.mealCoupenModel.$noOfMeals=data.noOfMeals.trim();
                this.mealCoupenModel.$validity=data.validity.trim();
                this.mealCoupenModel.$amount=data.amount.trim();
                this.appUrls.addMealCoupen(this.mealCoupenModel,true);
                this.getAllCoupens();
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
    console.log("Scan Meal");
    this.appUrls.scanMeal();
}

}
