import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { AppUrls } from '../../services/appurls';
import { MealModel } from '../../models/MealModel';
import { ViewMealList } from './viewMealList'


@Component({
  selector: 'page-addMeal',
  templateUrl: 'addMeal.html',
})
export class AddMeal {

  constructor(public navCtrl: NavController, public navParams: NavParams, public mealModel: MealModel, 
              public loading: LoadingController,public appUrls: AppUrls) {
                this.meal=new MealModel();
            }

private meal = this.mealModel;


response:any;

meals:any;

ionViewDidLoad() {

    //  this.meal.$mealTitle='Lunch';

     this.meal.$mealTitle = (new Date().getHours() > 13) ? 'Dinner' : 'Lunch' ;
    
     this.meal.$isNonVeg = false;

     this.meal.$vegDefaultMenu = 'Chapati(3)/Roti(2), Rice (1 Bowl)';
     this.meal.$vegExtra = 'Salad, Pickel, Papaad';

     this.meal.$nonVegDefaultMenu = 'Chapati(3)/Roti(2), Rice (1 Bowl)';
     this.meal.$nonVegItems = 'Chiken(1 Bowl)/Boiled Eggs (2)';
     this.meal.$nonVegExtra = 'Salad';
}

    addMeal(meal) {

        console.log(meal);

        if(!meal.$vegDefaultMenu || meal.$vegDefaultMenu.trim() == "") {
            this.appUrls.loading.showAlertWithSubTitle("Alert","Please add veg default menu items !");
            return false;
        }

        if(!meal.$vegItems || meal.$vegItems.trim() == "") {
            this.appUrls.loading.showAlertWithSubTitle("Alert","Please add veg menu items !");
            return false;
        }

        if(!meal.$vegExtra || meal.$vegExtra.trim() == "") {
            this.appUrls.loading.showAlertWithSubTitle("Alert","Please add veg extra items !");
            return false;
        }

        if(meal.$nonVeg) {
            if(!meal.$nonVegDefaultMenu || meal.$nonVegDefaultMenu.trim() == "") {
                this.appUrls.loading.showAlertWithSubTitle("Alert","Please add non-veg default menu items !");
                return false;
            }

            if(!meal.$nonVegItems || meal.$nonVegItems.trim() == "") {
                this.appUrls.loading.showAlertWithSubTitle("Alert","Please add non-veg menu items !");
                return false;
            }

            if(!meal.$nonVegExtra || meal.$nonVegExtra.trim() == "") {
                this.appUrls.loading.showAlertWithSubTitle("Alert","Please add non-veg extra items !");
                return false;
            }   
        }
        
        this.appUrls.addMeal(meal,true).then(data => {
            
            if(data) {
                this.meal.$mealTitle="";
                this.response = data;
                this.navCtrl.setRoot(ViewMealList);
            } else {
                this.appUrls.loading.showAlertOnlyTSubitle(this.response.responseType,this.response.message);
            }
        });
        
    }

 scan() {
    this.appUrls.scanMeal();
}

}
