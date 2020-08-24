
import { Injectable } from '@angular/core';
import {Product,prods} from './product';
import { of,Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor() { }

  searchProducts(searchString: string): Observable<Product[]> {
    console.log(searchString)
    if (!searchString && !searchString.trim())
      return of(prods);

    else {
      let wholeProd = [...prods];
      let filterdProducts = wholeProd.filter(x => x.productName.toLowerCase().indexOf(searchString.toLowerCase()) > -1);
      console.log(filterdProducts);
      return of(filterdProducts);
    }
  }

}
