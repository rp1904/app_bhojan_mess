import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, MenuController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { checkFirstCharacterValidator } from '../../validators/customValidators';
import { AuthService } from '../../services/authservice';
import { AppUrls } from '../../services/appurls';
import { UserModel } from '../../models/UserModel';
import { Signup } from '../signup/signup';
import { HomePage } from '../home/home';
import { Update } from '../update/update';
import { RequestMembership } from '../requestMembership/requestMembership';
import { Http,Headers } from '@angular/http';

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class Signin {

authForm : FormGroup;

  constructor(public navCtrl: NavController, public appUrls: AppUrls, public modalCtrl: ModalController,
              public authservice: AuthService, public params: NavParams, fb: FormBuilder, private menu: MenuController) {

          this.authForm = fb.group({
            'emailOrMobileNo' : [null, Validators.compose([Validators.required])],
            'password': [null, Validators.compose([Validators.required, Validators.minLength(5)])] //, checkFirstCharacterValidator(/^\d/i)
          })  
  }


online:boolean;

response:any;


  ionViewDidLoad() {

    this.menu.swipeEnable(false, 'sideMenu');
    this.online = this.appUrls.loading.checkNetwork();
   
    if(this.params.get("registration") == "Success") {
      this.appUrls.loading.showAlertOnlyTSubitle("Success","Registration Successfull !");
    }

  }

  login(value: any):void{

   let loginModel={
        emailOrMobileNumber:value.emailOrMobileNo,
        password:value.password
      }

      if(!loginModel.emailOrMobileNumber || loginModel.emailOrMobileNumber.trim() == "") {
            this.appUrls.loading.presentToast("bottom",2000,"Please enter Email / Mobile No.");
            return;
      }

      if(!loginModel.password || loginModel.password.trim() == "") {
            this.appUrls.loading.presentToast("bottom",2000,"Please enter password.");
            return;
      }

        this.authservice.login(loginModel).then(data => {
          console.log(data);
            if(data) {
              this.response=data;    
              if(this.response.responseType=="Success") {
                    this.navCtrl.setRoot(HomePage);
               }              
            }
    });
  }

  signup() {
    this.navCtrl.setRoot(Signup);
  }
   
  
  forgotPassword() {
    alert("Clicked !");
  }
}

