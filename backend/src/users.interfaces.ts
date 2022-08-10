export const jobTitles: string[] = [
  'Engineer - lead',
  'Engineer - mid level',
  'Engineer - junion',
  'Engineer - front end focused',
  'Engineer - backend focused',
  'Engineer - full stack'
];

export interface IUser {
    id: number;
    firstName: string;
    lastName: string
    jobTitle: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip: string;
}
