import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../service/product-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css',
})
export class ProductForm {
productForm!:FormGroup
isEditMode=false
productId!:string
constructor(private fb:FormBuilder,private productService:ProductService,private router:Router,private route: ActivatedRoute){}
ngOnInit(){
  this.productForm=this.fb.group({
    productName:[''],
    quantity:[0],
    unitCost:[0]


  })
  this.productId=this.route.snapshot.params['id']
  if (this.productId) {
    this.isEditMode=true
    this.productService.getById(this.productId).subscribe({
      next: (res) => this.productForm.patchValue(res),
      error: (error) => console.log(error)
    })

  }
}
onSubmit(){
  if (this.isEditMode===true) {
    this.productService.updateProduct(this.productId,this.productForm.value).subscribe({
      next: () => this.router.navigate(['/']),
      error: (error) => console.log(error)
    })


  }else{
    this.productService.addProduct(this.productForm.value).subscribe({
      next: () => this.router.navigate(['/']),
      error: (error) => console.log(error)
    })
  }

}
onDelete(){
  if (!this.productId) return;
    if (window.confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(this.productId).subscribe({
        next: () => this.router.navigate(['/']),
        error: (err) => console.error(err)
      });
    }
}








 onCancel(): void {
  this.router.navigate(['/']);
}

}
