import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../interfaces/product.interface'
import { Observable } from 'rxjs';
import { ProductPayload } from '../interfaces/payload-product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private httpClient = inject(HttpClient)

  constructor() { }

  //npx json-server db.json   
  public getAllProducts(): Observable< IProduct[]> {
    return this.httpClient.get<IProduct[]>('/api/products')
  }

  public getProductById(productId: string): Observable< IProduct> {
    return this.httpClient.get<IProduct>(`/api/products/${productId}`)
  }

  post(payload: ProductPayload) {
    return this.httpClient.post('/api/products', payload)
  }

  put(productId: string, payload: ProductPayload) {
    return this.httpClient.put(`/api/products/${productId}`, payload)
  }

  delete(productId: string){
    return this.httpClient.delete(`/api/products/${productId}`)
  }

}
