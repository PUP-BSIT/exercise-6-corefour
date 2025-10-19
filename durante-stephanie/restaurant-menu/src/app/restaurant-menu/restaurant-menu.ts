import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

type MenuItem = {
  dishName: string;
  category: string;
  price: number;
  calories: number;
  type: string;
};

@Component({
  selector: 'app-restaurant-menu',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './restaurant-menu.html',
  styleUrls: ['./restaurant-menu.scss']
})
export class RestaurantMenu {
  menuForm: FormGroup;
  menuList = signal<MenuItem[]>([]);
  showWarning = signal(false);
  formTouched = signal(false);

  formBuilder = inject(FormBuilder);

  constructor() {
    this.menuForm = this.formBuilder.group({
      dishName: ['', [Validators.required]],
      category: ['', [Validators.required]],
      price: ['', [Validators.required]],
      calories: ['', [Validators.required]],
      type: ['', [Validators.required]]
    });
  }

  checkFields(): void {
    if (this.formTouched()) {
      this.showWarning.set(!this.menuForm.valid);
    }
  }

  addMenuItem(): void {
    this.formTouched.set(true);

    if (this.menuForm.invalid) {
      this.showWarning.set(true);
      return;
    }

    const newItem: MenuItem = this.menuForm.value as MenuItem;
    this.menuList.set([...this.menuList(), newItem]);

    this.menuForm.reset({
      category: '',
      type: ''
    });

    this.showWarning.set(false);
    this.formTouched.set(false);
  }
}
