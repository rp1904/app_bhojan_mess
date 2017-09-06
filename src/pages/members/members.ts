import { Component } from '@angular/core';
import { NavController, ModalController  } from 'ionic-angular';
import { AppUrls } from '../../services/appurls';
import { UserModel } from '../../models/UserModel';
import { MemberDetails } from '../memberDetails/memberDetails';
import { AddNewMember } from '../addNewMember/addNewMember';


@Component({
  selector: 'page-members',
  templateUrl: 'members.html',
})
export class Members {

  constructor(public navCtrl: NavController, public appUrls:AppUrls, public modalCtrl:ModalController) {
  }

members:any = [];
isMembersEmpty:Boolean;
pageNo:number = 1;
noOfMembers:number = 40;
isComplete:boolean = false;


  ionViewDidLoad() {
    this.appUrls.loading.presentLoadingWithLoaderMsg();
    this.execute(this.pageNo,this.noOfMembers,'',false);
  }

   loadData(refresher) {
      this.execute(this.pageNo,this.noOfMembers,'',false).then(data => {
       if(refresher != 0)
         refresher.complete();
      }); 
  }

  getUsers(ev: any){
     let val = ev.target.value;
     console.log("Search: "+val);
     if(val) {
       if(val.trim().length>0) {
          this.appUrls.getMembers(1,10,val,false).then(data => {
        if(data) {

            this.isMembersEmpty = false;
            this.members = [];
            for(let member of data) {
              this.members.push(member);
            }

      } 
      
       this.appUrls.loading.dismissLoading();
      });  
       }
      } else {
        this.execute(1,this.noOfMembers,'',false);
      }
    
  }

  execute(pageNo,limit,val,showLoading) {
    return new Promise(resolve => {
      this.appUrls.getMembers(pageNo,limit,val,showLoading).then(data => {
        if(data) {

            this.isMembersEmpty = false;
            this.members = [];
            for(let member of data) {
              this.members.push(member);
            }
        
            this.isComplete = (data.length < this.noOfMembers) ? true : false;
                
        resolve(true);

      } 
      if(this.pageNo == 1 && !data) {
            this.isMembersEmpty = true;
        }
       this.appUrls.loading.dismissLoading();
      });
    });
  }

  memberDetail(memberId) {
      this.navCtrl.push(MemberDetails,{memberId: memberId});
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    this.pageNo+=1;
     this.execute(this.pageNo,this.noOfMembers,'',false).then(()=>{
       infiniteScroll.complete();
     });
  }

  addNewMamber() {
    let modal = this.modalCtrl.create(AddNewMember);
    modal.present();
  }

 scan() {
    this.appUrls.scanMeal();
}

}
