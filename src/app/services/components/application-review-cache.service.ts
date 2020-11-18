import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApplicationDetails } from 'src/app/models/application-details';

@Injectable({
  providedIn: 'root'
})
export class ApplicationReviewCacheService {

  constructor() { }

  private _originalApplication$: BehaviorSubject<ApplicationDetails> = new BehaviorSubject(null);

  set originalApplication(application: ApplicationDetails) {
    this._originalApplication$.next(application);
  }

  get originalApplication$(): Observable<ApplicationDetails> {
    return this._originalApplication$.asObservable();
  }

}
