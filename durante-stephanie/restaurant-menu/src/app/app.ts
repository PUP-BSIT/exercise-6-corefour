import { Component, signal } from '@angular/core';
import { RestaurantMenu } from './restaurant-menu/restaurant-menu';

@Component({
  selector: 'app-root',
  imports: [RestaurantMenu],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('restaurant-menu');
}
