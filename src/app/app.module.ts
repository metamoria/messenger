import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, metaReducers } from './shared/shared.state';
import { SettingsEffects } from './shared/ngrx/settings/settings.effects';
import { MusicEffects } from './shared/ngrx/music/music.effects';
import { SharedModule } from './shared/shared.module';
import { MusicPlayerComponent } from './shared/components/music-player/music-player.component';

import { SuperTabsModule } from '@ionic-super-tabs/angular';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';


@NgModule({
declarations: [
AppComponent,
MusicPlayerComponent
],
entryComponents: [
MusicPlayerComponent
],
imports: [
BrowserModule,
BrowserAnimationsModule,
HttpClientModule,
//IonicModule.forRoot(),

IonicModule.forRoot({
hardwareBackButton: true,
scrollPadding: false,
scrollAssist: false,
swipeBackEnabled: true
}),


/* NGX TRANSLATE */
TranslateModule.forRoot({
defaultLanguage: 'en',
loader: {
provide: TranslateLoader,
useFactory: (http: HttpClient) => new TranslateHttpLoader(http, './assets/i18n/', '.json'),
deps: [HttpClient]
}
}),

AppRoutingModule,
SharedModule,

/* NGRX */
StoreModule.forRoot(reducers, { metaReducers }),
EffectsModule.forRoot([
SettingsEffects,
MusicEffects
]),

SuperTabsModule.forRoot()
],
providers: [
ScreenOrientation,BackgroundMode,Vibration,
{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
],
bootstrap: [AppComponent]
})
export class AppModule { }