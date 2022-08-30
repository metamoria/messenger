import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { GeneralFunctions } from '../../providers/general-functions';
import { NavParams } from '@ionic/angular';

export const SESSION_KEY = 'SESSION';
export const SESSION_ALL_KEY = 'SESSION_ALL';
export const DEVECI_U_KEY = 'DEVECI_UID';
export const MESSAGE_DATA = 'MESSAGE_DATA_';
export const PEOPLE_DATA = 'PEOPLE_DATA_';
export const MESSAGE_DETAIL_DATA = 'MESSAGE_DETAIL_DATA_';
export const MESSAGE_DETAIL_DATA_SENDLOOP = 'MESSAGE_DETAIL_DATA_SENDLOOP';

@Component({
selector: 'app-pwasessioncheck',
templateUrl: './pwasessioncheck.page.html',
styleUrls: ['./pwasessioncheck.page.scss'],
})
export class PwaSessionCheckPage implements OnInit {
connection: any;
userid: any;
form_post_pross: boolean = false;
cmessageData: any[] = [];
setdata: any;
data: any;
prossoke: any;

constructor(
public alertController: AlertController,
private localStorageService: LocalStorageService,
private generalFunctions: GeneralFunctions,
private modalCtrl: ModalController,
public navParams : NavParams
) {
this.data = this.navParams.get('data');
this.connection = this.navParams.get('connection');
this.userid = this.localStorageService.getItem(SESSION_KEY)[0].userid;
}


async finds(){
this.form_post_pross = true;
var datar = {
userid: this.data.userid,
token: this.data.token,
g_type: 'pwa_login_session_already'
}
this.connection.send(datar);


await setTimeout(() => {

var allmessage = [];

for(let item of this.localStorageService.getItem(PEOPLE_DATA+this.userid)){
var dati =  this.localStorageService.getItem(MESSAGE_DETAIL_DATA+item.userid);
if(dati){
var ud = {userid: item.userid, data: dati}
allmessage.push(ud);
}
}

var data = {
userid: this.data.userid,
token: this.data.token,
g_type: 'pwa_login_session',
inuserdata: this.localStorageService.getItem(SESSION_KEY)[0],
inpeopledata: this.localStorageService.getItem(PEOPLE_DATA+this.userid),
allmessage: allmessage,
}
this.connection.send(data);

this.prossoke = true;
//this.localStorageService.setItem('pwamobilestatus'+this.userid, true);
this.closeModal();
}, 500);
}

closeModal() {
//this.modalCtrl.dismiss();
this.modalCtrl.dismiss({
data: true
});
}

ngOnDestroy(): void {
if(!this.prossoke){
var data = {
userid: this.data.userid,
token: this.data.token,
g_type: 'pwa_login_session_cancel',
}
this.connection.send(data);
}
}

ionViewDidEnter(){}
ionViewDidLeave() {}
ngOnInit(): void {}
}