import { Injectable } from '@angular/core';
import { Howl } from 'howler';
import { interval, SubscriptionLike, Subject, Observable } from 'rxjs';
import { Config } from '@ionic/angular';
import { tap } from 'rxjs/operators';

export interface PlayerConfiguration {
id: string;
image: string;
author?: string;
song?: string;
audio?: string;
}

export interface PlayerEventOptions {
id?: string;
image?: string;
author?: string;
song?: string;
isPlaying?: boolean;
isEnd?: boolean;
closed?: boolean;
closedid?: string;
duration?: number;
seek?: number;
volume?: number;
repeat?: boolean;
show?: boolean;
audio?: string;
}

export const initialPlayerEventOptions: PlayerEventOptions = {
id: '',
image: '',
isPlaying: false,
isEnd: false,
closed: true,
closedid: '',
duration: 0,
seek: 0,
volume: 1,
repeat: false,
show: false
};


@Injectable({
providedIn: 'root'
})
export class MusicController {
id: any;
isPlaying: any;

private player: Howl;

public options: PlayerEventOptions = initialPlayerEventOptions;

private playerCheckInterval = interval(1000);

public progress: Subject<PlayerEventOptions> = new Subject();
public onProgress: Observable<PlayerEventOptions> = this.progress.pipe(tap((options: PlayerEventOptions) => {
this.options = { ...this.options, ...options };
}));

private playerSubscriptions: SubscriptionLike[] = [];
constructor(
private config: Config
) { }

/**
* Play music function
*/
public playMusic(configuration: PlayerConfiguration) {
if (this.player) {
this.player.stop();
this.unsubscribePlayerEvents();
}

this.progress.next({ volume: 0.5, image: configuration.image, author: configuration.author, song: configuration.song, show: true, audio: configuration.audio, });


document.getElementsByTagName("body")[0].id = 'musicavible';

this.id = configuration.id;

this.player = new Howl({
//src: [`https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_1MG.mp3`],
//src: [`./assets/musics/5612785349.mp3`],
src:  [configuration.audio],
html5: this.config.get('mode') === 'ios',
volume: 0.5,


// onload: () => { },
onloaderror: () => {
this.abort();
},
onplayerror: () => {
this.abort();
},
onpause: () => {
this.isPlaying = false;
this.progress.next({ id: configuration.id, isPlaying: false });
this.unsubscribePlayerEvents();
},
// onvolume: () => { },
// onrate: () => { },
// onseek: () => { },
onplay: () => {
this.isPlaying = true;
// unsubscribe player events before start
this.unsubscribePlayerEvents();

// send music data
this.progress.next({
id: configuration.id,
isPlaying: true,
duration: this.player.duration(),
seek: +this.player.seek(),
volume: this.player.volume()
});

// subscribe to music playing events
this.playerSubscriptions.push(
this.playerCheckInterval.subscribe(() => {
// if not playing stop sending event
if (!this.options.isPlaying) {
return;
}

this.isPlaying = true;
// send music position
this.progress.next({ id: configuration.id, seek: +this.player.seek(), isPlaying: true });
})
);
},
onend: () => {
// if music repeat active, then play repeat
if (this.options.repeat) {
this.player.play();
} else {
this.isPlaying = false;
// unsubscribe and stop playing
this.unsubscribePlayerEvents();
this.progress.next({ id: configuration.id, isPlaying: false, isEnd: true, seek: +this.player.seek() });
}
}
});

this.player.play();
}

/**
* Toggle player function
* @param {boolean} pause
* @param {number} seek - music position
*/
public togglePlayer(pause: boolean, seek: number) {
if (pause) {
this.player.pause();
} else {
if (!this.options.isEnd) {
this.seek(seek);
}
this.player.play();
}
}

/**
* Music seek function
* @param {number} seek - music position
*/
public seek(seek: number) {
this.player.seek(this.player.duration() * (seek / 100));
}

/*
* Music value function
* @param {number} value - music valume
*/
public volumeOnOf(volume: number) {
var nvolume;
if(volume == 0){
nvolume = 0.5;
} else {
nvolume = 0;
}
this.player.volume(nvolume);
this.progress.next({ id: this.id, volume: nvolume, isPlaying: this.isPlaying });
}


/**
* Music value function
* @param {number} value - music valume
*/
public volume(volume: number) {
this.player.volume(volume);
this.progress.next({ id: this.id, volume: this.player.volume(), isPlaying: this.isPlaying });
}

/**
* Get player options (data)
*/
public getOptions(): PlayerEventOptions {
return this.options;
}

/**
* Music abort
*/
public abort() {

document.getElementsByTagName("body")[0].id = '';

this.player.unload();

this.options = initialPlayerEventOptions;

this.options.closedid = this.id;

this.progress.next(this.options);
this.unsubscribePlayerEvents();

this.id = '';
}

/**
* Seconds to time function
* for music player modal
*
* @param {number} seconds
*/
public secondsToTime(seconds: number) {
const h = Math.floor(seconds / 3600);
const m = Math.floor(seconds % 3600 / 60);
const s = Math.floor(seconds % 60);

const hms = [];
if (h) {
hms.push(h.toString().padStart(2, '0'));
hms.push(m.toString().padStart(2, '0'));
} else {
hms.push(m.toString());
}
hms.push(s.toString().padStart(2, '0'));

return hms.join(':');
}

public unsubscribePlayerEvents() {
this.playerSubscriptions.forEach(subscription => subscription.unsubscribe());
this.playerSubscriptions = [];
}

ngOnInit(): void { }

ngOnDestroy(): void {
this.unsubscribePlayerEvents();
}
}
