import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LobbyPage } from '../lobby/lobby';

import { RestWWUser } from '../../providers/rest-ww-user';
/*
  Generated class for the AccountSettings page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-account-settings',
  templateUrl: 'account-settings.html'
})
export class AccountSettingsPage {

  constructor(public navCtrl: NavController,
              public restWWUser: RestWWUser) {}

  ionViewDidLoad() {
    console.log('Hello AccountSettingsPage Page');
  }

  user = {
    repeatNewPassword: "",
    password: "",
    newPassword:""
  };
  
  editForm(form) {
    console.log(this.user);
    if (form.invalid) {
      return alert("Please fill in all of the required fields.");
    }
    else if (this.user.newPassword === this.user.repeatNewPassword) {
    this.user.password = this.user.repeatNewPassword
    
      this.restWWUser.edit(this.user, window.localStorage.getItem('userId'), window.localStorage.getItem('token'))
        .map(res => res.json())
        .subscribe(res => {
          console.log(res);
          this.navCtrl.setRoot(LobbyPage);
        }, err => {
          console.log(err);
        });
    }
  }
}
