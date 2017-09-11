import { Injectable, Inject } from '@angular/core';
import { Headers, Response } from '@angular/http';
import { LoadingController } from 'ionic-angular';
import { CustomeLoader } from './loader';
import { HttpClient } from './httpClient';
import { Events } from 'ionic-angular';

import { EnvVariables } from '../app/environment-variables/environment-variables.token';

@Injectable()
export class AuthService {

  rp_app_key: string = null;

  public baseURL: string = this.env.apiEndpoint;

  public loginUrl: string = this.baseURL+"unguarded/login/mess";
  public messRegistrationUrl: string = this.baseURL + "unguarded/registration/mess-registration";

  constructor(public events: Events, public http: HttpClient, public loading: CustomeLoader, @Inject(EnvVariables) public env) {


  }

  login(inputData) {
    this.loading.presentLoading("Authenticating...");
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return new Promise(resolve => {
      this.http.http.post(this.loginUrl, inputData)
        .subscribe(data => {
            this.loading.dismissLoading();
            if (data.json().responseType == "Success") {
               this.http.storage.set('rp_app_key', data.json().rp_app_key).then((key) => {
                 this.http.storage.set('mess_name', data.json().mess.messName).then((messname) => {
                    this.http.appKey = key;
                    this.events.publish('mess_name', messname);
                    resolve(data.json());
                });
              });
            }

          },
          err => {
             this.loading.dismissLoading();
            console.log("Error status : " + err.status);
            var obj = JSON.parse(err._body);
            console.log("Error status : " + obj.responseType);
            this.loading.showAlertOnlyTSubitle(obj.responseType, obj.message);
            resolve(err);
          }
        );
    });
  }


  registerMess(mess, showLoading) {

    this.loading.presentLoading("Registering...");
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return new Promise(resolve => {
      this.loading.dismissLoading();
      this.http.post(this.messRegistrationUrl, mess, showLoading)
        .map((res: Response) => res.json())
        .subscribe(data => {
          resolve(data);
        },
          err => {
            console.log("Error status : " + err.status);
            this.loading.dismissLoading();
            if(err.status == 0) {
              this.loading.showAlertOnlyTSubitle("Error","Server Down !");
            } else {
              this.loading.showAlertOnlyTSubitle(err.responseType, err.message);
            }
            
            
            resolve(err);
          }
        );
    });
  }


}
