import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "../../../../store";
import { updateState } from "../../../../store/slices/checkinSlice";
import { Button } from "../../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";
import { ScrollArea } from "../../../../components/ui/scroll-area";
import { useNavigate } from "react-router-dom";
import SignatureCanvas from "../../../../components/ui/signatureCanvas";

type FormData = {
  name: string;
  company: string;
  address: string;
  date: string;
  signature: string;
};

type FormErrors = {
  name?: string;
  company?: string;
  address?: string;
  date?: string;
  signature?: string;
};

export default function GatePassNdaSigningPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const state = useSelector((state: RootState) => state.checkin);

  const [formData, setFormData] = useState<FormData>({
    name: `${state.basicDetails.firstName} ${state.basicDetails.lastName}`.trim(),
    company: state.companyDetails.companyName,
    address: state.companyDetails.address,
    date: new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }),
    signature: state.nda.signature || "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      name: `${state.basicDetails.firstName} ${state.basicDetails.lastName}`.trim(),
      company: state.companyDetails.companyName,
      address: state.companyDetails.address,
      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
    }));
  }, [state.basicDetails, state.companyDetails]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.company.trim()) newErrors.company = "Company is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.date.trim()) newErrors.date = "Date is required";
    if (!formData.signature.trim()) newErrors.signature = "Signature is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSignatureSave = (signature: string) => {
    setFormData((prev) => ({ ...prev, signature }));
    if (errors.signature) setErrors((prev) => ({ ...prev, signature: undefined }));
  };

  const handleAccept = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Validate previous steps
    if (
      !state.basicDetails.firstName.trim() ||
      !state.basicDetails.lastName.trim() ||
      !state.basicDetails.email.trim() ||
      !state.basicDetails.phone.trim()
    ) {
      alert("Please complete the Basic Details section first");
      navigate("/gate-pass/basic-details");
      return;
    }

    if (
      !state.companyDetails.companyName.trim() ||
      !state.companyDetails.address.trim() ||
      !state.companyDetails.hostName.trim() ||
      !state.companyDetails.purposeOfVisit.trim()
    ) {
      alert("Please complete the Company Details section first");
      navigate("/gate-pass/company-details");
      return;
    }

    if (!state.photograph) {
      alert("Please upload a photograph");
      navigate("/gate-pass/photograph");
      return;
    }

    if (!state.identityProof) {
      alert("Please upload identity proof");
      navigate("/gate-pass/identity-proof");
      return;
    }

    // Generate unique ID
    const visitorId = `VIS-${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 9)}`.toUpperCase();

    dispatch(
      updateState({
        nda: { ...formData, accepted: true },
        id: visitorId,
      })
    );

    console.log("Updated Redux State:", state);
    navigate("/gate-pass/print-badge");
  };

  const handleCancel = () => {
    navigate("/requests");
  };

  return (
    <Card className="w-full max-w-4xl shadow-lg">
      <form onSubmit={handleAccept}>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">
            Non-Disclosure Agreement
          </CardTitle>
          <CardDescription className="flex w-full justify-between">
            <div>Please read and sign the agreement below to proceed.</div>
            <div className="text-lg text-gray-800">{formData.date}</div>
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <ScrollArea className="h-64 w-full rounded-md border p-4">
            <h3 className="font-semibold">
              Confidentiality and Non-Disclosure Agreement
            </h3>
            <div className="text text-[#8d7c8b]">
              <p className="mt-4 text-sm">
                This Non-Disclosure Agreement (the "Agreement") is entered into
                by and between VisEntry ("Disclosing Party") and the visitor
                ("Receiving Party") for the purpose of preventing the
                unauthorized disclosure of Confidential Information as defined
                below.
              </p>
              <p className="mt-2 text-sm">
                The Receiving Party hereby agrees that they will not, during or
                after the term of this Agreement, disclose any Confidential
                Information to any third party for any reason or purpose
                whatsoever without the prior written consent of the Disclosing
                Party. Confidential Information includes all non-public
                information, including but not limited to trade secrets,
                business plans, and any other proprietary information.
              </p>
              <p className="mt-2 text-sm">
                The Receiving Party's obligations under this Agreement shall
                survive the termination of any relationship between the parties.
              </p>
              <p className="mt-2 text-sm">
                By signing below, the Receiving Party acknowledges they have
                read and agree to the terms outlined herein.
              </p>
            </div>
          </ScrollArea>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="name" className="text-sm font-medium leading-none">
                Name
              </label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.currentTarget.value)}
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="text-sm text-red-500 mt-1">{errors.name}</p>
              )}

              <label htmlFor="company" className="text-sm font-medium leading-none mt-4 block">
                Company
              </label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => handleInputChange("company", e.currentTarget.value)}
                className={errors.company ? "border-red-500" : ""}
              />
              {errors.company && (
                <p className="text-sm text-red-500 mt-1">{errors.company}</p>
              )}

              <label htmlFor="address" className="text-sm font-medium leading-none mt-4 block">
                Address
              </label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.currentTarget.value)}
                className={errors.address ? "border-red-500" : ""}
              />
              {errors.address && (
                <p className="text-sm text-red-500 mt-1">{errors.address}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium leading-none">
                Signature
              </label>
              <SignatureCanvas
                onSave={handleSignatureSave}
                initialSignature={formData.signature}
              />
              {errors.signature && (
                <p className="text-sm text-red-500 mt-1">{errors.signature}</p>
              )}
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between gap-5">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Back
          </Button>
          <div className="space-x-2 flex">
            <Button
              variant="destructive"
              size="sm"
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button size="sm" variant="default" type="submit">
              Accept & Continue
            </Button>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
