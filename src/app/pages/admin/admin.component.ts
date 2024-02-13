import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  productForm: FormGroup;
  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.productForm = new FormGroup( {
      name: new FormControl('', {validators: Validators.required}),
      description: new FormControl('', [Validators.required, Validators.minLength(2)]),
      category: new FormControl(),
      price: new FormControl(),
      image: new FormControl()
    });
  }


  createCard(): void {
    const cardDataRow = this.productForm.getRawValue();
    console.log('***', cardDataRow);

    let formParams = new FormData();
    if(typeof cardDataRow === "object") {
      for (let prop in cardDataRow) {
        formParams.append(prop, cardDataRow[prop]);
      }
    }

    this.productService.createProducts(formParams).subscribe((data) => {});
  }


  selectFile(ev: any): void {

    if  (ev.target.files.length > 0) {
      const file = ev.target.files[0];
      this.productForm.patchValue( {
        image: file
      });

    }
  }

}
