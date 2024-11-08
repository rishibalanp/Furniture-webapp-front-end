import { Component, inject, OnDestroy, OnInit,HostListener  } from '@angular/core';
import { category } from '../../types/category';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../../services/customer.service';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';


@Component({
	selector: 'app-header',
	standalone: true,
	imports: [RouterLink,CommonModule, MatMenuModule, MatIconModule, MatButtonModule,FormsModule,MatIconModule],
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
	// isScrolled = false;

	// @HostListener('window:scroll', [])
	// onWindowScroll() {
	//   const offset = window.scrollY;
	//   this.isScrolled = offset > 50; // Adjust the scroll threshold as needed
	// }

customerService = inject(CustomerService);
categoryList: category[]=[];
router = inject(Router);
authService = inject(AuthService);
searchTerm!:string;
isScrolled = false;
  showSearch = true; // Default to show on desktop
  showMenu = false;
  isMobile = false;
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }


  @HostListener('window:resize', [])
  onResize() {
    this.updateViewMode();
  }
  private updateViewMode() {
    this.isMobile = window.innerWidth < 768;
    if (this.isMobile) {
      this.showSearch = false;
    } else {
      this.showSearch = true;
    }
  }

  toggleSearchBar() {
    if (this.isMobile) {
      this.showSearch = !this.showSearch;
    }
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

ngOnInit(): void {
	this.updateViewMode();
}

searchProduct(event:any){
	if(event.target.value){
		this.router.navigateByUrl("/product?search="+event.target.value);
		if (this.isMobile) {
			this.showSearch = false;
		  }
	}
}



onProfile() {
	this.router.navigateByUrl("/profile");
}

onLogout() {
	this.authService.logout();
	this.router.navigateByUrl("/login");
}

}
