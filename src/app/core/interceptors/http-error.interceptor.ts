import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ToastService } from '../services/toast.service';

export const httpErrorInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const toast = inject(ToastService);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 0) {
        toast.error('Network error — please check your internet connection.');
      } else if (error.status >= 400 && error.status <= 500) {
        toast.error(error.message);
      } else if (error.status >= 500) {
        toast.error('Server error. Please try again later.');
      } else {
        toast.error('An unexpected error occurred.');
      }
      return throwError(() => error);
    })
  );
};
