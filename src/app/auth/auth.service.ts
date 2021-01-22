import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { User } from './user.modules';
import { tap, take } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface AuthResponseData {
  kind: string,
  idToken: string,
  email:string,
  refreshToken:string,
  expiresIn:string,
  localId:string,
  registered?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private router: Router) {}
  private tokenInsperationTimer: any;
  user = new BehaviorSubject<User>(null);
  role = new BehaviorSubject<Boolean>(false);
  
  checkRole() {
    let id = null;
    this.user.subscribe( data => {
      if (data) {
        id = data.id;
      }
    })
    this.http.get('https://sfoh-00.firebaseio.com/users/'+id+'.json').subscribe(data => {
      if (data) { this.role.next(true)} else { this.role.next(false) };
    })
  }

  singIn(email,password) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB2PgT54DDHTAv8qR4TvvjsD21X9Pnx0fo',{
      email: email,
      password: password,
      returnSecureToken: true,
    }).pipe(tap( reqData => { 
      this.handleAuthentication ( reqData.email, reqData.localId, reqData.idToken, +reqData.expiresIn)
    }));
  }

  login(email:string,password:string){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB2PgT54DDHTAv8qR4TvvjsD21X9Pnx0fo', 
    {
      email: email,
      password: password,
      returnSecureToken: true
    }
    ).pipe(tap( resData => {
      this.handleAuthentication(resData.email,resData.localId,resData.idToken, +resData.expiresIn)
    }));
  }

  outoLogin () {
    const userData: { 
      email:string,
      id:string,
      _token:string,
      _tokenExpirantionDate:string
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) { return; }

    const loadedUser = new User (userData.email, userData.id, userData._token, new Date (userData._tokenExpirantionDate))
    
    if (loadedUser.token) {
      this.user.next(loadedUser);
      this.checkRole();
      const expirationDoration = new Date (userData._tokenExpirantionDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDoration);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenInsperationTimer) {
      clearTimeout(this.tokenInsperationTimer);
    }
    this.tokenInsperationTimer = null;
    this.role.next(false);
  }

  autoLogout(expirationDoration: number) {
    this.tokenInsperationTimer = setTimeout(() => {
      this.logout();
    }, expirationDoration);
  }

  private handleAuthentication (email:string, userId:string, token:string, expiresIn:number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn*1000 );
      const user = new User (email, userId, token, expirationDate);
      this.user.next(user);
      this.checkRole()
      this.autoLogout(expiresIn*1000);
      localStorage.setItem('userData', JSON.stringify(user));
  }
  
}
