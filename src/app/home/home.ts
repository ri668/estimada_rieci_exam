import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Weather } from '../service/weather';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  standalone: false,
  template: `
    <div class="container">
      <h1>Weathering App</h1>
      <input type="text" [(ngModel)]="input" placeholder="Enter city name" />
      <button (click)="fetchWeather()">Get Weather</button>
    </div>

    <div *ngIf="getWeatherData" class="weather-info">
      <h2>
        Weather in {{ getWeatherData.location.name }},
        {{ getWeatherData.location.country }}
      </h2>
      <p>Temperature: {{ getWeatherData.current.temperature }}°C</p>
      <p>Weather: {{ getWeatherData.current.weather_descriptions.join(', ') }}</p>
      <img [src]="getWeatherData.current.weather_icons[0]" alt="Weather Icon" />
      <p>Wind Speed: {{ getWeatherData.current.wind_speed }}</p>
      <br />
      <button (click)="save()">Save</button>
    </div>

    <div *ngIf="!getWeatherData && input" style="color: red; text-align: center; margin-top: 20px;">
      Invalid city name or unable to fetch data.
    </div>

    <div class="saved-table" *ngIf="weatherData.length > 0">
      <h2>Saved Weather Data</h2>
      <table>
        <tr>
          <th>City</th>
          <th>Country</th>
          <th>Temp (°C)</th>
          <th>Description</th>
          <th>Icon</th>
          <th>Remove</th>
        </tr>
        <tr *ngFor="let data of weatherData; let i = index">
          <td>{{ data.name }}</td>
          <td>{{ data.country }}</td>
          <td>{{ data.temperature }}</td>
          <td>{{ data.description }}</td>
          <td><img [src]="data.iconUrl" width="40" /></td>
          <td><button (click)="remove(i)">Remove</button></td>
        </tr>
      </table>
    </div>
  `,
  styleUrls: ['./home.css']
})
export class Home {
  constructor(private weather: Weather) {}

  input = '';
  getWeatherData: any = null;
  weatherData: any[] = [];

  fetchWeather() {
    if (!this.input.trim()) {
      this.getWeatherData = null;
      return;
    }

    this.weather.getWeather(this.input).then(data => {
      this.getWeatherData = data;
    });
  }

  save() {
    if (this.getWeatherData) {
      const saved = {
        name: this.getWeatherData.location.name,
        country: this.getWeatherData.location.country,
        temperature: this.getWeatherData.current.temperature,
        description: this.getWeatherData.current.weather_descriptions[0],
        iconUrl: this.getWeatherData.current.weather_icons[0],
        windSpeed: this.getWeatherData.current.wind_speed,
      };

      this.weather.saveCity(saved);
      this.weatherData.push(saved);
    }
  }

  remove(index: number) {
    this.weatherData.splice(index, 1);
  }
}
