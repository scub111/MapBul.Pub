export interface IMarkerDTO {
  id: number;
  name: string;
  nameEn: string;
  introduction: string;
  introductionEn: string;
  description: string;
  descriptionEn: string;
  cityId: number;
  baseCategoryId: number;
  lat: number;
  lng: number;
  entryTicket: string;
  discountId: number;
  street: string;
  house: string;
  buliding: string;
  floor: string;
  site: string;
  email: string;
  photo: string;
  userId: number;
  addedDate: Date;
  publishedDate: Date;
  checkDate: Date;
  statusId: number;
  logo: string;
  wifi: boolean;
  personal: boolean;
}