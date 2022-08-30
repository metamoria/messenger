import { Component, OnInit } from '@angular/core';
import { ModalController, MenuController } from '@ionic/angular';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { NavParams } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Clipboard } from '@capacitor/clipboard';
import { GeneralFunctions } from '../../providers/general-functions';
import { AlertController } from '@ionic/angular';

export const SESSION_KEY = 'SESSION';
export const CHAT_DIZAYN = 'CHAT_DIZAYN';
export const CHAT_DIZAYN_COLOR = 'CHAT_DIZAYN_COLOR';

import { Store, select } from '@ngrx/store';
import { actionSettingsChangeTheme, actionSettingsChangeLanguage } from '../../shared/ngrx/settings/settings.actions';
import { selectTheme, selectSettingsLanguage } from '../../shared/ngrx/settings/settings.selectors';

import { Observable, Subscription, SubscriptionLike } from 'rxjs';
import { Platform } from '@ionic/angular';
import { StatusBarSettings } from '../../providers/statusBarSettings';
import { map, take } from 'rxjs/operators';

@Component({
selector: 'app-settings',
templateUrl: './settings.page.html',
styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
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
updateuserdata: FormGroup;
form_post_pross: boolean = false;
validators_name: string = 'false';
validators_desc_status: string = 'false';
validators_photo: boolean = false;

walls: any[] = [{name: 'chat_wall_1', image: 'assets/images/chatbanner/1.png', visebled: false},{name: 'chat_wall_2', image: 'assets/images/chatbanner/2.png', visebled: false},{name: 'chat_wall_3', image: 'assets/images/chatbanner/3.png', visebled: false},{name: 'chat_wall_4', image: 'assets/images/chatbanner/4.png', visebled: false},{name: 'chat_wall_5', image: 'assets/images/chatbanner/5.png', visebled: false},{name: 'chat_wall_6', image: 'assets/images/chatbanner/6.png', visebled: false},{name: 'chat_wall_7', image: 'assets/images/chatbanner/7.png', visebled: false},{name: 'chat_wall_8', image: 'assets/images/chatbanner/8.png', visebled: false}]
inputWalls: any;
chatDizayn: any = {name: '', image: '', visebled: false};

colors: any[] = [
{name: 'chat_color_1', color: '#e5ddd5'},
{name: 'chat_color_2', color: 'antiquewhite'},
{name: 'chat_color_3', color: 'aqua'},
{name: 'chat_color_4', color: 'aquamarine'},
{name: 'chat_color_5', color: 'beige'},
{name: 'chat_color_6', color: 'bisque'},
{name: 'chat_color_7', color: '#69bcbe'},
{name: 'chat_color_8', color: 'chartreuse'},
{name: 'chat_color_9', color: 'chocolate'},
{name: 'chat_color_10', color: 'coral'},
{name: 'chat_color_11', color: 'cornflowerblue'},
{name: 'chat_color_12', color: 'cyan'},
{name: 'chat_color_13', color: 'darkgoldenrod'},
{name: 'chat_color_14', color: 'yellowgreen'},
{name: 'chat_color_15', color: 'yellow'},
{name: 'chat_color_16', color: 'wheat'},
{name: 'chat_color_17', color: 'violet'},
{name: 'chat_color_18', color: 'turquoise'},
{name: 'chat_color_19', color: 'thistle'},
{name: 'chat_color_20', color: 'tan'},
{name: 'chat_color_21', color: 'springgreen'},
{name: 'chat_color_22', color: 'rosybrown'}
];
inputWallsColor: any;
chatDizaynColor: any = {name: '', color: ''};

theme$: Observable<boolean>;
langue$: Observable<string>;
thememode: any;
themewave: string = "wave";

constructor(
private modalCtrl: ModalController, 
private localStorageService: LocalStorageService,
public navParams : NavParams,
private fb: FormBuilder,
private generalFunctions: GeneralFunctions,
public alertController: AlertController,
private store: Store,
public statusBarSettings: StatusBarSettings,
private platform: Platform,
private menu: MenuController
) { 
this.connection = this.navParams.get('connection');

this.theme$ = this.store.pipe(select(selectTheme));
this.defaultThemeModes();
}

async defaultThemeModes(){
const isDark = await this.store.pipe(select(selectTheme), take(1)).toPromise();
if(isDark){this.themewave = "wave";this.thememode = " active";} 
else {this.themewave = "waveclosed"; this.thememode = "";}
}

async changeThemeModes(type){
const isDark = await this.store.pipe(select(selectTheme), take(1)).toPromise();
if(type == 1){
setTimeout(() => {this.store.dispatch(actionSettingsChangeTheme({ isDark: !isDark }));},300);
if (this.platform.is('cordova')){this.statusBarSettings.changeStatusBar('styleLightContent','#000000'); }
}
if(type == 2){
this.store.dispatch(actionSettingsChangeTheme({ isDark: !isDark }));
if (this.platform.is('cordova')){this.statusBarSettings.changeStatusBar('','#ffffff'); }
}
}

themeMode(){
if(!this.thememode){
this.themewave = "wave";
this.thememode = " active";
this.changeThemeModes(1);
} else {this.themewave = "waveclosed"; this.thememode = ""; this.changeThemeModes(2);}
}
    

ionChange(event,type){

if(type == 'name'){
this.validators_name = 'pross';
var valides = this.updateuserdata?.controls?.name?.status; 
var realLeg = this.updateuserdata?.controls?.name?.errors?.minlength?.actualLength;
var maxLeg = this.updateuserdata?.controls?.name?.errors?.minlength?.requiredLength;
if(realLeg < maxLeg || valides == 'INVALID'){
this.validators_name = 'false';
} else{
if(this.userData['name'] == this.updateuserdata.value.name){
this.validators_name = 'false';
} else {
this.validators_name = 'change';
}
}
}

if(type == 'desc_status'){
this.validators_desc_status = 'pross';
var valides = this.updateuserdata?.controls?.desc_status?.status; 
var realLeg = this.updateuserdata?.controls?.desc_status?.errors?.minlength?.actualLength;
var maxLeg = this.updateuserdata?.controls?.desc_status?.errors?.minlength?.requiredLength;
if(realLeg < maxLeg || valides == 'INVALID'){
this.validators_desc_status = 'false';
} else{
if(this.userData['desc_status'] == this.updateuserdata.value.desc_status){
this.validators_desc_status = 'false';
} else {
this.validators_desc_status = 'change';
}
}
}

}    

updatas(){}

updata(type){
if(type == 'name'){
this.validators_name = 'pross';
var name = this.updateuserdata.value.name;
this.connection.extra.fullName = name;
this.connection.updateExtraData();
this.userData['name'] = name;
this.localStorageService.setItem(SESSION_KEY, [this.userData]);
this.pwaSync();
this.userdata();
this.validators_name = 'false';
}

if(type == 'desc_status'){
this.validators_desc_status = 'pross';
var desc_status = this.updateuserdata.value.desc_status;
this.connection.extra.desc_status = desc_status;
this.connection.updateExtraData();
this.userData['desc_status'] = desc_status;
this.localStorageService.setItem(SESSION_KEY, [this.userData]);
this.pwaSync();
this.userdata();
this.validators_desc_status = 'false';
}

/*
if (this.updateuserdata.valid && !this.form_post_pross) {
this.form_post_pross = true;
var name = this.updateuserdata.value.name;
var desc_status = this.updateuserdata.value.desc_status;
console.log(name);
console.log(desc_status);
}
*/
}

userdata(){
this.userData = this.localStorageService.getItem(SESSION_KEY)[0];

if(this.userData['photo']){
this.photo = this.userData['photo'];
setTimeout(() => {
this.updateuserdata.get('name').setValue(this.userData['name']);
this.updateuserdata.get('desc_status').setValue(this.userData['desc_status']);
}, 50);

} else {
this.photo = "none";
}

this.chatDizayn = this.userData['chatDizayn'];
this.inputWalls = this.chatDizayn.name;

this.chatDizaynColor = this.userData['chatDizaynColor'];
this.inputWallsColor = this.chatDizaynColor.name;
}

async writeToClipboard () {
var text = this.userData['userid'];
this.generalFunctions.ToastShowModal(this.generalFunctions.xtranslate('messenger.copy')+': '+text,'1100','bottom');
await Clipboard.write({
string: text
});
}

wallSelect(wall){
this.userData['chatDizayn'] = wall;
this.inputWalls = wall.name;
this.localStorageService.setItem(SESSION_KEY, [this.userData]);
this.pwaSync();
}

wallSelectColor(wall){
this.userData['chatDizaynColor'] = wall;
this.localStorageService.setItem(SESSION_KEY, [this.userData]);
this.inputWallsColor = wall.name;
this.chatDizaynColor = wall;
this.pwaSync();
}

async logout(){

const alert = await this.alertController.create({
cssClass: 'my-custom-class',
header: this.generalFunctions.xtranslate('general.logoutinfo'),
message: this.generalFunctions.xtranslate('general.logout'),
buttons: [
{
text: this.generalFunctions.xtranslate('general.cancel'),
role: 'cancel',
cssClass: 'secondary',
handler: (blah) => {
console.log('Confirm Cancel: blah');
}
}, {
text: this.generalFunctions.xtranslate('general.okay'),
handler: () => {
//console.log('Confirm Okay');
localStorage.clear();
this.generalFunctions.navCtrlNR('/');
window.location.reload();

}
}
]
});

await alert.present();

}

pwaSync(){
/* Mobile Pwa Sycn */
if(this.userData['logintype'] == 'pwa'){ var logintypex = 'pwa'; } else { var logintypex = "mobile"; }
var datasycn = {token: this.userData['userid'], g_type: 'user_settings_update', local: logintypex, indata: [this.userData]};
this.connection.send(datasycn);
/* Mobile Pwa Sycn END */
}

ngOnInit() {
let userData = this.localStorageService.getItem(SESSION_KEY);
if(userData){
this.userdata();
}

this.updateuserdata = this.fb.group({
name: this.fb.control('', [
Validators.required,
Validators.minLength(3),
Validators.maxLength(120),
]),
desc_status: this.fb.control('', [
Validators.required,
Validators.minLength(3),
Validators.maxLength(250)
//Validators.email
])
});

}

openqrlogin(){
//this.menu.open('camera');
this.closeModal();
setTimeout(() => {
this.menu.toggle('camera');
}, 250);
}

closeModal() {
this.modalCtrl.dismiss();
}

getFileReader(): FileReader {
const fileReader = new FileReader();
const zoneOriginalInstance = (fileReader as any)["__zone_symbol__originalInstance"];
return zoneOriginalInstance || fileReader;
}

changephoto(){
if(!this.validators_photo){
document.getElementById('selecImagePickerPP').click();
}
}

async selecImagePicker(event) {    

let promise = new Promise((resolve, reject) => { 

var file = event.srcElement.files[0]; 


if(file.type.split('/')[0] == 'image'){

var fileReader = this.getFileReader();

// If error occurs, reject the promise
fileReader.onerror = () => {resolve("ERR");}

fileReader.abort = () => {resolve("ERR");}
fileReader.onabort = () => {resolve("ERR");}

// Define an onload handler that's called when file loaded
fileReader.onload = () => {
this.validators_photo = true;
// File data loaded, so proceed to call setState
if (fileReader.result != undefined){
setTimeout(() => resolve(fileReader.result), 1000);
} else{ resolve("ERR"); }  
}

fileReader.readAsDataURL(file);
} else { resolve("ERR"); }
});


let result = await promise; // wait until the promise resolves (*)

if(result != 'ERR'){
let tumbimages = await this.tumbImageLoad(result, 'min');

this.connection.extra.photo = tumbimages;
this.connection.updateExtraData();
this.userData['photo'] = tumbimages;
this.localStorageService.setItem(SESSION_KEY, [this.userData]);
this.pwaSync();
this.userdata();
this.validators_photo = false; 


let userphotos: any = <HTMLInputElement>document.getElementById('userphotos'+this.userData['userid']);
if(userphotos){
userphotos.src = tumbimages;
}

var reset = <HTMLInputElement>document.getElementById('selecImagePickerPP');
reset.value = '';
} else {
this.validators_photo = false; 
}


}


/* Select Photo Render Pross */
async tumbImageLoad(image, type) {
let promise = new Promise((resolve, reject) => {
let resize;
let quality;

if(type == 'min'){
resize = 300;
quality = 0.6;
}

if(type == 'max'){
resize = 800;
quality = 0.6;
}


const img = new Image();
img.src = image;

img.onload = async () => {

if(type == 'max'){
if (img.width < resize) {
resize = img.width;
}
}

const canvas = document.createElement('canvas');
let ctxTumb = canvas.getContext('2d');
let picaWidth; let picaHeight;

let maxWH = resize;

if (img.width > img.height) {
picaWidth = maxWH;
picaHeight = maxWH * img.height / img.width
} else {
picaWidth = maxWH * img.width / img.height;
picaHeight = maxWH;
}

canvas.width = picaWidth;
canvas.height = picaHeight;

ctxTumb.fillStyle = 'white'
ctxTumb.fillRect(0, 0, picaWidth, picaHeight);
ctxTumb.drawImage(img, 0, 0, picaWidth, picaHeight);

var prosss = await canvas.toDataURL('image/jpeg', quality);
setTimeout(() => resolve(prosss), 1000);

}
});


let result = await promise; // wait until the promise resolves (*)

return(result); // "done!"
}

}
