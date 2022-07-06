import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { exhaustMap, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { getToken } from '../auth/state/auth.selector';

@Injectable({
  providedIn: 'root',
})
export class AutTokenInterceptor implements HttpInterceptor {

    constructor(private store: Store<AppState>) {
        
    }
  intercept(req: HttpRequest<any>, next: HttpHandler
    ): Observable<HttpEvent<any>> {
     return  this.store.select(getToken).pipe(exhaustMap((token)=>{
        if(!token) {
            return next.handle(req);
        }
            const modifidReq = req.clone({
                params: req.params.append('auth',token)
            });
            return next.handle(modifidReq);
       
    }
     ));
  }
}
