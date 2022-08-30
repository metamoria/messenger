import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularDelegate, Config } from '@ionic/angular';
import { LocalStorageService } from '../../../services/local-storage/local-storage.service';
import { DataConfig } from '../../../providers/text-config';
import { GeneralFunctions } from '../../../providers/general-functions';
import { Store, select } from '@ngrx/store';
import { actionSettingsChangeTheme, actionSettingsChangeLanguage } from '../../../shared/ngrx/settings/settings.actions';
import { selectTheme, selectSettingsLanguage } from './../../../shared/ngrx/settings/settings.selectors';
import { Observable, Subscription, SubscriptionLike } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { StatusBarSettings } from './../../../providers/statusBarSettings';
import RTCMultiConnection from "../../../../assets/js/RTCMultiConnection.min";
//import QRCode from "../../../../assets/js/qrcode.min";
declare var QRCode: any;
import sha1 from "../../../../assets/js/sha1.min";
import { Platform } from '@ionic/angular';

export const LOGIN_ATTEMPTS_KEY = 'LOGIN_ATTEMPTS';
export const LOGIN_ATTEMPTS_NUM_KEY = 'LOGIN_ATTEMPTS_NUM';
export const SETTINGS = 'SETTINGS';
export const FIRST_START_KEY = 'FIRST_START';

export const SESSION_KEY = 'SESSION';
export const SESSION_ALL_KEY = 'SESSION_ALL';
export const DEVECI_U_KEY = 'DEVECI_UID';
export const MESSAGE_DATA = 'MESSAGE_DATA_';
export const PEOPLE_DATA = 'PEOPLE_DATA_';
export const MESSAGE_DETAIL_DATA = 'MESSAGE_DETAIL_DATA_';

import { Device } from '@capacitor/device';

declare var Email: any;

@Component({
selector: 'app-login',
templateUrl: './login.page.html',
styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
theme$: Observable<boolean>;
langue$: Observable<string>;
login: FormGroup;
ipbanned: any;
nomoreacconts: any;
nomoreaccontsHave: any;
getConfig: any;
form_post_pross: any;
validators_username: any;
validators_password: any;
inputpasseye: string = 'eye-outline';
validators_passwordtry: any;
userData = {
"userid": "",
"fname": "",
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

timeObjectNOW: any;
cacheTimeOut: any;
ifelseFunctions: any;
device_uid: any;

opensession: any;

timeObjectNOWLOG: any;
cacheTimeOutLOG: any;
ifelseFunctionsLOG: any;
decetedSesion: any;
thememode: any;
themewave: string = "wave";
settings: any;
desktopwebs: any;
connection: any;

socketurl: any;
serverid: any;
serverpassword: any;
pwamobile_encryption_token: any;

serverstatus: string = 'conneting';
getdevicedetail: any;
validators_email: any;
emailcode: any;
mailsatusu: any;
svprinfos: any;

mail_securetoken: any;
mail_host: any;
mail_username: any;
mail_password: any;
mail_from: any;

useridhh: any;
qrtokens: any;
qrcode: any;

constructor(
private fb: FormBuilder,
private localStorageService: LocalStorageService,
private dataConfig: DataConfig,
private config: Config,
private generalFunctions: GeneralFunctions,
private store: Store,
public statusBarSettings: StatusBarSettings,
private platform: Platform
) { 
this.device_uid =  this.localStorageService.getItem(DEVECI_U_KEY);
this.userData.device_uid_token = this.device_uid;
this.dataConfig.getConf().then((alllist) => {
this.getConfig = alllist;
this.userData.version = this.getConfig.version;

this.socketurl = this.getConfig.socketurl;
this.serverid = this.getConfig.server_id;
this.serverpassword = this.getConfig.server_password;
this.pwamobile_encryption_token =  this.getConfig.pwamobile_encryption_token;

this.mail_securetoken = this.getConfig.mail_securetoken;
this.mail_host = this.getConfig.mail_host;
this.mail_username = this.getConfig.mail_username;
this.mail_password = this.getConfig.mail_password;
this.mail_from = this.getConfig.mail_from;

this.userData.platform = this.config.get('mode');

Device.getInfo().then((device) => {
this.userData.cordova = device.webViewVersion;
this.userData.model = device.model;
this.userData.dplatform = device.platform;
this.userData.uuid = this.localStorageService.getItem('_capuid');
this.userData.dversion = device.osVersion;
this.userData.manufacturer = device.manufacturer;
this.userData.disvirtual = device.isVirtual;
this.userData.serial = "operatingSystem: "+device.operatingSystem;

this.getdevicedetail = device.operatingSystem + ' - ' + device.osVersion + ' - '+ device.platform;
});

});
this.userData.language = window.navigator.language;

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

/* Cancel CODE
onLoginPwa() {
if(this.serverstatus == 'connect'){
if (this.login.valid || !this.form_post_pross) {
this.form_post_pross = true;
this.svprinfos = "getinforcalwait";

//var username = this.login.value.username;
var email = this.login.value.email;

var password = this.login.value.password;

var encryption = sha1(this.pwamobile_encryption_token);
var passcrpyt = this.encryptionLi(encryption, password, 'encrypting');

//var usernamecrpyt = this.encryptionLi(encryption, username, 'encrypting');
var emailcrpyt = this.encryptionLi(encryption, email, 'encrypting');

var tokens = this.encryptionLi(encryption, passcrpyt+emailcrpyt, 'encrypting');

var data = {
remail: email,
email: emailcrpyt,
passcrpyt: passcrpyt,
token : tokens,
g_type: 'pwa_login_control',
devices: this.getdevicedetail
}
this.connection.send(data);
}
}
}
*/

onLogin() {
if (this.login.valid || !this.form_post_pross) {
this.form_post_pross = true;
//this.userData.username = this.login.value.username;
//this.userData.email = this.login.value.email;
this.userData.password = this.login.value.password;
this.userData.fname = this.login.value.fname;
this.userData.userid = this.login.value.userid;
//this.sendEmail();
this.loginIn();
}
}


/*
register(){
if(this.emailcode == this.login.value.emailcode){
this.loginIn();
} else {
console.log('hata');
}
}
*/

/*
sendEmail(){
var encryption = this.pwamobile_encryption_token;
var emailcodecrpyt = this.encryptionLi(encryption, this.GenerateSerialNumber("000-0000-000-00-00"), 'encrypting');

this.emailcode = emailcodecrpyt;
this.form_post_pross = true;
this.mailsatusu = true;

Email.send({
SecureToken : this.mail_securetoken,
Host : this.mail_host,
Username : this.mail_username,
Password : this.mail_password,
To : this.login.value.email,
From : this.mail_from,
Subject : this.generalFunctions.xtranslate('auth.mailverifcationssub'),
Body : this.generalFunctions.xtranslate('auth.mailverifcationscode')+': <pre><code>'+this.emailcode+'</code></pre>'
}).then(
message => { this.form_post_pross = false; this.mailsatusu = false; console.log(message);}
);
}
*/

loginIn(){
var encryption = sha1(this.pwamobile_encryption_token);
var passcrpyt = this.encryptionLi(encryption, this.login.value.password, 'encrypting');

var chatDizaynColor = {name: 'chat_color_1', color: '#e5ddd5'};
var chatDizayn = {name: 'chat_wall_2', image: 'assets/images/chatbanner/2.png', visebled: true};

var userdata = [{logintype: "mobile", password: passcrpyt, name : this.login.value.fname, userid: this.login.value.userid, photo: "none", desc_status: this.generalFunctions.xtranslate('messenger.heyhollause'), chatDizayn: chatDizayn, chatDizaynColor: chatDizaynColor}];
this.localStorageService.setItem(SESSION_KEY, userdata);
this.generalFunctions.navCtrlNR('/');
}


encryptionLi(encryption, message, type) {
const crypt = (salt, text) => {
const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
const byteHex = (n) => ("0" + Number(n).toString(16)).substr(-2);
const applySaltToChar = (code) => textToChars(salt).reduce((a, b) => a ^ b, code);

return text
.split("")
.map(textToChars)
.map(applySaltToChar)
.map(byteHex)
.join("");
};

const decrypt = (salt, encoded) => {
const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
const applySaltToChar = (code) => textToChars(salt).reduce((a, b) => a ^ b, code);
return encoded
.match(/.{1,2}/g)
.map((hex) => parseInt(hex, 16))
.map(applySaltToChar)
.map((charCode) => String.fromCharCode(charCode))
.join("");
};

if(type == 'encrypting'){
// encrypting
const b64_encode = btoa(unescape(encodeURIComponent(message)));
const encrypted_text = crypt(encryption, b64_encode);
return encrypted_text
}


if(type == 'decrypting'){
// decrypting
const decrypted_string = decrypt(encryption, message);
var b64_decode = decodeURIComponent(escape(window.atob(decrypted_string)));
return b64_decode
}

}

ionViewDidEnter(){
if(this.login && this.login.get('userid')){this.login.get('userid').setValue(this.createUserID());}
}

createUserID(){
var passcrpyt = this.GenerateSerialNumber("00-00")
return this.device_uid+passcrpyt+'-'+this.GenerateSerialNumber("00-000-000-00-00");
}

// Serial Number Generator
// Generates a random number in a certain interval
GenerateRandomNumber(min,max){
return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generates a random alphanumberic character
GenerateRandomChar() {
var chars = "1234567890AaBbCcDdEeFfGgIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz";
var randomNumber = this.GenerateRandomNumber(0,chars.length - 1);
return chars[randomNumber];
}

// Generates a Serial Number, based on a certain mask
GenerateSerialNumber(mask){
var serialNumber = "";
if(mask != null){
for(var i=0; i < mask.length; i++){
var maskChar = mask[i];
serialNumber += maskChar == "0" ? this.GenerateRandomChar() : maskChar;
}
}
return serialNumber;
}


ionChange(event,type){

if(type == 'email'){
this.validators_email = 'pross';
var valides = this.login?.controls?.email?.status; 
var realLeg = this.login?.controls?.email?.errors?.minlength?.actualLength;
var maxLeg = this.login?.controls?.email?.errors?.minlength?.requiredLength;
if(realLeg < maxLeg || valides == 'INVALID'){
this.validators_email = 'minlength';
} else{
this.validators_email = 'pross';
this.validators_email = 'okey';
}
}

        
if(type == 'username'){
this.validators_username = 'pross';
this.login.get('username').setValue(this.toSeoUrl(this.login.get('username').value));
var usernameCheck = /^[0-9a-zA-Z_.]+$/.test(this.login?.controls?.username?.value);
var valides = this.login?.controls?.username?.status; 
var realLeg = this.login?.controls?.username?.errors?.minlength?.actualLength;
var maxLeg = this.login?.controls?.username?.errors?.minlength?.requiredLength;
if(realLeg < maxLeg || valides == 'INVALID' || !usernameCheck){
this.validators_username = 'minlength';
} else{
this.validators_username = 'okey'; 
if(this.login.get('userid')){this.login.get('userid').setValue(this.createUserID());}
}
}


if(type == 'password'){
this.validators_password = 'pross';
var valides = this.login?.controls?.password?.status; 
var realLeg = this.login?.controls?.password?.errors?.minlength?.actualLength;
var maxLeg = this.login?.controls?.password?.errors?.minlength?.requiredLength;
if(realLeg < maxLeg || valides == 'INVALID'){
this.validators_password = 'minlength';
} else{
this.validators_password = 'okey';
}
}

if(type == 'passwordtry'){
this.validators_passwordtry = 'pross';
var valides = this.login?.controls?.password?.status; 
var realLeg = this.login?.controls?.password?.errors?.minlength?.actualLength;
var maxLeg = this.login?.controls?.password?.errors?.minlength?.requiredLength;
if(realLeg < maxLeg || valides == 'INVALID'){
this.validators_passwordtry = 'minlength';
} else{


if(this.login.value.password == this.login.value.passwordtry){
this.validators_passwordtry = 'okey';
} else {
this.validators_passwordtry = 'minlength';
}



}
}

}

passsvibled(getids) {
var x = (<HTMLInputElement>document.getElementById(getids));
var xy = (<HTMLInputElement>document.getElementById(getids+'try'));
if (x.type === "password") {x.type = "text"; this.inputpasseye = 'eye-off-outline';} else {x.type = "password"; this.inputpasseye = 'eye-outline';}

if(xy){
if (xy.type === "password") {xy.type = "text"; this.inputpasseye = 'eye-off-outline';} else {xy.type = "password"; this.inputpasseye = 'eye-outline';}
}
}

toSeoUrl(url) {
var newurls = url.toString()
.replace(/[|&;$%@"<>()+,-]/g, "_")
.normalize('NFD')
.replace(/[\u0300-\u036f]/g,'')
.replace(/\s+/g,'_')
.toLowerCase()
.replace(/&/g,'_')
.replace(/[^a-z0-9\_]/g,'_')
.replace(/-+/g,'_')
.replace(/^-*/,'')
.replace(/-*$/,'')
.replace(/%20/g, '')
.replace(/ /g, '');
return newurls.toLowerCase().trim();
}




makeCode (key) {	
/*
var qrcode = new QRCode(document.getElementById("qrcode"), {
width : 250,
height : 250
});	*/

/*qrcode.makeCode(key+','+this.qrtokens);*/
this.qrtokens = "holla-qr-tokens-"+this.GenerateSerialNumber("000-0000-000-00-00-00000")+this.GenerateSerialNumber("0000000-00-00-0000000");

if(this.qrcode){
this.qrcode.clear(); // clear the code.
this.qrcode.makeCode(key+','+this.qrtokens+',pwa_login_control'); // make another code.
} else {
document.getElementById("qrcode").innerHTML = '';

this.qrcode = new QRCode("qrcode", {
text: key+','+this.qrtokens+',pwa_login_control',
width: 210,
height: 210,
colorDark : "#000000",
colorLight : "#ffffff",
correctLevel : QRCode.CorrectLevel.H
});
}
}



webRtcConnet (){
this.serverstatus = 'conneting';

this.connection = new RTCMultiConnection();

this.connection.enableLogs = false; // to disable logs
this.connection.enableFileSharing = true;

// this line is VERY_important
this.connection.socketURL = this.socketurl;

// if you want text chat
this.connection.session = {
data: true
};

// to make sure file-saver dialog is not invoked.
this.connection.autoSaveToDisk = false;

this.useridhh = "holla-idmessenger-"+this.GenerateSerialNumber("000-0000-000-00-00-00000");

setTimeout(() => {
this.makeCode(this.useridhh);
}, 1500);


setInterval(() => {
this.makeCode(this.useridhh);
}, 60000);


this.connection.extra = {
userid: this.useridhh,
fullName: "Holla Messenger",
email: "messenger@holla.euserver",
logintype: "pwa",
photo: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCACWAJYDASIAAhEBAxEB/8QAGwABAAEFAQAAAAAAAAAAAAAAAAEDBAUGBwL/xAAyEAACAgECAwcCBQQDAAAAAAAAAQIDBAUREiExBhMiQVFhcYGRFDJCU8EjJFKxg5Kh/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AMKAAAAAAEdAJAAAAAAQSAAAAAAAR0JAq0X20ScqbJQk1s3F7ApAAAABBIAIAAAAAAAAAAAAAAAAgkAAAA6AEdAJAAFxg4rzcuGPGahKfKLl039Cpn6Vm6c/7mmUY9FNc4v6lDE4nl1KFiqnxrhm+kXvyZ1Cnjsx4rJriptbTj1QHKgb9qPZfAzE5Up49vrDo/lGsah2b1DBTmq+/qX6q+f/AJ1AxADTT2a2YAAAAAAAAAAAAAAAAAdAB0AHSdCtut0umV04WeFcNkX+Ze/uc2Np7F5LVtmM8nZPxKmS6+6e/UDcQABYZ2j4OoJ9/RHi/wA48pL6mqa12Ylp2NPKpv7yqG28ZLaS3exvRbajjrL07Io/craXztyA5cBs4txa2a5NAAAAAAAAAAAgAAAAAAD3RZ3N9djTfBJPwy2f0fkeAB0vStTxNQoj+Hu4pxXihJ+NfJfnONG1rI0u1Rr4JVSfijPp87rodAxcmvJohZXZXLiW/glxICuAAOf9qdLeBqMr4L+he+JP0l5r+TCnU8vFpzceVGRBTrl5Py9zTtQ7I5dM5Sw5K+vyTe0kBgaaZ3yca1u1Fy29kt2UzOaFjZOBrdEsrGtrg24tyg9ua26k9pNClp90snHjvizfRfofp8AYIAAAAAQAAEEgAAAABc42HZl+GiUJWftt7N/G/UC2LzTNTu0u920wrm31U1v9vQucfR3xd3nQycV+U+644/XbobHgdn6uCLutx8urybp2l/2T/wBgVtN7TYeVVBZFsa8iT27uMJP+OZm091uixq0XTaZcUMKndebjv/svopRSUUkl0SAkAtdSzYafg25VnNQXJer8kBcSlGK3k0l7niyFWTROuXDZXNbNdUzmefqWXqVztyLZbfpgntGK9kRhZ2TgXq3GulFrqt+T9mgPGZT+GzL6N9+7m47/AAykVMq95WXdkSWztm5NLy3KYAAAAAAAAAAAAABm9P7UZ+ElC1rJqXlN+L7mxYvazTb0u9lOiXpOPL7o0IbAdOq1XT7lvXm0P/kR6nqOFWt55lEV72I5dwocKA6fianhZt06sXIhbOC3aj6GJ7bqb0evh/KrlxfGz/k07By7sDKhkY8uGcfs16M3KvXNL1rCni5c1RKxbOM3tz9U+gGikmS1HRMnA4ppxvoXS2tp8vdeRjQAAAdACOgEoAAAAAAAAAAAAAAAAbbgARwokAAGAAQAAAAAAAAIJAAAAAAAAAAAAAQBIAAAAAgABVyaZY+ROmbTlB7NroUgAAAAAAAAAAAAAAAAAAAAAADLaLoy1OE7LLXCuPJKPVsAAf/Z",
desc_status: "Service Notifications",
};

//Join Event
this.connection.onopen = (event) => { 
}

//callback
this.connection.onmessage = (event) => { 
//pwa login control

/* //old code
if(
event.data.g_type == "pwa_login_session" && event.data.remail == this.login.value.email 
|| 
event.data.g_type == "pwa_login_session_cancel" && event.data.remail == this.login.value.email 
|| 
event.data.g_type == "pwa_login_session_already" && event.data.remail == this.login.value.email
){ 
*/

if(
event.data.g_type == "pwa_login_session" && event.data.token == this.qrtokens && event.data.userid == this.useridhh 
|| 
event.data.g_type == "pwa_login_session_cancel" && event.data.token == this.qrtokens && event.data.userid == this.useridhh 
|| 
event.data.g_type == "pwa_login_session_already" && event.data.token == this.qrtokens&& event.data.userid == this.useridhh 
){ 
    

if(event.data.g_type == "pwa_login_session"){
console.log('login');  

var userid = event.data.inuserdata.userid;
var people = event.data.inpeopledata;
var messagedata = event.data.allmessage;

this.localStorageService.setItem(PEOPLE_DATA+userid, people);

for(let item of messagedata){
this.localStorageService.setItem(MESSAGE_DETAIL_DATA+item.userid, item.data);
}

event.data.inuserdata.logintype = "pwa";
this.localStorageService.setItem(SESSION_KEY, [event.data.inuserdata]);

setTimeout(() => {
this.localStorageService.setItem('loginsycndisable'+userid, 'disabled');
this.connection.closeSocket();
this.connection = null;
}, 400);

setTimeout(() => {
this.generalFunctions.navCtrlNR('/');
}, 950);

}


if(event.data.g_type == "pwa_login_session_cancel"){
console.log('cancel');  
this.svprinfos = "getinforred";
//this.generalFunctions.ToastShowModal(this.generalFunctions.xtranslate('messenger.sesioncncsel') ,1000,'top')
this.form_post_pross = false;
}



if(event.data.g_type == "pwa_login_session_already"){
console.log('bağlantı kuruldu');  
this.svprinfos = "getinfor";
}

}
}

//this.connection.password = sha1("services-44adSAD-d_-8e74_wa41d*+s+aS-+AD");
//let serverid = sha1("services-id12sa7SAvmE7U5VK4A6i+1+2-deskpwa0978");
this.connection.password = sha1(this.serverpassword);
let serverid = sha1(this.serverid);

this.connection.userid = this.useridhh;

this.connection.openOrJoin(serverid, (isRoomOpened, isRoomCreated, roomid, error) => {
if(error) { 
console.log(error); 
this.serverstatus = 'connecterror';
}
if(isRoomOpened === true) {
this.serverstatus = 'connect';
if (this.connection.isInitiator === true) {
/* you opened the room*/
} else {
/* you joined it*/
}
}
});

}

ngOnInit(): void {

if (!this.platform.is('mobile')){
this.desktopwebs = "desktopwebs";
} else { this.desktopwebs = "mobilesall"; }


if(this.localStorageService.getItem('nodevicespwa')){
this.desktopwebs = "mobilesall";
this.localStorageService.setItem('nodevicespwa', false);
}


if (this.desktopwebs == "desktopwebs"){

setTimeout(() => {
this.webRtcConnet();
}, 250);

} else { 

this.login = this.fb.group({
/*
email: this.fb.control('', [
Validators.required,
Validators.minLength(5),
Validators.maxLength(70),
Validators.email
]),
emailcode: this.fb.control('', [
//Validators.required,
Validators.minLength(5),
Validators.maxLength(100),
]),*/
/*
username: this.fb.control('', [
Validators.required,
Validators.minLength(3),
Validators.maxLength(50)
//Validators.email
]),
*/
password: this.fb.control('', [
Validators.required,
Validators.minLength(6),
Validators.maxLength(70)
]),
passwordtry: this.fb.control('', [
Validators.required,
Validators.minLength(6),
Validators.maxLength(70)
]),
fname: this.fb.control('', [
Validators.required,
Validators.minLength(3),
Validators.maxLength(50)
//Validators.email
]),
userid: this.fb.control('', [
Validators.required,
Validators.minLength(6),
Validators.maxLength(70)
])
}, {
validators: this.passwordConfirmMatchValidator
});
}
}

passwordConfirmMatchValidator(g: FormGroup) {
const password = g.get('password');
const passwordConfirm = g.get('passwordtry');
if (passwordConfirm.hasError('required') || passwordConfirm.hasError('minlength')) { return; }
if (password.value !== passwordConfirm.value) {
passwordConfirm.setErrors({
mismatch: true
});
} else {
passwordConfirm.setErrors(null);
}
}

ionViewWillEnter(){
this.sessionChecks(); 
}

pwanormal(){
this.connection.closeSocket();
this.connection = null;
this.desktopwebs = "mobilesall"; 
this.localStorageService.setItem('nodevicespwa', true);
this.generalFunctions.navCtrlNR('/');
}

sessionChecks(){
if(!this.localStorageService.getItem(FIRST_START_KEY)){
this.generalFunctions.navCtrlNR('/starter');
} else {
if(this.localStorageService.getItem(SESSION_KEY)){
//let row = this.localStorageService.getItem(SESSION_KEY);
this.generalFunctions.navCtrlNR('/message');
} else { this.generalFunctions.navCtrlNR('/auth/login'); }
}
}
}