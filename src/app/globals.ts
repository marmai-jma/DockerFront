import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class Globals {
    userLogin: string;
    BACKEND_URL = 'http://localhost:8080';

    currrentUserSubj = new BehaviorSubject<string>(null);

    setCurrentUser(user : string){
        this.currrentUserSubj.next(user);
    }

    getCurrentUser(){
        return this.currrentUserSubj.asObservable();
    }
}
