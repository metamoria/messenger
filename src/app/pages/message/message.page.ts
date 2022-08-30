import { Component, OnInit, ViewChild, HostListener, NgZone, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Config, IonVirtualScroll, Platform, ActionSheetController, MenuController } from '@ionic/angular';

import RTCMultiConnection from "../../../assets/js/RTCMultiConnection.min";
import sha1 from "../../../assets/js/sha1.min";
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { GeneralFunctions } from '../../providers/general-functions';
import { NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

import { ModalController, IonRouterOutlet } from '@ionic/angular';
import { FindPeoplePage } from '../findpeople/findpeople.page';
import { CreategroupPage } from '../creategroup/creategroup.page';
import { PwaSessionCheckPage } from '../pwasessioncheck/pwasessioncheck.page';
import { BackgrounmodesPage } from '../backgrounmodes/backgrounmodes.page';
import { AlertController } from '@ionic/angular';

import { MessageDetailPage } from '../message-detail/message-detail.page';
import { StoryModalEnterAnimation, StoryModalLeaveAnimation, MusicModalEnterAnimation, MusicModalLeaveAnimation } from '../../app.animations';
import { SettingsPage } from '../settings/settings.page';
import { DataConfig } from '../../providers/text-config';

import { Network } from '@capacitor/network';

export const SESSION_KEY = 'SESSION';
export const SESSION_ALL_KEY = 'SESSION_ALL';
export const DEVECI_U_KEY = 'DEVECI_UID';
export const MESSAGE_DATA = 'MESSAGE_DATA_';
export const PEOPLE_DATA = 'PEOPLE_DATA_';
export const MESSAGE_DETAIL_DATA = 'MESSAGE_DETAIL_DATA_';
export const MESSAGE_DETAIL_DATA_SENDLOOP = 'MESSAGE_DETAIL_DATA_SENDLOOP';

export const LOGIN_ATTEMPTS_KEY = 'LOGIN_ATTEMPTS';

declare var Email: any;

import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

const APP_DIRECTORY_D = Directory.Documents;
const APP_DIRECTORY_C = Directory.Cache;
const APP_DIRECTORY_E = Directory.External;
const APP_DIRECTORY_ES = Directory.ExternalStorage;

const APP_DIR_MAIN_FOLDER = "holla-messenger";
const APP_DIR_AUDIO_FOLDER = "holla-audio";
const APP_DIR_PHOTO_FOLDER = "holla-photo";

import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { Device } from '@capacitor/device';

import { Vibration } from '@ionic-native/vibration/ngx';
import { AppCacheData } from '../../providers/app-cache-data';


@Component({
selector: 'app-message',
templateUrl: 'message.page.html',
styleUrls: ['message.page.scss']
})
export class MessagePage implements OnInit {
messagesList: any[];
searchMessageList: FormControl = new FormControl('');
segmentView: string = 'chats';
/*
private virtualScrollRerender: boolean;
@ViewChild(IonVirtualScroll, {static: false})
private virtualScroll: IonVirtualScroll;
*/
private viewActive: boolean;
@HostListener("window:resize")
connection: any;
userData: any[];
cacheDataMessageDetail: any[] = [];
messageData: any[] = [];
peopleData: any[] = [];
serverstatus: string = 'connecting';

socketurl: any;
serverid: any;
serverpassword: any;
pwamobile_encryption_token: any;
user_encryption_token: any;

modal: any;
modal2: any;
modal3: any;
modal4: any;
activeitems: any = 0;
pwamobilstatus: any;
sendsycn: boolean = false;
ltypeis: any;
/*
protected windowResized() {
if (!this.viewActive) {
this.virtualScrollRerender = true;
}
}
*/
//new
folderContent = [];
currentFolder = '';
copyFile = null;
//@ViewChild('filepicker') uploader: ElementRef;
appversion: any;
isOnline: string = 'offline';
userphotos: any;
uuuserid: any;

chatDizayn: any = {name: '', image: '', visebled: false};
chatDizaynColor: any = {name: '', image: '', visebled: false};
statss: any;
statssplt: any;
serveractivestats: boolean = false;
retyconnets: boolean = true;
timeObjectCacLOG: any;
modalBackground: any;
alphabet: any;
qrstepone: boolean = false;

constructor(
public config: Config,
private localStorageService: LocalStorageService,
private generalFunctions: GeneralFunctions,
public modalCtrl: ModalController, private routerOutlet: IonRouterOutlet,
public navCtrl: NavController,
public router : Router,
private route: ActivatedRoute,
public zone: NgZone, private cdref: ChangeDetectorRef,
private platform: Platform,
private dataConfig: DataConfig,
private backgroundMode: BackgroundMode,
private vibration: Vibration,
private AppCacheData: AppCacheData,
public alertController: AlertController,
public actionSheetController: ActionSheetController,
private menu: MenuController
) {
}

realSetTimeNextyx(ttime){	
var currentTime2 = new Date();
//currentTime2.setSeconds(currentTime2.getSeconds() + ttime); /* +10 Ekle */
currentTime2.setMinutes(currentTime2.getMinutes() + ttime); /* +10 Ekle */
var hours = currentTime2.toLocaleTimeString(); /* 18:41:65 */
var dateee = currentTime2.toLocaleString(); /* 11.07.2020 12:05:30 */
var shorTime = Math.round(currentTime2.getTime() / 1000); /* 1594458724171 */
return shorTime;
}

async webRtcConnet(){
//const logCurrentNetworkStatus = async () => {};
const status = await Network.getStatus();
console.log('Network status:', status);

if(!this.connection && status.connected){
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


if(this.userData['photo']){
var photo = this.userData['photo'];
} else {
var photo = "none";
}

if(this.userData['logintype'] == 'pwa'){
var logintypex = this.userData['logintype']+'+';
this.ltypeis = 'pwa';
} else {
var logintypex = "";
this.ltypeis = 'mobile';
}

this.connection.extra = {
userid: this.userData['userid'],
fullName: this.userData['name'],
//email: this.userData['email'],
password: this.userData['password'],
logintype: this.userData['logintype'],
photo: "none",
desc_status: this.userData['desc_status'],
last_time: this.AppCacheData.realNowSetTime()
};

this.connection.onReConnecting = (event) => {
console.info('ReConnecting with', event.userid, '...');
};


this.connection.onUserIdAlreadyTaken = (useridAlreadyTaken, yourNewUserId) => {
console.log('Userid already taken.', useridAlreadyTaken, 'Your new userid:', yourNewUserId);
//connection.userid = connection.token();
// connection.join(connection.sessionid);
};


this.connection.onstream = (event) => {
}

this.onMessage();

//Join Event
this.connection.onopen = (event) => { 
}

//User Status
this.connection.onUserStatusChanged = (event) => { 

/* pwa mobile sycn uid pwa delete */
event.userid = event.userid.replace("pwa+", "");
var targetUserId = event.userid.replace("pwa+", "");

var targetUserstatus = event.status;
let checkuserıdinda = <HTMLInputElement>document.getElementById('isonly'+targetUserId);
if(checkuserıdinda){
if(targetUserstatus == 'offline'){
checkuserıdinda.style.display = 'none';
} else { checkuserıdinda.style.display = 'block';  }
}

let xcheckuserıdinda = <HTMLInputElement>document.getElementById('xisonly'+targetUserId);
if(xcheckuserıdinda){
if(targetUserstatus == 'offline'){
xcheckuserıdinda.style.display = 'none';
} else { xcheckuserıdinda.style.display = 'block';  }
}

var inventory = this.localStorageService.getItem(PEOPLE_DATA+this.userData['userid']);

//Find index of specific object using findIndex method.    
var objIndex = inventory.findIndex((obj => obj.userid == targetUserId));
if(inventory[objIndex]){
//Update object's name property.
inventory[objIndex].isOnly = targetUserstatus;

var extra = this.connection.getExtraData(targetUserId);
if(targetUserId == extra.userid){


if(extra.fullName != inventory[objIndex].fullName){
let messagename = <HTMLInputElement>document.getElementById('messagename'+targetUserId);
if(messagename){
messagename.innerText = extra.fullName;
}
let messagename2 = <HTMLInputElement>document.getElementById('messagename2'+targetUserId);
if(messagename2){
messagename2.innerText = extra.fullName;
}

let mesdatiname = <HTMLInputElement>document.getElementById('mesdatiname'+targetUserId);
if(mesdatiname){
mesdatiname.innerText = extra.fullName;
}

inventory[objIndex].fullName = extra.fullName;
}


if(extra.desc_status != inventory[objIndex].desc_status){
let messagedesc = <HTMLInputElement>document.getElementById('messagedesc'+targetUserId);
if(messagedesc){
messagedesc.innerText = extra.desc_status;
}
let messagedesc2 = <HTMLInputElement>document.getElementById('messagedesc2'+targetUserId);
if(messagedesc2){
messagedesc2.innerText = extra.desc_status;
}
inventory[objIndex].desc_status = extra.desc_status;
}

if(extra.photo != inventory[objIndex].photo){

if(extra.photo == 'none'){} else {

if(extra.photo){
let messagephoto = <HTMLInputElement>document.getElementById('messagephoto'+targetUserId);
if(messagephoto){
messagephoto.src = extra.photo;
}
let messagephotos = <HTMLInputElement>document.getElementById('messagephotos'+targetUserId);
if(messagephotos){
messagephotos.src = extra.photo;
}

let messagephoto2 = <HTMLInputElement>document.getElementById('messagephoto2'+targetUserId);
if(messagephoto2){
messagephoto2.src = extra.photo;
}
let messagephotos2 = <HTMLInputElement>document.getElementById('messagephotos2'+targetUserId);
if(messagephotos2){
messagephotos2.src = extra.photo;
}

let mesdatiphoto = <HTMLInputElement>document.getElementById('mesdatiphoto'+targetUserId);
if(mesdatiphoto){
mesdatiphoto.src = extra.photo;
}
let mesdatiphotoo = <HTMLInputElement>document.getElementById('mesdatiphotoo'+targetUserId);
if(mesdatiphotoo){
mesdatiphotoo.src = extra.photo;
}

}
}

inventory[objIndex].photo = extra.photo;
}



if(extra.last_time != inventory[objIndex].last_time){
inventory[objIndex].last_time = extra.last_time;
}

this.localStorageService.setItem(PEOPLE_DATA+this.userData['userid'], inventory);
}
}


if(this.userData['logintype'] == 'pwa'){
if(targetUserId == this.userData['userid']){
if(targetUserstatus == 'offline'){

if(!this.pwamobilstatus){
this.pwamobilstatus = true;
this.localStorageService.setItem('pwamobilestatus'+this.userData['userid'], true);
console.log('Mobil Cihazınızın Aktif Olması Gerekir');


if(this.modal){
this.modal.dismiss({data: true}); 
this.modal = null;
} 

if(this.modal2){
this.modal2.dismiss({data: true}); 
this.modal2 = null;
}

if(this.modal3){
this.modal3.dismiss({data: true}); 
this.modal3 = null;
} 

}

} else {
if(this.pwamobilstatus){
this.pwamobilstatus = false;
this.localStorageService.setItem('pwamobilestatus'+this.userData['userid'], false);
console.log('Mobil Cihazınız Aktif');
}
}
}
}


}

this.connection.onleave  = (event) => {
this.connection.extra.status = 'offline';
this.connection.updateExtraData();
};
this.connection.streamended = (event) => {
//this.connection.extra.status = 'offline';
//this.connection.updateExtraData();
};
this.connection.onclose = (event) => {
this.connection.extra.status = 'offline';
this.connection.updateExtraData();
};

this.connection.password = sha1(this.serverpassword);
let serverid = sha1(this.serverid);

this.connection.userid = logintypex+this.userData['userid'];

this.connection.openOrJoin(serverid, (isRoomOpened, isRoomCreated, roomid, error) => {
if(error) { 
console.log(error); 
this.serverstatus = 'connecterror';
}
if(isRoomOpened === true) {
this.retyconnets = true;
this.serverstatus = 'connect';
this.isOnline = 'online';
this.connection.extra.status = 'online';
this.serveractivestats = true;

setTimeout(() => {
this.connection.extra.photo = photo;
this.connection.extra.status = 'online';
this.connection.updateExtraData();

this.sleep();

}, 1900);

if(this.localStorageService.getItem('loginsycndisable'+this.userData['userid']) == 'enabled'){
if(!this.sendsycn && this.ltypeis == 'pwa'){
setTimeout(() => {
console.log('İstek Gönderildi');
this.sycnDataSender();
}, 1000);
}
}

if (this.connection.isInitiator === true) {
/* you opened the room*/
} else {
/* you joined it*/
}
}
});

} else {
console.log('ağ hatası');
}

}    



sleepPromise(ms){
return new Promise(resolve => setTimeout(resolve, ms));
}

async sleep(){
while(true){
// do something
await this.sleepPromise(2000);   // Sleep desired amount of miliseconds
// break if needed
//console.log('I have awakend.');
this.qrscan();
this.online();
/*
const timer = 2000; //2*60*1000; // two minutes
if(this.onlyTerval){ clearInterval(this.statssplt); }
this.onlyTerval = setInterval(() => { 
},timer);
//setInterval(() => { this.online(); }, 2000);
*/
}
}

qrscan(){
if(!this.qrstepone){
var data = this.localStorageService.getItem('qrscandata');
if(data){
this.qrstepone = true;

//this.generalFunctions.presentAlert(data, '', 'QR ALERT', '', 'OK');

var partsOfStr = data.split(',');

console.log(partsOfStr[0]); //userid
console.log(partsOfStr[1]); //token
console.log(partsOfStr[2]); //event

//pwa login control
if(partsOfStr[2] == "pwa_login_control" && partsOfStr[1]){ 

var datas = {
userid: partsOfStr[0],
token : partsOfStr[1],
g_type: 'pwa_login_session',
inuserdata: this.userData,
devices: ''
}

this.opensessionchecks(datas);
}

}
}
}


tryloginx(){
this.pwamobilstatus = false;
//this.localStorageService.setItem('pwamobilestatus'+this.userData['userid'], true);
if(!this.sendsycn){
this.sendsycn = true;
this.dataInit();
//setInterval(() => { this.online(); }, 2000);
//this.localStorageService.setItem('loginsycndisable'+this.userData['userid'], 'enabled');
}

}

trylogin(){
this.connection.closeSocket();
this.connection = null;
this.generalFunctions.navCtrlNR('/');
}

closesSeisons(){
setTimeout(() => {
this.connection.closeSocket();
setTimeout(() => {
this.connection = null; 
}, 200);
}, 1000);
this.pwamobilstatus = true;
}


time() {
var d = new Date();
var s = d.getSeconds();
var m = d.getMinutes();
var h = d.getHours();
//+ ":" + ("0" + s).substr(-2)
return ("0" + h).substr(-2) + ":" + ("0" + m).substr(-2);
}


onMessage(){
//sen file

this.connection.onFileStart = (file) => {
var userid = file.userid;
var remoteUserId = file.remoteUserId;



if(userid == this.userData['userid'] || remoteUserId == this.userData['userid']){
var typetrg;

if(userid == this.userData['userid']){
typetrg = 'me';
}
if(remoteUserId == this.userData['userid']){
typetrg = 'user';
}


//if(remoteUserId == this.userData['userid']){
//console.log('you here');

var vaidkey = this.GenerateSerialNumber("0000-0000000-000-000000-000");
var mtyps = 'online';
var extra = this.connection.getExtraData(userid);

var datess = new Date();
var messagess = this.generalFunctions.xtranslate('messenger.filesend');

var datas = {
id: vaidkey,
message: messagess,
date: datess,
type: typetrg,
name: extra.fullName,
//avatar: extra.photo,
avatar: '',
clock: this.time(),
reciveruserid: remoteUserId,
senderid: userid,
ctype: mtyps,
g_type: "files",
files: file,
filetype: file.type,
filetypemin: file.type.split('/')[0],
filestatus: 'start',
fileuuid: file.uuid,
fileurl: '',
progressmax: file.maxChunks
}



var newuserid;
if(typetrg == 'me'){ newuserid = remoteUserId; }
if(typetrg == 'user'){ newuserid = userid; }

this.localStorageService.setItem(MESSAGE_DETAIL_DATA_SENDLOOP+this.userData['userid']+newuserid, datas);

/* */



if(!this.localStorageService.getItem(MESSAGE_DETAIL_DATA+newuserid)){ this.localStorageService.setItem(MESSAGE_DETAIL_DATA+newuserid, []) }

this.cacheDataMessageDetail = this.localStorageService.getItem(MESSAGE_DETAIL_DATA+newuserid);
var vaidkey = this.GenerateSerialNumber("0000-0000000-000-000000-000");

this.cacheDataMessageDetail.push({
id: vaidkey,
message: this.generalFunctions.xtranslate('messenger.filesend'),
date: datess,
type: typetrg,
name: extra.fullName,
//avatar: extra.photo,
avatar: '',
clock: this.time(),
reciveruserid: remoteUserId,
senderid: userid,
ctype: mtyps,
g_type: "files",
files: file,
filetype: file.type,
filetypemin: file.type.split('/')[0],
filestatus: 'start',
fileuuid: file.uuid,
fileurl: '',
progressmax: file.maxChunks
});

this.localStorageService.setItem(MESSAGE_DETAIL_DATA+newuserid, this.cacheDataMessageDetail)

var inventory = this.localStorageService.getItem(PEOPLE_DATA+this.userData['userid']);

//Find index of specific object using findIndex method.    
var objIndex = inventory.findIndex((obj => obj.userid == newuserid));
if(inventory[objIndex]){
//Update object's name property.
inventory[objIndex].date = datess;
inventory[objIndex].message = messagess;
if(typetrg == 'user'){ inventory[objIndex].messageLook = true;}
} else {
var setdata = {fullName: extra.fullName, photo: extra.photo, userid: extra.userid, desc_status: extra.desc_status, isOnly: extra.status, date: datess, message: messagess, messageLook: true};
inventory.push(setdata);
this.messageData.push(setdata);
//this.virtualScroll.checkRange(0);
}

//this.zone.run(() => {});
let xcmessagecontes = <HTMLInputElement>document.getElementById('messagecontes'+newuserid);
if(xcmessagecontes){
xcmessagecontes.innerText = messagess;
}
let xcmessageLooks = <HTMLInputElement>document.getElementById('messageLooks'+newuserid);
if(xcmessageLooks){
if(typetrg == 'user'){xcmessageLooks.style.display = 'block';}
}


this.localStorageService.setItem(PEOPLE_DATA+this.userData['userid'], inventory);

/* */



}


};



var porrnumbers = 0;

this.connection.onFileProgress = (chunk) => {
var userid = chunk.userid;
var remoteUserId = chunk.remoteUserId;

//if(remoteUserId == this.userData['userid']){
if(userid == this.userData['userid'] || remoteUserId == this.userData['userid']){
porrnumbers++;

if(porrnumbers > 50){
var typetrg;
if(userid == this.userData['userid']){ typetrg = 'me'; }
if(remoteUserId == this.userData['userid']){ typetrg = 'user'; }

if(typetrg == 'me'){ userid = remoteUserId; }
if(typetrg == 'user'){}


var datas = {
uuid: chunk.uuid,
chunk: chunk,
g_type : 'filepross',
reciveruserid: chunk.remoteUserId,
senderid: chunk.userid
}

this.localStorageService.setItem(MESSAGE_DETAIL_DATA_SENDLOOP+this.userData['userid']+userid, datas);
}

}
};






this.connection.onFileEnd = (file) => {
porrnumbers = 0;
setTimeout(() => {

var userid = file.userid;
var remoteUserId = file.remoteUserId;

//progressHelper[file.uuid].div.innerHTML = '<a href="' + file.url + '" target="_blank" download="' + file.name + '">' + file.name + '</a>';

//if(remoteUserId == this.userData['userid']){
if(userid == this.userData['userid'] || remoteUserId == this.userData['userid']){

var typetrg;
if(userid == this.userData['userid']){ typetrg = 'me'; }
if(remoteUserId == this.userData['userid']){ typetrg = 'user'; }

var neuserid;
if(typetrg == 'me'){ neuserid = remoteUserId; }
if(typetrg == 'user'){ neuserid = userid; }


var uuid = file.uuid
var inventoryData = this.localStorageService.getItem(MESSAGE_DETAIL_DATA+neuserid);
//Find index of specific object using findIndex method.    
var objIndex = inventoryData.findIndex((obj => obj.fileuuid == uuid));
//Update object's name property.
if(inventoryData[objIndex]){
inventoryData[objIndex].filestatus = 'end';
inventoryData[objIndex].fileurl = file.url;
this.localStorageService.setItem(MESSAGE_DETAIL_DATA+neuserid, inventoryData);
}

var vaidkey = this.GenerateSerialNumber("0000-0000000-000-000000-000");
var mtyps = 'online';
var extra = this.connection.getExtraData(userid);

var datas = {
id: vaidkey,
message: this.generalFunctions.xtranslate('messenger.filesend'),
date: new Date(),
type: 'user',
name: extra.fullName,
//avatar: extra.photo,
avatar: '',
clock: this.time(),
reciveruserid: remoteUserId,
senderid: userid,
ctype: mtyps,
g_type: "filesend",
files: file,
filestatus: 'end',
fileuuid: file.uuid,
fileurl: file.url
}

this.localStorageService.setItem(MESSAGE_DETAIL_DATA_SENDLOOP+this.userData['userid']+neuserid, datas);
}
}, 50);
};



//Send Data Event
this.connection.onmessage = (event) => { 

//pwa mobile sendSycn
this.pwamobilesendsycn(event);

/* CANCEL CODE
//pwa login control
if(event.data.g_type == "pwa_login_control" && event.data.remail == this.userData['email']){ 

var email = this.userData['email'];
var password = this.userData['password'];

var encryption = sha1(this.pwamobile_encryption_token);

var passcrpyt = password;
var emailcrpyt = this.encryptionLi(encryption, email, 'encrypting');
var tokens = this.encryptionLi(encryption, passcrpyt+emailcrpyt, 'encrypting');

if(event.data.token == tokens){

var data = {
remail: email,
email: emailcrpyt,
passcrpyt: passcrpyt,
token : tokens,
g_type: 'pwa_login_session',
inuserdata: this.userData,
devices: event.data.devices
}

this.opensessionchecks(data);

}
}
*/

if(event.data.reciveruserid == this.userData['userid']){

if(event.data.g_type == "writer"){ 
this.localStorageService.setItem(MESSAGE_DETAIL_DATA_SENDLOOP+this.userData['userid']+event.data.senderid, event);
}

if(event.data.g_type == "audio" || event.data.g_type == "photo"){
this.allmedias(event);
}

if(event.data.g_type == "message"){ 
this.localStorageService.setItem(MESSAGE_DETAIL_DATA_SENDLOOP+this.userData['userid']+event.data.senderid, event);

/* pwa mobile sycn uid pwa delete */
event.userid = event.userid.replace("pwa+", "");

var encryption = sha1(this.user_encryption_token+event.userid+this.userData['userid']);
var messageCnt = this.encryptionLi(encryption, event.data.message, 'decrypting');

if(!this.localStorageService.getItem(MESSAGE_DETAIL_DATA+event.data.senderid)){ this.localStorageService.setItem(MESSAGE_DETAIL_DATA+event.data.senderid, []) }

this.cacheDataMessageDetail = this.localStorageService.getItem(MESSAGE_DETAIL_DATA+event.data.senderid);
var vaidkey = this.GenerateSerialNumber("0000-0000000-000-000000-000");


var xnewdata;

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth(); 
var yyyy = today.getFullYear();

var ndats = dd+'.'+mm+'.'+yyyy;

var inventorydatas = this.localStorageService.getItem(MESSAGE_DETAIL_DATA+event.data.senderid);
//Find index of specific object using findIndex method.    
var objIndex = inventorydatas.findIndex((obj => obj.newdata == ndats));
if(!inventorydatas[objIndex]){
xnewdata = ndats;
} else { xnewdata = ''; }


this.cacheDataMessageDetail.push({
id: vaidkey,
message: messageCnt,
date: event.data.date,
type: 'user',
name: event.extra.fullName,
//avatar: event.extra.photo,
avatar: '',
clock: event.data.clock,
reciveruserid: event.data.reciveruserid,
senderid: event.data.senderid,
ctype: event.data.ctype,
g_type: event.data.g_type,
newdata: xnewdata
});

this.localStorageService.setItem(MESSAGE_DETAIL_DATA+event.data.senderid, this.cacheDataMessageDetail)

var inventory = this.localStorageService.getItem(PEOPLE_DATA+this.userData['userid']);
var inventory2 = this.messageData;

var xdate      = new Date();
var xtimestamp = xdate.getTime();

//Find index of specific object using findIndex method.    
var objIndex = inventory.findIndex((obj => obj.userid == event.data.senderid));
var objIndex2 = inventory2.findIndex((obj => obj.userid == event.data.senderid));

if(inventory[objIndex]){
//Update object's name property.
inventory[objIndex].date = event.data.date;
inventory[objIndex].message = messageCnt;
inventory[objIndex].messageLook = true;
inventory[objIndex].timestamp = xtimestamp;
} else {
var setdata = {fullName: event.extra.fullName, photo: event.extra.photo, userid: event.extra.userid, desc_status: event.extra.desc_status, isOnly: event.extra.status, date: event.data.date, timestamp: xtimestamp, message: messageCnt, messageLook: true};
inventory.unshift(setdata);
//this.virtualScroll.checkRange(0);
}


//messajı üste taşı    
if(inventory[objIndex] && inventory2[objIndex2]){
inventory2[objIndex2].date = event.data.date;
inventory2[objIndex2].message = messageCnt;
inventory2[objIndex2].messageLook = true;
inventory2[objIndex2].timestamp = xtimestamp;
let field='date';
this.messageData.sort((a, b) => (b[field] || "").toString().localeCompare((a[field] || "").toString()));
} else {
var setdata = {fullName: event.extra.fullName, photo: event.extra.photo, userid: event.extra.userid, desc_status: event.extra.desc_status, isOnly: event.extra.status, date: event.data.date, timestamp: xtimestamp, message: messageCnt, messageLook: true};
this.messageData.unshift(setdata);
}

//this.zone.run(() => {});
let xcmessagecontes = <HTMLInputElement>document.getElementById('messagecontes'+event.data.senderid);
if(xcmessagecontes){
xcmessagecontes.innerText = messageCnt;
}
let xcmessageLooks = <HTMLInputElement>document.getElementById('messageLooks'+event.data.senderid);
if(xcmessageLooks){
xcmessageLooks.style.display = 'block';
}


this.localStorageService.setItem(PEOPLE_DATA+this.userData['userid'], inventory);

}
}
}
}


async allmedias(event) {
if(event.data.g_type == "audio" || event.data.g_type == "photo"){

/* pwa mobile sycn uid pwa delete */
event.userid = event.userid.replace("pwa+", "");

var messageCnt = event.data.message;

if(!this.localStorageService.getItem(MESSAGE_DETAIL_DATA+event.data.senderid)){ this.localStorageService.setItem(MESSAGE_DETAIL_DATA+event.data.senderid, []) }

this.cacheDataMessageDetail = this.localStorageService.getItem(MESSAGE_DETAIL_DATA+event.data.senderid);
var vaidkey = this.GenerateSerialNumber("0000-0000000-000-000000-000");

var xnewdata;

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth(); 
var yyyy = today.getFullYear();

var ndats = dd+'.'+mm+'.'+yyyy;

var inventorydatas = this.localStorageService.getItem(MESSAGE_DETAIL_DATA+event.data.senderid);
//Find index of specific object using findIndex method.    
var objIndex = inventorydatas.findIndex((obj => obj.newdata == ndats));
if(!inventorydatas[objIndex]){
xnewdata = ndats;
} else { xnewdata = ''; }


var encryption = sha1(this.user_encryption_token+event.userid+this.userData['userid']);


if(event.data.g_type == "audio"){ 
var filename = 'audio_'+this.GenerateSerialNumber("0000-0000000-000-000000-000-0000000")+'.dataV3';

var newpassreuslt = this.encryptionLi(encryption, event.data.audio, 'decrypting');

await this.writeSecretFileAudio(filename,newpassreuslt);
var xaudio = filename;
event.data.audio = filename;
}

if(event.data.g_type == "photo"){ 
var filename = 'photo_'+this.GenerateSerialNumber("0000-0000000-000-000000-000-0000000")+'.dataV3';

var newpassreuslt = this.encryptionLi(encryption, event.data.photo, 'decrypting');

await this.writeSecretFilePhoto(filename,newpassreuslt);
var xphoto = filename;
event.data.photo = filename;
}

this.cacheDataMessageDetail.push({
id: vaidkey,
message: messageCnt,
date: event.data.date,
type: 'user',
name: event.extra.fullName,
//avatar: event.extra.photo,
avatar: '',
clock: event.data.clock,
reciveruserid: event.data.reciveruserid,
senderid: event.data.senderid,
ctype: event.data.ctype,
g_type: event.data.g_type,
audio: xaudio,
audiomintype: event.data.audiomintype,
audioduration: event.data.audioduration,
photo: xphoto,
photoaudiotype: event.data.photoaudiotype,
newdata: xnewdata,
tumbimages: event.data.tumbimages
});

this.localStorageService.setItem(MESSAGE_DETAIL_DATA+event.data.senderid, this.cacheDataMessageDetail);

var inventory = this.localStorageService.getItem(PEOPLE_DATA+this.userData['userid']);

//Find index of specific object using findIndex method.    
var objIndex = inventory.findIndex((obj => obj.userid == event.data.senderid));
if(inventory[objIndex]){
//Update object's name property.
inventory[objIndex].date = event.data.date;
inventory[objIndex].message = messageCnt;
inventory[objIndex].messageLook = true;
} else {
var setdata = {fullName: event.extra.fullName, photo: event.extra.photo, userid: event.extra.userid, desc_status: event.extra.desc_status, isOnly: event.extra.status, date: event.data.date, message: messageCnt, messageLook: true};
inventory.push(setdata);
this.messageData.push(setdata);
//this.virtualScroll.checkRange(0);
}

//this.zone.run(() => {});
let xcmessagecontes = <HTMLInputElement>document.getElementById('messagecontes'+event.data.senderid);
if(xcmessagecontes){
xcmessagecontes.innerText = messageCnt;
}
let xcmessageLooks = <HTMLInputElement>document.getElementById('messageLooks'+event.data.senderid);
if(xcmessageLooks){
xcmessageLooks.style.display = 'block';
}


this.localStorageService.setItem(PEOPLE_DATA+this.userData['userid'], inventory);

this.localStorageService.setItem(MESSAGE_DETAIL_DATA_SENDLOOP+this.userData['userid']+event.data.senderid, event);

}
}


async pwamobilesendsycn(event){

//pwa normal send message - ME
if(event.data.g_type == "normal_text_send" && event.data.token == this.userData['userid']){ 


var encryption = sha1('normal_text_send:'+this.userData['userid']);
event.data.indata.message = this.encryptionLi(encryption, event.data.indata.message, 'decrypting');


this.localStorageService.setItem(MESSAGE_DETAIL_DATA_SENDLOOP+this.userData['userid']+event.data.indata.reciveruserid, event);


if(!this.localStorageService.getItem(MESSAGE_DETAIL_DATA+event.data.indata.reciveruserid)){ this.localStorageService.setItem(MESSAGE_DETAIL_DATA+event.data.indata.reciveruserid, []) }
this.cacheDataMessageDetail = this.localStorageService.getItem(MESSAGE_DETAIL_DATA+event.data.indata.reciveruserid);

this.cacheDataMessageDetail.push(event.data.indata);

this.localStorageService.setItem(MESSAGE_DETAIL_DATA+event.data.indata.reciveruserid, this.cacheDataMessageDetail);

var inventory = this.localStorageService.getItem(PEOPLE_DATA+this.userData['userid']);


//Find index of specific object using findIndex method.    
var objIndex = inventory.findIndex((obj => obj.userid == event.data.indata.reciveruserid));
if(inventory[objIndex]){
//Update object's name property.
inventory[objIndex].date = event.data.indata.date;
inventory[objIndex].message = event.data.indata.message;
inventory[objIndex].messageLook = false;
} else {
/*
var setdataMe = {fullName: event.extra.fullName, photo: event.extra.photo, userid: event.extra.userid, desc_status: event.extra.desc_status, isOnly: event.extra.status, date: event.data.date, message: event.data.indata.message, messageLook: false};
inventory.push(setdataMe);
this.messageData.push(setdataMe);
this.virtualScroll.checkRange(0);
*/
}

let xcmessagecontes = <HTMLInputElement>document.getElementById('messagecontes'+event.data.indata.reciveruserid);
if(xcmessagecontes){
xcmessagecontes.innerText = event.data.indata.message;
}

this.localStorageService.setItem(PEOPLE_DATA+this.userData['userid'], inventory);
}



//pwa all media send message photo audio - ME
if(event.data.g_type == "all_media_send" && event.data.token == this.userData['userid']){ 


var encryption = sha1('all_media_send:'+this.userData['userid']);
event.data.indata.tumbimages = this.encryptionLi(encryption, event.data.indata.tumbimages, 'decrypting');


this.localStorageService.setItem(MESSAGE_DETAIL_DATA_SENDLOOP+this.userData['userid']+event.data.indata.reciveruserid, event);


if(!this.localStorageService.getItem(MESSAGE_DETAIL_DATA+event.data.indata.reciveruserid)){ this.localStorageService.setItem(MESSAGE_DETAIL_DATA+event.data.indata.reciveruserid, []) }
this.cacheDataMessageDetail = this.localStorageService.getItem(MESSAGE_DETAIL_DATA+event.data.indata.reciveruserid);

this.cacheDataMessageDetail.push(event.data.indata);

this.localStorageService.setItem(MESSAGE_DETAIL_DATA+event.data.indata.reciveruserid, this.cacheDataMessageDetail);

var inventory = this.localStorageService.getItem(PEOPLE_DATA+this.userData['userid']);


//Find index of specific object using findIndex method.    
var objIndex = inventory.findIndex((obj => obj.userid == event.data.indata.reciveruserid));
if(inventory[objIndex]){
//Update object's name property.
inventory[objIndex].date = event.data.indata.date;
inventory[objIndex].message = event.data.indata.message;
inventory[objIndex].messageLook = false;
} else {
}

let xcmessagecontes = <HTMLInputElement>document.getElementById('messagecontes'+event.data.indata.reciveruserid);
if(xcmessagecontes){
xcmessagecontes.innerText = event.data.indata.message;
}

this.localStorageService.setItem(PEOPLE_DATA+this.userData['userid'], inventory);
}


//pwa user settings sycn
if(event.data.g_type == "user_settings_update" && event.data.token == this.userData['userid']){ 
event.data.indata[0].logintype = this.userData['logintype'];
this.localStorageService.setItem(SESSION_KEY, event.data.indata);
this.userData = this.localStorageService.getItem(SESSION_KEY)[0];
this.userphotos = this.userData['photo'];

this.connection.extra.fullName = this.userData['name'];
this.connection.extra.desc_status = this.userData['desc_status'];
this.connection.extra.photo = this.userData['photo'];
this.connection.updateExtraData();

this.chatDizayn = this.userData['chatDizayn'];
this.chatDizaynColor = this.userData['chatDizaynColor'];
}

//pwa open message look sycn
if(event.data.g_type == "open_message_look" && event.data.token == this.userData['userid']){ 
let xcmessageLooks = <HTMLInputElement>document.getElementById('messageLooks'+event.data.indata.userid);
if(xcmessageLooks){
xcmessageLooks.style.display = 'none';
}
}

//pwa send media
if(event.data.g_type == "send_media" && event.data.token == this.userData['userid']){ 
var setdata = event.data.indata;
var gettss = setdata.vdata;

var encryption = sha1('get_media_crpto:'+this.userData['userid']);
var vvdatas = this.encryptionLi(encryption, gettss, 'decrypting');

if(setdata.type == 'get_photo'){
await this.writeSecretFilePhoto(setdata.name, vvdatas);
}

if(setdata.type == 'get_audio'){
await this.writeSecretFileAudio(setdata.name, vvdatas);
}


this.localStorageService.setItem(MESSAGE_DETAIL_DATA_SENDLOOP+this.userData['userid']+setdata.reciveruserid, event);
}

//pwa get media
if(event.data.g_type == "get_media" && event.data.token == this.userData['userid']){ 
var setdata = event.data.indata;

let getts;

if(setdata.type == 'get_photo'){
getts = await this.readSecretFilePhotoPwa(setdata.name);
}

if(setdata.type == 'get_audio'){
getts = await this.readSecretFileAudioPwa(setdata.name);
}


var encryption = sha1('get_media_crpto:'+this.userData['userid']);
var vvdata = this.encryptionLi(encryption, getts, 'encrypting');

if(this.userData['logintype'] == 'pwa'){
var logintypex = 'pwa';
} else {
var logintypex = "mobile";
}


var amediaryy = {name: setdata.name, type: setdata.type, vdata: vvdata, reciveruserid: setdata.reciveruserid};

var data = {token: this.userData['userid'], g_type: 'send_media', local: logintypex, indata: amediaryy};
this.connection.send(data);
}

//pwa add people
if(event.data.g_type == "addpeople" && event.data.token == this.userData['userid']){ 
var setdata = event.data.indata;

//PEOPLE_DATA
var xcmessageData = this.localStorageService.getItem(PEOPLE_DATA+this.userData['userid']);

if(!xcmessageData.length){
xcmessageData.push(setdata);
this.localStorageService.setItem(PEOPLE_DATA+this.userData['userid'], xcmessageData);
this.forceReloadData('people');
} else {
var objIndex = xcmessageData.findIndex((obj => obj.userid == setdata.userid));
if(!xcmessageData[objIndex]){
xcmessageData.push(setdata);
this.localStorageService.setItem(PEOPLE_DATA+this.userData['userid'], xcmessageData);
this.forceReloadData('people');
} 
}


if(event.data.local == "pwa"){ }
if(event.data.local == "mobile"){ }

}


//all data sycn req - mobile
if(event.data.g_type == "pwa_login_control_sycn" && event.data.reuserid == this.userData['userid']){ 
console.log('istek alındı hazırlanıyor');
var userid = this.userData['userid'];
var password = this.userData['password'];

var encryption = sha1(this.pwamobile_encryption_token);

var passcrpyt = password;
var useridcrpyt = this.encryptionLi(encryption, userid, 'encrypting');
var tokens = this.encryptionLi(encryption, passcrpyt+useridcrpyt, 'encrypting');

if(event.data.token == tokens){ 
setTimeout(() => {
this.sycnGetData(event);
}, 100);
}
}


//all data sycn save - pwa
if(event.data.g_type == "pwa_login_session" && event.data.reuserid == this.userData['userid']){ 
console.log('veriler hazırlanıyor');
//var username = this.login.value.username;
var userid = this.userData['userid'];
var password = this.userData['password'];

var encryption = sha1(this.pwamobile_encryption_token);

var passcrpyt = password;

var useridcrpyt = this.encryptionLi(encryption, userid, 'encrypting');
var tokens = this.encryptionLi(encryption, passcrpyt+useridcrpyt, 'encrypting');

if(event.data.token == tokens){

if(event.data.g_type == "pwa_login_session"){
var userid = event.data.inuserdata.userid;
var people = event.data.inpeopledata;
var messagedata = event.data.allmessage;

this.localStorageService.setItem(PEOPLE_DATA+userid, people);

for(let item of messagedata){
this.localStorageService.setItem(MESSAGE_DETAIL_DATA+item.userid, item.data);
}

event.data.inuserdata.logintype = "pwa";
this.localStorageService.setItem(SESSION_KEY, [event.data.inuserdata]);

this.sendsycn = true;

this.dataInit();
//setInterval(() => {  this.online();  }, 2000);

}
}

}

}

// send sycn req - pwa
sycnDataSender(){
//var email =  this.userData['email'];
var userid =  this.userData['userid'];
var password =  this.userData['password'];
var encryption = sha1(this.pwamobile_encryption_token);
var passcrpyt = password;
var useridcrpyt = this.encryptionLi(encryption, userid, 'encrypting');
var tokens = this.encryptionLi(encryption, passcrpyt+useridcrpyt, 'encrypting');

var data = {
reuserid: userid,
userid: useridcrpyt,
passcrpyt: passcrpyt,
token : tokens,
g_type: 'pwa_login_control_sycn'
}

this.connection.send(data);
}

async sycnGetData(event){
console.log('Dosyalar Hazırlanıyor');
var allmessage = [];

for(let item of this.localStorageService.getItem(PEOPLE_DATA+this.userData['userid'])){
var dati =  this.localStorageService.getItem(MESSAGE_DETAIL_DATA+item.userid);
if(dati){
var ud = {userid: item.userid, data: dati}
allmessage.push(ud);
}
}

//var email =  this.userData['email'];
var userid =  this.userData['userid'];
var password = this.userData['password'];
var encryption = sha1(this.pwamobile_encryption_token);
var passcrpyt = password;
var useridcrpyt = this.encryptionLi(encryption, userid, 'encrypting');
var tokens = this.encryptionLi(encryption, passcrpyt+useridcrpyt, 'encrypting');


var data = {
reuserid: userid,
userid: useridcrpyt,
passcrpyt: passcrpyt,
token : tokens,
g_type: 'pwa_login_session',
inuserdata: this.localStorageService.getItem(SESSION_KEY)[0],
inpeopledata: this.localStorageService.getItem(PEOPLE_DATA+this.userData['userid']),
allmessage: allmessage,
}

await setTimeout(() => {
console.log('Dosyalar Hazırlandı Gönderildi');
this.connection.send(data);
}, 250);

}



async opensessionchecks(data){
var deceteds = 'modal-show-black-drop session-modal-show-black-drop nomusiccontrols';
var decenterAnimation = MusicModalEnterAnimation;
var decleaveAnimation = MusicModalLeaveAnimation;
var decleaveparanet = this.routerOutlet.nativeEl;

var checkmodal = await this.modalCtrl.create({
component: PwaSessionCheckPage,
componentProps: {
data: data,
connection: this.connection
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

checkmodal.onDidDismiss().then(data => {
this.qrstepone = false;
this.localStorageService.removeItem('qrscandata');
checkmodal = null;

/*
if(this.localStorageService.getItem('pwamobilestatus'+this.userData['userid'])){
this.closesSeisons();
}*/

});

await checkmodal.present();
}

closeSocket(){
if(this.connection){
this.connection.extra.status = 'offline';
this.connection.updateExtraData();
setTimeout(() => {
this.connection.disconnectWith(this.connection.userid);
setTimeout(() => {
this.connection.closeSocket();
this.connection = ''; 
}, 200);
}, 100);
}
}


offline(){
this.connection.extra.status = 'offline';
this.connection.updateExtraData();
}

online(){ 

if(!this.connection){
this.webRtcConnet();
//arka plan yenileme süre yenile
const timer = 4; // four minutes
this.timeObjectCacLOG = this.realSetTimeNextyx(timer);
}

if(this.connection){
this.serveractivestats = this.connection.isOnline;

var stat;
if(this.connection.isOnline === true){
stat = 'online';
this.isOnline = 'online';
} else {
stat = 'offline';   
this.isOnline = 'offline';
this.closeSocket();

if(this.modal){
this.modal.dismiss({data: true}); 
this.modal = null;
} 

if(this.modal2){
this.modal2.dismiss({data: true}); 
this.modal2 = null;
}

if(this.modal3){
this.modal3.dismiss({data: true}); 
this.modal3 = null;
} 

}

this.connection.extra.last_time = this.AppCacheData.realNowSetTime();
this.connection.extra.status = stat;
this.connection.updateExtraData();
}

}
    
appClosedEvenet(){
this.connection.extra.status = 'offline';
this.connection.updateExtraData();
setTimeout(() => {
//this.connection.disconnectWith(this.connection.userid);
//this.connection.closeSocket();
}, 100);
}

isOnly(){
/*
this.zone.run(() => {

var cachePeopleDats = this.localStorageService.getItem(PEOPLE_DATA+this.userData['userid']);

for (let item of cachePeopleDats) {
var extra = this.connection.getExtraData(item.userid);
if(extra){ 
if(extra.userid && item.userid){ 
item.isOnly = extra.status;
item.fullName = extra.fullName;
item.desc_status = extra.desc_status;

var targetUserId = item.userid;
var targetUserstatus = extra.status;
let checkuserıdinda = <HTMLInputElement>document.getElementById('isonly'+targetUserId);
if(checkuserıdinda){
if(targetUserstatus == 'offline'){ checkuserıdinda.style.display = 'none'; } else { checkuserıdinda.style.display = 'block'; }
}

let xcheckuserıdinda = <HTMLInputElement>document.getElementById('xisonly'+targetUserId);
if(xcheckuserıdinda){
if(targetUserstatus == 'offline'){ xcheckuserıdinda.style.display = 'none'; } else { xcheckuserıdinda.style.display = 'block'; }
}

} else {
item.isOnly = 'offline';
console.log(item);
}

}

}

setTimeout(() => {
if(cachePeopleDats.length){
this.localStorageService.setItem(PEOPLE_DATA+this.userData['userid'], cachePeopleDats);
}
}, 500);
});
*/
}



async openSettings() {
var deceteds; var decenterAnimation; var decleaveAnimation; var decleaveparanet;

if (!this.platform.is('mobile')){
deceteds = 'pcandwebdesig nomusiccontrols';
decenterAnimation = '';
decleaveAnimation = '';
decleaveparanet = ';'
} else {
deceteds = 'modal-show-black-drop max-modal-show-black-drop nomusiccontrols';
decenterAnimation = MusicModalEnterAnimation;
decleaveAnimation = MusicModalLeaveAnimation;
decleaveparanet = this.routerOutlet.nativeEl;
}

if(this.modal2){
this.modal2.dismiss({data: true}); 
this.modal2 = null;
}

if(this.modal3){
this.modal3.dismiss({data: true}); 
this.modal3 = null;
} else {

this.modal3 = await this.modalCtrl.create({
component: SettingsPage,
componentProps: {
connection: this.connection,
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
this.userData = this.localStorageService.getItem(SESSION_KEY)[0];
this.chatDizayn = this.userData['chatDizayn'];
this.chatDizaynColor = this.userData['chatDizaynColor'];
});

return await this.modal3.present();
}
}



async creategrops() {
var deceteds; var decenterAnimation; var decleaveAnimation; var decleaveparanet;

if (!this.platform.is('mobile')){
deceteds = 'pcandwebdesig nomusiccontrols';
decenterAnimation = '';
decleaveAnimation = '';
decleaveparanet = ';'
} else {
deceteds = 'modal-show-black-drop max-modal-show-black-drop nomusiccontrols';
decenterAnimation = MusicModalEnterAnimation;
decleaveAnimation = MusicModalLeaveAnimation;
decleaveparanet = this.routerOutlet.nativeEl;
}


if(this.modal3){
this.modal3.dismiss({data: true}); 
this.modal3 = null;
}
if(this.modal2){
this.modal2.dismiss({data: true}); 
this.modal2 = null;
}
if(this.modal){
this.modal.dismiss({data: true}); 
this.modal = null;
}

if(this.modal4){
this.modal4.dismiss({data: true}); 
this.modal4 = null;
} else {

this.modal4 = await this.modalCtrl.create({
component: CreategroupPage,
componentProps: {
connection: this.connection,
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

this.modal4.onDidDismiss().then(data => {
//console.log('dismissed', data);
this.modal4 = null;
if(this.segmentView == 'people'){
this.forceReloadData('people');
}
});

return await this.modal4.present();
}
}

async openFinds() {
var deceteds; var decenterAnimation; var decleaveAnimation; var decleaveparanet;
 
if (!this.platform.is('mobile')){
deceteds = 'pcandwebdesig nomusiccontrols';
decenterAnimation = '';
decleaveAnimation = '';
decleaveparanet = ';'
} else {
deceteds = 'modal-show-black-drop max-modal-show-black-drop nomusiccontrols';
decenterAnimation = MusicModalEnterAnimation;
decleaveAnimation = MusicModalLeaveAnimation;
decleaveparanet = this.routerOutlet.nativeEl;
}


if(this.modal3){
this.modal3.dismiss({data: true}); 
this.modal3 = null;
}

if(this.modal2){
this.modal2.dismiss({data: true}); 
this.modal2 = null;
} else {

this.modal2 = await this.modalCtrl.create({
component: FindPeoplePage,
componentProps: {
connection: this.connection,
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

this.modal2.onDidDismiss().then(data => {
//console.log('dismissed', data);
this.modal2 = null;
if(this.segmentView == 'people'){
this.forceReloadData('people');
}
});

return await this.modal2.present();
}
}

async messageDetail(items){
if(this.activeitems == items.userid){
} else {
var inventory = this.localStorageService.getItem(PEOPLE_DATA+this.userData['userid']);
//Find index of specific object using findIndex method.    
var objIndex = inventory.findIndex((obj => obj.userid == items.userid));


let checkuserıdinda = <HTMLInputElement>document.getElementById('isonly'+items.userid);
if(checkuserıdinda){
if(checkuserıdinda.style.display == 'block'){
inventory[objIndex].isOnly = 'online';
} else { inventory[objIndex].isOnly = 'offline'; }
}

let xcheckuserıdinda = <HTMLInputElement>document.getElementById('xisonly'+items.userid);
if(xcheckuserıdinda){
if(xcheckuserıdinda.style.display == 'block'){
inventory[objIndex].isOnly = 'online';
} else { inventory[objIndex].isOnly = 'offline'; }
}


this.localStorageService.setItem(PEOPLE_DATA+this.userData['userid'], inventory);

var deceteds; var decshowBackdrop; var vid;
if (!this.platform.is('mobile')){
deceteds = 'pcandwebdesig ';
decshowBackdrop = false;
vid = 'messagedetailmodals';
} else {
deceteds = '';
decshowBackdrop = true;
vid = '';
}

if(this.modal3){
this.modal3.dismiss({data: true}); 
this.modal3 = null;
}

if(this.modal2){
this.modal2.dismiss({data: true}); 
this.modal2 = null;
}

if(this.modal){
this.activeitems = 0;
this.modal.dismiss({data: true}); 
this.modal = null;
}

this.activeitems = items.userid;

/* Mobile Pwa Sycn */
if(this.userData['logintype'] == 'pwa'){ var logintypex = 'pwa'; } else { var logintypex = "mobile"; }
var datasycn = {token: this.userData['userid'], g_type: 'open_message_look', local: logintypex, indata: inventory[objIndex]};
this.connection.send(datasycn);
/* Mobile Pwa Sycn END */

this.modal = await this.modalCtrl.create({
component: MessageDetailPage,
componentProps: {
items: inventory[objIndex],
userid: items.userid,
connection: this.connection,
},
mode: 'ios',
cssClass: deceteds,
id: vid,
swipeToClose: false,
showBackdrop: decshowBackdrop,
backdropDismiss: decshowBackdrop
});

this.modal.onDidDismiss().then(data => {
//this.modal = null;
this.activeitems = 0;
//console.log('dismissed', data);
if(items){
items.messageLook = false; 
if(this.localStorageService.getItem('cacheitem')){
items.message = this.localStorageService.getItem('cacheitem');
}
//this.zone.run(() => {});
let xcmessagecontes = <HTMLInputElement>document.getElementById('messagecontes'+items.userid);
if(xcmessagecontes){
if(this.localStorageService.getItem('cacheitem')){
xcmessagecontes.innerText = this.localStorageService.getItem('cacheitem');
}
}
let xcmessageLooks = <HTMLInputElement>document.getElementById('messageLooks'+items.userid);
if(xcmessageLooks){
xcmessageLooks.style.display = 'none';
}

this.localStorageService.removeItem('cacheitem');
setTimeout(() => {
this.localStorageService.removeItem('cacheitem');
this.localStorageService.removeItem(MESSAGE_DETAIL_DATA_SENDLOOP+this.userData['userid']+items.userid);
}, 300);


this.localStorageService.removeItem(MESSAGE_DETAIL_DATA_SENDLOOP+this.userData['userid']+items.userid);
items = '';
} 

if(!this.messageData){
this.forceReloadData('chats');
}
});

await setTimeout(() => {
this.activeitems = items.userid;
}, 600);

return await this.modal.present();
}
}

async deletechats(items){

const alert = await this.alertController.create({
cssClass: 'my-custom-class',
header: this.generalFunctions.xtranslate('general.logoutinfo'),
message: this.generalFunctions.xtranslate('messenger.deletechatsin'),
buttons: [
{
text: this.generalFunctions.xtranslate('general.cancel'),
role: 'cancel',
cssClass: 'secondary',
handler: (blah) => {
}
}, {
text: this.generalFunctions.xtranslate('general.okay'),
handler: () => {

var inventory = this.localStorageService.getItem(PEOPLE_DATA+this.userData['userid']);
//Find index of specific object using findIndex method.    
var objIndex = inventory.findIndex((obj => obj.userid == items.userid));
if(inventory[objIndex]){
//Update object's name property.
inventory[objIndex].message = '';
inventory[objIndex].messageLook = false;
this.localStorageService.setItem(PEOPLE_DATA+this.userData['userid'], inventory);
}
    
this.localStorageService.removeItem(MESSAGE_DETAIL_DATA+items.userid);
let index = this.messageData.indexOf(items);
if(index > -1){ this.messageData.splice(index, 1); }
}
}
]
});

await alert.present();
}


/**
* On refresh
*/
doRefresh(event) {
this.dataInit();
setTimeout(() => {
event.target.complete();
}, 1000);
}

/**
* Data init
*/
async dataInit() {
if(!this.localStorageService.getItem(MESSAGE_DATA+this.userData['userid'])){ this.localStorageService.setItem(MESSAGE_DATA+this.userData['userid'], []) }
if(!this.localStorageService.getItem(PEOPLE_DATA+this.userData['userid'])){ this.localStorageService.setItem(PEOPLE_DATA+this.userData['userid'], []) }

this.changeTabs('chats');
}

changeTabs(type){ 
if(type == 'chats'){
if(!this.messageData.length){
this.messageData = [];
var cmessageData = this.localStorageService.getItem(PEOPLE_DATA+this.userData['userid']);
let field='date';
cmessageData.sort((a, b) => (b[field] || "").toString().localeCompare((a[field] || "").toString()));
this.messageData = cmessageData;
//this.virtualScroll.checkRange(0);
}
//setTimeout(() => { this.isOnly(); }, 100);
}

if(type == 'calls'){
//this.virtualScroll.checkRange(0);
}

if(type == 'people'){
if(!this.peopleData.length){
this.peopleData = [];
var cpeopleData = this.localStorageService.getItem(PEOPLE_DATA+this.userData['userid']);
let field='fullName';
cpeopleData.sort((a, b) => (a[field] || "").toString().localeCompare((b[field] || "").toString()));
this.peopleData = cpeopleData;
//this.virtualScroll.checkRange(0);
}
}

//setTimeout(() => { if(this.connection){ this.online(); } }, 1000);
}

forceReloadData(type){ 
if(type == 'chats'){
this.messageData = [];
var cmessageData = this.localStorageService.getItem(PEOPLE_DATA+this.userData['userid']);
this.messageData = cmessageData;
//this.virtualScroll.checkRange(0);
}
if(type == 'calls'){
//this.virtualScroll.checkRange(0);
}
if(type == 'people'){
this.peopleData = [];
var cpeopleData = this.localStorageService.getItem(PEOPLE_DATA+this.userData['userid']);
let field='fullName';
cpeopleData.sort((a, b) => (a[field] || "").toString().localeCompare((b[field] || "").toString()));
this.peopleData = cpeopleData;
//this.virtualScroll.checkRange(0);
//setTimeout(() => { this.isOnly(); }, 100);
}
}

ionViewDidEnter(){ 
this.viewActive = true;
/*
if (this.virtualScroll && this.virtualScrollRerender) {
//this.virtualScroll.checkRange(0);
//this.virtualScrollRerender = false;
}*/
}

ionViewDidLeave() {
this.viewActive = false;
}



async loadDocuments() {
const folderContent = await Filesystem.readdir({
directory: APP_DIRECTORY_D,
path: APP_DIR_MAIN_FOLDER+'/'+APP_DIR_AUDIO_FOLDER
});
console.log(folderContent);

// The directory array is just strings
// We add the information isFile to make life easier
this.folderContent = folderContent.files.map(file => {
return {
name: file,
isFile: file.includes('.')
}
});
console.log(this.folderContent);
}

async createDir(pathname) {
try {
let ret = await Filesystem.mkdir({
directory: APP_DIRECTORY_D,
path: pathname,
recursive: true,
});
console.log("folder ", ret);
} catch (e) {
//console.error("Unable to make directory", e);
}
}


async writeSecretFilePhoto(name,redata) {
await Filesystem.writeFile({
path: APP_DIR_MAIN_FOLDER+'/'+APP_DIR_PHOTO_FOLDER+'/'+name,
data: redata,
directory: APP_DIRECTORY_D,
encoding: Encoding.UTF8
});
}

async readSecretFilePhoto(message) {
/*
const contents = await Filesystem.readFile({
path: APP_DIR_MAIN_FOLDER+'/'+APP_DIR_PHOTO_FOLDER+'/'+message.photo,
directory: APP_DIRECTORY_D,
encoding: Encoding.UTF8
});
message.dresult = contents.data;*/
try {
let contents = await Filesystem.readFile({
path: APP_DIR_MAIN_FOLDER+'/'+APP_DIR_PHOTO_FOLDER+'/'+message.photo,
directory: APP_DIRECTORY_D,
encoding: Encoding.UTF8
});
message.dresult = contents.data;
} catch (e) {
console.log("Unable to make directory", e);
message.notavibled = true;
}
}

async readSecretFilePhotoPwa(name) {
try {
let contents = await Filesystem.readFile({
path: APP_DIR_MAIN_FOLDER+'/'+APP_DIR_PHOTO_FOLDER+'/'+name,
directory: APP_DIRECTORY_D,
encoding: Encoding.UTF8
});
return contents.data;
} catch (e) {
return false;
//console.log("Unable to make directory", e);
}
}

async readSecretFileAudioPwa(name) {
try {
let contents = await Filesystem.readFile({
path: APP_DIR_MAIN_FOLDER+'/'+APP_DIR_AUDIO_FOLDER+'/'+name,
directory: APP_DIRECTORY_D,
encoding: Encoding.UTF8
});
return contents.data;
} catch (e) {
return false;
}
}


async writeSecretFileAudio(name,redata) {
await Filesystem.writeFile({
path: APP_DIR_MAIN_FOLDER+'/'+APP_DIR_AUDIO_FOLDER+'/'+name,
data: redata,
directory: APP_DIRECTORY_D,
encoding: Encoding.UTF8
});
}

async readSecretFileAudio(message) {/*
const contents = await Filesystem.readFile({
path: APP_DIR_MAIN_FOLDER+'/'+APP_DIR_AUDIO_FOLDER+'/'+message.photo,
directory: APP_DIRECTORY_D,
encoding: Encoding.UTF8
});
message.dresult = contents.data;*/
try {
let contents = await Filesystem.readFile({
path: APP_DIR_MAIN_FOLDER+'/'+APP_DIR_AUDIO_FOLDER+'/'+message.audio,
directory: APP_DIRECTORY_D,
encoding: Encoding.UTF8
});
message.dresult = contents.data;
} catch (e) {
console.log("Unable to make directory", e);
message.notavibled = true;
}
}
    

async retryconn(){
if(this.connection){
this.serverstatus = 'connecting';
this.serveractivestats = false;
this.isOnline = 'offline';
this.closeSocket();

if(this.modal){
this.modal.dismiss({data: true}); 
this.modal = null;
} 

if(this.modal2){
this.modal2.dismiss({data: true}); 
this.modal2 = null;
}

if(this.modal3){
this.modal3.dismiss({data: true}); 
this.modal3 = null;
} 
}

setTimeout(() => {
if(!this.connection){
this.webRtcConnet();
}
}, 500);

}

async backgrounmodes(){
if(!this.modalBackground){
var deceteds; var decshowBackdrop; var vid;
if (!this.platform.is('mobile')){
deceteds = 'pcandwebdesig backgrounmode';
decshowBackdrop = false;
vid = 'backgrounmode';
} else {
deceteds = 'backgrounmode';
decshowBackdrop = true;
vid = 'backgrounmode';
}

this.modalBackground = await this.modalCtrl.create({
component: BackgrounmodesPage,
componentProps: {
connection: this.connection,
},
mode: 'ios',
cssClass: deceteds,
id: vid,
swipeToClose: false,
showBackdrop: decshowBackdrop,
backdropDismiss: decshowBackdrop
});

this.modalBackground.onDidDismiss().then(data => {
});

return await this.modalBackground.present();
} else {
this.modalBackground.dismiss({data: true}); 
this.modalBackground = null;
}
}


async ngOnInit() { 

const alpha = Array.from(Array(26)).map((e, i) => i + 65);
this.alphabet = alpha.map((x) => String.fromCharCode(x));
this.alphabet.push('?');

await setTimeout(() => {
this.platform.pause.subscribe(async () => {
//this.backgrounmodes(); this.vibration.vibrate(100);
//const timer = 4*60*1000; // four minutes
//if(this.statssplt){ clearInterval(this.statssplt); }
//this.statssplt = setInterval(() => { 
//},timer);
const timer = 4; // four minutes
this.timeObjectCacLOG = this.realSetTimeNextyx(timer);
});

this.platform.resume.subscribe(async () => {
/*
if(this.modalBackground){
this.modalBackground.dismiss({data: true}); 
this.modalBackground = null;
this.vibration.vibrate(100);
}*/
//if(this.statssplt){ clearInterval(this.statssplt); }
var timeObjectNOWLOG = this.AppCacheData.realNowSetTime(); 
var checkTimeSesions =  this.timeObjectCacLOG;
if(timeObjectNOWLOG >= checkTimeSesions){
this.vibration.vibrate(300);
this.retryconn();
}
});

}, 1000);

await this.dataConfig.getConf().then((alllist) => {
this.appversion = alllist.version;
this.socketurl = alllist.socketurl
this.serverid = alllist.server_id;
this.serverpassword = alllist.server_password;
this.pwamobile_encryption_token = alllist.pwamobile_encryption_token;
this.user_encryption_token = alllist.user_encryption_token;
});

await this.createDir(APP_DIR_MAIN_FOLDER);
await setTimeout(() => {
this.createDir(APP_DIR_MAIN_FOLDER+'/'+APP_DIR_AUDIO_FOLDER);
this.createDir(APP_DIR_MAIN_FOLDER+'/'+APP_DIR_PHOTO_FOLDER);
}, 100);

//this.loadDocuments();

let userData = this.localStorageService.getItem(SESSION_KEY);
if(userData){
this.userData = this.localStorageService.getItem(SESSION_KEY)[0];

this.userphotos = this.userData['photo'];
this.uuuserid = this.userData['userid'];

this.chatDizayn = this.userData['chatDizayn'];
this.chatDizaynColor = this.userData['chatDizaynColor'];

this.pwamobilstatus = this.localStorageService.getItem('pwamobilestatus'+this.userData['userid']);
//if(!this.pwamobilstatus){}

this.webRtcConnet();

setTimeout(() => {
if(this.ltypeis == 'mobile'){
this.dataInit();
//setInterval(() => { this.online(); }, 2000);
}

if(this.ltypeis == 'pwa'){
if(this.localStorageService.getItem('loginsycndisable'+this.userData['userid']) == 'disabled'){
this.sendsycn = true;
this.dataInit();
//setInterval(() => { this.online(); }, 2000);
this.localStorageService.setItem('loginsycndisable'+this.userData['userid'], 'enabled');
}
}

}, 500);


} else {
this.generalFunctions.navCtrlNR('/auth/login');
}



//document.addEventListener("pause", void this.appClosedEvenet(), false);
window.addEventListener('beforeunload', () => {
this.appClosedEvenet();
});

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

async presentActionSheet() {
const actionSheet = await this.actionSheetController.create({
header: 'Menü',
mode: 'md',
cssClass: 'my-custom-class',
buttons: [{
text: this.generalFunctions.xtranslate('messenger.findpeople'),
role: 'destructive',
icon: 'person-add-outline',
handler: () => {
console.log('Delete clicked');
this.openFinds();
}
}
, {
text: this.generalFunctions.xtranslate('messenger.qrlogin'),
icon: 'qr-code-outline',
handler: () => {
this.qrlogin();
}
}
, {
text: this.generalFunctions.xtranslate('settings_title'),
icon: 'settings-outline',
handler: () => {
this.openSettings();
}
}
/*, {
text: this.generalFunctions.xtranslate('messenger.creategrops'),
icon: 'people-outline',
handler: () => {
console.log('Share clicked');
this.creategrops();
}
}*/
, {
text: this.generalFunctions.xtranslate('general.cancel'),
icon: 'close',
role: 'cancel',
handler: () => {
console.log('Cancel clicked');
}
}]
});
await actionSheet.present();
/*
const { role, data } = await actionSheet.onDidDismiss();
console.log('onDidDismiss resolved with role and data', role, data);
*/
}

qrlogin(){
setTimeout(() => {
this.menu.toggle('camera');
}, 500);
}

}
