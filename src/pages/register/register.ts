import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { LobbyPage } from '../lobby/lobby';

import { RestWWUser } from '../../providers/rest-ww-user';
/*
  Generated class for the Register page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  constructor(
    public navCtrl: NavController,
    private menu: MenuController,
    public restWWUser: RestWWUser) {}

  ionViewDidLoad() {
    console.log('Hello RegisterPage Page');
    this.menu.swipeEnable(false, 'menu1');
  }
  
  user = {};
  
  signupForm(form) {
    console.log(this.user);
    if (form.invalid) {
      return alert("Please fill in all of the required fields.");
    }
    this.restWWUser.register(this.user)
    .map(res => res.json())
    .subscribe(res => {
      window.localStorage.setItem('token', res.token);
      window.localStorage.setItem('userId', res.id);
      this.navCtrl.setRoot(LobbyPage);
        if (res.status === 422) {
          console.log(res)
          alert("Email is already taken")
        }
    }, err => {
      console.log(err);
        if (err.status === 422) {
          alert("Email is already taken")
        }
    });
  }
}