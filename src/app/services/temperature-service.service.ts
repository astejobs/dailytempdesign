import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TemperatureServiceService {

  constructor(private http: HttpClient) { }

  getReading() {
    return this.http.get('https://jsonplaceholder.typicode.com/posts')
  }
}
