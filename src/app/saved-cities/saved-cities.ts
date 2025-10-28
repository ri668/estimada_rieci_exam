import { Component, OnInit } from '@angular/core';
import { Weather } from '../service/weather';

@Component({
  selector: 'app-saved-cities',
  template: `
    <div class="container">
      <h1>Saved Cities</h1>
      <table *ngIf="cities.length > 0">
        <tr>
          <th>City</th>
          <th>Country</th>
          <th>Temp (°C)</th>
          <th>Description</th>
          <th>Icon</th>
          <th>Remove</th>
        </tr>
        <tr *ngFor="let city of cities; let i = index">
          <td>{{ city.name }}</td>
          <td>{{ city.country }}</td>
          <td>{{ city.temperature }}</td>
          <td>{{ city.description }}</td>
          <td><img [src]="city.iconUrl" width="40" /></td>
          <td><button (click)="remove(i)">Remove</button></td>
        </tr>
      </table>

      <p *ngIf="cities.length === 0" style="text-align:center; color: gray;">
        No saved cities yet.
      </p>
    </div>
  `,
  styleUrls: ['./saved-cities.css']
})
export class SavedCities implements OnInit {
  cities: any[] = [];

  constructor(private weather: Weather) {}

  ngOnInit() {
    this.cities = this.weather.getSavedCities();
  }

  remove(index: number) {
    this.weather.removeCity(index);
    this.cities = this.weather.getSavedCities();
  }
}
