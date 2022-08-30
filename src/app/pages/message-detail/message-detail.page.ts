import { Component, OnInit, OnDestroy, ViewChild, NgZone, ChangeDetectorRef, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent, IonItemSliding, Platform } from '@ionic/angular';
import { BehaviorSubject, SubscriptionLike } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';
import { FormControl, Validators } from '@angular/forms';

import { GeneralFunctions } from '../../providers/general-functions';
import { NavParams } from '@ionic/angular';
import { AlertController, ModalController, IonRouterOutlet } from '@ionic/angular';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import sha1 from "../../../assets/js/sha1.min";

import { DataConfig } from '../../providers/text-config';

export const SESSION_KEY = 'SESSION';
export const MESSAGE_DATA = 'MESSAGE_DATA_';
export const PEOPLE_DATA = 'PEOPLE_DATA_';
export const MESSAGE_DETAIL_DATA = 'MESSAGE_DETAIL_DATA_';
export const MESSAGE_DETAIL_DATA_SENDLOOP = 'MESSAGE_DETAIL_DATA_SENDLOOP';
export const CHAT_DIZAYN = 'CHAT_DIZAYN';
export const CHAT_DIZAYN_COLOR = 'CHAT_DIZAYN_COLOR';

import { Config, IonVirtualScroll } from '@ionic/angular';

declare var FileBufferReader: any;
declare var FileSelector: any;

import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

// only 'VoiceRecorder' is mandatory, the rest is for typing
import { VoiceRecorder, VoiceRecorderPlugin, RecordingData, GenericResponse, CurrentRecordingStatus } from 'capacitor-voice-recorder';
import { Clipboard } from '@capacitor/clipboard';

import { StoryModalEnterAnimation, StoryModalLeaveAnimation, MusicModalEnterAnimation, MusicModalLeaveAnimation } from '../../app.animations';

import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

const APP_DIRECTORY_D = Directory.Documents;
const APP_DIRECTORY_C = Directory.Cache;
const APP_DIRECTORY_E = Directory.External;
const APP_DIRECTORY_ES = Directory.ExternalStorage;

const APP_DIR_MAIN_FOLDER = "holla-messenger";
const APP_DIR_AUDIO_FOLDER = "holla-audio";
const APP_DIR_PHOTO_FOLDER = "holla-photo";

import { CallPage } from '../call/call.page';
import { FullPhotoPage } from '../fullphoto/fullphoto.page';
import { ProfilePage } from '../profile/profile.page';
import { MusicController, PlayerEventOptions, initialPlayerEventOptions } from '../../services/music-controller/music-controller.service';
import { exit } from 'process';

export interface CurrentUserInterface {
id: string;
first_name: string;
last_name: string;
email: string;
image: string;
last_message: string;
}

@Component({
selector: 'app-message-detail',
templateUrl: './message-detail.page.html',
styleUrls: ['./message-detail.page.scss'],
})
export class MessageDetailPage implements OnInit, OnDestroy {
userId = null;
user: any;
chats: any[] = [];
cache: any[] = [];

messageControl: FormControl = new FormControl('', [
Validators.required
]);

pageScrolling = false;
isAllowScroll = true;
scrolling: boolean = false;

subscriptions: SubscriptionLike[] = [];
@ViewChild(IonContent) private content: IonContent;

connection: any;
userid: any;
userData: any[];
items: any = {fullName: 'NoNe', photo: 'none', userid: '', desc_status: 'Hey there! I am using Holla Messenger.', isOnly: 'offline'};
encryption: any;
@ViewChild(IonVirtualScroll, {static: false})
private virtualScroll: IonVirtualScroll;
viebled: boolean = false;
listloadnum: number = 25;
cachelegent: any;
loadmores: boolean = false;

uppnonelonewmess: any;
uppmesscrollTop: any;

uumaygupopdiv: number = 0;
uumaygupopdivreal: boolean = false;
noofflinemssage: boolean = false;
writer: boolean = false;
nextTimer: any;
updateMesages: any;
statss: any;
records: boolean = false;
myTimer: any;
counts: number = 0;
desktopwebs: any;
tumsscache: any;
modal3: any;
modal4: any;
modal5: any;

music: PlayerEventOptions = initialPlayerEventOptions;
playingSongId: any;
photoloaders: boolean = false;

appversion: any;
serverid: any;
serverpassword: any;
pwamobile_encryption_token: any;
user_encryption_token: any;
setState: any;
cachefile: any;
chatDizayn: any = {name: '', image: '', visebled: false};
chatDizaynColor: any = {name: '', image: '', visebled: false};
opendowmedia: any;
connectionLive: any;

constructor(
private route: ActivatedRoute,
public alertController: AlertController,
private localStorageService: LocalStorageService,
private generalFunctions: GeneralFunctions,
private modalCtrl: ModalController,
public navParams : NavParams,
public zone: NgZone, private cdref: ChangeDetectorRef,
private sanitizer: DomSanitizer,
private platform: Platform,
private musicController: MusicController,
private dataConfig: DataConfig
) {
this.route.params.subscribe(params => {
this.userId = params.id;
});

if (!this.platform.is('mobile')){
this.desktopwebs = "desktopwebs";
} else { this.desktopwebs = "mobilesall"; }
}

getFileContent(url : string) {
//return this.sanitizer.bypassSecurityTrustResourceUrl(url);
if(url){
//window.open(url);
window.open(url, '_blabk');  
}
}

onerror(message){
message.loaded = true;
}

voiceRecords(){
// will print true / false based on the ability of the current device (or web browser) to record audio
VoiceRecorder.canDeviceVoiceRecord().then((result: GenericResponse) => {
if(result.value){

/** 
* will prompt the user to give the required permission, after that
* the function will print true / false based on the user response
*/
VoiceRecorder.requestAudioRecordingPermission().then((result: GenericResponse) => {
if(result.value){

/**
* will print true / false based on the status of the recording permission.
* the promise will reject with "COULD_NOT_QUERY_PERMISSION_STATUS"
* if the current device cannot query the current status of the recording permission
*/ 
VoiceRecorder.hasAudioRecordingPermission().then((result: GenericResponse) => {
if(result.value){



/**
* In case of success the promise will resolve to { value: true }
* in case of an error the promise will reject with one of the following messages:
* "MISSING_PERMISSION", "ALREADY_RECORDING", "MICROPHONE_BEING_USED", "DEVICE_CANNOT_VOICE_RECORD", or "FAILED_TO_RECORD"
*/
VoiceRecorder.startRecording()
.then((result: GenericResponse) => {
this.records = true;

this.counts = 0;
this.myTimer = setInterval(() => { 
this.myClock()
}, 1000);



})
.catch(error => {
});



}
});

}
});

}
});
}





myClock() {
var stimerss = <HTMLInputElement>document.getElementById("recortimess");

this.counts = this.counts+1;
var counts: any = this.counts;

var date = new Date(0);
date.setSeconds(counts); // specify value for SECONDS here
var timeString = date.toISOString().substr(11, 8);

if(stimerss){stimerss.innerHTML = timeString;}
}



cancelRecord(){
VoiceRecorder.stopRecording()
.then((result: RecordingData) => {
})
.catch(error => {});
this.records = false;
this.counts = 0;
clearInterval(this.myTimer);
}


async playMusicCTRL(message) {

if(!this.opendowmedia){
if(!message.dowloands){
await this.dowloandPwaMedia(message, 'get_audio', message.audio);
}
} else { 
console.log('Wait');
}
/*
if(this.desktopwebs == "desktopwebs"){ 
} else {
await this.playMusic(message);
}
*/
}

async playMusic(message) {

if(this.localStorageService.getItem('playingSongType'+this.userData['userid']) == 'stop'){
this.playingSongId = '';
}

if(this.playingSongId != message.id){

if(document.getElementById('musicplaypaueicon'+this.playingSongId)){
var musicpross: any = <HTMLElement>document.getElementById('musicplaypaueicon'+this.playingSongId);
musicpross.name = 'play';
}

this.playingSongId = message.id;
 
this.localStorageService.setItem('playingSongType'+this.userData['userid'], 'play');


if(document.getElementById('musicpross'+this.playingSongId)){
var pross: any = <HTMLElement>document.getElementById('musicpross'+this.playingSongId);
pross.type = 'indeterminate';
}

var avatars;
if(message.type == 'user'){
avatars = this.user['photo'];
} else {
avatars = this.userData['photo'];
}

if(!avatars || avatars == 'none'){
avatars = 'assets/images/avatars/0.jpg';
}

var music = {
id: message.id,
image: avatars,
song: message.message,
author: message.name,
time: message.audioduration,
audio: await this.readSecretFileAudioGet(message)
}

await this.musicController.playMusic(music);
}
}

/* iptal */
/*
conterBlobs(message){
var newurls = message.dresult;
let binary = this.convertURIToBinary(newurls);
let blob = new Blob([binary], {
type: 'audio/ogg'
});
let blobUrl = URL.createObjectURL(blob);
}
*/

/* iptal */
/*
conterBlobsPhoto(message){
var dphoto = message.dresult;
let binary = this.convertURIToBinary(dphoto);
let blob = new Blob([binary], {
type: message.photoaudiotype
});
let blobUrl = URL.createObjectURL(blob);
}
*/

async openPhotoCTRL(message){

if(!this.opendowmedia){
if(!message.dowloands){
await this.dowloandPwaMedia(message, 'get_photo', message.photo);
}
} else {
console.log('wait');
}
/*
if(this.desktopwebs == "desktopwebs"){ 
} else {
await this.openPhoto(message);
}*/
}

async dowloandPwaMedia(message, types, uname){

if(await this.readSecretFilePhotoGet(message) || await this.readSecretFileAudioGet(message)){

if(types == 'get_photo'){
await this.openPhoto(message);
}

if(types == 'get_audio'){
await this.playMusic(message);
}

} else {

message.dowloands = true;
this.opendowmedia = message;

if(this.userData['logintype'] == 'pwa'){
var logintypex = 'pwa';
} else {
var logintypex = "mobile";
}

var amediaryy = {name: uname, type: types, reciveruserid: this.userid};

var data = {token: this.userData['userid'], g_type: 'get_media', local: logintypex, indata: amediaryy};
this.connection.send(data);

}
}

async openPhoto(message){
var deceteds; var decenterAnimation; var decleaveAnimation; var decleaveparanet;

if (!this.platform.is('mobile')){
deceteds = 'pcandwebdesig nomusiccontrols';
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
photo: await this.readSecretFilePhotoGet(message),
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

async profile(user){
var deceteds; var decenterAnimation; var decleaveAnimation; var decleaveparanet;

if (!this.platform.is('mobile')){
deceteds = 'pcandwebdesig profilethem';
decenterAnimation = '';
decleaveAnimation = '';
decleaveparanet = ';'
} else {
deceteds = 'nomusiccontrols';
decenterAnimation = MusicModalEnterAnimation;
decleaveAnimation = MusicModalLeaveAnimation;
//decleaveparanet = this.routerOutlet.nativeEl;
}

if(this.modal4){
this.modal4.dismiss({data: true}); 
this.modal4 = null;
if (!this.platform.is('mobile')){
var messagedetailmodals = document.getElementById('messagedetailmodals');
messagedetailmodals.classList.toggle('pwaprofileopenmessage');
}
} else {

this.modal4 = await this.modalCtrl.create({
component: ProfilePage,
componentProps: {
user: user,
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

if (!this.platform.is('mobile')){
var messagedetailmodals = document.getElementById('messagedetailmodals');
messagedetailmodals.classList.toggle('pwaprofileopenmessage');
}


this.modal4.onDidDismiss().then(data => {
this.modal4 = null;
});

return await this.modal4.present();
}
}

stopRecord(){
/**
* In case of success the promise will resolve to:
* {"value": { recordDataBase64: string, msDuration: number, mimeType: string }},
* the file will be in one of several possible formats (more on that later).
* in case of an error the promise will reject with one of the following messages:
* "RECORDING_HAS_NOT_STARTED" or "FAILED_TO_FETCH_RECORDING"
*/
VoiceRecorder.stopRecording()
.then((result: RecordingData) => {
this.records = false;
this.records = false;
this.counts = 0;
clearInterval(this.myTimer);
this.sendManuelType(this.generalFunctions.xtranslate('messenger.audiorecordsends'), "audio", result, result.value.mimeType);
})
.catch(error => { console.log(error); })
}


convertURIToBinary(dataURI) {
let BASE64_MARKER = ';base64,';
let base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
let base64 = dataURI.substring(base64Index);
let raw = window.atob(base64);
let rawLength = raw.length;
let arr = new Uint8Array(new ArrayBuffer(rawLength));

for (let i = 0; i < rawLength; i++) {
arr[i] = raw.charCodeAt(i);
}
return arr;
}


async writeSecretFilePhoto(name,redata) {
await Filesystem.writeFile({
path: APP_DIR_MAIN_FOLDER+'/'+APP_DIR_PHOTO_FOLDER+'/'+name,
data: redata,
directory: APP_DIRECTORY_D,
encoding: Encoding.UTF8
});
}


async readSecretFilePhotoGet(message) {
try {
let contents = await Filesystem.readFile({
path: APP_DIR_MAIN_FOLDER+'/'+APP_DIR_PHOTO_FOLDER+'/'+message.photo,
directory: APP_DIRECTORY_D,
encoding: Encoding.UTF8
});
return contents.data;
} catch (e) {
return false;
//console.log("Unable to make directory", e);
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

async readSecretFileAudioGet(message) {
try {
let contents = await Filesystem.readFile({
path: APP_DIR_MAIN_FOLDER+'/'+APP_DIR_AUDIO_FOLDER+'/'+message.audio,
directory: APP_DIRECTORY_D,
encoding: Encoding.UTF8
});
return contents.data;
} catch (e) {
return '';
//console.log("Unable to make directory", e);
}
}

async sendManuelType(typemessage, gtypeis, result, pptype){
var extraChcks = this.connection.getExtraData(this.userid);

if(this.user.status == 'online'){
var mtyps = 'online';
} else {
var mtyps = 'offline';
}

var messageCnt =  typemessage;
var encryption = sha1(this.user_encryption_token+this.userData['userid']+this.userid);

var xaudio = '';
var sxaudio = '';
var xaudiomintype = '';
var xaudioduration = '';
if(gtypeis == 'audio'){


var newaudioeidtbase;
if(result.value.recordDataBase64.startsWith('data:')){
newaudioeidtbase = result.value.recordDataBase64;
} else {
newaudioeidtbase = 'data:audio/webm;codecs=opus;base64,'+result.value.recordDataBase64;
}


//sxaudio = newaudioeidtbase;
sxaudio = this.encryptionLi(encryption, newaudioeidtbase, 'encrypting');

xaudiomintype = result.value.mimeType;
xaudioduration = result.value.msDuration;

var filename = 'audio_'+this.GenerateSerialNumber("0000-0000000-000-000000-000-0000000")+'.dataV3';
await this.writeSecretFileAudio(filename,newaudioeidtbase);
var xaudio = filename;
}

if(gtypeis == 'photo'){
var filename = 'photo_'+this.GenerateSerialNumber("0000-0000000-000-000000-000-0000000")+'.dataV3';
await this.writeSecretFilePhoto(filename,result);
var xphoto = filename;
//var sxphoto = result;
var sxphoto = this.encryptionLi(encryption, result, 'encrypting');

var tumbimages = await this.tumbImageLoad(result, 'min');
}

var xnewdata;

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth(); 
var yyyy = today.getFullYear();

var ndats = dd+'.'+mm+'.'+yyyy;

var inventory = this.localStorageService.getItem(MESSAGE_DETAIL_DATA+this.userid);
//Find index of specific object using findIndex method.    
var objIndex = inventory.findIndex((obj => obj.newdata == ndats));
if(!inventory[objIndex]){
xnewdata = ndats;
} else { xnewdata = ''; }

var vaidkey = this.GenerateSerialNumber("0000-0000000-000-000000-000");

// add message
var nitems = {
id: vaidkey,
message: messageCnt,
date: new Date(),
type: 'me',
name: this.userData['name'],
//avatar: this.userData['photo'],
avatar: '',
clock: this.time(),
reciveruserid: this.userid,
senderid: this.userData['userid'],
ctype: mtyps,
g_type: gtypeis,
audio: xaudio,
audiomintype: xaudiomintype,
audioduration: xaudioduration,
photo: xphoto,
photoaudiotype: pptype,
newdata: xnewdata,
tumbimages: tumbimages
};

this.chats.push(nitems);
this.cache.push(nitems);
this.updatebacklist(messageCnt);

this.connection.send({
id: vaidkey,
message: messageCnt,
date: new Date(),
type: 'me',
name: this.userData['name'],
//avatar: this.userData['photo'],
avatar: '',
clock: this.time(),
reciveruserid: this.userid,
senderid: this.userData['userid'],
ctype: mtyps,
g_type: gtypeis,
audio: sxaudio,
audiomintype: xaudiomintype,
audioduration: xaudioduration,
photo: sxphoto,
photoaudiotype: pptype,
tumbimages: tumbimages
});

this.localStorageService.setItem(MESSAGE_DETAIL_DATA+this.userid, this.cache);








/* Mobile Pwa Sycn */
if(this.userData['logintype'] == 'pwa'){ var logintypex = 'pwa'; } else { var logintypex = "mobile"; }

// tmb image cryto
var encryption = sha1('all_media_send:'+this.userData['userid']);
var cnttumbimages = this.encryptionLi(encryption, tumbimages, 'encrypting');

var nndatas = {
id: vaidkey,
message: messageCnt,
date: new Date(),
type: 'me',
name: this.userData['name'],
clock: this.time(),
//avatar: this.userData['photo'],
avatar: '',
reciveruserid: this.userid,
senderid: this.userData['userid'],
ctype: mtyps,
g_type: gtypeis,
audio: xaudio,
audiomintype: xaudiomintype,
audioduration: xaudioduration,
photo: xphoto,
photoaudiotype: pptype,
newdata: xnewdata,
tumbimages: cnttumbimages
};
var datasycn = {token: this.userData['userid'], g_type: 'all_media_send', local: logintypex, indata: nndatas};
this.connection.send(datasycn);
/* Mobile Pwa Sycn END */









var inventory = this.localStorageService.getItem(PEOPLE_DATA+this.userData['userid']);

//Find index of specific object using findIndex method.    
var objIndex = inventory.findIndex((obj => obj.userid == this.userid));

//Update object's name property.
inventory[objIndex].date = new Date();
inventory[objIndex].message = messageCnt;

this.localStorageService.setItem(PEOPLE_DATA+this.userData['userid'], inventory);

if(!this.scrolling){
setTimeout(() => {this.content.scrollToBottom(0);});
}

this.photoloaders = false;
this.cachefile = '';
}

sendFilesPhoto(){
document.getElementById('selecImagePicker').click();
}

sendFiles(){
if (!this.platform.is('mobile')){
document.getElementById('selecImagePickersOda').click();
}
if (this.platform.is('mobile')){
document.getElementById('selecImagePicker').click();
}
}

/*** Content scroll start*/
logScrollStart() {
//this.scrolling = true;
}

/*** Content scrolling*/
logScrolling(event) {
// console.log('Scrolling');

if(event){
if(event.detail.scrollTop){
this.uppmesscrollTop = event.detail.scrollTop;
}
//console.log(this.uppmesscrollTop);
var xyxs = <HTMLInputElement>document.getElementById('ionitemgenels');
var contesnt = <HTMLInputElement>document.getElementById('contentmessagedetails');
this.uppnonelonewmess =  xyxs.clientHeight - contesnt.clientHeight + 20;

const uppnonelonewmessnews = this.uppnonelonewmess-160;
if(uppnonelonewmessnews <= this.uppmesscrollTop){
this.scrolling = false;
this.uumaygupopdivreal = false;
this.uumaygupopdiv = 0;
} else {
this.scrolling = true;
}

}
}

/*** Content scroll end*/
logScrollEnd() {
//this.scrolling = false;
}


/**
* Reply message (drag)
* @param {Event} event - drag event
* @param {IonItemSliding} slidingItem - item sliding directive
*/
messageDraged(event, slidingItem: IonItemSliding) {
if (event.detail.ratio === 1) {
slidingItem.closeOpened();
}
}

/**
* Send message
*/
sendMessage(event) {
event.preventDefault();
var extraChcks = this.connection.getExtraData(this.userid);

if(this.user.status == 'online'){
var mtyps = 'online';
} else {
var mtyps = 'offline';
}

var encryption = sha1(this.user_encryption_token+this.userData['userid']+this.userid);
var messageCnt = this.encryptionLi(encryption, this.messageControl.value, 'encrypting');


var xnewdata;

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth(); 
var yyyy = today.getFullYear();

var ndats = dd+'.'+mm+'.'+yyyy;

var inventorydate = this.localStorageService.getItem(MESSAGE_DETAIL_DATA+this.userid);
var objIndex = inventorydate.findIndex((obj => obj.newdata == ndats));
if(!inventorydate[objIndex]){
xnewdata = ndats;
} else { xnewdata = ''; }

var vaidkey = this.GenerateSerialNumber("0000-0000000-000-000000-000");
// add message
var nitems = {
id: vaidkey,
message: this.messageControl.value,
date: new Date(),
type: 'me',
name: this.userData['name'],
//avatar: this.userData['photo'],
avatar: '',
clock: this.time(),
reciveruserid: this.userid,
senderid: this.userData['userid'],
ctype: mtyps,
g_type: "message",
newdata: xnewdata
};
this.chats.push(nitems);
this.cache.push(nitems);
this.updatebacklist(this.messageControl.value);

this.connection.send({
id: vaidkey,
message: messageCnt,
date: new Date(),
type: 'me',
name: this.userData['name'],
//avatar: this.userData['photo'],
avatar: '',
clock: this.time(),
reciveruserid: this.userid,
senderid: this.userData['userid'],
ctype: mtyps,
g_type: "message"
});

/* Mobile Pwa Sycn */
if(this.userData['logintype'] == 'pwa'){ var logintypex = 'pwa'; } else { var logintypex = "mobile"; }

// add message
var encryption = sha1('normal_text_send:'+this.userData['userid']);
var cntmseees = this.encryptionLi(encryption, this.messageControl.value, 'encrypting');
var nndatas = {
id: vaidkey,
message: cntmseees,
date: new Date(),
type: 'me',
name: this.userData['name'],
//avatar: this.userData['photo'],
avatar: '',
clock: this.time(),
reciveruserid: this.userid,
senderid: this.userData['userid'],
ctype: mtyps,
g_type: "message",
newdata: xnewdata
};
var datasycn = {token: this.userData['userid'], g_type: 'normal_text_send', local: logintypex, indata: nndatas};
this.connection.send(datasycn);
/* Mobile Pwa Sycn END */

this.localStorageService.setItem(MESSAGE_DETAIL_DATA+this.userid, this.cache);



var inventory = this.localStorageService.getItem(PEOPLE_DATA+this.userData['userid']);
/*
var find = inventory.find(({ userid }) => userid === this.userid);
console.log(find);

var xxx = inventory.indexOf(find);
console.log(xxx);
*/

//Find index of specific object using findIndex method.    
var objIndex = inventory.findIndex((obj => obj.userid == this.userid));

//Update object's name property.
inventory[objIndex].date = new Date();
inventory[objIndex].message = this.messageControl.value;

this.localStorageService.setItem(PEOPLE_DATA+this.userData['userid'], inventory);

// clear input
this.messageControl.setValue('');

if(!this.scrolling){
setTimeout(() => {this.content.scrollToBottom(0);});
}

}

time() {
var d = new Date();
var s = d.getSeconds();
var m = d.getMinutes();
var h = d.getHours();
//+ ":" + ("0" + s).substr(-2)
return ("0" + h).substr(-2) + ":" + ("0" + m).substr(-2);
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

scrollBottoms(message){
if(!message.scrollbottom){
if(!this.scrolling){
this.content.scrollToBottom(0);
setTimeout(() => {this.content.scrollToBottom(0);}, 500);
setTimeout(() => {this.content.scrollToBottom(0);}, 600);
}
message.scrollbottom = true;
} 
}

clickgomss(){
setTimeout(() => {this.content.scrollToBottom(0);}, 0); 
}

getFileReader(): FileReader {
const fileReader = new FileReader();
const zoneOriginalInstance = (fileReader as any)["__zone_symbol__originalInstance"];
return zoneOriginalInstance || fileReader;
}



async selecImagePicker(event) {    

let promise = new Promise((resolve, reject) => { 

this.cachefile = '';
this.photoloaders = true;
var file = event.srcElement.files[0]; 


if(file.type.split('/')[0] == 'image'){

this.cachefile = file;
var fileReader = this.getFileReader();

// If error occurs, reject the promise
fileReader.onerror = () => {resolve("ERR");}

// Define an onload handler that's called when file loaded
fileReader.onload = () => {
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
let tumbimages = await this.tumbImageLoad(result, 'max');

this.sendManuelType(this.generalFunctions.xtranslate('messenger.photosends'), "photo", tumbimages, this.cachefile.type);
var reset = <HTMLInputElement>document.getElementById('selecImagePicker');
reset.value = '';
} else {
this.photoloaders = false; 
}


}

inputSelectPictureNewsPickerOda(event) {
if (this.platform.is('mobile')){
this.selecImagePicker(event);
}

if (!this.platform.is('mobile')){
//this.zone.run(() => { });

var file = event.srcElement.files[0]; 
if(file){
this.connection.shareFile(file,this.userid);
var reset = <HTMLInputElement>document.getElementById('selecImagePickersOda');
reset.value = '';
}


}
}

async testmobileuploadclick(){
document.getElementById('testmobileupload').click();
}

async testmobileupload(event){
var file = event.srcElement.files[0]; 
if(file){
await console.log(file);
await this.generalFunctions.ToastShowModal('Dosya Seçildi İşlendi', 2000, 'bottom');
await this.connection.shareFile(file,this.userid);
var reset = <HTMLInputElement>document.getElementById('testmobileupload');
reset.value = '';
}
}


updateLabel(progress, label) {
if (progress.position == -1) return;
var position = +progress.position.toFixed(2).split('.')[1] || 100;
label.innerHTML = position + '%';
}

updatebacklist(message){
let xcmessagecontes = <HTMLInputElement>document.getElementById('messagecontes'+this.userid);
if(xcmessagecontes){
xcmessagecontes.innerText = message;
}
let xcmessageLooks = <HTMLInputElement>document.getElementById('messageLooks'+this.userid);
if(xcmessageLooks){
xcmessageLooks.style.display = 'none';
}
}

async ngOnInit() {

await this.dataConfig.getConf().then((alllist) => {
this.appversion = alllist.version;
this.serverid = alllist.server_id;
this.serverpassword = alllist.server_password;
this.pwamobile_encryption_token = alllist.pwamobile_encryption_token;
this.user_encryption_token = alllist.user_encryption_token;
});


let userData = this.localStorageService.getItem(SESSION_KEY);
if(userData){
this.userData = this.localStorageService.getItem(SESSION_KEY)[0];

this.chatDizayn = this.userData['chatDizayn'];
this.chatDizaynColor = this.userData['chatDizaynColor'];

this.connection = this.navParams.get('connection');
this.userid = this.navParams.get('userid');
this.items = this.navParams.get('items');

this.user = {
id: this.items.userid,
name: this.items.fullName,
image: this.items.photo,
last_message: "",
status: "offline"
};


this.localStorageService.removeItem(MESSAGE_DETAIL_DATA_SENDLOOP+this.userData['userid']+this.userid);
this.localStorageService.removeItem('checkaudios_'+this.userData['userid']+'_'+this.userid);
this.localStorageService.removeItem('checkphoto_'+this.userData['userid']+'_'+this.userid);

//this.connection.filesContainer = document.querySelector('.files-container');

var inventory = this.localStorageService.getItem(PEOPLE_DATA+this.userData['userid']);
//Find index of specific object using findIndex method.    
var objIndex = inventory.findIndex((obj => obj.userid == this.userid));
//Update object's name property.
inventory[objIndex].messageLook = false;
this.localStorageService.setItem(PEOPLE_DATA+this.userData['userid'], inventory);




//Send Data Event
this.updateMesages = setInterval(() => { 

var event = this.localStorageService.getItem(MESSAGE_DETAIL_DATA_SENDLOOP+this.userData['userid']+this.userid);
if(event){

var eventdata;

if(event.data){
eventdata = event.data;
} else {
eventdata = event;
}



/* pwa mobile sync */

//chat
if(event.data.indata && event.data.g_type == "normal_text_send"){
var indates = event.data.indata;
this.chats.push(indates);
this.cache.push(indates); 
setTimeout(() => {this.content.scrollToBottom(0);}, 50);
this.localStorageService.removeItem(MESSAGE_DETAIL_DATA_SENDLOOP+this.userData['userid']+this.userid);
}

//send media
if(event.data.indata && event.data.g_type == "all_media_send"){
var indates = event.data.indata;
this.chats.push(indates);
this.cache.push(indates); 
setTimeout(() => {this.content.scrollToBottom(0);}, 50);
this.localStorageService.removeItem(MESSAGE_DETAIL_DATA_SENDLOOP+this.userData['userid']+this.userid);
}

//media
if(event.data.indata && event.data.g_type == "send_media"){
var indates = event.data.indata;
var message = this.opendowmedia;
message.dowloands = false;

if(event.data.indata.type == 'get_photo'){
this.openPhoto(message);
}

if(event.data.indata.type == 'get_audio'){
this.playMusic(message);
}


this.opendowmedia = '';
this.localStorageService.removeItem(MESSAGE_DETAIL_DATA_SENDLOOP+this.userData['userid']+this.userid);
}

/* pwa mobile sync END*/


/* */
if(eventdata.reciveruserid == this.userData['userid'] && eventdata.senderid == this.userid || eventdata.reciveruserid == this.userid  && eventdata.senderid == this.userData['userid']){



if(eventdata.g_type == "files"){ 
this.zone.run(() => {

var messageCnt = eventdata.message;

var xnewdata;

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth(); 
var yyyy = today.getFullYear();

var ndats = dd+'.'+mm+'.'+yyyy;

var inventory = this.localStorageService.getItem(MESSAGE_DETAIL_DATA+this.userid);
//Find index of specific object using findIndex method.    
var objIndex = inventory.findIndex((obj => obj.newdata == ndats));
if(!inventory[objIndex]){
xnewdata = ndats;
} else { xnewdata = ''; }

var nitems = {
id:  eventdata.id,
message: messageCnt,
date: eventdata.date,
type: eventdata.type,
name: eventdata.fullName,
//avatar: eventdata.photo,
avatar: '',
clock: eventdata.clock,
reciveruserid: eventdata.reciveruserid,
//senderid: this.userData['userid'],
senderid: eventdata.senderid,
ctype: eventdata.ctype,
g_type: eventdata.g_type,
files: eventdata.files,
filetype: eventdata.type,
filetypemin: eventdata.filetypemin,
filestatus: eventdata.filestatus,
fileuuid: eventdata.fileuuid,
fileurl: '',
progressmax: eventdata.progressmax,
newdata: xnewdata
};
// add message
this.chats.push(nitems);
this.cache.push(nitems);
this.updatebacklist(messageCnt);

if(!this.scrolling){
setTimeout(() => {this.content.scrollToBottom(0);}, 380);
} else {
this.uumaygupopdivreal = true;
this.uumaygupopdiv++;
}

this.localStorageService.setItem(MESSAGE_DETAIL_DATA+this.userid, this.cache);


var inventory = this.localStorageService.getItem(PEOPLE_DATA+this.userData['userid']);

//Find index of specific object using findIndex method.    
var objIndex = inventory.findIndex((obj => obj.userid == this.userid));

//Update object's name property.
inventory[objIndex].date = eventdata.date;
inventory[objIndex].message = messageCnt;

this.localStorageService.setItem(PEOPLE_DATA+this.userData['userid'], inventory);

this.localStorageService.removeItem(MESSAGE_DETAIL_DATA_SENDLOOP+this.userData['userid']+this.userid);
});
}

if(eventdata.g_type == "filesend"){
this.zone.run(() => {
var uuid = eventdata.fileuuid

var objIndex = this.chats.findIndex((obj => obj.fileuuid == uuid));
//Update object's name property.
if(this.chats[objIndex]){  
this.chats[objIndex].filestatus = 'end';
this.chats[objIndex].fileurl = eventdata.files.url;
}

this.localStorageService.removeItem(MESSAGE_DETAIL_DATA_SENDLOOP+this.userData['userid']+this.userid);
});
}

if(eventdata.g_type == "filepross"){
this.zone.run(() => {
var uuid = eventdata.uuid
var chunk = eventdata.chunk

if(document.getElementById('files-containerd'+uuid)){
var progress = <HTMLInputElement>document.getElementById('files-pross'+uuid);
var label = document.getElementById('files-label'+uuid);

progress.value = chunk.currentPosition || chunk.maxChunks || progress.max;

this.updateLabel(progress, label);
}

this.localStorageService.removeItem(MESSAGE_DETAIL_DATA_SENDLOOP+this.userData['userid']+this.userid);
});
}



}


if(eventdata.reciveruserid == this.userData['userid'] && eventdata.senderid == this.userid){


if(eventdata.g_type == "writer"){ 
this.zone.run(() => {
clearInterval(this.nextTimer);
this.writer = true;
this.nextTimer = setTimeout(() => { this.writer = false; }, 600);
this.localStorageService.removeItem(MESSAGE_DETAIL_DATA_SENDLOOP+this.userData['userid']+this.userid);
});
}

if(eventdata.g_type == "message"){
this.zone.run(() => {
this.writer = false;

/* pwa mobile sycn uid pwa delete */
event.userid = event.userid.replace("pwa+", "");

var encryption = sha1(this.user_encryption_token+event.userid+this.userData['userid']);
var messageCnt = this.encryptionLi(encryption, eventdata.message, 'decrypting');

var xnewdata;

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth(); 
var yyyy = today.getFullYear();

var ndats = dd+'.'+mm+'.'+yyyy;

var inventory = this.localStorageService.getItem(MESSAGE_DETAIL_DATA+this.userid);
//Find index of specific object using findIndex method.    
var objIndex = inventory.findIndex((obj => obj.newdata == ndats));
if(!inventory[objIndex]){
xnewdata = ndats;
} else { xnewdata = ''; }

var nitems = {
id:  eventdata.id,
message: messageCnt,
date: eventdata.date,
type: 'user',
name: event.extra.fullName,
//avatar: event.extra.photo,
avatar: '',
clock: eventdata.clock,
reciveruserid: eventdata.reciveruserid,
//senderid: this.userData['userid'],
senderid: eventdata.senderid,
ctype: eventdata.ctype,
g_type: eventdata.g_type,
newdata: xnewdata
};
// add message
this.chats.push(nitems);
this.cache.push(nitems);
this.updatebacklist(messageCnt);

if(!this.scrolling){
setTimeout(() => {this.content.scrollToBottom(0);}, 380);
} else {
this.uumaygupopdivreal = true;
this.uumaygupopdiv++;
}

this.localStorageService.setItem(MESSAGE_DETAIL_DATA+this.userid, this.cache);


var inventory = this.localStorageService.getItem(PEOPLE_DATA+this.userData['userid']);

//Find index of specific object using findIndex method.    
var objIndex = inventory.findIndex((obj => obj.userid == this.userid));

//Update object's name property.
inventory[objIndex].date = eventdata.date;
inventory[objIndex].message = messageCnt;

this.localStorageService.setItem(PEOPLE_DATA+this.userData['userid'], inventory);
this.localStorageService.removeItem(MESSAGE_DETAIL_DATA_SENDLOOP+this.userData['userid']+this.userid);
});

}






if(eventdata.g_type == "audio" || eventdata.g_type == "photo"){
this.zone.run(() => {
this.writer = false;

var messageCnt = eventdata.message;

var xnewdata;

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth(); 
var yyyy = today.getFullYear();

var ndats = dd+'.'+mm+'.'+yyyy;

var inventory = this.localStorageService.getItem(MESSAGE_DETAIL_DATA+this.userid);
//Find index of specific object using findIndex method.    
var objIndex = inventory.findIndex((obj => obj.newdata == ndats));
if(!inventory[objIndex]){
xnewdata = ndats;
} else { xnewdata = ''; }

var nitems = {
id:  eventdata.id,
message: messageCnt,
date: eventdata.date,
type: 'user',
name: event.extra.fullName,
//avatar: event.extra.photo,
avatar: '',
clock: eventdata.clock,
reciveruserid: eventdata.reciveruserid,
//senderid: this.userData['userid'],
senderid: eventdata.senderid,
ctype: eventdata.ctype,
g_type: eventdata.g_type,
audio:  eventdata.audio,
audiomintype: eventdata.audiomintype,
audioduration: eventdata.audioduration,
photo: eventdata.photo,
photoaudiotype: eventdata.photoaudiotype,
newdata: xnewdata,
tumbimages: event.data.tumbimages
};
// add message
this.chats.push(nitems);
this.cache.push(nitems);
this.updatebacklist(messageCnt);


if(!this.scrolling){
setTimeout(() => {this.content.scrollToBottom(0);}, 380);
} else {
this.uumaygupopdivreal = true;
this.uumaygupopdiv++;
}

this.localStorageService.setItem(MESSAGE_DETAIL_DATA+this.userid, this.cache);


var inventory = this.localStorageService.getItem(PEOPLE_DATA+this.userData['userid']);

//Find index of specific object using findIndex method.    
var objIndex = inventory.findIndex((obj => obj.userid == this.userid));

//Update object's name property.
inventory[objIndex].date = eventdata.date;
inventory[objIndex].message = messageCnt;

this.localStorageService.setItem(PEOPLE_DATA+this.userData['userid'], inventory);
this.localStorageService.removeItem(MESSAGE_DETAIL_DATA_SENDLOOP+this.userData['userid']+this.userid);
});

}






}
/* */

}
}, 0);

//this.connection.onmessage = (event) => {}





var extra = this.connection.getExtraData(this.items.userid);
var inventory = this.localStorageService.getItem(PEOPLE_DATA+this.userData['userid']);
//Find index of specific object using findIndex method.    
var objIndex = inventory.findIndex((obj => obj.userid == this.items.userid));

this.statss = setInterval(() => { 
if(this.connection){
var extra = this.connection.getExtraData(this.items.userid);


var inventory = this.localStorageService.getItem(PEOPLE_DATA+this.userData['userid']);
//Find index of specific object using findIndex method.    
var objIndex = inventory.findIndex((obj => obj.userid == this.items.userid));


this.user.status =  inventory[objIndex].isOnly;
if(inventory[objIndex].isOnly == 'online'){ 

setTimeout(() => {

this.noofflinemssage = false; 

for (let item of this.chats) {
if(item.ctype == 'offline'){ 

if(inventory[objIndex].isOnly == 'online'){
item.ctype = 'online';
var encryption = sha1(this.user_encryption_token+this.userData['userid']+this.userid);
var messageCnt = this.encryptionLi(encryption, item.message, 'encrypting');
this.connection.send({
id: item.id,
message: messageCnt,
date: new Date(),
type: item.type,
name: this.userData['name'],
//avatar: this.userData['photo'],
avatar: '',
clock: this.time(),
reciveruserid: this.userid,
senderid: this.userData['userid'],
ctype: item.ctype,
g_type: "message"
});

this.localStorageService.setItem(MESSAGE_DETAIL_DATA+this.userid, this.cache);
}

}
}

}, 1000);


}
} }, 1000);

this.user = {
id: this.items.userid,
name: this.items.fullName,
image: this.items.photo,
last_message: "",
status: inventory[objIndex].isOnly
//status: this.items.isOnly
};


if(!this.localStorageService.getItem(MESSAGE_DETAIL_DATA+this.userid)){
this.localStorageService.setItem(MESSAGE_DETAIL_DATA+this.userid, [])
}

this.cache = this.localStorageService.getItem(MESSAGE_DETAIL_DATA+this.userid);
if(!this.cache){ this.cache = []; }

if(this.cache){
this.cachelegent = this.cache.length;

if(this.cachelegent <= 25){
this.chats = this.cache.slice(0,25);
} else {
this.chats = this.cache.slice(this.cachelegent-this.listloadnum,this.cachelegent);
}

if(this.cachelegent > 25){} else {this.loadmores = true;} 
} else {
this.loadmores = true;
}

setTimeout(() => {this.viebled = true;}, 650);


} else {
this.generalFunctions.navCtrlNR('/auth/login');
}

}

loadData(){
let xyOffset = <HTMLInputElement>document.getElementById('ionitemgenels');
var cacheoff = xyOffset.clientHeight;
setTimeout(() => {
if(this.cachelegent == this.chats.length){
this.loadmores = true;
} else {
this.listloadnum = this.listloadnum+25;
this.chats = this.cache.slice(this.cachelegent-this.listloadnum,this.cachelegent);
setTimeout(() => {
let yOffset = <HTMLInputElement>document.getElementById('items'+this.chats[0].id);
var rect = yOffset.getBoundingClientRect();
this.content.scrollToPoint(0, cacheoff-rect.top, 0);
}, 30);
if(this.cachelegent == this.chats.length){
this.loadmores = true;
} 
}
}, 10);
}

ionFocus(){
if(!this.scrolling){
setTimeout(() => {this.content.scrollToBottom(0);});
}
}

ionChange(){
if(this.messageControl.value){
if(this.user.status == 'offline' || !this.user.status){
this.noofflinemssage = true;
} else { this.noofflinemssage = false; }


this.connection.send({
date: new Date(),
name: this.userData['name'],
//avatar: this.userData['photo'],
avatar: '',
reciveruserid: this.userid,
senderid: this.userData['userid'],
g_type: "writer"
});

} else {
this.noofflinemssage = false;
}
}

async call(type){
var deceteds; var decenterAnimation; var decleaveAnimation; var decleaveparanet;

if (!this.platform.is('mobile')){
deceteds = 'pcandwebdesig nomusiccontrols calllives '+'calltype'+type;
decenterAnimation = '';
decleaveAnimation = '';
decleaveparanet = ';'
} else {
deceteds = 'nomusiccontrols calllives '+'calltype'+type;
decenterAnimation = MusicModalEnterAnimation;
decleaveAnimation = MusicModalLeaveAnimation;
//decleaveparanet = this.routerOutlet.nativeEl;
}

if(this.modal5){
this.modal5.dismiss({data: true}); 
this.modal5 = null;
} else {

this.modal5 = await this.modalCtrl.create({
component: CallPage,
componentProps: {
uuserid: this.userid,
type: type,
user_encryption_token: this.user_encryption_token,
user: this.user,
},
mode: 'ios',
cssClass: deceteds,
swipeToClose: false,
showBackdrop: true,
backdropDismiss: false,
enterAnimation: decenterAnimation,
leaveAnimation: decleaveAnimation,
presentingElement: decleaveparanet,
});


this.modal5.onDidDismiss().then(data => {
this.modal5 = null;
});

return await this.modal5.present();
}

}


async closeModal() {

if(this.modal3){
this.modal3.dismiss({data: true}); 
this.modal3 = null;
} else {

if(this.modal4){
this.modal4.dismiss({data: true}); 
this.modal4 = null;
if (!this.platform.is('mobile')){
var messagedetailmodals = document.getElementById('messagedetailmodals');
messagedetailmodals.classList.toggle('pwaprofileopenmessage');
}
} else {

const dataLength = this.chats.length;
this.modalCtrl.dismiss({data: true}); 

if(dataLength){
this.localStorageService.setItem('cacheitem', this.chats[dataLength - 1].message);
}
this.localStorageService.removeItem(MESSAGE_DETAIL_DATA_SENDLOOP+this.userData['userid']+this.userid);
clearInterval(this.updateMesages);
clearInterval(this.statss);
clearInterval(this.myTimer);
this.localStorageService.removeItem('checkaudios_'+this.userData['userid']+'_'+this.userid);
this.localStorageService.removeItem('checkphoto_'+this.userData['userid']+'_'+this.userid);


}

}

}

ionViewDidEnter() {
this.content.scrollToBottom(0);
}

ngOnDestroy(): void { 
if(this.modal3){
this.modal3.dismiss({data: true}); 
this.modal3 = null;
}

if(this.modal4){
this.modal4.dismiss({data: true}); 
this.modal4 = null;
}

const dataLength = this.chats.length;
if(dataLength){
this.localStorageService.setItem('cacheitem', this.chats[dataLength - 1].message);
}
this.localStorageService.removeItem(MESSAGE_DETAIL_DATA_SENDLOOP+this.userData['userid']+this.userid);
clearInterval(this.updateMesages);
clearInterval(this.statss);
clearInterval(this.myTimer);
this.localStorageService.removeItem('checkaudios_'+this.userData['userid']+'_'+this.userid);
this.localStorageService.removeItem('checkphoto_'+this.userData['userid']+'_'+this.userid);
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

ngAfterViewChecked(){
//your code to update the model
this.cdref.detectChanges();
}


/* Select Photo Render Pross */
async tumbImageLoad(image, type) {
let promise = new Promise((resolve, reject) => {
let resize;
let quality;

if(type == 'min'){
resize = 200;
quality = 0.2;
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


convertMonth(message){
if(!message.dataconverty){
var partsOfStr = message.newdata.split('.');

var news;
if(partsOfStr[1] == 0){ news = partsOfStr[1].replace("0", "01"); }
if(partsOfStr[1] == 1){ news = partsOfStr[1].replace("1", "02"); }
if(partsOfStr[1] == 2){ news = partsOfStr[1].replace("2", "03"); }
if(partsOfStr[1] == 3){ news = partsOfStr[1].replace("3", "04"); }
if(partsOfStr[1] == 4){ news = partsOfStr[1].replace("4", "05"); }
if(partsOfStr[1] == 5){ news = partsOfStr[1].replace("5", "06"); }
if(partsOfStr[1] == 6){ news = partsOfStr[1].replace("6", "07"); }
if(partsOfStr[1] == 7){ news = partsOfStr[1].replace("7", "08"); }
if(partsOfStr[1] == 8){ news = partsOfStr[1].replace("8", "09"); }
if(partsOfStr[1] == 9){ news = partsOfStr[1].replace("9", "10"); }
if(partsOfStr[1] == 10){ news = partsOfStr[1].replace("10", "11"); }
if(partsOfStr[1] == 11){ news = partsOfStr[1].replace("11", "12"); }

message.newdata = partsOfStr[0]+'.'+news+'.'+partsOfStr[2];
message.dataconverty = true;
return message.newdata;
}
}

}
