export type Equipment = {
  name: string;
  quantity: number;
};

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
    hostName: string;
    purposeOfVisit: string;
  };
  photograph: string | null;
  identityProof: string | null;
  equipment: {
    electrical: Equipment[];
    mechanical: Equipment[];
  };
  nda: {
    signature: string;
    date: string;
    name: string;
    company: string;
    address: string;  // Add this line
    accepted: boolean;
  };
  id:null | string
};