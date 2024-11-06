import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../types/product';
import Swal from 'sweetalert2';
import { TYPE } from './../../../types/alert';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  displayedColumns: string[] = [
    'id',
    'name',
    'shortDescription',
    'price',
    'discount',
    'action',
  ];
  dataSource: MatTableDataSource<Product>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  productService = inject(ProductService);

  constructor() {
    this.dataSource = new MatTableDataSource([] as any);
  }
  ngOnInit(): void {
    this.getAllProduct();
  }

  private getAllProduct() {
    this.productService.getAllProduct().subscribe((result) => {
      console.log(result);
      this.dataSource.data = result;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  edit(id: any) {}
  delete(id: any) {
    this.productService.deleteProduct(id).subscribe((res) => {
      Swal.fire({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        icon: TYPE.SUCCESS,
        timer: 4000,
        showCloseButton: true,
        title: 'Deleted successfully',
      });
      this.getAllProduct();
    });
  }
}
