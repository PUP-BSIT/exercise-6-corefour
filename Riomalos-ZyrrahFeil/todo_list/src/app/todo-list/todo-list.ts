import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, 
    ValidatorFn } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

type Status = 'Not Started' | 'In Progress' | 'Done';
type ClassName = 'Advance Programming' | 'App Dev.' | 'DBA' | 'Mobile Dev' |
    'Project Management' | 'System Ad.';

export type TodoEntry = {
  taskName: string;
  classDetails: {
    className: ClassName;
    status: Status;
  };
  deadline: string;
};

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './todo-list.html',
  styleUrls: ['./todo-list.scss']
})
export class TodoListComponent {
  formBuilder = inject(FormBuilder);

  entriesSignal = signal<TodoEntry[]>([]);

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
      deadline: ['', [Validators.required, this.futureDateValidator()]],
    });
  }

  handleAdd(): void {
    if (this.todoForm.valid) {
      const entry: TodoEntry = this.todoForm.getRawValue();
      this.entriesSignal.update(list => [...list, entry]);

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

  futureDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const inputDate = new Date(value);

      if (inputDate < today) {
        return { pastDate: 'Deadline cannot be in the past.' };
      }

      return null;
    };
  }
}
