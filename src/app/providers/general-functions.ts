import { Injectable } from '@angular/core';

import { App } from '@capacitor/app';
import { Clipboard } from '@capacitor/clipboard';
import { Geolocation } from '@capacitor/geolocation';
import { Storage } from '@capacitor/storage';
import { CapacitorConfig } from '@capacitor/cli';


import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

import { NavController } from '@ionic/angular';

import { TranslateService } from '@ngx-translate/core';

import { Location } from "@angular/common";

@Injectable({providedIn: 'root'})
export class GeneralFunctions {
nval: any;

constructor(
public toastController: ToastController,
public alertController: AlertController,
public translate: TranslateService,
public navCtrl: NavController,
public modalController: ModalController,
private location: Location
) {}

async createWindow (url) {
window.open(url, '_blank', 'nodeIntegration=no');
}

async EC_exitApp() {
App.exitApp();
}

async ToastShowModal(s_text,s_duration,s_position) {
const toast = await this.toastController.create({
message: s_text,
duration: s_duration,
position: s_position
});
toast.present();
}


async presentAlert(s_text,s_cssClass,s_header,s_subHeader,s_buttons) {
const alert = await this.alertController.create({
cssClass: s_cssClass,
header: s_header,
subHeader: s_subHeader,
message: s_text,
buttons: [s_buttons]
});
await alert.present();
}
 
async copyText(cText,name,message) {
Clipboard.write({
string: cText
});
this.ToastShowModal(name+' '+message,'1000','bottom');
}

xtranslate(texts) {
this.translate.get(texts).subscribe(
value => {this.nval = value;}
);
return this.nval;
}

uumakeid(length) {
var result           = '';
var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
var charactersLength = characters.length;
for ( var i = 0; i < length; i++ ) {
result += characters.charAt(Math.floor(Math.random() * 
charactersLength));
}
return result;
}

navCtrlNF(url) {
return this.navCtrl.navigateForward(url);
}

navCtrlNB(url) {
return this.navCtrl.navigateBack(url);
}

navCtrlNR(url) {
return this.navCtrl.navigateRoot(url);
}

navCtrlBack() {
return this.navCtrl.back();
}

goBack(){
return this.location.back();
}

}