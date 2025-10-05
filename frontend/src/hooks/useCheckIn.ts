import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from './redux';
import {
  updateState,
  updateBasicDetails,
  updateCompanyDetails,
  updatePhotograph,
  updateIdentityProof,
  updateEquipment,
  updateNda,
  updatePlaceToVisit,
  addNewMember,
  updateMember,
  removeMember,
  setCurrentMemberIndex,
  resetCheckinState,
  setCheckinId,
} from '../store/slices/checkinSlice';
import type { CheckinState, Member } from '../types';

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
    // Clear localStorage if needed (already handled in store subscription)
  }, [dispatch]);

  // Add new member and return its index
  const handleAddNewMember = useCallback(() => {
    dispatch(addNewMember());
    // Return the new member index (will be the last index)
    const newIndex = checkinState.members ? checkinState.members.length : 0;
    return newIndex;
  }, [dispatch, checkinState.members]);

  // Additional helper methods
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

  const updatePhotographHelper = useCallback(
    (photo: string | null) => {
      dispatch(updatePhotograph(photo));
    },
    [dispatch]
  );

  const updateIdentityProofHelper = useCallback(
    (proof: string | null) => {
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

  const updateMemberHelper = useCallback(
    (index: number, member: Partial<Member>) => {
      dispatch(updateMember({ index, member }));
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
    isLoading: false, // Redux doesn't need loading state for hydration
    // Main state setters (matching original Context API)
    setCheckinState,
    resetCheckinState: handleResetCheckinState,
    addNewMember: handleAddNewMember,

    // Additional helper methods for granular updates
    updateBasicDetails: updateBasicDetailsHelper,
    updateCompanyDetails: updateCompanyDetailsHelper,
    updatePhotograph: updatePhotographHelper,
    updateIdentityProof: updateIdentityProofHelper,
    updateEquipment: updateEquipmentHelper,
    updateNda: updateNdaHelper,
    updatePlaceToVisit: updatePlaceToVisitHelper,
    updateMember: updateMemberHelper,
    removeMember: removeMemberHelper,
    setCurrentMemberIndex: setCurrentMemberIndexHelper,
    setCheckinId: setCheckinIdHelper,
  };
};