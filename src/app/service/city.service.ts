import { Injectable } from '@angular/core';
import { signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CityService {

  cities = signal<string[]>([]);

  addCity(city: string) {
    const trimmed = city.trim();
    if (!trimmed) return;

    const current = this.cities();
    if (!current.includes(trimmed)) {
      this.cities.set([...current, trimmed]);
    }
  }

  clearCities() {
    this.cities.set([]);
  }
}
