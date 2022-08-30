import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface TextConfig {
alllist: any[];
}

@Injectable({providedIn: 'root'})
export class DataConfig {
data: TextConfig;

constructor(public http: HttpClient) { }

load(): Promise<TextConfig> {
if (this.data) { return of(this.data).toPromise(); }

return this.http.get('assets/data/config.json').pipe(
tap((data: TextConfig) => this.data = data)
).toPromise();
}

async getConf() {
return this.load().then((data) => {
return data.alllist[0].get;
});
}

}
