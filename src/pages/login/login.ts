import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { LobbyPage } from '../lobby/lobby';
import { RegisterPage } from '../register/register';

import { RestWWUser } from '../../providers/rest-ww-user';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login', 
  templateUrl: 'login.html'
})
export class LoginPage {
  
  constructor(
    public navCtrl: NavController,
    private menu: MenuController,
    public restWWUser: RestWWUser) {
      window.localStorage.clear();
    }  

  ionViewDidLoad() {
    console.log('Hello Landing Page');
    this.menu.enable(false)
    this.menu.swipeEnable(false, 'menu1');
  }

  ionViewDidLeave() {
    this.menu.enable(true)
  }

  user = {};

  signinForm(form) {
    console.log(this.user);
    if (form.invalid) {
      return alert("Please fill in all of the required fields.");
    }
    this.restWWUser.login(this.user)
    .map(res => res.json())
    .subscribe(res => {
      console.log(res);
      window.localStorage.setItem('token', res.id);
      window.localStorage.setItem('userId', res.userId);
      this.navCtrl.setRoot(LobbyPage);
        if (res.status === 422) {
          console.log(res)
          alert("Email is already taken")
        }
    }, err => {
      console.log(err);
        if (err.status === 401) {
          console.log(err)
          alert(err.statusText)
        }
    });
  }

  register() {
    this.navCtrl.push(RegisterPage);
  }

}