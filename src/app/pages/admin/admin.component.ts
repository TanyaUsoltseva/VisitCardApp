import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  productForm: FormGroup;
  constructor(private productService: ProductsService,
              private messageService: MessageService
              ) { }

  ngOnInit(): void {
    this.productForm = new FormGroup( {
      title: new FormControl('', {validators: Validators.required}),
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
    this.messageService.add({severity:'success', summary:'Карточка успешно добавлена'});
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
