import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ndaAgreementType } from "../../types/ndaAgreementType";
// NOTE: The 'initializeApp' import seems irrelevant to the slice and can be removed for cleanliness.
// import { initializeApp } from 'firebase/app';

const initialState: ndaAgreementType = `
Preamble and Scope: I, the undersigned visitor, acknowledge that I am entering the premises of [Company Name] for the approved purpose of [e.g., scheduled meeting, maintenance, interview, delivery] on this date. I understand that my access is temporary and strictly limited to the areas required for my authorized visit, and I agree to be escorted by a designated Company employee at all times, unless otherwise instructed by Security.

Commitment to Safety and Conduct: I commit to fully complying with all [Company Name] rules and regulations, particularly those related to safety, security, and professional conduct. This includes adherence to emergency procedures, wearing the visitor badge prominently, and refraining from entering any restricted or clearly marked areas. I will operate any equipment or tools in a safe manner and report any hazards immediately.

Confidentiality and Proprietary Information: I acknowledge that I may be exposed to Confidential Information, including, but not limited to, trade secrets, financial data, product roadmaps, and personnel information. By signing this agreement, I agree that I will not disclose, copy, use, or otherwise reveal any such Confidential Information during or after my visit, except as required for the authorized purpose of my visit and with prior written consent from [Company Name]. All materials, discussions, and observations made during my time on the premises remain the exclusive property of the Company.

Electronic Devices and Photography: I understand and agree that the use of cameras, video recorders, or any similar recording equipment is strictly prohibited within the facility without explicit management approval. I consent to having my electronic devices (such as mobile phones or laptops) inspected, if requested, prior to entering or exiting sensitive areas, to ensure the security of proprietary information.

Acknowledgment of Terms: I certify that I have read, understood, and voluntarily agree to comply with all terms set forth in this Visitor Acknowledgment and Non-Disclosure Agreement. I understand that failure to comply with these terms may result in immediate removal from the premises and potential legal action.
`;

export const ndaAgreementSlice = createSlice({
  name: "ndaAgreement",
  initialState,
  reducers: {
    // FIX: Must explicitly RETURN the payload when the state is a primitive type (string).
    updateNdaAgreement: (state, action: PayloadAction<ndaAgreementType>) => {
      // Correct way to update a primitive state: return the new value.
      console.log(state, action.payload);
      return action.payload;

      // The incorrect line was: state = action.payload
    },
  },
});

export const { updateNdaAgreement } = ndaAgreementSlice.actions;
export default ndaAgreementSlice.reducer;
