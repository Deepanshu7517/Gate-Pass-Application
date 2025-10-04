import { useEffect } from "react";
import { Button } from "../../../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../../components/ui/table";
import { UserPlus, UserX, User, Users } from "lucide-preact";
import { useNavigate } from "react-router-dom";
import { useCheckin } from "../../../../../hooks/useCheckIn";

export default function AddVisitorPage() {
  const navigate = useNavigate();
  const { checkinState, addNewMember } = useCheckin();

  // Log state after render for debugging
  useEffect(() => {
    console.log(
      "Current State:",
      checkinState.members?.length,
      checkinState.currentMemberIndex
    );
  }, [checkinState]);

  const handleAddMember = () => {
    // Add new member to Redux store and get the index
    const newMemberIndex = addNewMember();
    
    console.log("New member added at index:", newMemberIndex);
    console.log("Current state:", checkinState);

    // Navigate to the Basic Details page for the new member
    navigate(`/visitor-entry-exit/checkin/add-members/${newMemberIndex}/basic-details`);
  };

  const handleEditMember = (index: number) => {
    // Navigate to edit existing member
    navigate(`/visitor-entry-exit/checkin/add-members/${index}/basic-details`);
  };

  const handleNext = () => {
    // Proceed to NDA signing
    navigate("/visitor-entry-exit/checkin/nda-signing");
  };

  const hasMembersAdded = checkinState.members && checkinState.members.length > 0;

  return (
    <Card className="w-full max-w-4xl shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Visitor Group</CardTitle>
        <CardDescription>
          Review the list of visitors. Add or edit members as needed. The first
          person is the primary contact.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Primary Visitor Section */}
        <div>
          <h3 className="font-semibold flex items-center gap-2 mb-3">
            <User className="h-5 w-5" />
            Primary Visitor
          </h3>
          <div className="rounded-md border border-[#d4d7de]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Photo</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <div className="relative h-10 w-10 overflow-hidden rounded-full">
                      {checkinState.photograph ? (
                        <img
                          src={checkinState.photograph}
                          alt="Primary visitor"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                          <User className="h-5 w-5" />
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    {`${checkinState.basicDetails.firstName || "Primary"} ${
                      checkinState.basicDetails.lastName || "Visitor"
                    }`}
                    <span className="ml-2 text-xs text-gray-500">(Primary)</span>
                  </TableCell>
                  <TableCell>{checkinState.basicDetails.email || "N/A"}</TableCell>
                  <TableCell className="text-right space-x-1">
                    <Button variant="ghost" size="icon" disabled title="Primary visitor cannot be removed">
                      <UserX className="h-4 w-4 text-gray-300" />
                      <span className="sr-only">Remove Visitor</span>
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Team Members Section */}
        {hasMembersAdded ? (
          <div>
            <h3 className="font-semibold flex items-center gap-2 mb-3">
              <Users className="h-5 w-5" />
              Team Members ({checkinState.members?.length})
            </h3>
            <div className="rounded-md border border-[#d4d7de]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Photo</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {checkinState.members?.map((member, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="relative h-10 w-10 overflow-hidden rounded-full">
                          {member.photograph ? (
                            <img
                              src={member.photograph}
                              alt={`${member.basicDetails.firstName} photograph`}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                              <User className="h-5 w-5 text-gray-500" />
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {`${member.basicDetails.firstName || "Unnamed"} ${
                          member.basicDetails.lastName || "Member"
                        }`}
                      </TableCell>
                      <TableCell>{member.basicDetails.email || "N/A"}</TableCell>
                      <TableCell className="text-right space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditMember(index)}
                        >
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 border-2 border-dashed rounded-lg">
            <Users className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No team members added</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Get started by adding a team member to accompany the primary visitor.
            </p>
          </div>
        )}

        {/* Add Member Button */}
        <Button variant="outline" onClick={handleAddMember} className="w-full">
          <UserPlus className="mr-2 h-4 w-4" />
          Add Another Visitor
        </Button>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => navigate(-1)}>
          Back
        </Button>
        <Button onClick={handleNext}>Continue to NDA</Button>
      </CardFooter>
    </Card>
  );
}