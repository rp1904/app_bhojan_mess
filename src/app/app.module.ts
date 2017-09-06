import { BrowserModule } from '@angular/platform-browser';
import { Device } from '@ionic-native/device';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Network } from "@ionic-native/network";
import { IonicStorageModule } from '@ionic/storage';
import { AppVersion } from '@ionic-native/app-version';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Dialogs } from '@ionic-native/dialogs';


import { MyApp } from './app.component';
import { EnvironmentsModule } from './environment-variables/environment-variables.module';
import { HttpModule } from '@angular/http';
import { HomePage } from '../pages/home/home';
import { NewMembershipRequests } from '../pages/requests/newMembershipRequests';
import { AddMeal } from '../pages/meal/addMeal';
import { MealDetails } from '../pages/meal/mealDetails';
import { MealCoupens } from '../pages/mealCoupens/mealCoupens';
import { ViewMealList } from '../pages/meal/viewMealList';
import { Signup } from '../pages/signup/signup';
import { Signin } from '../pages/signin/signin';
import { Members } from '../pages/members/members';
import { MealMembers } from '../pages/mealMembers/mealMembers';
import { MemberDetails } from '../pages/memberDetails/memberDetails';
import { Userpage } from '../pages/userpage/userpage';
import { Update } from '../pages/update/update';
import { Profile } from '../pages/profile/profile';
import { AddNewMember } from '../pages/addNewMember/addNewMember';

import { AppUrls } from '../services/appurls';
import { AuthService } from '../services/authservice';
import { HttpClient } from '../services/httpClient';
import { CustomeLoader } from '../services/loader';

import { UserModel } from '../models/UserModel';
import { MealCoupenModel } from '../models/MealCoupenModel';
import { MealModel } from '../models/MealModel';
import { UserProfileModel } from '../models/UserProfileModel';
import { MessModel } from '../models/MessModel';
import { AddressModel } from '../models/AddressModel';
import { CreatedUpdatedModel } from '../models/CreatedUpdatedModel';
import { MembershipRequestModel } from '../models/MembershipRequestModel';


import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Ionic2RatingModule } from 'ionic2-rating';

// import { checkFirstCharacterValidator } from '../validators/customValidators';

@NgModule({
  declarations: [
    MyApp,
    Profile,
    Update,
    AddNewMember,
    HomePage,
    Members,
    MealMembers,
    MemberDetails,
    NewMembershipRequests,
    AddMeal,
    MealDetails,
    MealCoupens,
    ViewMealList,
    Signup,
    Signin,
    Userpage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    Ionic2RatingModule,
    EnvironmentsModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
    //   IonicModule.forRoot(MyApp, {
    //     scrollAssist: false, 
    //     autoFocusAssist: false
    // })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Update,
    AddNewMember,
    Profile,
    HomePage,
    Members,
    MealMembers,
    MemberDetails,
    NewMembershipRequests,
    AddMeal,
    MealDetails,
    MealCoupens,
    ViewMealList,
    Signup,
    Signin,
    Userpage
  ],
  providers: [
    Network,
    AppVersion,
    InAppBrowser,
    Dialogs,
    File,
    FileOpener,
    FileTransfer, 
    FileTransferObject,
    Device,
    BarcodeScanner,
    HttpClient,
    MembershipRequestModel,
    CreatedUpdatedModel,
    AddressModel,
    UserModel,
    UserProfileModel,
    MealModel,
    MessModel,
    MealCoupenModel,
    AuthService,
    AppUrls,    
    CustomeLoader,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
