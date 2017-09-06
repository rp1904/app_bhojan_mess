import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AppUrls } from '../../services/appurls';
import { UserModel } from '../../models/UserModel';
import { MemberDetails } from '../memberDetails/memberDetails';


@Component({
  selector: 'page-mealMembers',
  templateUrl: 'mealMembers.html',
})
export class MealMembers {

  constructor(public navCtrl: NavController, public navParams: NavParams, public appUrls:AppUrls) {
  }

totalMembers:number=0;
mealId:string;
memberMealsOriginal:any = [];
memberMeals:any = [];
ismemberMealsEmpty:Boolean;


  ionViewDidEnter() {
    this.mealId = this.navParams.get("mealId");
    this.getMembers();
  }

  getMembers() {

    this.appUrls.getMembersByMealId(this.mealId, true).then(data => {
         
          if(data && data.length > 0) {
              this.ismemberMealsEmpty = false;
              this.totalMembers = data.length;
          } else {
              this.ismemberMealsEmpty = true;
          }

          this.memberMeals = [];

          for(let memberMeal of data) {
              this.memberMeals.push(memberMeal);
              this.memberMealsOriginal.push(memberMeal);
              console.log(memberMeal);
          }
    });

  }

  getMemberMeals(ev: any){

    this.memberMeals = this.memberMealsOriginal;
    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.memberMeals = this.memberMeals.filter((item) => {
        return (item.member.userProfile.fullName.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
      
  //      this.appUrls.loading.dismissLoading();
  //     });  
  //      }
  //     } else {
  //       this.execute(1,this.noOfMembers,'',false);
  //     }
    
  // }

  // execute(pageNo,limit,val,showLoading) {
  //   return new Promise(resolve => {
  //     this.appUrls.getMembers(pageNo,limit,val,showLoading).then(data => {
  //       if(data) {

  //           this.isMembersEmpty = false;
  //           this.members = [];
  //           for(let member of data) {
  //             this.members.push(member);
  //           }
        
  //           this.isComplete = (data.length < this.noOfMembers) ? true : false;
                
  //       resolve(true);

  //     } 
  //     if(this.pageNo == 1 && !data) {
  //           this.isMembersEmpty = true;
  //       }
  //      this.appUrls.loading.dismissLoading();
  //     });
  //   });
  // }

  // memberDetail(memberId) {
  //     this.navCtrl.push(MemberDetails,{memberId: memberId});
  // }

  // doInfinite(infiniteScroll) {
  //   console.log('Begin async operation');
  //   this.pageNo+=1;
  //    this.execute(this.pageNo,this.noOfMembers,'',false).then(()=>{
  //      infiniteScroll.complete();
  //    });
  // }

 scan() {
    this.appUrls.scanMeal();
}

}