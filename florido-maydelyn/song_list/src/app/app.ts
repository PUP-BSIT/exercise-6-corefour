import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SongList } from './song-list/song-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SongList],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('song_list');
}
