import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

  savedCities: string[] = [];

  constructor(private http: HttpClient) {}

  // Get weather data from OpenWeatherMap API
  getWeather(city: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?q=${city}&appid=${this.apiKey}&units=metric`);
  }

  // Save searched city to the list
  saveCity(city: string): void {
    if (!this.savedCities.includes(city)) {
      this.savedCities.push(city);
    }
  }

  // Get list of saved cities
  getSavedCities(): string[] {
    return this.savedCities;
  }
}
