import { Component } from '@angular/core';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-saved-cities',
  templateUrl: './saved-cities.html',
  styleUrls: ['./saved-cities.css']
})
export class SavedCitiesComponent {
  savedCities: string[] = [];

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.savedCities = this.weatherService.getSavedCities();
  }
}
