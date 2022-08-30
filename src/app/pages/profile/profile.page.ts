import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { NavParams } from '@ionic/angular';
import { GeneralFunctions } from '../../providers/general-functions';
import { Clipboard } from '@capacitor/clipboard';
import { FullPhotoPage } from '../fullphoto/fullphoto.page';
import { StoryModalEnterAnimation, StoryModalLeaveAnimation, MusicModalEnterAnimation, MusicModalLeaveAnimation } from '../../app.animations';


export const SESSION_KEY = 'SESSION';
export const MESSAGE_DATA = 'MESSAGE_DATA_';
export const PEOPLE_DATA = 'PEOPLE_DATA_';

@Component({
selector: 'app-profile',
templateUrl: './profile.page.html',
styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
userData = {
"userid": "",
"fname": "",
"name": "",
"desc_status": "",
"username":"", 
"password":"",
"email":"",
"language":"",
"version":"",
"platform":"", 
"cordova":"", 
"model":"", 
"dplatform": "", 
"uuid":"", 
"dversion":"", 
"manufacturer":"", 
"disvirtual": false, 
"serial":"",
"device_uid_token": ""
};
photo: string = 'none';
connection: any;
user: any;
modal3:any;

constructor(
private modalCtrl: ModalController, 
private localStorageService: LocalStorageService,
public navParams : NavParams,
private generalFunctions: GeneralFunctions,
private platform: Platform
) { 
//this.connection = this.navParams.get('connection');
}

async openPhoto(url){
var deceteds; var decenterAnimation; var decleaveAnimation; var decleaveparanet;

if (!this.platform.is('mobile')){
deceteds = 'pcandwebdesig nomusiccontrols photominwpa';
decenterAnimation = '';
decleaveAnimation = '';
decleaveparanet = ';'
} else {
deceteds = 'nomusiccontrols';
decenterAnimation = MusicModalEnterAnimation;
decleaveAnimation = MusicModalLeaveAnimation;
//decleaveparanet = this.routerOutlet.nativeEl;
}

if(this.modal3){
this.modal3.dismiss({data: true}); 
this.modal3 = null;
} else {

this.modal3 = await this.modalCtrl.create({
component: FullPhotoPage,
componentProps: {
photo: url,
},
mode: 'ios',
cssClass: deceteds,
swipeToClose: true,
showBackdrop: true,
backdropDismiss: true,
enterAnimation: decenterAnimation,
leaveAnimation: decleaveAnimation,
presentingElement: decleaveparanet,
});


this.modal3.onDidDismiss().then(data => {
this.modal3 = null;
});

return await this.modal3.present();
}
}

userdata(){
this.userData = this.localStorageService.getItem(SESSION_KEY)[0];
if(this.userData){
var user = this.navParams.get('user');
var inventory = this.localStorageService.getItem(PEOPLE_DATA+this.userData['userid']);
//Find index of specific object using findIndex method.    
var objIndex = inventory.findIndex((obj => obj.userid == this.user['id']));
//Update object's name property.
this.user = inventory[objIndex];
} else {

}
}

async writeToClipboard () {
var text = this.userData['userid'];
this.generalFunctions.ToastShowModal(this.generalFunctions.xtranslate('messenger.copy')+': '+text,'1100','bottom');
await Clipboard.write({
string: text
});
}
    

ngOnInit() {
let userData = this.localStorageService.getItem(SESSION_KEY);
if(userData){
this.userdata();
}
}

closeModal() {
if (!this.platform.is('mobile')){
var messagedetailmodals = document.getElementById('messagedetailmodals');
messagedetailmodals.classList.toggle('pwaprofileopenmessage');
}
this.modalCtrl.dismiss();
}

}
