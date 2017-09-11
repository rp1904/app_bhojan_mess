import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppUrls } from '../../services/appurls';
import { UserModel } from '../../models/UserModel';

@Component({
  selector: 'page-addNewMember',
  templateUrl: 'addNewMember.html',
})

export class AddNewMember {

  constructor(public navCtrl: NavController, public navParams: NavParams, public userModel: UserModel,
              public appUrls: AppUrls, public viewCtrl: ViewController, fb: FormBuilder) {

    this.memberSignUpForm = fb.group({

        'firstName' : [null, Validators.compose([Validators.required, Validators.maxLength(20)])],
        'lastName' : [null, Validators.compose([Validators.required, Validators.maxLength(20)])],
        'email' : [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
        'mobileNo' : [null, Validators.compose([Validators.required, Validators.pattern('([7-9]{1})([0-9]{9})')])],
        'selectedCoupenId' : [null, Validators.compose([Validators.required])]
        // 'password': [null, Validators.compose([Validators.required, Validators.minLength(5)])],
        // 'confirmPassword': [null, Validators.compose([Validators.required, Validators.minLength(5)])]
    })  
  }

isFormValid:boolean = true;
memberSignUpForm : FormGroup;
private member = this.userModel;

coupnId:string="";

coupens:any;

isCoupensEmpty:Boolean=false;

ionViewDidLoad() {
    this.getAllCoupens();
}



  getAllCoupens() {
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

  addMember(memberForm) {

      if(!this.memberSignUpForm.valid) {
        this.isFormValid = false;
        return;
      } else {
          this.isFormValid = true;
      }

      this.appUrls.loading.presentLoading("Registering...");

        this.member.$userProfile.$firstName = memberForm.firstName;
        this.member.$userProfile.$lastName = memberForm.lastName;
        this.member.$email = memberForm.email;
        this.member.$mobileNumber = memberForm.mobileNo;
        // this.member.$password = memberForm.password;

        this.member.$userIdPk = memberForm.selectedCoupenId;

        this.appUrls.registerNewMember(this.member,false).then(data => {
         if(data) {
            this.appUrls.loading.dismissLoading();
            if(data.responseType == "Error") {
                this.appUrls.loading.showAlertOnlyTSubitle(data.responseType,data.message);
            } else {
                this.appUrls.loading.presentToast("bottom", 4000, data.message);
                this.viewCtrl.dismiss();
            }
            
        }
        });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }



}
