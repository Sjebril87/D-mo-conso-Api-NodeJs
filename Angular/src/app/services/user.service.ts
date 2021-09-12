import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NewUser } from '../models/user/newUser.model';
import { User } from '../models/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _client : HttpClient) { }

  add(user: NewUser){
    return this._client.post(`${environment.apiUrl}/user`, user);
  }

  getAll() : Observable<User[]>{
    return this._client.get<User[]>(`${environment.apiUrl}/user`);
  }

  getById(id:number){
    return this._client.get<User[]>(`${environment.apiUrl}/user/${id}`)
  }

  update(id: number, user: NewUser){
    return this._client.put(`${environment.apiUrl}/user/${id}`, user);
  }

  delete(id : number){
    return this._client.delete(`${environment.apiUrl}/user/${id}`);
  }
}
