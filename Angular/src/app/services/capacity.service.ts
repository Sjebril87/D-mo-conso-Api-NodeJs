import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Capacity } from '../models/capacity/capacity.model';
import { newCapacity } from '../models/capacity/newCapacity.model';

@Injectable({
  providedIn: 'root'
})
export class CapacityService {


  constructor(
    private _client : HttpClient
  ) { }

  add(capacity: newCapacity){
    console.log(capacity);
    return this._client.post(`${environment.apiUrl}/capacity`, capacity);
  }

  getAll(){
    return this._client.get<Capacity[]>(`${environment.apiUrl}/capacity`);
  }

  getById(id : number) : Observable<Capacity[]>{
    return this._client.get<Capacity[]>(`${environment.apiUrl}/capacity/${id}`);
  }

  update(id: number, capacity: newCapacity){
    return this._client.put(`${environment.apiUrl}/capacity/${id}`, capacity);
  }

  delete(id : number){
    return this._client.delete(`${environment.apiUrl}/capacity/${id}`);
  }
}
