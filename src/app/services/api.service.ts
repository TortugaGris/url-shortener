import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, firstValueFrom, map, Observable, of } from 'rxjs';
import { Link, LinkSchema } from '../models/link.interface';
import { collection, collectionData, Firestore, orderBy, query } from '@angular/fire/firestore';

export interface CreateShortLinkResponse {
  linkId: string;
}

export interface AddClickResponse {
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private _http: HttpClient,
    private _firestore: Firestore,
  ) { }

  createShortLink(url: string): Promise<string> {
    return firstValueFrom(this._http.post<CreateShortLinkResponse>(environment.apiUrl + '/short-link', {
      url,
    }).pipe(
      map((obj) => obj.linkId),
      catchError((e, caught) => {
        console.error(e);
        return caught;
      }),
    ));
  }

  watchLinks(): Observable<Link[]> {
    const linksRef = collection(this._firestore, 'links');
    return collectionData(query(linksRef, orderBy('createdAt', 'desc')), {idField: 'id'}).pipe(
      catchError((error) => {
        console.error('Error fetching data:', error);
        return of([]);
      }),
      map((data) => data.map((link) => LinkSchema.parse(link))),
    );
  }

  addClick(linkId: string): Promise<string> {
    return firstValueFrom(this._http.post<AddClickResponse>(environment.apiUrl + '/click', {
      linkId,
    }).pipe(
      map((obj) => obj.url),
    ));
  }
}
