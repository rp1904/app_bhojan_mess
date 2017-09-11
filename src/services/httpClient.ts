import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import { CustomeLoader } from './loader';
import { Events } from 'ionic-angular';


@Injectable()
export class HttpClient {

appKey:string;

  constructor(public http: Http, public storage: Storage, public loading: CustomeLoader, public events:Events) {
   
  }

  createAuthorizationHeader(headers: Headers) {

      headers.append('Content-Type', 'application/json');
      headers.append('rp-app-key', this.appKey);
      console.log(' HttpClient createAuthorizationHeader rp_app_key ====>>> ', this.appKey);
      
 }

  createAuthorizationHeader1(headers1: Headers) {

   headers1.append('Content-Type', 'application/json');
   headers1.append('X-Api-Key','c7fce1edaa64c3ae5ceb754ea05f9515');
   headers1.append('X-Auth-Token','5cfb1eebe8630fc8e52b9d27f6afd576');
  //  headers.append('Access-Control-Allow-Origin', '*');
  //  headers.append('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  //  headers.append('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token, X-Api-Key');
      
 }

  get(url, showLoading) {
    if(showLoading) {
      console.log("Loading...");
      this.loading.presentLoadingWithLoaderMsg();
    }    
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(url, {
      headers: headers
    }).catch((err: Response, caught: Observable<any>) => {
      console.log("In httpClient get:==========>>>> "+err);
      this.events.publish('status_code', err.status);
      return Observable.throw(caught);
    }).finally(()=> {
        console.log('This is get finally block');
      if(showLoading) {
        this.loading.dismissLoading();
      }
        
    });
  }

  post(url, data, showLoading) {
    if(showLoading) {
      this.loading.presentLoadingWithLoaderMsg();
    }
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.post(url, data, {
      headers: headers
    }).catch((err: Response, caught: Observable<any>) => {
      console.log("In httpClient post:==========>>>> "+err);
      this.events.publish('status_code', err.status);
      return Observable.throw(caught);
    }).finally(()=> {
        console.log('This is post finally block');
        if(showLoading) {
          this.loading.dismissLoading();
        }
    });
  }

  makePost() {
    
    let headers1 = new Headers();
    this.createAuthorizationHeader1(headers1);

   var data = {
                    purpose: 'FIFA 16',
                    amount: '2500',
                    phone: '9999999999',
                    buyer_name: 'John Doe',
                    redirect_url: 'http://www.example.com/redirect/',
                    send_email: false,
                    webhook: 'http://www.example.com/webhook/',
                    send_sms: false,
                    email: 'foo@example.com',
                    allow_repeated_payments: false
                }
    return this.http.post("https://test.instamojo.com/api/1.1/payment-requests/", data, {
      headers: headers1
    }).catch((err: Response, caught: Observable<any>) => {
      console.log("In httpClient post:==========>>>> "+err);
      return Observable.throw(caught);
    }).finally(()=> {
        console.log('This is post finally block');
       
    });


  }

}