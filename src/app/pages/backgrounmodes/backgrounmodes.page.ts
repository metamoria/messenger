import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { GeneralFunctions } from '../../providers/general-functions';
import { NavParams } from '@ionic/angular';

export const SESSION_KEY = 'SESSION';
export const SESSION_ALL_KEY = 'SESSION_ALL';
export const DEVECI_U_KEY = 'DEVECI_UID';
export const MESSAGE_DATA = 'MESSAGE_DATA_';


@Component({
selector: 'app-backgrounmodes',
templateUrl: './backgrounmodes.page.html',
styleUrls: ['./backgrounmodes.page.scss'],
})
export class BackgrounmodesPage implements OnInit {
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
this.connection = this.navParams.get('connection');
this.userid = this.localStorageService.getItem(SESSION_KEY)[0].userid;
}

closeModal() {
//this.modalCtrl.dismiss();
this.modalCtrl.dismiss({
data: true
});
}

ngOnDestroy(): void {}

ionViewDidEnter(){}
ionViewDidLeave() {}
ngOnInit(): void {}
}