import { Component, EventEmitter, OnInit, Output, input } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { IProduct } from '../../interfaces/product.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit{

  product = input<IProduct | null>(null) 

  @Output() done = new EventEmitter<IProduct>()

  form!: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl<string> (this.product()?.title ?? "", 
      { 
        nonNullable: true, 
        validators: Validators.required
      })  
    })
  }

  onSubmit():void{
    const product = this.form.value as IProduct
    this.done.emit(product)
  }

}
