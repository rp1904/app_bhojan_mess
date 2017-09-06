import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AppUrls } from '../../services/appurls';
import { MealDetails } from '../meal/mealDetails';
import { AddMeal } from '../meal/addMeal';


@Component({
  selector: 'page-viewMealList',
  templateUrl: 'viewMealList.html',
})
export class ViewMealList {

  constructor(public navCtrl: NavController, public appUrls: AppUrls, public navParams: NavParams){

            }

meals:any;
isMealListEmpty:boolean;

ionViewDidLoad() {
    this.appUrls.isHeaderSet = true;
    console.log("Get meals");
    this.loadList(true);
}

    loadList(flag) {
        this.appUrls.loading.presentLoadingWithLoaderMsg();
        this.appUrls.getMeals(1,15,flag).then(data => {
            if(data) {
                this.meals=data;
                this.isMealListEmpty = false;
            } else{
                this.isMealListEmpty = true;
            }
            this.appUrls.loading.dismissLoading();
        });
    }

    closeMeal(mealId) {
        console.log("mealId :"+mealId);
         let alert = this.appUrls.loading.alertCtrl.create();

        alert.setSubTitle('Are you sure want to close this meal ?');
        
        alert.addButton({
        text: 'Yes',
        handler: data => {
            this.appUrls.closeMeal(mealId,true);
            this.loadList(true);
        }
        });
        alert.addButton('No');
        alert.present();
    }

    mealDetails(mealId) {
         this.navCtrl.push(MealDetails, { mealId:mealId });
    }

    addMeal() {
        this.appUrls.getOpenedMeals(true).then(data => {
            if(data){
                this.appUrls.loading.showAlertOnlyTSubitle("Error","You have one meal active, Please close it !");
            } else {
                this.navCtrl.push(AddMeal);
            }
        });
    }

 scan() {
    this.appUrls.scanMeal();
}

}
