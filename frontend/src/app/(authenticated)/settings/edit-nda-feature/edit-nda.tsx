'use client';

import React, { useState, useCallback } from 'react';
// Import Redux hooks and action
import { useSelector, useDispatch } from 'react-redux';
import type { ndaAgreementType } from '../../../../types';
import { useToast } from '../../../../hooks/use-toast';
import { updateNdaAgreement } from '../../../../store/slices/ndaAgreementSlice';
import { Textarea } from '../../../../components/ui/textarea';
import { Label } from '../../../../components/ui/label';
import { Button } from '../../../../components/ui/button';
import { Input } from '../../../../components/ui/input';
// --- Redux State Access Setup ---
// Define a type for your entire root state
type RootState = {
  ndaAgreement: ndaAgreementType;
  // ... other slices
};

export function EditNdaFormManual() {
  const { toast } = useToast();
  const dispatch = useDispatch();

  // 1. Get the current NDA content from the Redux store
  const initialNdaContent = useSelector((state: RootState) => state.ndaAgreement);

  // NOTE: Assuming a static/placeholder title since your Redux slice only handles content.
  const staticNdaTitle = 'Non-Disclosure Agreement Commitment Statement';

  // 2. Local component state to manage the form input values
  const [ndaContent, setNdaContent] = useState<string>(initialNdaContent);
  const [error, setError] = useState<string>('');

  // Handler for text area changes
  const handleContentChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNdaContent(e.currentTarget.value);
    // Clear error instantly if user starts typing
    if (e.currentTarget.value.trim().length > 0) {
      setError('');
    }
  }, []);

  // Handler for form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission

    // Manual Validation
    if (ndaContent.trim() === '') {
      setError('NDA content cannot be empty.');
      toast({
        title: 'Validation Error',
        description: 'Please enter content for the NDA.',
        variant: 'destructive',
      });
      return;
    }

    // 3. Dispatch the Redux action to update the NDA agreement content
    dispatch(updateNdaAgreement(ndaContent));

    // Log the update
    console.log('Updated NDA Content:', ndaContent);

    // Show success toast
    toast({
      title: 'NDA Saved Successfully',
      description: 'The Non-Disclosure Agreement content has been updated in the application state.',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title Field (Read-only) */}
      <div className="space-y-2">
        <Label htmlFor="nda-title" className="text-base">NDA Title</Label>
        <Input
          id="nda-title"
          value={staticNdaTitle}
          disabled // Making the title field read-only
        />
      </div>

      {/* Content Field (Editable and Redux-managed) */}
      <div className="space-y-2">
        <Label htmlFor="nda-content" className="text-base">NDA Content</Label>
        <Textarea
          id="nda-content"
          placeholder="Enter the full text of your NDA here."
          className="min-h-[250px]"
          value={ndaContent}
          onChange={handleContentChange}
        />
        {/* Manual Error Message Display */}
        {error && (
          <p className="text-sm font-medium text-red-500">{error}</p>
        )}
      </div>

      <div className="flex justify-end">
        <Button type="submit">Save NDA to Redux</Button>
      </div>
    </form>
  );
}