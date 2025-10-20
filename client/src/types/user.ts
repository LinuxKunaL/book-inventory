import type { booksCategories } from "@data/selectOptions";

type TBooksCategories = (typeof booksCategories)[number]["value"];

export type TUser = {
  fullname: string;
  email: string;
  password: string;
  role: "admin" | "proprietor" | "volunteer" | "distributor";
  location: string;
  assignedProprietor?: string | undefined;
  gender: "male" | "female";
};

export type TBook = {
  bookImage: string;
  bookName: string;
  basePrice: number;
  mrp: number;
  quantity: number;
  category: any;
};

export type TOrder = {
  srNo: number;
  distributorName: string;
  status: "Delivered" | "Pending" | "Cancelled";
  orderDate: string;
  items: number;
  totalAmount: number;
  orderItems: (TBook & {
    totalAmount: number;
  })[];
};

export type TLocation = {
  placeName:string;
  mapLink:string;
}
