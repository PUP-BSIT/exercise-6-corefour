import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule }
    from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface WatchlistItem {
  title: string;
  type: 'Movie' | 'TV Show';
  genre: string;
  platform?: string;
  watched: boolean;
}

@Component({
  selector: 'app-movie-watchlist',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './movie-watchlist.html',
  styleUrls: ['./movie-watchlist.scss']
})
export class MovieWatchlistComponent implements OnInit {
  watchlistForm!: FormGroup;
  watchlistItems: WatchlistItem[] = [];
  genreOptions = ['Action', 'Comedy', 'Drama', 'Sci-Fi', 'Horror', 'Fantasy'];
  typeOptions = ['Movie', 'TV Show'];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.watchlistForm = this.fb.group({
      title: ['', Validators.required],
      type: ['Movie', Validators.required],
      genre: ['Action', Validators.required],
      platform: [''],
      watched: [false]
    });
  }

  addItem(): void {
    if (this.watchlistForm.invalid) {
      return;
    }

    this.watchlistItems.unshift(this.watchlistForm.value);

    this.watchlistForm.reset({
      title: '',
      type: 'Movie',
      genre: 'Action',
      platform: '',
      watched: false
    });
  }
}