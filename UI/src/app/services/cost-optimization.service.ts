import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IPreferenceList, PreferenceList } from '../models/preference.model';
import { Observable } from 'rxjs';
import { IRequirements } from '../models/requirements.model';

@Injectable({
  providedIn: 'root'
})
export class CostOptimizationService {
  baseURL: string='http://127.0.0.1:5000/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin':'*'
    })
  };
  public solution: PreferenceList;
  constructor(private http:HttpClient) { }

sendRequirements(req:IRequirements): Observable<IPreferenceList> {
  const headers = { 'content-type': 'application/json','Access-Control-Allow-Origin': '*'}  
  const body=JSON.stringify(req);
  console.log(body)
  return this.http.post<IPreferenceList>(this.baseURL + 'optimized-solution', body,this.httpOptions)
}

}
