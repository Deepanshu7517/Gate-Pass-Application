import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from './redux';
import {
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
} from '../store/slices/checkinSlice';
import type { CheckinState, Member, IdentityProof } from '../types';

export const useCheckin = () => {
  const checkinState = useAppSelector((state) => state.checkin);
  const dispatch = useAppDispatch();

  // Update entire state
  const setCheckinState = useCallback(
    (updater: CheckinState | ((prev: CheckinState) => CheckinState)) => {
      if (typeof updater === 'function') {
        const newState = updater(checkinState);
        dispatch(updateState(newState));
      } else {
        dispatch(updateState(updater));
      }
    },
    [dispatch, checkinState]
  );

  // Reset state
  const handleResetCheckinState = useCallback(() => {
    dispatch(resetCheckinState());
  }, [dispatch]);

  // Add new member and return its index
  const handleAddNewMember = useCallback(() => {
    dispatch(addNewMember());
    const newIndex = checkinState.members ? checkinState.members.length : 0;
    return newIndex;
  }, [dispatch, checkinState.members]);

  // Main visitor details helpers
  const updateBasicDetailsHelper = useCallback(
    (details: Partial<CheckinState['basicDetails']>) => {
      dispatch(updateBasicDetails(details));
    },
    [dispatch]
  );

  const updateCompanyDetailsHelper = useCallback(
    (details: Partial<CheckinState['companyDetails']>) => {
      dispatch(updateCompanyDetails(details));
    },
    [dispatch]
  );

  const updateHostHelper = useCallback(
    (host: Partial<CheckinState['companyDetails']['host']>) => {
      dispatch(updateHost(host));
    },
    [dispatch]
  );

  const updatePhotographHelper = useCallback(
    (photo: string | null) => {
      dispatch(updatePhotograph(photo));
    },
    [dispatch]
  );

  const updateIdentityProofHelper = useCallback(
    (proof: IdentityProof | null) => {
      dispatch(updateIdentityProof(proof));
    },
    [dispatch]
  );

  const updatePlaceToVisitHelper = useCallback(
    (place: string | null) => {
      dispatch(updatePlaceToVisit(place));
    },
    [dispatch]
  );

  const updateEquipmentHelper = useCallback(
    (equipment: CheckinState['equipment']) => {
      dispatch(updateEquipment(equipment));
    },
    [dispatch]
  );

  const updateNdaHelper = useCallback(
    (nda: Partial<CheckinState['nda']>) => {
      dispatch(updateNda(nda));
    },
    [dispatch]
  );

  // Member management helpers
  const updateMemberHelper = useCallback(
    (index: number, member: Partial<Member>) => {
      dispatch(updateMember({ index, member }));
    },
    [dispatch]
  );

  const updateMemberBasicDetailsHelper = useCallback(
    (index: number, details: Partial<Member['basicDetails']>) => {
      dispatch(updateMemberBasicDetails({ index, details }));
    },
    [dispatch]
  );

  const updateMemberPhotographHelper = useCallback(
    (index: number, photograph: string | null) => {
      dispatch(updateMemberPhotograph({ index, photograph }));
    },
    [dispatch]
  );

  const updateMemberIdentityProofHelper = useCallback(
    (index: number, identityProof: IdentityProof | null) => {
      dispatch(updateMemberIdentityProof({ index, identityProof }));
    },
    [dispatch]
  );

  const updateMemberEquipmentHelper = useCallback(
    (index: number, equipment: Member['equipment']) => {
      dispatch(updateMemberEquipment({ index, equipment }));
    },
    [dispatch]
  );

  const removeMemberHelper = useCallback(
    (index: number) => {
      dispatch(removeMember(index));
    },
    [dispatch]
  );

  const setCurrentMemberIndexHelper = useCallback(
    (index: number | null) => {
      dispatch(setCurrentMemberIndex(index));
    },
    [dispatch]
  );

  const setCheckinIdHelper = useCallback(
    (id: string | null) => {
      dispatch(setCheckinId(id));
    },
    [dispatch]
  );

  return {
    // State
    checkinState,
    isLoading: false,

    // Main state setters
    setCheckinState,
    resetCheckinState: handleResetCheckinState,
    addNewMember: handleAddNewMember,

    // Main visitor update methods
    updateBasicDetails: updateBasicDetailsHelper,
    updateCompanyDetails: updateCompanyDetailsHelper,
    updateHost: updateHostHelper,
    updatePhotograph: updatePhotographHelper,
    updateIdentityProof: updateIdentityProofHelper,
    updateEquipment: updateEquipmentHelper,
    updateNda: updateNdaHelper,
    updatePlaceToVisit: updatePlaceToVisitHelper,

    // Member management methods
    updateMember: updateMemberHelper,
    updateMemberBasicDetails: updateMemberBasicDetailsHelper,
    updateMemberPhotograph: updateMemberPhotographHelper,
    updateMemberIdentityProof: updateMemberIdentityProofHelper,
    updateMemberEquipment: updateMemberEquipmentHelper,
    removeMember: removeMemberHelper,
    setCurrentMemberIndex: setCurrentMemberIndexHelper,

    // Checkin ID
    setCheckinId: setCheckinIdHelper,
  };
};