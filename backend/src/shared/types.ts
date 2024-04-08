// Definition of the data type for a user
export type UserType = {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

// Definition of the data type for a hotel
export type HotelType = {
  _id: string;
  userId: string;
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  adultCount: number;
  childCount: number;
  facilities: string[];
  pricePerNight: number;
  starRating: number;
  imageUrls: string[];
  lastUpdated: Date;
  bookings: BookingType[];
};

export type BookingType = {
  _id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  adultCount: number;
  childCount: number;
  checkIn: Date;
  checkOut: Date;
  totalCost: number;
};

export type HotelSearchResponse = {
  data: HotelType[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};

export type PaymentIntentResponse = {
  paymentIntentId: string;
  clientSecret: string;
  totalCost: number;
};

// Definition of the data type for a review
export type ReviewType = {
  _id: string;
  firstName: string;
  lastName: string;
  title: string;
  starRating: number;
  description: string;
  userId: string;
  lastUpdated: Date;
};

// Definition du type de données pour un tirage
export type DrawType = {
  _id: string;
  userId: string;
  result: string;
  createdAt: Date;
  participationDate: Date;
};

