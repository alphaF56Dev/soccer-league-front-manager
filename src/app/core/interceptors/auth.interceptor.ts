import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, throwError } from "rxjs";

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
    const router = inject(Router);
    const token = sessionStorage.getItem("jwt");

    const isAuthEndPoint = req.url.includes('/users/auth');
    
    const authReq = token ? req.clone({setHeaders: {Authorization : `Bearer ${token}`}}) : req;

    return next(authReq).pipe(
        catchError(error => {
            //route to login if the backend give us 403 or 401
            if(error.status === 401 || error.status === 403 ){
                sessionStorage.removeItem('jwt');
                router.navigate(['/login']);
            }
            return throwError(()=>error);
        })
    )
}