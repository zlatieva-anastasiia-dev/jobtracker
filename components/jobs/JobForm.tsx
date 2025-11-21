"use client";

// import { useFormState, useFormStatus } from "react-dom";
// // Assuming you update these actions to handle the full Job object structure
// // import { createJob, updateJob } from "@/lib/actions/jobActions";
// import { Job } from "@/types/types";
// import { initialJobData, statusOptions } from "@/lib/constants";

// function SubmitButton({ isEditing }: { isEditing: boolean }) {
//   const { pending } = useFormStatus();
//   const label = isEditing ? "Save Changes" : "Create Job";

//   return (
//     <button
//       type="submit"
//       disabled={pending}
//       className={`p-2 rounded text-white ${
//         pending ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
//       }`}
//     >
//       {pending ? (isEditing ? "Saving..." : "Creating...") : label}
//     </button>
//   );
// }
// // ---------------------------------------------------

// const initialState = { success: false, error: null, message: "" };

// export function JobForm({ isEditing }: { isEditing: boolean }) {
//   // const data = initialData || initialJobData;
//   // const isEditing = !!initialData;
//   // const jobId = data.id.toString();
//   const updateJob = alert("Update Job action called"); // Placeholder
//   const createJob = alert("Create Job action called"); // Placeholder

//   const actionToUse = isEditing ? updateJob : createJob;

//   // const [state, formAction] = useFormState(actionToUse, initialState);

//   return (
//     <form
//       action={formAction}
//       className="space-y-8 p-6 bg-white rounded-xl shadow-lg"
//     >
//       <h2 className="text-3xl font-bold text-blue-600">
//         {isEditing ? `Edit Job: ${data.title}` : "Post New Job Listing"}
//       </h2>

//       <div className="space-y-4 border-b pb-6">
//         <h3 className="text-xl font-semibold text-gray-800">Job Details</h3>

//         <div>
//           <label htmlFor="title" className="form-label">
//             Job Title
//           </label>
//           <input
//             type="text"
//             id="title"
//             name="title"
//             defaultValue={data.title}
//             required
//             className="form-input"
//           />
//         </div>

//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label htmlFor="company" className="form-label">
//               Company
//             </label>
//             <input
//               type="text"
//               id="company"
//               name="company"
//               // defaultValue={data.company}
//               required
//               className="form-input"
//             />
//           </div>
//           <div>
//             <label htmlFor="location" className="form-label">
//               Location
//             </label>
//             <input
//               type="text"
//               id="location"
//               name="location"
//               // defaultValue={data.location}
//               className="form-input"
//             />
//           </div>
//         </div>

//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label htmlFor="status" className="form-label">
//               Status
//             </label>
//             <select
//               id="status"
//               name="status"
//               // defaultValue={data.status}
//               required
//               className="form-input"
//             >
//               {statusOptions.map((status) => (
//                 <option key={status} value={status}>
//                   {status}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label htmlFor="date" className="form-label">
//               Application Date
//             </label>
//             <input
//               type="date"
//               id="date"
//               name="date"
//               // defaultValue={data.date.substring(0, 10)}
//               required
//               className="form-input"
//             />
//           </div>
//         </div>

//         {/* Description */}
//         <div>
//           <label htmlFor="description" className="form-label">
//             Description
//           </label>
//           <textarea
//             id="description"
//             name="description"
//             // defaultValue={data.description}
//             rows={5}
//             className="form-input"
//           />
//         </div>
//       </div>

//       {/* 2. Contact Information Section (Nested Fields) */}
//       <div className="space-y-4">
//         <h3 className="text-xl font-semibold text-gray-800">Contact Person</h3>
//         <div className="grid grid-cols-3 gap-4">
//           <div>
//             <label htmlFor="contactName" className="form-label">
//               Name
//             </label>
//             <input
//               type="text"
//               id="contactName"
//               name="contactName"
//               // defaultValue={data.contact.name}
//               className="form-input"
//             />
//           </div>
//           <div>
//             <label htmlFor="contactEmail" className="form-label">
//               Email
//             </label>
//             <input
//               type="email"
//               id="contactEmail"
//               name="contactEmail"
//               // defaultValue={data.contact.email}
//               className="form-input"
//             />
//           </div>
//           <div>
//             <label htmlFor="contactPhone" className="form-label">
//               Phone
//             </label>
//             <input
//               type="tel"
//               id="contactPhone"
//               name="contactPhone"
//               // defaultValue={data.contact.phone}
//               className="form-input"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Hidden ID for editing mode */}
//       {isEditing && <input type="hidden" name="id" value={jobId} />}

//       <SubmitButton isEditing={isEditing} />

//       {state.success && (
//         <p className="text-green-500 font-medium">{state.message}</p>
//       )}
//       {state.error && <p className="text-red-500 font-medium">{state.error}</p>}
//     </form>
//   );
// }

export function JobForm({
  isEditing,
  jobId,
}: {
  isEditing: boolean;
  jobId: string;
}) {
  console.log({ isEditing, jobId });
  return (
    <div>
      Job Form Component
      <p>isEditing: {isEditing.toString()}</p>
      <p>jobId: {jobId}</p>
    </div>
  );
}
