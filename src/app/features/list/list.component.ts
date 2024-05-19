
import { Component, OnInit, inject, signal } from '@angular/core';
import { ProductsService } from "../../shared/services/products.service"
import { IProduct } from '../../shared/interfaces/product.interface';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from "@angular/material/dialog"
import { MatButtonModule } from "@angular/material/button"
import { CardComponent } from './components/card/card.component';
import { Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';
import { ConfirnationDialogService } from '../../shared/services/confirnation-dialog.service';
import { NoItensComponent } from './components/no-itens/no-itens.component';

 
@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardComponent, RouterLink, MatButtonModule, NoItensComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit { 

  productService = inject(ProductsService)
  router = inject(Router)
  confirnationDialogService = inject( ConfirnationDialogService)

  productsSignal = signal<IProduct[]>([])

  constructor( ){ }

  ngOnInit (): void {
   this.getAllProducts()
  }

  private getAllProducts():void{
    this.productService.getAllProducts().subscribe({
      next: ( data: IProduct[])=> {
          this.productsSignal.set(data)           
      }, error: (error)=>{
        console.log("getAllProducts error", error)
      }
    })
  }

  onEdit(product: IProduct):void{     
    this.router.navigate(['/edit-product', product.id])
  }

  onDelete(product: IProduct):void{ 
    this.confirnationDialogService.openDialog() 
    .pipe( filter (answer => answer === true))      
      .subscribe({
        next: ()=> {
           this.delete(product)          
      }, error: (error)=>{
        console.log("Delete Product", error)
      }
      })
  }


  delete(product: IProduct){
    this.productService.delete(product.id).subscribe({
      next: (  )=> {
        this.getAllProducts()           
      }, error: (error)=>{
        console.log("Delete Error", error)
      }
    })
  }

}
