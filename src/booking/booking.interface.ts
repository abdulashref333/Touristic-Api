interface IBooking {
  userId: string;
  providerId: string;
  from: Date;
  to: Date;
  gender: string;
  nationality: string;
  approved: boolean;
  rejected: boolean;
}
