export interface Product{
    _id?: string;
    name:string,
    description:string,
    shortDescription: string,
    price:number,
    discount:number,
    images: string[],
    categoryId:string,
    isFeatured: boolean,
    isNewProduct:boolean
}