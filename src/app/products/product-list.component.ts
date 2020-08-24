import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from "@angular/core";
import { NgForm } from '@angular/forms';
import {Product,prods} from './product';
import { combineLatest, BehaviorSubject, EMPTY, Subject,of,Observable } from 'rxjs';
import { catchError, map,debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent  {

  constructor(private productService:ProductService) { }

  searchText:string;
  //Action
  private filterbyProductNameSubject = new BehaviorSubject<string>("");

  prodPlainList:Product[]=[];

   private productList = new Subject<Product[]>();
   productList$ = this.productList.asObservable();


 searchProducts(searchText: string): void {
    this.filterbyProductNameSubject.next(searchText);
  }
  ngOnInit() {
   this.prodPlainList = prods;

   this.productList$ = this.filterbyProductNameSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((searchText: string) => this.productService.searchProducts(searchText).pipe(
      catchError(err => {
        //Call error method here ==> this.handleError
        //Put handleError in the base compoent and extend to this class
        return EMPTY;
      })
    )),
    );

  }


}
