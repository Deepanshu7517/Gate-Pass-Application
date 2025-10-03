import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type CheckinState } from "../../types/checkIn";

const initialState: CheckinState = {
  basicDetails: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  },
  companyDetails: {
    companyName: "",
    address: "",
    hostName: "",
    purposeOfVisit: "",
  },
  photograph: null,
  identityProof: null,
  equipment: {
    electrical: [],
    mechanical: [],
  },
  nda: {
    signature: "",
    date: "",
    name: "",
    company: "",
    address: "", // Add this line
    accepted: false,
  },
  id: null,
};

const checkinSlice = createSlice({
  name: "checkin",
  initialState,
  reducers: {
    updateState: (state, action: PayloadAction<Partial<CheckinState>>) => {
      return { ...state, ...action.payload };
    },
    updateBasicDetails: (
      state,
      action: PayloadAction<Partial<CheckinState["basicDetails"]>>
    ) => {
      state.basicDetails = { ...state.basicDetails, ...action.payload };
    },
    updateCompanyDetails: (
      state,
      action: PayloadAction<Partial<CheckinState["companyDetails"]>>
    ) => {
      state.companyDetails = { ...state.companyDetails, ...action.payload };
    },
    updateEquipment: (
      state,
      action: PayloadAction<Partial<CheckinState["equipment"]>>
    ) => {
      state.equipment = { ...state.equipment, ...action.payload };
    },
    updateNda: (state, action: PayloadAction<Partial<CheckinState["nda"]>>) => {
      state.nda = { ...state.nda, ...action.payload };
    },
    updatePhotograph: (state, action: PayloadAction<string | null>) => {
      state.photograph = action.payload;
    },
    updateIdentityProof: (state, action: PayloadAction<string | null>) => {
      state.identityProof = action.payload;
    },
    resetCheckin: () => {
      return initialState;
    },
  },
});

export const {
  updateState,
  updateBasicDetails,
  updateCompanyDetails,
  updateEquipment,
  updateNda,
  updatePhotograph,
  updateIdentityProof,
  resetCheckin,
} = checkinSlice.actions;

export default checkinSlice.reducer;
