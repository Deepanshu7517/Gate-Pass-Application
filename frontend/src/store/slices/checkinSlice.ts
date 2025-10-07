import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CheckinState, IdentityProof, Member } from "../../types";

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
    host: {
      name: "",
      post: "",
    },
    purposeOfVisit: "",
  },
  photograph: null,
  identityProof: null,
  equipment: {
    electrical: [],
    mechanical: [],
  },
  members: [],
  currentMemberIndex: null,
  nda: {
    signature: null,
    date: "",
    name: "",
    company: "",
    address: "",
    accepted: false,
  },
  placeToVisit: null,
  id: null,
};

const checkinSlice = createSlice({
  name: "checkin",
  initialState,
  reducers: {
    // Update entire state or partial state
    updateState: (state, action: PayloadAction<Partial<CheckinState>>) => {
      return { ...state, ...action.payload };
    },

    // Update basic details
    updateBasicDetails: (
      state,
      action: PayloadAction<Partial<CheckinState["basicDetails"]>>
    ) => {
      state.basicDetails = { ...state.basicDetails, ...action.payload };
    },

    // Update company details
    updateCompanyDetails: (
      state,
      action: PayloadAction<Partial<CheckinState["companyDetails"]>>
    ) => {
      state.companyDetails = { ...state.companyDetails, ...action.payload };
    },

    // Update host details (new helper for nested host object)
    updateHost: (
      state,
      action: PayloadAction<Partial<CheckinState["companyDetails"]["host"]>>
    ) => {
      state.companyDetails.host = {
        ...state.companyDetails.host,
        ...action.payload,
      };
    },

    // Update photograph
    updatePhotograph: (state, action: PayloadAction<string | null>) => {
      state.photograph = action.payload;
    },

    // Update identity proof
    updateIdentityProof: (
      state,
      action: PayloadAction<IdentityProof | null>
    ) => {
      state.identityProof = action.payload;
    },

    // Update equipment
    updateEquipment: (
      state,
      action: PayloadAction<CheckinState["equipment"]>
    ) => {
      state.equipment = action.payload;
    },

    // Update NDA
    updateNda: (state, action: PayloadAction<Partial<CheckinState["nda"]>>) => {
      state.nda = { ...state.nda, ...action.payload };
    },

    // Update place to visit
    updatePlaceToVisit: (state, action: PayloadAction<string | null>) => {
      state.placeToVisit = action.payload;
    },

    // Add new member
    addNewMember: (state) => {
      const newMember: Member = {
        basicDetails: { firstName: "", lastName: "", email: "", phone: "" },
        photograph: null,
        identityProof: null,
        equipment: { electrical: [], mechanical: [] },
      };
      state.members = state.members
        ? [...state.members, newMember]
        : [newMember];
      state.currentMemberIndex = state.members.length - 1;
    },

    // Update specific member
    updateMember: (
      state,
      action: PayloadAction<{ index: number; member: Partial<Member> }>
    ) => {
      if (state.members && state.members[action.payload.index]) {
        state.members[action.payload.index] = {
          ...state.members[action.payload.index],
          ...action.payload.member,
        };
      }
    },

    // Update member's basic details
    updateMemberBasicDetails: (
      state,
      action: PayloadAction<{
        index: number;
        details: Partial<Member["basicDetails"]>;
      }>
    ) => {
      if (state.members && state.members[action.payload.index]) {
        state.members[action.payload.index].basicDetails = {
          ...state.members[action.payload.index].basicDetails,
          ...action.payload.details,
        };
      }
    },

    // Update member's photograph
    updateMemberPhotograph: (
      state,
      action: PayloadAction<{ index: number; photograph: string | null }>
    ) => {
      if (state.members && state.members[action.payload.index]) {
        state.members[action.payload.index].photograph =
          action.payload.photograph;
      }
    },

    // Update member's identity proof
    updateMemberIdentityProof: (
      state,
      action: PayloadAction<{
        index: number;
        identityProof: IdentityProof | null;
      }>
    ) => {
      if (state.members && state.members[action.payload.index]) {
        state.members[action.payload.index].identityProof =
          action.payload.identityProof;
      }
    },

    // Update member's equipment
    updateMemberEquipment: (
      state,
      action: PayloadAction<{
        index: number;
        equipment: Member["equipment"];
      }>
    ) => {
      if (state.members && state.members[action.payload.index]) {
        state.members[action.payload.index].equipment = action.payload.equipment;
      }
    },

    // Remove member
    removeMember: (state, action: PayloadAction<number>) => {
      if (state.members) {
        state.members = state.members.filter(
          (_, index) => index !== action.payload
        );
        // Adjust currentMemberIndex if needed
        if (state.currentMemberIndex !== null) {
          if (state.currentMemberIndex >= state.members.length) {
            state.currentMemberIndex =
              state.members.length > 0 ? state.members.length - 1 : null;
          }
        }
      }
    },

    // Set current member index
    setCurrentMemberIndex: (state, action: PayloadAction<number | null>) => {
      state.currentMemberIndex = action.payload;
    },

    // Reset state
    resetCheckinState: () => {
      return initialState;
    },

    // Set checkin ID
    setCheckinId: (state, action: PayloadAction<string | null>) => {
      state.id = action.payload;
    },
  },
});

export const {
  updateState,
  updateBasicDetails,
  updateCompanyDetails,
  updateHost,
  updatePhotograph,
  updateIdentityProof,
  updateEquipment,
  updateNda,
  updatePlaceToVisit,
  addNewMember,
  updateMember,
  updateMemberBasicDetails,
  updateMemberPhotograph,
  updateMemberIdentityProof,
  updateMemberEquipment,
  removeMember,
  setCurrentMemberIndex,
  resetCheckinState,
  setCheckinId,
} = checkinSlice.actions;

export default checkinSlice.reducer;