import { Component, inject } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IProduct } from '../../shared/interfaces/product.interface';
import { FormComponent } from '../../shared/components/form/form.component';
import { BackToListComponent } from '../../shared/components/back-to-list/back-to-list.component';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ FormComponent, BackToListComponent ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {

  productService = inject(ProductsService)
  matSnackBar = inject(MatSnackBar)
  router = inject(Router)

  onSubmit(product: IProduct):void{
    this.productService.post( product).subscribe(
      {
        next:()=>{
          this.handleOnSubmitSucess()
      },
      error:() =>{
        console.log("error")
      }
    });
  }

  private handleOnSubmitSucess():void{
    this.showMessage();
    this.navigatePreviousPage()
  }

  private showMessage():void{
    this.matSnackBar.open("Produto criado com sucesso.", 'Ok')
  }

  private navigatePreviousPage():void{
    this.router.navigateByUrl('/')
  }
}
