// export type Equipment = {
//   name: string;
//   quantity: number;
// };

// export interface Member {
//   basicDetails: {
//     firstName: string;
//     lastName: string;
//     email: string;
//     phone: string;
//   };
//   photograph: string | null;
//   identityProof: string | null;
//   equipment: {
//     electrical: Equipment[];
//     mechanical: Equipment[];
//   };
// }

// export type CheckinState = {
//   basicDetails: {
//     firstName: string;
//     lastName: string;
//     email: string;
//     phone: string;
//   };
//   companyDetails: {
//     companyName: string;
//     address: string;
//     hostName: string;
//     purposeOfVisit: string;
//   };
//   photograph: string | null;
//   identityProof: string | null;
//   equipment: {
//     electrical: Equipment[];
//     mechanical: Equipment[];
//   };
//   members: Member[] | null;
//   currentMemberIndex: number | null;
//   nda: {
//     signature: string | null;
//     date: string;
//     name: string;
//     company: string;
//     address: string;
//     accepted: boolean;
//   };
//   placeToVisit: string | null;
//   id: string | null;
// };

export type Equipment = { name: string; quantity: number };
export type IdentityProof =
  | { type: "picture"; data: string | null }
  | {
      type: "number";
      idType: "aadhaar-card" | "pan-card" | "visa" | "driving-license" | "";
      idNumber: string;
    };
export interface Member {
  id: string | null;
  basicDetails: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  photograph: string | null;
  identityProof: IdentityProof | null;
  equipment: { electrical: Equipment[]; mechanical: Equipment[] };
}
export type CheckinState = {
  basicDetails: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  companyDetails: {
    companyName: string;
    address: string;
    host: {
      name: string;
      post: string;
      department: string;
    };
    purposeOfVisit: string;
  };
  photograph: string | null;
  identityProof: IdentityProof | null;
  equipment: { electrical: Equipment[]; mechanical: Equipment[] };
  members: Member[] | null;
  currentMemberIndex: number | null;
  nda: {
    signature: string | null;
    date: string;
    name: string;
    company: string;
    address: string;
    accepted: boolean;
  };
  placeToVisit: string | null;
  id: string | null;
};