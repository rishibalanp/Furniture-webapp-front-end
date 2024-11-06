import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CategoriesComponent } from './components/manage/categories/categories.component';
import { CategoryFormComponent } from './components/manage/category-form/category-form.component';
import { ProductComponent } from './components/manage/product/product.component';
import { ProductFormComponent } from './components/manage/product-form/product-form.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './core/auth-guard';
import { AdminComponent } from './components/manage/admin/admin.component';
import { adminGuard } from './core/admin-guard';
import { ProfileComponent } from './components/profile/profile.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { CartComponent } from './components/cart/cart.component';
import { CustomerOrderComponent } from './components/customer-order/customer-order.component';
import { OrdersComponent } from './components/manage/orders/orders.component';

export const routes: Routes = [
	{
		path:"",
		component: HomeComponent,
		canActivate:[authGuard]
	},
	{
		path:"admin",
		component:AdminComponent,
		canActivate:[adminGuard]

	},
	{
		path:"admin/categories",
		component: CategoriesComponent,
		canActivate:[adminGuard]
	},
	{
		path:"admin/categories/add",
		component: CategoryFormComponent,
		canActivate:[adminGuard]
	},
	{
		path:"admin/categories/:id",
		component: CategoryFormComponent,
		canActivate:[adminGuard]
	},
	{
		path:"admin/product",
		component: ProductComponent,
		canActivate:[adminGuard]
	},
	{
		path:"admin/orders",
		component: OrdersComponent,
		canActivate:[adminGuard]
	},
	{
		path:"admin/product/add",
		component: ProductFormComponent,
		canActivate:[adminGuard]
	},
	{
		path:"admin/product/:id",						
		component: ProductFormComponent,
		canActivate:[adminGuard]
	},
	{
		path: "product",
		component: ProductListComponent,
		canActivate:[authGuard]
	},
	{
		path: "product/:id",
		component: ProductDetailComponent,
		canActivate:[authGuard]
	},
	{
		path: "profile",
		component: ProfileComponent,
		canActivate:[authGuard]
	},
	{
		path: "wishlist",
		component: WishlistComponent,
		canActivate:[authGuard]
	},
	{
		path: "cart",
		component: CartComponent,
		canActivate:[authGuard]
	},
	{
		path: "order",
		component: CustomerOrderComponent,
		canActivate:[authGuard]
	},{
		path: "register",
		component: RegisterComponent
	},{
		path: "login",
		component:LoginComponent
	}
];
