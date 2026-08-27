export interface InvoiceItem {
  productId: string;
  productName: string;
  unitCost: number;
  quantity: number;
  total: number;
  discount: number;
}

export interface InvoicesModel {
  _id: string;
  date: string;
  finalTotal: number;
  clientName?: string;
  expenseName?: string;
  expenseAmount?: number;
  invType: 'SALE' | 'EXPENSE';
  items: InvoiceItem[];
}
