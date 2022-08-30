import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { LocalStorageService } from '../../../services/local-storage/local-storage.service';
import { GeneralFunctions } from '../../../providers/general-functions';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
export const SETTINGS = 'SETTINGS';

@Component({
selector: 'app-language',
templateUrl: './language.page.html',
styleUrls: ['./language.page.scss'],
})
export class LanguagePage implements OnInit {
langdata: any;
settings: any;
constructor(
public alertController: AlertController,
private localStorageService: LocalStorageService,
private generalFunctions: GeneralFunctions,
private modalCtrl: ModalController,
private translate: TranslateService
) {
}

langChange(row){
if(!row.lock && !row.loder){
row.loder = true;
setTimeout(()=> {
this.translate.setDefaultLang(row.code);
this.settings.language = row.code;
this.localStorageService.setItem(SETTINGS, this.settings);
row.loder = false;
},1000);
}
}

closeModal() {this.modalCtrl.dismiss();}
ionViewDidEnter(){
this.settings = this.localStorageService.getItem(SETTINGS);
this.langdata = [
{ id: "1", orgintitle: "English", title: "English", code: "en", lock: false  },
{ id: "2", orgintitle: "Pусский", title: "Russian", code: "ru", lock: false  },
{ id: "3", orgintitle: "Türkçe", title: "Turkish", code: "tr", lock: false  },
{ id: "4", orgintitle: "Azərbaycan", title: "Azerbaijan", code: "az", lock: true  },
{ id: "5", orgintitle: "Deutsche", title: "German", code: "de", lock: true  },
{ id: "6", orgintitle: "Português", title: "Portuguese", code: "pt", lock: true  },
{ id: "7", orgintitle: "简体中文", title: "Chinese Simplified", code: "zh", lock: true  },
{ id: "8", orgintitle: "日本語", title: "Japanese", code: "ja", lock: true  }
];
}
ngOnInit(): void {}
}
