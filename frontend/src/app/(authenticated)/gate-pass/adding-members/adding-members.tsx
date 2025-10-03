// import { useCheckin } from '../../../../hooks/useCheckIn';
// import { Button } from '../../../../components/ui/button';
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../../../components/ui/card';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../../components/ui/table';
// import { UserPlus, UserX, Edit } from 'lucide-preact';
// import { useEffect } from 'preact/hooks';
// import { useNavigate } from 'react-router-dom';

// export default function AddVisitorPage() {
//   const navigate = useNavigate();
//   const { state, dispatch } = useCheckin();
//   const { visitors } = state;

//   useEffect(() => {
//     // If there are no visitors, redirect to start
//     if (visitors.length === 0) {
//       navigate('/gate-pass/basic-details');
//     }
//   }, [visitors, navigate]);

//   const handleAddVisitor = () => {
//     dispatch({ type: 'START_ADDING_VISITOR', payload: {} });
//     navigate('/gate-pass/basic-details');
//   };
  
//   const handleEditVisitor = (index: number) => {
//     dispatch({ type: 'START_ADDING_VISITOR', payload: { index } });
//     navigate('/gate-pass/basic-details');
//   };
  
//   const handleRemoveVisitor = (index: number) => {
//     if (visitors[index].isPrimary) {
//       alert("You cannot remove the primary visitor.");
//       return;
//     }
//     if (confirm('Are you sure you want to remove this visitor?')) {
//       dispatch({ type: 'REMOVE_VISITOR', payload: { index } });
//     }
//   };

//   const handleNext = () => {
//     navigate('/gate-pass/nda-signing');
//   };

//   if (visitors.length === 0) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <Card className="w-full max-w-4xl shadow-lg">
//       <CardHeader>
//         <CardTitle className="font-headline text-2xl">Visitor Group</CardTitle>
//         <CardDescription>
//           Review the list of visitors. Add or edit members as needed. The first person is the primary contact.
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <div className="mb-4 rounded-md border">
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Photo</TableHead>
//                 <TableHead>Name</TableHead>
//                 <TableHead>Email</TableHead>
//                 <TableHead className="text-right">Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {visitors.map((visitor, index) => (
//                 <TableRow key={index}>
//                   <TableCell>
//                     <div className="relative h-10 w-10 overflow-hidden rounded-full">
//                       {visitor.photograph ? (
//                         <img src={visitor.photograph} alt="Visitor" className="h-full w-full object-cover" />
//                       ) : (
//                         <div className="h-full w-full bg-gray-200 flex items-center justify-center text-xs text-gray-500">
//                           No Photo
//                         </div>
//                       )}
//                     </div>
//                   </TableCell>
//                   <TableCell className="font-medium">
//                     {`${visitor.basicDetails.firstName} ${visitor.basicDetails.lastName}`}
//                     {visitor.isPrimary && (
//                       <span className="ml-2 text-xs text-gray-500">(Primary)</span>
//                     )}
//                   </TableCell>
//                   <TableCell>{visitor.basicDetails.email}</TableCell>
//                   <TableCell className="text-right space-x-1">
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       onClick={() => handleEditVisitor(index)}
//                     >
//                       <Edit className="h-4 w-4" />
//                       <span className="sr-only">Edit Visitor</span>
//                     </Button>
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       className="text-red-600 hover:text-red-700"
//                       onClick={() => handleRemoveVisitor(index)}
//                       disabled={visitor.isPrimary}
//                     >
//                       <UserX className="h-4 w-4" />
//                       <span className="sr-only">Remove Visitor</span>
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </div>
//         <Button variant="outline" onClick={handleAddVisitor}>
//           <UserPlus className="mr-2 h-4 w-4" />
//           Add Another Visitor
//         </Button>
//       </CardContent>
//       <CardFooter className="flex justify-between">
//         <Button variant="outline" onClick={() => navigate('/gate-pass/company-details')}>
//           Back to Company Details
//         </Button>
//         <Button onClick={handleNext} disabled={visitors.length === 0}>
//           Continue to NDA
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// }