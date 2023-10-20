import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class UserDataService {
    private userDataSubject = new BehaviorSubject< any >( null );

    setUserData( userData: any ) {
        this.userDataSubject.next( userData );
    }

    getUserData() {
        return this.userDataSubject.asObservable();
    }
}
