export type Cookie = {
  id: number;
  count: number;
}[];

export type Style = { [key: string]: string | number };

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  slug: string;
};

export type googleUser = {
  id: number;
  givenName: string;
  familyName: string;
  email: string;
  externalType: string;
  googleId: string;
};

export type Session = {
  id: number;
  token: string;
  expiryTimestamp: Date;
  userId: number;
};

export type WordList = {
  id: number;
  listName: string;
};
