interface IDetailOrder {
  idProduct: string;
  quantityProduct: number;
  price: string;
}
interface IOrderItem {
  orderNumber: Key | null | undefined;
  date: string;
  totalPrice: string;
  detailOrder: IDetailOrder[];
}
interface IUser {
  phone: string;
  pwd: string;
  order: IOrderItem[];
}

export { IUser, IOrderItem, IDetailOrder };
