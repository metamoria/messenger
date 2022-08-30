import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, MenuController, LoadingController, ModalController } from '@ionic/angular';

import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

import { Store, select } from '@ngrx/store';
import { selectTheme, selectSettingsLanguage } from './shared/ngrx/settings/settings.selectors';

import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription, SubscriptionLike } from 'rxjs';
import { actionSettingsChangeTheme } from './shared/ngrx/settings/settings.actions';

import { map, take } from 'rxjs/operators';

import { LocalStorageService } from './services/local-storage/local-storage.service';
export const DEVECI_U_KEY = 'DEVECI_UID';

import { StatusBarSettings } from './providers/statusBarSettings';

import { SplashScreen } from '@capacitor/splash-screen';

import { Keyboard } from '@capacitor/keyboard';
import { Input, ElementRef, Renderer2 } from '@angular/core';

import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

import { IonRouterOutlet } from '@ionic/angular';


const APP_DIRECTORY_D = Directory.Documents;
const APP_DIRECTORY_C = Directory.Cache;
const APP_DIRECTORY_E = Directory.External;
const APP_DIRECTORY_ES = Directory.ExternalStorage;

const APP_DIR_MAIN_FOLDER = "omany-messenger";
const APP_DIR_AUDIO_FOLDER = "omany-audio";
const APP_DIR_PHOTO_FOLDER = "omany-photo";


import { Howl } from 'howler';
import { MusicController, PlayerEventOptions, initialPlayerEventOptions } from './services/music-controller/music-controller.service';
import { MusicPlayerComponent } from './shared/components/music-player/music-player.component';

import { StoryModalEnterAnimation, StoryModalLeaveAnimation, MusicModalEnterAnimation, MusicModalLeaveAnimation } from './app.animations';

export const SESSION_KEY = 'SESSION';
export const CHAT_DIZAYN = 'CHAT_DIZAYN';
export const CHAT_DIZAYN_COLOR = 'CHAT_DIZAYN_COLOR';

import { BackgroundMode } from '@ionic-native/background-mode/ngx';

import { Device } from '@capacitor/device';
//import { Capacitor } from "@capacitor/core";
import { Vibration } from '@ionic-native/vibration/ngx';

declare var cordova;

import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

@Component({
selector: 'app-root',
templateUrl: './app.component.html',
styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
theme$: Observable<boolean>;
apppwaalls: string = '';
isCameraStart = false;


player: Howl = null;
isPlaying = false;
progress = 0;
music: PlayerEventOptions = initialPlayerEventOptions;

@ViewChild(IonRouterOutlet, { static : true }) routerOutlet: IonRouterOutlet;
userData: any;
statss: any;

private subscriptions: SubscriptionLike[] = [];
private orientationSubscription: Subscription;
constructor(
private platform: Platform,
private screenOrientation: ScreenOrientation,
private router: Router,
private translate: TranslateService,
private store: Store,
private menu: MenuController,
public loadingController: LoadingController,
private localStorageService: LocalStorageService,
public statusBarSettings: StatusBarSettings,
public renderer: Renderer2,
private modalController: ModalController,
private musicController: MusicController,
private backgroundMode: BackgroundMode,
private vibration: Vibration
) {
}

async qrStartScan(event) {

// check or request permission
const status = await BarcodeScanner.checkPermission({ force: true });

if (status.granted) {
// the user granted permission

this.isCameraStart = true; 
BarcodeScanner.hideBackground(); // make background of WebView transparent
const result = await BarcodeScanner.startScan(); // start scanning and wait for a result
// if the result has content
if (result.hasContent) {
console.log(result.content); // log the raw scanned content

var partsOfStr = await result.content.split(',');
console.log(partsOfStr[0]); //userid
console.log(partsOfStr[1]); //token
console.log(partsOfStr[2]); //event

//pwa login control
if(partsOfStr[2] == "pwa_login_control" && partsOfStr[1]){ 
this.localStorageService.setItem('qrscandata', await result.content);
} else {
//error
}

this.vibration.vibrate(400);
this.isCameraStart = false;
this.menu.close('camera');
}

} else {

const status = await BarcodeScanner.checkPermission();

if (status.denied) {
// the user denied permission for good
// redirect user to app settings if they want to grant it anyway
const c = confirm(
'If you want to grant permission for using your camera, enable it in the app settings.',
);
if (c) {
BarcodeScanner.openAppSettings();
}
}

}
}

async qrStopScan(event) {
this.isCameraStart = false;
BarcodeScanner.showBackground();
BarcodeScanner.stopScan();
}

qrStopScanx(event){
this.menu.close('camera');
}

/**
 * Toggle music play/pause
 */
toggleMusic() {
this.musicController.togglePlayer(this.music.isPlaying, (this.music.seek / this.music.duration) * 100);
}
toggleVolume() {
this.musicController.volumeOnOf(this.music.volume);
}
    

/**
 * Close music player
*/
closePlayer() {
this.userdate();
setTimeout(() => {
this.musicController.abort();
this.localStorageService.setItem('playingSongType'+this.userData['userid'], 'stop');
}, 100);
}

/**
 * Open music modal
 */
async openMusicModal(event: Event) {

var deceteds; var decenterAnimation; var decleaveAnimation; var decleaveparanet;

if (!this.platform.is('mobile')){
deceteds = 'newpwathemsmusic pcandwebdesig newpwathemsmusic';
decenterAnimation = '';
decleaveAnimation = '';
decleaveparanet = ';'
} else {
deceteds = 'modal-show-black-drop max-modal-show-black-drop music-modal';
decenterAnimation = MusicModalEnterAnimation;
decleaveAnimation = MusicModalLeaveAnimation;
decleaveparanet = await this.modalController.getTop();
}

//music-modal

event.stopPropagation();
event.preventDefault();

const modal = await this.modalController.create({
component: MusicPlayerComponent,
componentProps: {
music: this.music
},
mode: 'ios',
cssClass: deceteds,
swipeToClose: true,
showBackdrop: true,
backdropDismiss: true,
enterAnimation: decenterAnimation,
leaveAnimation: decleaveAnimation,
presentingElement: decleaveparanet || this.routerOutlet.nativeEl,
});
return await modal.present();
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

/**
* App init
*/
async initializeApp() {

this.defaultLang();

if (!this.platform.is('mobile')){
this.apppwaalls = 'apppwaalls';
}

this.theme$ = this.store.pipe(select(selectTheme));

if(!this.localStorageService.getItem(DEVECI_U_KEY)){
this.localStorageService.setItem(DEVECI_U_KEY, this.makerandid(10))
}

//this.platform.ready().then(() => {});
//if(this.platform.is('cordova')){}

//if (Capacitor.isNative) {  }
const info = await Device.getInfo();

//console.log(info.platform);
if (info.platform !== 'web') {


this.statusBars();

SplashScreen.hide();
this.screenOrientation.unlock();

/* Automatically Calculate Keyboard Height */
var ionapp = (<HTMLInputElement>document.getElementById("ionapps")); 

//if (this.platform.is('cordova')){}

Keyboard.addListener('keyboardWillShow', info => {
this.renderer.setStyle(ionapp, 'margin-bottom', info.keyboardHeight+'px');
/*
var clipsFooterComments = (<HTMLInputElement>document.getElementById("clipsFooterComments")); 
if(clipsFooterComments){
this.renderer.setStyle(clipsFooterComments, 'margin-bottom', info.keyboardHeight+'px');
}

var gccc = document.getElementsByClassName("genel-content-comments-clips")[0];
if(gccc){
this.renderer.setStyle(gccc, 'height', '100%');
}
*/
});

Keyboard.addListener('keyboardDidHide', () => {
this.renderer.setStyle(ionapp, 'margin-bottom', '0px');
/*
var clipsFooterComments = (<HTMLInputElement>document.getElementById("clipsFooterComments")); 
if(clipsFooterComments){
this.renderer.setStyle(clipsFooterComments, 'margin-bottom', '0px');
}

var gccc = document.getElementsByClassName("genel-content-comments-clips")[0];
if(gccc){
this.renderer.setStyle(gccc, 'height', '66%');
}
*/

});


/*
const options = {
id: -1,
title: 'My App',
text: 'Running in Background Mode',
hidden: false,
silent: false,
sticky: true,
resume: false,
foreground: true,
};

await cordova.plugins.backgroundMode.setDefaults(options);
await cordova.plugins.backgroundMode.enable();

setTimeout(() => {
cordova.plugins.backgroundMode.on('activate', () => {
this.vibration.vibrate(400);
cordova.plugins.backgroundMode.disableWebViewOptimizations();
console.log('background mode activate !!!');
this.sleep();
});
}, 1000);
*/

//this.backgroundMode.enable();
/*
this.backgroundMode.overrideBackButton();
this.backgroundMode.moveToBackground();
this.backgroundMode.excludeFromTaskList();
this.backgroundMode.setDefaults({ silent: true });
*/

/*
// Turn screen on
this.backgroundMode.wakeUp();
// Turn screen on and show app even locked
this.backgroundMode.unlock();
*/

/*
const timer = 4*60*1000; // four minutes

if(this.statss){
clearInterval(this.statss);
}

this.statss = setInterval(() => { 
//this.backgroundMode.wakeUp();
//this.backgroundMode.moveToForeground();
},timer);
*/

/*
this.backgroundMode.on('activate').subscribe(()=>{
this.vibration.vibrate(1000);
this.backgroundMode.disableWebViewOptimizations(); 
this.backgroundMode.disableBatteryOptimizations(); 
cordova.plugins.backgroundMode.disableWebViewOptimizations(); 
cordova.plugins.backgroundMode.disableBatteryOptimizations();

this.statss = setInterval(() => { 
this.backgroundMode.wakeUp();
this.backgroundMode.moveToForeground();
},5000);

});

this.backgroundMode.on("deactivate").subscribe(()=>{
this.vibration.vibrate(1000);
clearInterval(this.statss);
});

*/

}

this.createDir(APP_DIR_MAIN_FOLDER);
setTimeout(() => {
this.createDir(APP_DIR_MAIN_FOLDER+'/'+APP_DIR_AUDIO_FOLDER);
this.createDir(APP_DIR_MAIN_FOLDER+'/'+APP_DIR_PHOTO_FOLDER);
}, 100);
}



/*
sleepPromise(ms){
return new Promise(resolve => setTimeout(resolve, ms));
}

async sleep(){
while(true){
// do something
const timer = 3*60*1000; 
await this.sleepPromise(timer);   // Sleep desired amount of miliseconds
// break if needed
console.log('I have awakend.');
cordova.plugins.backgroundMode.wakeUp();
cordova.plugins.backgroundMode.moveToForeground();
this.vibration.vibrate(500);
}
}

*/




/*StatusBar*/
async statusBars(){
this.statusBarSettings.changesetOverlaysWebViewClose();
const isDark = await this.store.pipe(select(selectTheme), take(1)).toPromise();
if(!isDark){ this.statusBarSettings.changeStatusBar('','#ffffff'); } 
if(isDark){ this.statusBarSettings.changeStatusBar('styleLightContent','#000000'); }
}

/*Lang*/
async defaultLang(){
var lang: string = await this.store.pipe(select(selectSettingsLanguage), take(1)).toPromise();
if(lang){
this.translate.setDefaultLang(lang);
} else {
this.translate.setDefaultLang('en');
}
}

/*** Theme toggle */
async toggleDarkTheme() {
const isDark = await this.store.pipe(select(selectTheme), take(1)).toPromise();
this.store.dispatch(actionSettingsChangeTheme({ isDark: !isDark }));
}

/*** Navigate to settings page */
async goToSettings() {
const loading = await this.loadingController.create();
await loading.present().then(() => {
this.menu.close().then(() => {
this.router.navigateByUrl('/settings').then(async () => {
await loading.dismiss();
});
});
});
}

makerandid(length) {
var result           = [];
var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
var charactersLength = characters.length;
for ( var i = 0; i < length; i++ ) {
result.push(characters.charAt(Math.floor(Math.random() * 
charactersLength)));
}
return result.join('');
}

userdate(){
if(this.localStorageService.getItem(SESSION_KEY)){
this.userData = this.localStorageService.getItem(SESSION_KEY)[0];
}
}

ngOnInit() {
this.initializeApp(); 

// Subscribe to music events
this.subscriptions.push(
this.musicController.onProgress.subscribe((res) => {
this.music = { ...this.music, ...res };
this.progress = +(this.music.seek / this.music.duration);

if(res.closed){
if(document.getElementById('musicpross'+res.closedid)){
var musicpross: any = <HTMLElement>document.getElementById('musicplaypaueicon'+res.closedid);
musicpross.name = 'play';
}
}

if(document.getElementById('musicpross'+res.id)){
var pross: any = <HTMLElement>document.getElementById('musicpross'+res.id);
pross.value = this.progress;
pross.type = '';
}

if(document.getElementById('musicplaypaueicon'+res.id)){
var musicpross: any = <HTMLElement>document.getElementById('musicplaypaueicon'+res.id);
if(res.isPlaying){
musicpross.name = 'pause';
} else {
musicpross.name = 'play';
}

musicpross.onclick = ()=>{
this.toggleMusic();
}

}

/*
if(document.getElementById('musicplayvolumeicon'+res.id)){
var musicplayvolumeicon: any = <HTMLElement>document.getElementById('musicplayvolumeicon'+res.id);
if(res.volume <= 0.5){
musicplayvolumeicon.name = 'volume-low';
}

if(res.volume == 0){
musicplayvolumeicon.name = 'volume-mute';
} 

if(res.volume > 0.5){
musicplayvolumeicon.name = 'volume-high';
}

musicplayvolumeicon.onclick = ()=>{
this.toggleVolume();
}
musicplayvolumeicon = '';
}
*/

})
);
}

ngOnDestroy(): void {
this.subscriptions.forEach(subscription => subscription.unsubscribe());
this.subscriptions = [];
}
}
