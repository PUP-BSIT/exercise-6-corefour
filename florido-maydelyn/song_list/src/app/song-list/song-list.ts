import { Component, inject } from '@angular/core';
import { FormBuilder, 
        FormGroup, 
        Validators, 
        AbstractControl, 
        ValidationErrors, 
        ValidatorFn, 
        ReactiveFormsModule } from '@angular/forms';

function forbiddenWordValidator(word: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value?.toLowerCase() || '';
    return value.includes(word.toLowerCase())
      ? { forbiddenWord: `The title cannot contain the word "${word}".` }
      : null;
  };
}

@Component({
  selector: 'app-song-list',
  imports: [ReactiveFormsModule],
  templateUrl: './song-list.html',
  styleUrl: './song-list.scss'
})

export class SongList {
  private fb = inject(FormBuilder);

  songs: any[] = [];

  songForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, forbiddenWordValidator('test')]],
    artist: ['', Validators.required],
    genre: ['', Validators.required],
    year: [null, [Validators.required, Validators.min(1900), 
            Validators.max(new Date().getFullYear())]],
    favorite: [false]
  });

  get title() { return this.songForm.get('title'); }
  get artist() { return this.songForm.get('artist'); }
  get genre() { return this.songForm.get('genre'); }
  get year() { return this.songForm.get('year'); }

  addSong() {
    if (this.songForm.valid) {
      this.songs.push(this.songForm.value);
      this.songForm.reset({
        year: null,
        favorite: false
      });
    } else {
      this.songForm.markAllAsTouched();
    }
  }
}