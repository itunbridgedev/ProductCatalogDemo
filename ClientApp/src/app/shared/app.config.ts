
import { Injectable } from "@angular/core";
import { environment } from './../../environments/environment';

@Injectable()
export class Configuration {
    constructor(){ 
    
    }
  
    webAPIServerUrl: string = environment.api.url;
};