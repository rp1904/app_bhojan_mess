import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, MenuController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/authservice';
import { Signin } from '../signin/signin';
import { MessModel } from '../../models/MessModel';
import { AppUrls } from '../../services/appurls';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class Signup {

 constructor(public navCtrl: NavController, public authservice: AuthService, public messModel: MessModel,
             public appUrls: AppUrls, public params: NavParams, fb: FormBuilder, private menu: MenuController) {

    this.messSignUpForm = fb.group({
        'messName' : [null, Validators.compose([Validators.required, Validators.maxLength(20)])],
        'addrLine1' : [null, Validators.compose([Validators.required])],
        'addrLine2' : [null],
        'city' : [null, Validators.compose([Validators.required, Validators.maxLength(20)])],
        'state' : [null, Validators.compose([Validators.required, Validators.maxLength(20)])],
        'pincode' : [null, Validators.compose([Validators.required, Validators.pattern('[0-9]{6}')])],
        'firstName' : [null, Validators.compose([Validators.required, Validators.maxLength(20)])],
        'lastName' : [null, Validators.compose([Validators.required, Validators.maxLength(20)])],
        'email' : [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
        'mobileNo' : [null, Validators.compose([Validators.required, Validators.pattern('([7-9]{1})([0-9]{9})')])]
        // 'password': [null, Validators.compose([Validators.required, Validators.minLength(5)])],
        // 'confirmPassword': [null, Validators.compose([Validators.required, Validators.minLength(5)])]
    })  
  }

isFormValid:boolean = true;
messSignUpForm : FormGroup;
response:any;
private mess = this.messModel;

  ionViewDidLoad() {
    this.menu.swipeEnable(false, 'sideMenu');
  }

    signup(messForm){

      if(!this.messSignUpForm.valid) {
            this.isFormValid = false;
            return;
      } else {
            this.isFormValid = true;
      }

        this.mess.$messName = messForm.messName;
        this.mess.$messOwner.$password = messForm.password;
        this.mess.$messAddress.$addressLine1 = messForm.addrLine1;
        this.mess.$messAddress.$addressLine2 = messForm.addrLine2;
        this.mess.$messAddress.$city = messForm.city;
        this.mess.$messAddress.$state = messForm.state;
        this.mess.$messAddress.$pinCode = messForm.pincode;

        this.mess.$messOwner.$userProfile.$firstName = messForm.firstName;
        this.mess.$messOwner.$userProfile.$lastName = messForm.lastName;
        this.mess.$messOwner.$email = messForm.email;
        this.mess.$messOwner.$mobileNumber = messForm.mobileNo;
        // this.mess.$messOwner.$password = messForm.password;

        console.log(this.mess);

        this.appUrls.authservice.registerMess(this.mess,false).then(data => {
        if(data) {
            this.response = data;
            this.appUrls.loading.dismissLoading();
            if(this.response.responseType == "Error") {
                
                this.appUrls.loading.showAlertOnlyTSubitle(this.response.responseType,this.response.message);
            } else {
                this.navCtrl.setRoot(Signin, { registration:"Success" });
            }
            
        }
        });
    }

    signin() {
        this.navCtrl.push(Signin);
    }
}

