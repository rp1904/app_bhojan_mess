import { Component } from '@angular/core';
import { AppUrls } from '../../services/appurls';
import { NavController, NavParams } from 'ionic-angular';

import { MealMembers } from '../mealMembers/mealMembers';



@Component({
  selector: 'page-mealDetails',
  templateUrl: 'mealDetails.html',
})
export class MealDetails {

  constructor(public navCtrl: NavController, public navParams: NavParams, public appUrls: AppUrls) { }

meal:any;
mealType:string='veg';
vegRating='3.5';
nonVegRating='4';

vegMenu:string[];
nonVegMenu:string[];

mealId:string;

ionViewDidLoad() {

    this.mealId = this.navParams.get("mealId");
    this.appUrls.isHeaderSet = false;
    console.log(this.navParams.get("mealId"));
    this.appUrls.getMealDetails(this.navParams.get("mealId"),true).then(data => {
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
    });
}

 scan() {
    this.appUrls.scanMeal();
}

  getMembers() {

     this.navCtrl.push(MealMembers, { mealId:this.mealId });

  }

}
