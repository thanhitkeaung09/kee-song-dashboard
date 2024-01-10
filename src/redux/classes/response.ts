export interface IResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

export interface IOptions {
  label: string;
  value: string;
}

export interface UserLevel {
  _id: string;
  user_level: string;
  level_id: number;
  deletedAt: null | string;
  createdAt: string;
  updatedAt: string;
  __v: 0;
  id: string;
}

export interface Worker {
  _id: string;
  username: string;
  email: string;
  password: string;
  user_level: UserLevel;
  department: Department | undefined;
  deletedAt: null | string;
  createdAt: string;
  updatedAt: string;
  profile: null | string;
  __v: 0;
  id: string;
}

export interface Department {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: 0;
  id: string;
}

export interface Customer {
  _id: string;
  name: string;
  email: string;
  password: string;
  dateOfBirth: string;
  address: string;
  profile: null | string;
  company: Company;
  createdAt: string;
  updatedAt: string;
  __v: 0;
  id: string;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  user_level: string;
  deletedAt: null | string;
  createdAt: string;
  updatedAt: string;
  __v: 0;
  id: string;
}

export interface Company {
  _id: string;
  name: string;
  size: string;
  logo: string | null;
  createdAt: string;
  updatedAt: string;
  __v: 0;
  id: string;
}

export interface Level {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: 0;
  id: string;
}

export interface LevelPaginatedResp<T> {
  locationLevels: Array<T>;
}

export interface Bin {
  _id: string;
  name: string;
  location_level: Level;
  createdAt: string;
  updatedAt: string;
  __v: 0;
  id: string;
}

export interface BinPaginatedResp<T> {
  bins: Array<T>;
}

export interface Location {
  _id: string;
  bin: Bin;
  row: number;
  column: number;
  createdAt: string;
  updatedAt: string;
  __v: 0;
  id: string;
}

export interface LocationPaginatedResp<T> {
  locations: Array<T>;
}

export interface ProductCategory {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: 0;
  id: string;
}

export interface ProductCategoryPaginatedResp<T> {
  categories: Array<T>;
}

export interface Product {
  _id: string;
  name: string;
  sku: string;
  category: ProductCategory;
  createdAt: string;
  updatedAt: string;
  __v: 0;
  id: string;
}

export interface ProductPaginatedResp<T> {
  products: Array<T>;
}
