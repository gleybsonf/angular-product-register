import { Component, Injectable, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, filter } from 'rxjs';
import { IProduct } from '../interfaces/product.interface';

@Component({
  selector: 'app-confirmation-dialog',
  template: `<h2 mat-dialog-title>Remover Produto</h2>
            <mat-dialog-content>
              Tem certeza que deseja remover este produto?
            </mat-dialog-content>
            <mat-dialog-actions align="end">
              <button mat-button  (click)="onNo()">Não</button>
              <button mat-raised-button  color="accent" (click)="onYes()" cdkFocusInitial>Sim</button>
            </mat-dialog-actions>
            `,
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
})

export class ConfirmationDialogComponent {
  
  matDialogRef = inject (MatDialogRef)

  onNo(){
    this.matDialogRef.close(false)
  }

  onYes(){
    this.matDialogRef.close(true)
  }
}

@Injectable({
  providedIn: 'root'
})

export class ConfirnationDialogService {

  matDialog = inject( MatDialog)
  constructor() { }

  openDialog(): Observable<boolean>{
   return  this.matDialog
      .open(ConfirmationDialogComponent)
      .afterClosed()
  }
   
}
