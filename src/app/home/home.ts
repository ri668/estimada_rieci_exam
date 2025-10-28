import { Component } from '@angular/core';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent {
  city: string = '';
  weatherData: any = null;
  errorMessage: string = '';

  constructor(private weatherService: WeatherService) {}

  searchWeather(): void {
    if (this.city) {
      this.weatherService.getWeather(this.city).subscribe(
        data => {
          this.weatherData = data;
          this.errorMessage = '';
          this.weatherService.saveCity(this.city);  // Save the city to the list
        },
        error => {
          this.errorMessage = 'City not found or invalid';
          this.weatherData = null;
        }
      );
    }
  }
}
