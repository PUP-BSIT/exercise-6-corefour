import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieWatchlistComponent } from './movie-watchlist';

describe('MovieWatchlistComponent', () => {
  let component: MovieWatchlistComponent;
  let fixture: ComponentFixture<MovieWatchlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieWatchlistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieWatchlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});