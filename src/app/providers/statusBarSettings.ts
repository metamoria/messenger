import { Injectable } from '@angular/core';
/*
import { Plugins, StatusBarStyle } from "@capacitor/core";
const { StatusBar } = Plugins;
*/
import { StatusBar, Style } from '@capacitor/status-bar';


@Injectable({providedIn: 'root'})
export class StatusBarSettings {

constructor() {}

/*this.statusBar.backgroundColorByHexString('#F0F0F0'); this.statusBar.styleDefault();*/
/*this.statusBar.backgroundColorByHexString('#202531'); this.statusBar.styleLightContent();*/
/*this.statusBar.backgroundColorByHexString('#292a2d'); this.statusBar.styleLightContent();*/

changeStatusBar(isStatusBarLight,isStatusBarColor) {
// Dark , Light
StatusBar.setStyle({
style : isStatusBarLight ? Style.Dark : Style.Light
});

// Color
StatusBar.setBackgroundColor ({
color : isStatusBarColor
});

// Display content under transparent status bar (Android only)
StatusBar.setOverlaysWebView({
overlay: false
});
}

changesetOverlaysWebViewOpen() {
// Display content under transparent status bar (Android only)
StatusBar.setOverlaysWebView({
overlay: true
});
}

changesetOverlaysWebViewClose() {
// Display content under transparent status bar (Android only)
StatusBar.setOverlaysWebView({
overlay: false
});
}

hideStatusBar() {
StatusBar.hide();
}

showStatusBar() {
StatusBar.show();
}

}