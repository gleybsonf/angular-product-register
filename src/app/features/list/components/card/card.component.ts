import { Component, EventEmitter, Output, computed, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { IProduct } from '../../../../shared/interfaces/product.interface';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

  product  = input.required<IProduct>()

  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();

  productTitle = computed( ()=> this.product().title)

  onEdit():void{
    this.edit.emit()
  }

  onDelete():void{
    this.delete.emit()
  }

}
