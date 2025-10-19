import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, 
    ValidatorFn } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

type Status = 'Not Started' | 'In Progress' | 'Done';
type ClassName = 'Advance Programming' | 'App Dev.' | 'DBA' | 'Mobile Dev' |
    'Project Management' | 'System Ad.';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './todo-list.html',
  styleUrls: ['./todo-list.scss']
})
export class TodoListComponent {
  formBuilder = inject(FormBuilder);

  classOptions: ClassName[] = ['Advance Programming', 'App Dev.', 'DBA',
      'Mobile Dev', 'Project Management', 'System Ad.'];
  statusOptions: Status[] = ['Not Started', 'In Progress', 'Done'];

  todoForm: FormGroup;

  constructor() {
    this.todoForm = this.formBuilder.group({
      taskName: ['', {
        validators: [Validators.required, this.minTaskLength(8)],
        updateOn: 'blur'
      }],
      classDetails: this.formBuilder.group({
        className: ['', [Validators.required]],
        status: ['', [Validators.required]],
      }),
      deadline: ['', [Validators.required]],
    });
  }

  handleAdd(): void {
    if (this.todoForm.valid) {
      console.log('Valid form data:', this.todoForm.getRawValue());
      this.todoForm.reset({
        taskName: '',
        classDetails: { className: '', status: '' },
        deadline: '',
      });
    } else {
      this.todoForm.markAllAsTouched();
    }
  }

  get taskNameControl() { return this.todoForm.get('taskName')!; }

  get deadlineControl() { return this.todoForm.get('deadline')!; }

  get classDetailsControl() {
    return this.todoForm.get('classDetails') as FormGroup; }

  get classNameControl() { return this.classDetailsControl.get('className')!; }
  
  get statusControl() { return this.classDetailsControl.get('status')!; }

  minTaskLength(min: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const task = control.value as string;
      if (task && task.trim().length < min) {
        return { minTaskLength:
          `Task Name must be descriptive (at least ${min} characters).` }; }
      return null;
    };
  }
}
