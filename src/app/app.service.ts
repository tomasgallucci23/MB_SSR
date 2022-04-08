import { Injectable } from '@angular/core';
import {environment} from '../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class AppService {
  url: string = environment.urlBase

  constructor() {
   }

   downloadVCF(){
    window.location.assign("https://estudiojuridicomb.com.ar/vCardM")
   }
}
