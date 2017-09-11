import {
  Component,
  ViewChild
} from '@angular/core';
import {
  Push,
  PushObject,
  PushOptions
} from '@ionic-native/push';
import {
  Nav,
  Platform,
  Events,
  ModalController
} from 'ionic-angular';
import {
  StatusBar
} from '@ionic-native/status-bar';
import {
  SplashScreen
} from '@ionic-native/splash-screen';
import {
  Storage
} from '@ionic/storage';

import {
  Update
} from '../pages/update/update';
import {
  HomePage
} from '../pages/home/home';
import {
  AddMeal
} from '../pages/meal/addMeal';
import {
  MealCoupens
} from '../pages/mealCoupens/mealCoupens';
import {
  ViewMealList
} from '../pages/meal/viewMealList';
import {
  Signin
} from '../pages/signin/signin';
import {
  NewMembershipRequests
} from '../pages/requests/newMembershipRequests';
import {
  Members
} from '../pages/members/members';
import {
  MemberDetails
} from '../pages/memberDetails/memberDetails';
import {
  Profile
} from '../pages/profile/profile';
import {
  Userpage
} from '../pages/userpage/userpage'
import {
  AppUrls
} from '../services/appurls';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  messName: string;

  rootPage: any;

  pageName: string = 'Home';

  msg: string;

  versionNo: string;

  pages: Array < {
    title: string,
    component: any,
    icon: string,
    color: any,
    isVisible:boolean
  } > ;

  constructor(public platform: Platform, public statusBar: StatusBar, private storage: Storage, public modalCtrl: ModalController,
    public splashScreen: SplashScreen, public appUrls: AppUrls, private ev: Events) {
    this.initializeApp();

    this.ev.subscribe('status_code', status_code => {

      if (status_code == '504') {
        this.msg = 'Server Down ! Please try after sometime.';
      }

      if (status_code == '401') {
        this.msg = 'Session expired ! Please login again.';
        this.nav.setRoot(Signin);
      }

      if (status_code == '0') {
        this.msg = 'Please check your internet connection.';
      }

      this.appUrls.loading.presentToast('bottom', 5000, this.msg);

    });

    this.ev.subscribe('mess_name', mess_name => {
      this.messName = mess_name;
    });

    this.ev.subscribe('set_header', flag => {
      this.appUrls.isHeaderSet = flag;
    });


    // used for an example of ngFor and navigation
    this.pages = [{
        title: 'Home',
        component: HomePage,
        icon: 'home',
        color: '',
        isVisible:false
      },
      {
        title: 'New Requests',
        component: NewMembershipRequests,
        icon: 'person-add',
        color: '',
        isVisible:true
      },
      {
        title: 'Members',
        component: Members,
        icon: 'people',
        color: '',
        isVisible:true
      },
      {
        title: 'Meals',
        component: ViewMealList,
        icon: 'restaurant',
        color: '',
        isVisible:true
      },
      {
        title: 'Meal Coupens',
        component: MealCoupens,
        icon: 'document',
        color: '',
        isVisible:true
      },
      {
        title: 'Profile',
        component: Profile,
        icon: 'person',
        color: '',
        isVisible:true
      },
      {
        title: 'Logout',
        component: null,
        icon: 'exit',
        color: '',
        isVisible:true
      }
    ];

  }


  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      this.appUrls.getCurrentVersion().then(vn => {
        this.versionNo = vn;
        this.appUrls.versionNo = vn;
        console.log("Current Version: " + vn);
        this.appUrls.getLatestVersion().then(data => {
          if (data) {
            let updateModal = this.modalCtrl.create(Update, {
              versionDetails: data
            });
            updateModal.present();
          } else {

            console.log("No New Version Available.");

            this.registerBackButton();

            this.statusBar.styleDefault();

            this.storage.ready().then(() => {
              this.storage.get('rp_app_key').then((val) => {

                this.storage.get('mess_name').then((messname) => {

                  this.messName = messname;
                  this.splashScreen.hide();

                  if (val != null) {
                    this.appUrls.authservice.http.appKey = val;
                    this.appUrls.isHeaderSet = true;
                    this.rootPage = HomePage;
                  } else {
                    this.appUrls.isHeaderSet = false;
                    this.rootPage = Signin;
                  }

                  // if (val != null) {
                  //   this.appUrls.authservice.http.appKey = val;
                  //   this.appUrls.isHeaderSet = true;
                  //   this.rootPage = Userpage;
                  // } else {
                  //   this.appUrls.isHeaderSet = false;
                  //   this.rootPage = Userpage;
                  // }

                });
              });
            });

          }
        });
      });

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (page.component) {
      this.nav.setRoot(page.component);
      this.pageName = page.title;
      this.appUrls.isHeaderSet = true;
      page.color = 'theam-color';

      for (let p of this.pages) {
        if (p.title == page.title) {
          p.color = 'theam-color';
        } else {
          p.color = '';
        }
      }
    } else {

      let confirm = this.appUrls.loading.alertCtrl.create({
        subTitle: 'Are you sure want to logout?',
        buttons: [{
            text: 'No'
          },
          {
            text: 'Yes',
            handler: () => {
              this.storage.remove('rp_app_key').then((val) => {
                this.ev.publish('set_header', false);
                this.nav.setRoot(Signin);
              });
            }
          }
        ],
        cssClass: 'logout-confirm'
      });
      confirm.present();
    }
  }

  registerBackButton() {

    var lastTimeBackPress = 0;
    var timePeriodToExit = 2000;

    this.platform.registerBackButtonAction(() => {
    
      if (this.nav.getActive().component == this.pages[0].component) {
        
        if (new Date().getTime() - lastTimeBackPress < timePeriodToExit) {
          this.platform.exitApp(); //Exit from app
        } else {
          this.appUrls.loading.presentToast('bottom', 3000, 'Press back again to exit App !');
          lastTimeBackPress = new Date().getTime();
        }
      } else {
        // go to previous page
        this.nav.pop().catch(() => {
          this.nav.setRoot(HomePage);
        });
      }
    });
  }

}

// Green - #69C333
// Orange - #EE8C3A
// Light grey bg - #FAFAFA
