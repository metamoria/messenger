import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { LocalStorageService } from '../../../services/local-storage/local-storage.service';
import { GeneralFunctions } from '../../../providers/general-functions';

import { ModalController, IonRouterOutlet } from '@ionic/angular';
import { LanguagePage } from '../language/language.page';
import { StoryModalEnterAnimation, StoryModalLeaveAnimation, MusicModalEnterAnimation, MusicModalLeaveAnimation } from '../../../app.animations';

export const SESSION_KEY = 'SESSION';
export const DEVECI_U_KEY = 'DEVECI_UID';
export const FIRST_START_KEY = 'FIRST_START';
export const SETTINGS = 'SETTINGS';

@Component({
selector: 'app-starter',
templateUrl: './starter.page.html',
styleUrls: ['./starter.page.scss'],
})
export class StarterPage implements OnInit {
debug : boolean = true;

@ViewChild('mySlider')  slides: IonSlides;
userData = {
"username":"", "user_id":"","language":"","version":"","platform":"",
"device_uid_token":"", "token":""
};
ipbanned: any;
device_uid: any;
accountsAll: any;

timeObjectNOW: any;
cacheTimeOut: any;
ifelseFunctions: any;
starter: any;

slideOpts = {
initialSlide: 0,
speed: 400,
loop: false,
slidesPerView:"1",
pager: true
};
next2: boolean = false; next3: boolean = false; settings: any;

constructor(
private localStorageService: LocalStorageService,
private generalFunctions: GeneralFunctions,
public modalCtrl: ModalController, private routerOutlet: IonRouterOutlet
) { 
}

async openLangue() {
const modal = await this.modalCtrl.create({
component: LanguagePage,
mode: 'ios',
cssClass: 'modal-show-black-drop',
swipeToClose: true,
showBackdrop: true,
backdropDismiss: true,
enterAnimation: MusicModalEnterAnimation,
leaveAnimation: MusicModalLeaveAnimation,
presentingElement: this.routerOutlet.nativeEl
});
return await modal.present();
}

letsStart(){
if(!this.next2){
this.next2 = true;
setTimeout(()=> { this.slides.slideNext(0); },1);
} else {
if(this.next2 && !this.next3){
this.next3 = true;
setTimeout(()=> { this.slides.slideNext(0); },1);
} else {
if(this.next2 && this.next3){ 
this.localStorageService.setItem(FIRST_START_KEY, true);
this.sessionChecks();
}
}
}
}

sessionChecks(){
if(!this.localStorageService.getItem(FIRST_START_KEY)){
} else {
if(this.localStorageService.getItem(SESSION_KEY)){
//let row = this.localStorageService.getItem(SESSION_KEY);
this.generalFunctions.navCtrlNR('/message');
} else { this.generalFunctions.navCtrlNR('/auth/login'); }
}
}


async starterMains (){
this.device_uid = await this.localStorageService.getItem(DEVECI_U_KEY);
this.starter = await this.localStorageService.getItem(FIRST_START_KEY);

this.settings = await this.localStorageService.getItem(SETTINGS);
if(!this.settings){
await this.localStorageService.setItem(SETTINGS,JSON.parse('{"language":"en","isDark":false,"type":"[Settings] Change Theme"}'))
}
await this.sessionChecks();
}

ionViewDidEnter(){this.starterMains();}

ngOnInit(): void {
setTimeout(()=> {},10);
}
}
