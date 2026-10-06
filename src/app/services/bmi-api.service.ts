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

@Injectable({
  providedIn: 'root'
})

export class BmiApiService {

  private apiUrl = 'https://nessdrop.com/api/records';

  constructor(private http: HttpClient) {}

  // GET
  getRecords(limit: number = 30, user_id : number = 0) {
    return this.http.get<BmiRecord[]>(this.apiUrl, {
      params: {
        limit: limit,
        user_id : user_id
      }
    });
  }

  // POST
  addRecord(user_id:number, height: number, weight: number) {
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
  deleteRecord(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}