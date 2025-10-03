import { useState, useEffect } from "preact/hooks";
import { useCheckin } from "../../../../hooks/useCheckIn";
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
  address?: string; // Add this
  date?: string;
  signature?: string;
};

export default function GatePassNdaSigningPage() {
  const navigate = useNavigate();
  const { state, dispatch } = useCheckin();

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

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.company.trim()) {
      newErrors.company = "Company is required";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.date.trim()) {
      newErrors.date = "Date is required";
    }

    if (!formData.signature.trim()) {
      newErrors.signature = "Signature is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleAccept = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate current form
    if (!validateForm()) {
      return;
    }

    // Check basic details
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

    // Check company details
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

    // Check photograph
    if (!state.photograph) {
      alert("Please upload a photograph");
      navigate("/gate-pass/photograph");
      return;
    }

    // Check identity proof
    if (!state.identityProof) {
      alert("Please upload identity proof");
      navigate("/gate-pass/identity-proof");
      return;
    }

    // Generate ID
    const visitorId = `VIS-${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 9)}`.toUpperCase();

    // Update Redux
    dispatch({
      type: "UPDATE_STATE",
      payload: {
        nda: { ...formData, accepted: true },
        id: visitorId,
      },
    });

    navigate("/gate-pass/print-badge");
  };

  const handleCancel = () => {
    navigate("/requests");
  };
  const handleSignatureSave = (signature: string) => {
    setFormData((prev) => ({ ...prev, signature }));

    // Clear signature error if it exists
    if (errors.signature) {
      setErrors((prev) => ({ ...prev, signature: undefined }));
    }
  };

  return (
    <Card className="w-full max-w-4xl shadow-lg">
      <form onSubmit={handleAccept}>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">
            Non-Disclosure Agreement
          </CardTitle>
          <CardDescription className={"flex w-full justify-between"}>
            <div className="">
              Please read and sign the agreement below to proceed.
            </div>
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
                explicabo necessitatibus distinctio, porro amet vero, molestiae
                suscipit quasi quam voluptate maxime magnam animi laborum
                laboriosam quae in fugit quos? Aliquid fuga vero voluptates
                veniam, architecto quisquam deleniti assumenda rerum aliquam
                tenetur? Assumenda voluptas consectetur excepturi laboriosam.
                Recusandae, possimus eius! Unde repellendus aliquam deserunt,
                eius inventore dolore labore molestias aperiam nulla mollitia,
                maiores impedit quaerat ipsam. Sunt, officiis quia et at
                similique labore optio reprehenderit voluptatem quam assumenda
                consectetur velit ut aspernatur asperiores laudantium numquam
                dolorem, beatae deleniti ea fuga. Voluptas neque soluta
                recusandae obcaecati id corporis incidunt, nisi iste voluptate
                labore aliquam ullam quae optio, rem eligendi error? Aperiam
                tempora voluptate alias consectetur fugiat obcaecati
                reprehenderit praesentium, quaerat at illo quis earum culpa
                laborum? Rerum eos quod, velit ut voluptatum ab saepe culpa
                repellat rem obcaecati consequatur, atque veritatis error
                consequuntur, recusandae harum mollitia. Consequuntur molestiae
                mollitia esse quam iure eveniet doloribus? Odit quisquam odio
                eos quasi reiciendis voluptatibus quaerat quam maxime dolorem
                tenetur excepturi minima temporibus, ad sapiente iusto quod fuga
                repellendus modi at. Harum nobis error magnam molestiae debitis.
                Vero pariatur quam ut. Blanditiis beatae aperiam voluptas animi
                soluta eaque placeat. Explicabo incidunt iure neque eum! Magnam
                tempore pariatur temporibus facilis dolore at facere voluptates
                id officia amet voluptatum vero, ut recusandae saepe eos esse
                suscipit quas reprehenderit optio est cupiditate reiciendis.
                Explicabo ipsam facilis deserunt tempora inventore ad aut,
                architecto minus velit adipisci deleniti laudantium sit
                dignissimos vero accusamus harum ea non sequi cupiditate fugit
                quos eveniet. Voluptas cumque officiis deserunt dolorum amet?
                Illo et maiores fugit quis, commodi labore modi? Itaque ea
                voluptate nesciunt voluptas. Odit quis cum esse illum eaque
                mollitia consequuntur labore, delectus asperiores repudiandae.
                Quas assumenda tempore reiciendis esse. Eum, perspiciatis
                repellendus recusandae earum quia assumenda sunt provident error
                ad? Nisi, ratione consectetur sapiente harum tempora, fugit,
                expedita ad minima voluptate a laborum odit impedit est!
                Nesciunt qui labore ex, hic nostrum cumque eius saepe? Odit, ut
                dolore ab quia molestias reiciendis perspiciatis enim qui
                obcaecati exercitationem neque distinctio reprehenderit officiis
                quidem, adipisci dolorum aperiam rerum quam aliquam molestiae.
                Illum quaerat accusamus cupiditate omnis nam, nulla tempore
                accusantium ipsum asperiores sunt voluptatum est vel facere
                voluptates. Beatae necessitatibus corrupti placeat, tempora sint
                voluptatibus atque aliquid, maxime porro tempore doloremque
                totam eum exercitationem molestiae doloribus? Voluptatibus
                officia facere magni eaque? Recusandae maiores delectus autem
                asperiores et tempora! Dolore nostrum sint deserunt pariatur
                esse quisquam cupiditate ut totam error, omnis dolores accusamus
                repellendus quidem nesciunt vel, accusantium consectetur est
                itaque expedita rerum animi explicabo ipsam? Laudantium vel
                provident beatae eligendi quod dolorem consectetur. Pariatur
                nemo nesciunt amet non repudiandae ipsum doloribus aliquid,
                soluta minus quam! Magni vel beatae rem. Enim provident ratione
                exercitationem deserunt vitae dignissimos aspernatur repellat
                tenetur sapiente, soluta quas quia eaque minus modi molestias
                laudantium ab sequi iure maiores. Optio magnam numquam quis in
                sequi ut ipsa, hic corrupti voluptas quos minus sunt nemo
                possimus assumenda vitae, natus nobis obcaecati voluptates
                beatae dolore perspiciatis cupiditate excepturi. Cum libero rem
                dignissimos aliquid facilis!
              </p>
            </div>
          </ScrollArea>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="">
              <div>
                <label
                  htmlFor="name"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Name
                </label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    handleInputChange("name", e.currentTarget.value)
                  }
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && (
                  <p className="text-sm font-medium text-red-500 mt-1">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="company"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Company
                </label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) =>
                    handleInputChange("company", e.currentTarget.value)
                  }
                  onClick={() => {
                    console.log(state);
                  }}
                  className={errors.company ? "border-red-500" : ""}
                />
                {errors.company && (
                  <p className="text-sm font-medium text-red-500 mt-1">
                    {errors.company}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Address
                </label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) =>
                    handleInputChange("address", e.currentTarget.value)
                  }
                  className={errors.address ? "border-red-500" : ""}
                />
                {errors.address && (
                  <p className="text-sm font-medium text-red-500 mt-1">
                    {errors.address}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Signature
              </label>
              <SignatureCanvas
                onSave={handleSignatureSave}
                initialSignature={formData.signature}
              />
              {errors.signature && (
                <p className="text-sm font-medium text-red-500 mt-1">
                  {errors.signature}
                </p>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between gap-5">
          <div>
            <Button variant="outline" onClick={() => navigate(-1)}>
              Back
            </Button>
          </div>
          <div className="space-x-2 flex">
            <Button
              variant="destructive"
              size={"sm"}
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button size={"sm"} variant="default" type="submit">
              Accept & Continue
            </Button>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
