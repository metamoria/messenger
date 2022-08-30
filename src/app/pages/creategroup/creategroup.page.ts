import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Input, ElementRef, Renderer2 } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { GeneralFunctions } from '../../providers/general-functions';
import { NavParams } from '@ionic/angular';

import { Clipboard } from '@capacitor/clipboard';
import { configFromSession } from '@ionic/core';

export const SESSION_KEY = 'SESSION';
export const MESSAGE_DATA = 'MESSAGE_DATA_';
export const PEOPLE_DATA = 'PEOPLE_DATA_';

@Component({
selector: 'app-creategroup',
templateUrl: './creategroup.page.html',
styleUrls: ['./creategroup.page.scss'],
})
export class CreategroupPage implements OnInit {
connection: any;
userid: any;
form_post_pross: boolean = false;
cmessageData: any[] = [];
setdata: any;
userData: any[] = [];

constructor(
public alertController: AlertController,
private localStorageService: LocalStorageService,
private generalFunctions: GeneralFunctions,
private modalCtrl: ModalController,
public navParams : NavParams
) {
this.connection = this.navParams.get('connection');
}


finds(){
if(this.userData['logintype'] == 'pwa'){
var logintypex = 'pwa';
} else {
var logintypex = "mobile";
}

var blockis = false; this.setdata = false;
var inkey = <HTMLInputElement>document.getElementById('userkeyid');
if(inkey.value){
if(inkey.value == this.userid){} else {
this.form_post_pross = true;
if(this.connection){
var extra = this.connection.getExtraData(inkey.value);

setTimeout(() => {
if(extra?.userid){

this.setdata = {fullName: extra.fullName, photo: extra.photo, userid: extra.userid, desc_status: extra.desc_status, isOnly: extra.status};

//PEOPLE_DATA
this.cmessageData = this.localStorageService.getItem(PEOPLE_DATA+this.userid);

if(!this.cmessageData.length){
this.cmessageData.push(this.setdata);
this.localStorageService.setItem(PEOPLE_DATA+this.userid, this.cmessageData);

var data = {token: this.userid, g_type: 'addpeople', local: logintypex, indata: this.setdata};
this.connection.send(data);

this.form_post_pross = false;

this.generalFunctions.ToastShowModal(this.generalFunctions.xtranslate('messenger.addpersonwell'),'1100','bottom');
this.closeModal();
} else {

/*
for (let item of this.cmessageData) {
if(item.userid == extra.userid){ blockis = true; }
}
*/
var objIndex = this.cmessageData.findIndex((obj => obj.userid == extra.userid));
//console.log(this.cmessageData[objIndex]);

setTimeout(() => {
if(!this.cmessageData[objIndex]){
this.cmessageData.push(this.setdata);
this.localStorageService.setItem(PEOPLE_DATA+this.userid, this.cmessageData);

var data = {token: this.userid, g_type: 'addpeople', local: logintypex, indata: this.setdata};
this.connection.send(data);

this.generalFunctions.ToastShowModal(this.generalFunctions.xtranslate('messenger.addpersonwell'),'1100','bottom');
this.closeModal();
this.form_post_pross = false;
} else {
this.form_post_pross = false;
this.generalFunctions.ToastShowModal(this.generalFunctions.xtranslate('messenger.avibleacconts'),'1100','bottom');
}
}, 800);

}


} else {
this.generalFunctions.ToastShowModal(this.generalFunctions.xtranslate('messenger.nopeoplefind'),'1100','bottom');
this.form_post_pross = false;
}
}, 500);

}

}
}
}

async checkClipboard () {
const { type, value } = await Clipboard.read();
var inkey = <HTMLInputElement>document.getElementById('userkeyid');
inkey.value = value;
};

async writeToClipboard () {
var text = <HTMLInputElement>document.getElementById('amuserkeyid');
this.generalFunctions.ToastShowModal(this.generalFunctions.xtranslate('messenger.copy')+': '+text.value,'1100','bottom');
await Clipboard.write({
string: text.value
});
};

closeModal() {
//this.modalCtrl.dismiss();
this.modalCtrl.dismiss({
data: true
});
}
ionViewDidEnter(){}
ionViewDidLeave() {}
ngOnInit(): void {
this.userid = this.localStorageService.getItem(SESSION_KEY)[0]['userid'];
this.userData = this.localStorageService.getItem(SESSION_KEY)[0];

if(!this.localStorageService.getItem(PEOPLE_DATA+this.userid)){ this.localStorageService.setItem(PEOPLE_DATA+this.userid, []) }
}
}