import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';

@Component({
selector: 'app-fullphoto',
templateUrl: './fullphoto.page.html',
styleUrls: ['./fullphoto.page.scss'],
})
export class FullPhotoPage implements OnInit {
photo: any;
viseble: boolean = false;

constructor(
public alertController: AlertController,
private modalCtrl: ModalController,
public navParams : NavParams
) {
this.photo = this.navParams.get('photo');
setTimeout(() => {
this.viseble = true;
}, 650); 
}

closeModal() {
this.modalCtrl.dismiss({
data: true
});
}

ngOnDestroy(): void {}

ionViewDidEnter(){}
ionViewDidLeave() {}
ngOnInit(): void {}
}