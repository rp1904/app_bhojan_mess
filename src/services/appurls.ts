import {
  Injectable
} from '@angular/core';
import {
  Headers,
  Response
} from '@angular/http';
import {
  AuthService
} from './authservice';
import {
  CustomeLoader
} from './loader';

import { AppVersion } from '@ionic-native/app-version';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import 'rxjs/Rx';

@Injectable()
export class AppUrls {

  public authURL: string = this.authservice.baseURL + "oauth/token?grant_type=password&client_id=restapp&client_secret=restapp";
  public refreshTokenURL: string = this.authservice.baseURL + "oauth/token?grant_type=refresh_token&client_id=restapp&client_secret=restapp&refresh_token=";
  public memberRegistrationUrl: string = this.authservice.baseURL + "unguarded/registration/member-registration";
  public allMembersUrl: string = this.authservice.baseURL + "api/mess/all";
  public requestMembershipUrl: string = this.authservice.baseURL + "api/membershiprequest/make";
  public isMembershipRequestAcceptedUrl: string = this.authservice.baseURL + "api/membershiprequest/check";
  public getLastGeneratedActiveMealCodeUrl: string = this.authservice.baseURL + "api/meal-code/get";

  public messCodeUrl: string = this.authservice.baseURL + "api/mess/mess-code";
  public messAllMembersUrl: string = this.authservice.baseURL + "api/mess/members";
  public messMembersByMealIdUrl: string = this.authservice.baseURL + "api/mess/members/consumed?mealId=";
  public messAddMealUrl: string = this.authservice.baseURL + "api/mess/meals/add";
  public messMealCoupensUrl: string = this.authservice.baseURL + "api/mess/meal-coupens";
  public messAllMealsUrl: string = this.authservice.baseURL + "api/mess/meals";
  public messProfileUrl: string = this.authservice.baseURL + "api/mess/profile";
  public messChangePasswordUrl: string = this.messProfileUrl + "/update-password";
  public messReadMealCodeUrl: string = this.authservice.baseURL + "api/mess/meals/read-meal-code";
  public messPendingNewMembershipRequestsUrl: string = this.authservice.baseURL + "api/mess/new-membership-requests/pending";
  public messUpdateMembershipRequestUrl: string = this.authservice.baseURL + "api/mess/new-membership-requests/update";
  public messRegisterNewMemberUrl: string = this.authservice.baseURL + "api/mess/members/register";
  public messMakePaymentRequestUrl: string = this.authservice.baseURL + "api/mess/payment/request";

  public messVersionCheckUrl: string = this.authservice.baseURL + "unguarded/version-check/mess";


  isHeaderSet:Boolean=false;
  versionNo:string;
  scanResult:any;

  constructor(public authservice: AuthService, public loading: CustomeLoader, public barcodeScanner:BarcodeScanner, public appVersion:AppVersion) {}


  makePayment() {
     return new Promise<any>(resolve => {
      this.authservice.http.get(this.messMakePaymentRequestUrl, false).subscribe(data => {
        if (data.json())
          resolve(data.json());
        else
          resolve(false);
      });
    });
  }

  registerNewMember(newMember, showLoading) {
    return new Promise<any>(resolve => {
      this.authservice.http.post(this.messRegisterNewMemberUrl, newMember, showLoading).subscribe(data => {
        if (data.json())
          resolve(data.json());
        else
          resolve(false);
      });
    });
  }

  changePassword(oldPassword,newPassword,showLoading) {
      return new Promise<any>(resolve => {
        this.authservice.http.post(this.messChangePasswordUrl, {password:oldPassword,confirmPassword:newPassword}, showLoading).subscribe(data => {
          if (data.json()) {
            resolve(data.json());
          } else {
            resolve(false);
          }
        });
      });
    }

  getMessProfile(showLoading) {
    return new Promise<any>(resolve => {
      this.authservice.http.get(this.messProfileUrl, showLoading).subscribe(data => {
        if (data.json()) {
          resolve(data.json());
        } else {
          resolve(false);
        }
      });
    });
  }

  getMembersByMealId(mealId, showLoading) {
     return new Promise<any>(resolve => {
      this.authservice.http.get(this.messMembersByMealIdUrl + mealId, showLoading).subscribe(data => {
        if (data.json()) {
          resolve(data.json());
        } else {
          resolve(false);
        }
      });
    });
  }

  getMealDetails(mealId, showLoading) {
    return new Promise<any>(resolve => {
      this.authservice.http.get(this.messAllMealsUrl + "/" + mealId, showLoading).subscribe(data => {
        if (data.json()) {
          resolve(data.json());
        } else {
          resolve(false);
        }
      });
    });
  }

  getOpenedMeals(showLoading) {
    return new Promise<any>(resolve => {
      this.authservice.http.get(this.messAllMealsUrl + "/active", showLoading).subscribe(data => {
        if (data.json().responseType != "Error") {
          resolve(data.json()[0]);
        } else {
          resolve(false);
        }
      });
    });
  }

  getMemberDetails(memberId, showLoading) {

    return new Promise(resolve => {

      this.authservice.http.get(this.messAllMembersUrl + "?memberId=" + memberId, showLoading).subscribe(data => {
        if (data.json()) {
          resolve(data.json());
        } else {
          resolve(false);
        }
      });
    });
  }

  closeMeal(mealId, showLoading) {
    return new Promise(resolve => {

      this.authservice.http.get(this.messAllMealsUrl + "?mealId=" + mealId, showLoading)
        .subscribe(data => {
          if (data.json()) {
            resolve(data.json());
          } else {
            resolve(false);
          }
        });
    });
  }

  addMealCoupen(mealCoupen, showLoading) {

    return new Promise(resolve => {

      this.authservice.http.post(this.messMealCoupensUrl, mealCoupen, showLoading)
        .map((res: Response) => res.json())
        .subscribe(data => {
          this.loading.showAlertOnlyTSubitle(data.responseType, data.message);
          resolve(data);
        });
    });

  }

  getAllMealCoupens(showLoading) {

    return new Promise(resolve => {

      this.authservice.http.get(this.messMealCoupensUrl, showLoading)
        .subscribe(data => {
          if (data.json().length > 0) {
            resolve(data.json());
          } else {
            resolve(false);
          }
        });
    });
  }

  getMembers(pageNo, limit, searchString, showLoading) {
    return new Promise<any>(resolve => {

      this.authservice.http.get(this.messAllMembersUrl + "/" + pageNo + "/" + limit + "/" + searchString, showLoading).subscribe(data => {
        if (data.json().length > 0) {
          resolve(data.json());
        } else {
          resolve(false);
        }
      });
    });
  }

  getMeals(pageNo, limit, showLoading) {
    return new Promise(resolve => {
      this.authservice.http.get(this.messAllMealsUrl + "/" + pageNo + "/" + limit, showLoading).subscribe(data => {
        if (data.json()) {
          resolve(data.json());
        } else {
          resolve(false);
        }
      });
    });
  }

  makeMemberShipRequest(messCode, showLoading) {

    return new Promise(resolve => {
      this.authservice.http.post(this.requestMembershipUrl, messCode, showLoading)
        .map((res: Response) => res.json())
        .subscribe(data => {
          if (data.responseType) {
            this.loading.showAlertWithSubTitle(data.responseType, data.message);
            resolve(true);
          } else {
            resolve(false);
          }
        });
    });
  }

  isMembershipRequestAccepted(showLoading) {
    return new Promise(resolve => {
      this.authservice.http.get(this.isMembershipRequestAcceptedUrl, showLoading).subscribe(data => {

        console.log(data.json());
        if (data.json().membershipRequestIdPk)
          resolve(data.json());
        else
          resolve(false);
      });
    });
  }


  getLastGeneratedActiveMealCode(showLoading) {

    return new Promise(resolve => {

      this.authservice.http.get(this.getLastGeneratedActiveMealCodeUrl, showLoading).subscribe(data => {

        console.log(data.json());
        if (data.json().responseType == "Success")
          resolve(data.json().message);
        else
          resolve(false);
      });
    });
  }

  getMessCode(showLoading) {

    return new Promise(resolve => {
      this.authservice.http.get(this.messCodeUrl, showLoading).subscribe(data => {

        console.log(data.json());
        if (data.json().responseType == "Success")
          resolve(data.json().message);
        else
          resolve(false);
      });
    });
  }


  addMeal(meal, showLoading) {
    return new Promise(resolve => {
      this.authservice.http.post(this.messAddMealUrl, meal, showLoading).subscribe(data => {
        if (data.json())
          resolve(data.json());
        else
          resolve(false);
      });
    });
  }

  readMealCode(code, showLoading) {
    return new Promise(resolve => {

      this.authservice.http.get(this.messReadMealCodeUrl + "/" + code, showLoading).subscribe(data => {
        if (data.json())
          resolve(data.json());
        else
          resolve(false);
      });
    });
  }

  getAllNewMembershipRequests(showLoading) {

    return new Promise(resolve => {
      this.authservice.http.get(this.messPendingNewMembershipRequestsUrl, showLoading).subscribe(data => {
        if (data.json().length > 0)
          resolve(data.json());
        else
          resolve(false);
      });
    });
  }

  updateMembershipRequest(status, member_id, coupen_id, showLoading) {
    return new Promise(resolve => {

      this.authservice.http.get(this.messUpdateMembershipRequestUrl + "/" + status + "/" + member_id + "/" + coupen_id, showLoading).subscribe(data => {
        if (data.json()) {
          resolve(data.json());
        } else {
          resolve(false);
        }
      });
    });
  }

  scanMeal() {
  console.log('Scannig Meal...');
  this.barcodeScanner.scan({
          // preferFrontCamera : false, // iOS and Android
          showFlipCameraButton : true, // iOS and Android
          // showTorchButton : true, // iOS and Android
          // torchOn: true, // Android, launch with the torch switched on (if available)
          prompt : "Place the Meal QR code inside the scan area", // Android
          // resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
          // formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
          // orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
          // disableAnimations : true, // iOS
          // disableSuccessBeep: false // iOS
      }
   ).then((result) => {
         if (!result.cancelled) {
                  
                  this.loading.presentLoading("Scaning...");
                  this.readMealCode(result.text.trim(),true).then(data => {
                  this.loading.dismissLoading();
                    if(data) {
                      this.scanResult=data;
                      // this.loading.showAlertOnlyTSubitle(this.scanResult.responseType,this.scanResult.message);
                      this.showScanedResult(this.scanResult.message);
                    } 
                  });
            }
  }, (err) => {
        this.loading.showAlertOnlyTSubitle("Error",err);
  });
            
}

  showScanedResult(data) {
    let confirm = this.loading.alertCtrl.create({
      title: data,
      message: 'Want to scan another ?',
      buttons: [
        {
          text: 'No',
           role: 'cancel',
          handler: () => {
            console.log('No clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
              this.scanMeal();
          }
        }
      ]
    });
    confirm.present();
  }

  getLatestVersion() {
    
     return new Promise<any>(resolve => {
            console.log("Env: " + this.authservice.env.ionicEnvName);

            if(this.authservice.env.ionicEnvName == 'dev') {
              resolve(false);
            } else {
                this.authservice.http.http.get(this.messVersionCheckUrl).subscribe(data => {
                  console.log("Latest Version: " + data.json().version);
                    if (data.json().version > this.versionNo) {
                      resolve(data.json());
                    } else {
                      resolve(false);
                    }
              });
            }
      });   
  }

    getCurrentVersion() {
      return new Promise<string>(resolve => {
         console.log("Env: " + this.authservice.env.ionicEnvName);

            if(this.authservice.env.ionicEnvName == 'dev') {
                  resolve('0.0.0');
            } else {
              this.appVersion.getVersionNumber().then(vn => {
                  resolve(vn);
              });
            }
      });
    }
  
}
