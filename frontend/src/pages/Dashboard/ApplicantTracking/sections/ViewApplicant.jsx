// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "/src/components/ui/table";
// import { PlusIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";

// import { Button } from "/src/components/ui/button";
// import { Input } from "/src/components/ui/input";

// const ViewApplicant = (prop) => {
//   return (
//     <section className="w-full bg-lilac-pale rounded-t-[2.5rem] p-8 flex flex-col">
//       <div className="flex justify-between items-center my-4">
//         <span className="relative flex items-center">
//           <MagnifyingGlassIcon
//             color="gray"
//             className="absolute left-3 h-6 w-6"
//           />
//           <Input
//             className="bg-white w-96 h-10 md:h-12 pl-10 text-base rounded-lg shadow-md border-none"
//             placeholder="Search Applicant"
//           />
//         </span>
//         <Button
//           size="lg"
//           className="text-base bg-lilac"
//           onClick={prop.onAddApplicant}
//         >
//           <PlusIcon color="white" className="h-6 w-6" />
//           Add Applicant
//         </Button>
//       </div>
//       <div className="bg-white flex-grow rounded-xl shadow-lg p-4">
//         <Table className="text-base">
//           <TableCaption>A list of new applicants</TableCaption>
//           <TableHeader>
//             <TableRow className="hover:bg-transparent">
//               <TableHead className="font-lato text-lilac font-bold  uppercase text-base w-4/12">
//                 Applicant
//               </TableHead>
//               <TableHead className="font-lato text-lilac font-bold  uppercase text-base w-3/12">
//                 Department
//               </TableHead>
//               <TableHead className="font-lato text-lilac font-bold  uppercase text-base w-3/12">
//                 Contact
//               </TableHead>
//               <TableHead className="font-lato text-lilac font-bold  uppercase text-base w-1/12">
//                 Status
//               </TableHead>
//               <TableHead className="font-lato text-lilac font-bold  uppercase text-base w-1/12"></TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             <TableRow>
//               <TableCell className="w-4/12"></TableCell>
//               <TableCell className="w-3/12"></TableCell>
//               <TableCell className="w-3/12"></TableCell>
//               <TableCell className="w-1/12"></TableCell>
//               <TableCell className="w-1/12"></TableCell>
//             </TableRow>
//           </TableBody>
//         </Table>
//       </div>
//     </section>
//   );
// };

// export default ViewApplicant;
