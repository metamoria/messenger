import { Injectable } from '@angular/core';
import { LocalStorageService } from '../services/local-storage/local-storage.service';

@Injectable({providedIn: 'root'})
export class AppCacheData {

constructor(private localStorageService: LocalStorageService) {}

cacheFeedDateWrite(reData,typename,uid){
if(reData){
this.localStorageService.removeItem(typename+'_uid_'+uid);	
//this.localStorageService.setItem(typename+'_uid_'+uid, JSON.stringify(reData));
this.localStorageService.setItem(typename+'_uid_'+uid, reData);
}
}

cacheFeedDateRead(typename,uid){
var datafeee = this.localStorageService.getItem(typename+'_uid_'+uid);
//var datafeee = JSON.parse(this.localStorageService.getItem(typename+'_uid_'+uid));
return (datafeee);
}

setTimeCacheWritefeed(timeObjectCac,typename,uid){
if(!this.localStorageService.getItem('setTime_'+typename+'_uid_'+uid)){
this.localStorageService.setItem('setTime_'+typename+'_uid_'+uid, timeObjectCac);
}
var rwiterTimeOut = this.localStorageService.getItem('setTime_'+typename+'_uid_'+uid);
var newResult = rwiterTimeOut;
return newResult;
}

realNowSetTime(){	
var rdate = new Date(); /* Date */
var hours = rdate.toLocaleTimeString() /* 18:41:65 */
var dateee = rdate.toLocaleString() /* 11.07.2020 12:05:30 */
var shorTime = Math.round(rdate.getTime() / 1000); /* 1594458724171 */
return shorTime;
}

realSetTimeNexty(ttime){	
var currentTime2 = new Date();
currentTime2.setSeconds(currentTime2.getSeconds() + ttime); /* +10 Ekle */
var hours = currentTime2.toLocaleTimeString(); /* 18:41:65 */
var dateee = currentTime2.toLocaleString(); /* 11.07.2020 12:05:30 */
var shorTime = Math.round(currentTime2.getTime() / 1000); /* 1594458724171 */
return shorTime;
}

}