import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
name: 'safe'
})

export class CDVPipes implements PipeTransform {	
constructor(private sanitizer: DomSanitizer) {}		
transform(url: string) {
//return url.startsWith('blob:') || url.startsWith('data:') ? this.sanitizer.bypassSecurityTrustUrl(url) : url;
return this.sanitizer.bypassSecurityTrustUrl(url);
}

}