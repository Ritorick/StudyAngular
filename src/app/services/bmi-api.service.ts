import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface BmiRecord {
  id: number;
  user_id: number;
  height: number;
  weight: number;
  bmi: number;
  created_at: string;
}

export interface LoginResponse {
  userId: string;
}

@Injectable({
  providedIn: 'root'
})

export class BmiApiService {

  private apiUrl = 'https://nessdrop.com/api/records';
  private loginUrl = 'https://nessdrop.com/api/login';
  private registerUrl = 'https://nessdrop.com/api/register';

  constructor(private http: HttpClient) {}

  // GET
  getRecords(limit: number = 30, user_id : string) {
    return this.http.get<BmiRecord[]>(this.apiUrl, {
      params: {
        limit: limit,
        user_id : user_id
      }
    });
  }

  // POST
  addRecord(user_id:string, height: number, weight: number) {
    console.log("addrecord");
    console.log({
      user_id: user_id,
      height: height,
      weight: weight
    });
    return this.http.post(this.apiUrl, {
      user_id: user_id,
      height: height,
      weight: weight
    });
  }

  // DELETE
  deleteRecord(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  login(username: string, password: string) {
    return this.http.post<LoginResponse>(this.loginUrl,{username: username,password: password});
  }
  register(username: string, password: string) {
    return this.http.post(this.registerUrl,{username: username,password: password});
  }
}
