import React from 'react';

export type AuthenticatedUserType = {
  uid: string;
  photoURL: string;
  displayName: string;
  email: string;
};

export const AuthContext = React.createContext<AuthenticatedUserType | null>(
  null,
);
