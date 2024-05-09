import { IProduct } from "./product.interface";


export type ProductPayload =  Omit<IProduct, "id"> 