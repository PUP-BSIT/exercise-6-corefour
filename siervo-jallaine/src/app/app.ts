import { Component, signal } from '@angular/core';
import { MovieWatchlistComponent } from './movie-watchlist/movie-watchlist';

@Component({
  selector: 'app-root',
  imports: [MovieWatchlistComponent],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('exercise_6');
}
