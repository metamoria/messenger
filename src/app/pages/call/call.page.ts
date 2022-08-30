import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { NavParams } from '@ionic/angular';
import { GeneralFunctions } from '../../providers/general-functions';
import { Clipboard } from '@capacitor/clipboard';
import { StoryModalEnterAnimation, StoryModalLeaveAnimation, MusicModalEnterAnimation, MusicModalLeaveAnimation } from '../../app.animations';

import sha1 from "../../../assets/js/sha1.min";
import RTCMultiConnection from "../../../assets/js/RTCMultiConnection.min";
import { analyzeAndValidateNgModules } from '@angular/compiler';

import { DataConfig } from '../../providers/text-config';

export const SESSION_KEY = 'SESSION';
export const MESSAGE_DATA = 'MESSAGE_DATA_';
export const PEOPLE_DATA = 'PEOPLE_DATA_';

@Component({
selector: 'app-call',
templateUrl: './call.page.html',
styleUrls: ['./call.page.scss'],
})
export class CallPage implements OnInit {
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
uuserid:any;
type: any;
user_encryption_token: any;
connectionLive: any;
serverstatus: string = 'connecting';
streamid: any;
streamuserid: any;
mic_isveled: boolean = false;
socketurl: any;

constructor(
private modalCtrl: ModalController, 
private localStorageService: LocalStorageService,
public navParams : NavParams,
private generalFunctions: GeneralFunctions,
private platform: Platform,
private dataConfig: DataConfig
) { 
//this.connection = this.navParams.get('connection');
}

userdata(){
this.userData = this.localStorageService.getItem(SESSION_KEY)[0];
if(this.userData){
this.uuserid = this.navParams.get('uuserid');
this.user = this.navParams.get('user');
this.type = this.navParams.get('type');
this.user_encryption_token = this.navParams.get('user_encryption_token');

this.checkLiveCall(this.type);

}
}


async checkLiveCall(type){
var enchatvert = Number(this.userData['userid']+this.uuserid);
var encryptionkey = sha1(this.user_encryption_token+enchatvert);
var tokensheet = this.encryptionLi(encryptionkey, 'live_connet_token', 'encrypting');

this.webRtcConnetLiveCall(type,tokensheet);
}


async webRtcConnetLiveCall(type,roomkey){
this.connectionLive = new RTCMultiConnection();
this.connectionLive.enableLogs = false; // to disable logs
this.connectionLive.enableFileSharing = false;

// this line is VERY_important
this.connectionLive.socketURL = this.socketurl;

// if you want text chat
this.connectionLive.session = {
data: true,
video: false,
audio: false
};

// to make sure file-saver dialog is not invoked.
this.connectionLive.autoSaveToDisk = false;

if(this.userData['photo']){
var photo = this.userData['photo'];
} else {
var photo = "none";
}

if(this.userData['logintype'] == 'pwa'){
var logintypex = this.userData['logintype']+'+';
var ltypeis = 'pwa';
} else {
var logintypex = "";
var ltypeis = 'mobile';
}

this.connectionLive.extra = {
userid: this.userData['userid'],
fullName: this.userData['name'],
email: this.userData['email'],
password: this.userData['password'],
logintype: this.userData['logintype'],
photo: "none",
desc_status: this.userData['desc_status'],
};

this.connectionLive.onopen = (event) => { 
//console.log(event.extra.fullName + ' oadaya Katıldı');
if(event.extra.userid == this.uuserid){
this.serverstatus = 'yesconnect';
}
}

this.connectionLive.onmute = (e) => { 
console.log(e);
e.mediaElement.srcObject = null;
//e.mediaElement.setAttribute('poster', e.extra.photo);
e.mediaElement.setAttribute('poster', 'photo.jpg');
}

this.connectionLive.onunmute = (e) => { 
console.log(e);
e.mediaElement.srcObject = e.stream;
e.mediaElement.removeAttribute('poster');
}


this.connectionLive.onleave  = (event) => {
this.serverstatus = 'noconnect';
var connectmediayou = <HTMLElement>document.getElementById('connectmediayou');
var connectmediame = <HTMLElement>document.getElementById('connectmediame');
if(connectmediayou){ connectmediayou.innerHTML = ''; }
};



this.connectionLive.onclose = (event) => {
this.serverstatus = 'noconnect';
var connectmediayou = <HTMLElement>document.getElementById('connectmediayou');
var connectmediame = <HTMLElement>document.getElementById('connectmediame');
if(connectmediayou){ connectmediayou.innerHTML = ''; }
};

this.connectionLive.onstreamended = (event) => {
var connectmediayou = <HTMLElement>document.getElementById('connectmediayou');
var connectmediame = <HTMLElement>document.getElementById('connectmediame');

if (event.type === 'local') {

if(connectmediame){ connectmediayou.innerHTML = ''; }
}
if (event.type === 'remote') {
if(connectmediayou){ connectmediayou.innerHTML = ''; }
}

if(event.extra.userid == this.uuserid){
this.serverstatus = 'noconnect';
//in disconnet
var audioOfficsals = <HTMLAudioElement>document.getElementById("audioOfficsals");
if(audioOfficsals){
audioOfficsals.src = "assets/sound/disconnect-sound.mp3";
audioOfficsals.volume = 0.4;
setTimeout(() => { audioOfficsals.play(); }, 5);
}
}

}


this.connectionLive.onstream = (event) => { 
if(event.extra.userid == this.uuserid){
this.serverstatus = 'yesconnect';
}

this.streamid = event.streamid;
this.streamuserid = event.userid;

//in connet
var audioOfficsals = <HTMLAudioElement>document.getElementById("audioOfficsals");
if(audioOfficsals){
audioOfficsals.src = "assets/sound/connect-sound.mp3";
audioOfficsals.volume = 0.4;
setTimeout(() => { audioOfficsals.play(); }, 5);
}

var connectmediayou = document.getElementById('connectmediayou');
var connectmediame = document.getElementById('connectmediame');

if (event.type === 'local') {
if (event.stream.isVideo) { 
var createMediaVideo = event.mediaElement;
createMediaVideo.id = 'cvideo_-'+event.userid;
createMediaVideo.className = 'video-connadds';
createMediaVideo.controls = false;
createMediaVideo.muted = true;
createMediaVideo.poster = event.extra.avatar;
createMediaVideo.style = "width: 100%;height: 100%;background: black; object-fit: cover;";
connectmediame.appendChild(createMediaVideo);
connectmediame.style.display = 'flex';
}

if (event.stream.isAudio) {
var createMediaAudio = event.mediaElement;
createMediaAudio.id = 'caudio_-'+event.userid;
createMediaAudio.className = 'audip-connadds';
createMediaAudio.controls = false;
createMediaAudio.muted = true;
connectmediame.appendChild(createMediaAudio);
}
}


if (event.type === 'remote') {

if (event.stream.isVideo) {
var createMediaVideo = event.mediaElement;
createMediaVideo.id = 'cvideo_-'+event.userid;
createMediaVideo.className = 'video-connadds';
createMediaVideo.controls = false;
createMediaVideo.muted = false;
createMediaVideo.poster = event.extra.avatar;
createMediaVideo.style = "width: 100%;height: 100%;background: black; object-fit: cover;";
connectmediayou.appendChild(createMediaVideo);
connectmediayou.style.display = 'flex';
}

if (event.stream.isAudio) {
var createMediaAudio = event.mediaElement;
createMediaAudio.id = 'caudio_-'+event.userid;
createMediaAudio.className = 'audip-connadds';
createMediaAudio.controls = false;
createMediaAudio.muted = false;
connectmediayou.appendChild(createMediaAudio);
}
}


}

var roomid = roomkey;
this.connectionLive.socketMessageEvent = roomid; // secured rooms

//this.connectionLive.openOrJoin(roomid); // open or join
this.connectionLive.openOrJoin(roomid, (isRoomOpened, isRoomCreated, roomid, error) => {
if(error) { 
console.log(error); 
this.serverstatus = 'connecterror';
}
if(isRoomOpened === true) {
this.serverstatus = 'noconnect';

setTimeout(() => {
if(type == 'voice'){
this.connectionLive.mediaConstraints = {
audio: true,
video: false
};
this.connectionLive.addStream({video: false, audio: true});
console.log('voice');
}

if(type == 'video'){
this.connectionLive.mediaConstraints = {
audio: true,
video: true
};
this.connectionLive.addStream({video: true, audio: true});
console.log('video');
}
}, 500);

if (this.connectionLive.isInitiator === true) {
/* you opened the room*/
} else {
/* you joined it*/
}

}

});

}



mute(){
//var streamByUserId = this.connectionLive.streamEvents.selectFirst({ userid: this.streamuserid }).stream;
var streamByUserId = this.connectionLive.streamEvents.selectFirst({ local: true }).stream;

console.log(streamByUserId);
if(!this.mic_isveled){
streamByUserId.mute(); console.log('mute');
this.mic_isveled = true;
} else {
streamByUserId.unmute(); console.log('unmute');
this.mic_isveled = false;
}
}


async ngOnInit() {
let userData = this.localStorageService.getItem(SESSION_KEY);
if(userData){

await this.dataConfig.getConf().then((alllist) => {
this.socketurl = alllist.socketurl
});

await this.userdata();

}
}

closeModal() {
var connectmediayou = <HTMLElement>document.getElementById('connectmediayou');
var connectmediame = <HTMLElement>document.getElementById('connectmediame');
if(connectmediayou){ connectmediayou.innerHTML = ''; }
if(connectmediame){ connectmediame.innerHTML = ''; }

//this.connectionLive.disconnectWith(this.connectionLive.userid);

// stop all local cameras
this.connectionLive.attachStreams.forEach((localStream) => {
localStream.stop();
});


// close socket.io connection
this.connectionLive.closeSocket();

/*
var getStreamIds = this.streamid;
var getRemoteUserIds = this.streamuserid;

var stream = this.connectionLive.streamEvents[getStreamIds].stream;
stream.stop();

var singleUserStreams = this.connectionLive.getRemoteStreams(getRemoteUserIds);
var allUserStreams = this.connectionLive.getRemoteStreams();

this.connectionLive.disconnectWith(this.connectionLive.userid);
this.connectionLive.closeSocket();
this.connectionLive = null; 
*/

//in disconnet
var audioOfficsals = <HTMLAudioElement>document.getElementById("audioOfficsals");
if(audioOfficsals){
audioOfficsals.src = "assets/sound/disconnect-sound.mp3";
audioOfficsals.volume = 0.4;
setTimeout(() => { audioOfficsals.play(); }, 5);
}

setTimeout(() => {
this.modalCtrl.dismiss();
}, 150);
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


}
