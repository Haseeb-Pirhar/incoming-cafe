// "use client";

// import ReusableAvatar from "@/components/ui/avatar";
// import MediaPreview from "@/components/ui/MediaPreview";
// import { useAuthStore } from "@/store/profileStore";
// import * as Dialog from "@radix-ui/react-dialog";
// import { Badge } from "@radix-ui/themes";
// import { X } from "lucide-react";
// import moment from "moment";
// import { redirect } from "next/navigation";
// import { BsChatDots } from "react-icons/bs";

// interface dataDetailsDialogProps {
//   data: any;
//   button?: React.ReactNode;
// }

// export default function DetailsDialog({
//   data,
//   button = (
//     <div className="cursor-pointer! text-sm capitalize min-w-[30%]! border border-[#2F4F3E]/30 text-[#2F4F3E] px-3 py-1 rounded-md! font-medium hover:bg-[#2F4F3E]/5 transition-colors">
//       View Details
//     </div>
//   ),
// }: dataDetailsDialogProps) {
//   if (!data) return null;
//   const { setChannels, channels, setSelectedChannel } = useAuthStore();

//   return (
//     <div className="relative" style={{ fontFamily: "'Work Sans', sans-serif" }}>
//       <Dialog.Root>
//         <Dialog.Trigger>{button}</Dialog.Trigger>

//         <Dialog.Overlay className="fixed inset-0 bg-[#2F4F3E]/40 z-40" />

//         <Dialog.Content
//           className="fixed z-50 top-[50%] left-[50%] max-h-[70vh] w-[90vw] max-w-3xl 
//           -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-[#FAF3E3] border border-[#D4A017]/30 shadow-2xl overflow-y-auto"
//         >
//           {/* Header */}
//           <div className="flex items-center justify-between p-5 border-b border-[#D4A017]/20">
//             <Dialog.Title
//               className="text-xl font-semibold text-[#2F4F3E] flex items-center gap-2"
//               style={{ fontFamily: "'Fraunces', serif" }}
//             >
//               {data?.title || data?.name || data?.fullName}
//               {data?.createdBy && (
//                 <Badge className="rounded! bg-[#D4A017]! text-[#2F4F3E]!">
//                   Created by Admin
//                 </Badge>
//               )}
//             </Dialog.Title>
//             <Dialog.Close asChild>
//               <button className="text-[#2F4F3E]/50 hover:text-[#2F4F3E] transition-colors">
//                 <X size={22} />
//               </button>
//             </Dialog.Close>
//           </div>

//           {/* Body */}
//           <div className="p-5 space-y-3 text-[#2F4F3E]">
//             {/* Images */}
//             <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
//               {data.media?.map((img: string, idx: number) => (
//                 <MediaPreview
//                   key={idx}
//                   src={img}
//                   alt={`item-photo-${idx + 1}`}
//                   width="100%"
//                   height="160px"
//                 />
//               ))}
//             </div>

//             <div className="flex flex-col gap-2 relative w-fit">
//               <strong style={{ fontFamily: "'Fraunces', serif" }}>
//                 Owned By:
//               </strong>
//               <div className="absolute top-3 right-0 cursor-pointer bg-[#A5432A] p-1.5 rounded-full text-[#FAF3E3] shadow-md hover:bg-[#A5432A]/85 transition-colors">
//                 <BsChatDots
//                   size={18}
//                   onClick={() => {
//                     createPostOwnerChannel(
//                       `${data?.owner?.type === "business" ? "group" : "private"}_${Date.now()}`,
//                       "support",
//                       `Chat with ${data.owner?.fullName || data?.fullName}`,
//                       [data.owner?._id as string],
//                       data?.owner?.type === "business" ? "Store" : "User",
//                     );
//                   }}
//                 />
//               </div>
//               <ReusableAvatar
//                 image={data.owner?.image || data?.image}
//                 title={data.owner?.fullName || data?.fullName}
//                 subtitle={data.owner?.email || data?.email}
//                 size="6"
//                 radius="medium"
//                 titleSize="4"
//                 subTitleSize="3"
//               />
//             </div>

//             <p>
//               <strong style={{ fontFamily: "'Fraunces', serif" }}>
//                 Created At:
//               </strong>{" "}
//               <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>
//                 {moment(data.createdAt).format("LLL")}
//               </span>
//             </p>
//             <p>
//               <strong style={{ fontFamily: "'Fraunces', serif" }}>
//                 Price:
//               </strong>{" "}
//               <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>
//                 {data?.price?.toLocaleString()} {data.currency}
//               </span>
//             </p>
//             <p>
//               <strong style={{ fontFamily: "'Fraunces', serif" }}>
//                 Status:
//               </strong>{" "}
//               {data.status}
//             </p>

//             <div className="text-[#2F4F3E]/70">
//               <strong
//                 className="text-[#2F4F3E]"
//                 style={{ fontFamily: "'Fraunces', serif" }}
//               >
//                 Address:
//               </strong>{" "}
//               {data.address}, {data.city}, {data.state}, {data.country}
//             </div>

//             <div className="text-[#2F4F3E]/70">
//               <strong
//                 className="text-[#2F4F3E]"
//                 style={{ fontFamily: "'Fraunces', serif" }}
//               >
//                 Description:
//               </strong>
//               <p className="mt-1">{data.description}</p>
//             </div>

//             {data?.listingType === "Property" && (
//               <>
//                 <hr className="my-4 border-[#D4A017]/20" />
//                 <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm text-[#2F4F3E]/80">
//                   <p>
//                     <strong className="text-[#2F4F3E]">Category:</strong>{" "}
//                     {data.category}
//                   </p>
//                   <p>
//                     <strong className="text-[#2F4F3E]">Status:</strong>{" "}
//                     {data.status}
//                   </p>
//                   <p>
//                     <strong className="text-[#2F4F3E]">Bedrooms:</strong>{" "}
//                     {data.bedrooms}
//                   </p>
//                   <p>
//                     <strong className="text-[#2F4F3E]">Bathrooms:</strong>{" "}
//                     {data.bathrooms}
//                   </p>
//                   <p>
//                     <strong className="text-[#2F4F3E]">Garages:</strong>{" "}
//                     {data.garages}
//                   </p>
//                   <p>
//                     <strong className="text-[#2F4F3E]">Area:</strong>{" "}
//                     {data.area} {data.areaUnit}
//                   </p>
//                   <p>
//                     <strong className="text-[#2F4F3E]">Furnishing:</strong>{" "}
//                     {data.furnishing}
//                   </p>
//                   <p>
//                     <strong className="text-[#2F4F3E]">Floor Level:</strong>{" "}
//                     {`${data.floorLevel?.from} to ${data.floorLevel?.to}`}
//                   </p>
//                 </div>
//                 <hr className="my-4 border-[#D4A017]/20" />
//                 <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
//                   <FeatureList
//                     title="Interior Features"
//                     items={data.interiorFeatures}
//                   />
//                   <FeatureList
//                     title="Kitchen Features"
//                     items={data.kitchenFeatures}
//                   />
//                   <FeatureList
//                     title="Outdoor Features"
//                     items={data.outdoorFeatures}
//                   />
//                 </div>
//               </>
//             )}

//             {data?.listingType === "Vehicle" && (
//               <>
//                 <hr className="my-4 border-[#D4A017]/20" />
//                 <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm text-[#2F4F3E]/80">
//                   <p>
//                     <strong className="text-[#2F4F3E]">Manufacturer:</strong>{" "}
//                     {data.manufacturer}
//                   </p>
//                   <p>
//                     <strong className="text-[#2F4F3E]">Model:</strong>{" "}
//                     {data.model}
//                   </p>
//                   <p>
//                     <strong className="text-[#2F4F3E]">Model Year:</strong>{" "}
//                     {moment(data.modelYear).format("YYYY")}
//                   </p>
//                   <p>
//                     <strong className="text-[#2F4F3E]">Condition:</strong>{" "}
//                     {data.condition}
//                   </p>
//                   <p>
//                     <strong className="text-[#2F4F3E]">Vehicle Type:</strong>{" "}
//                     {data.vehicleType}
//                   </p>
//                   <p>
//                     <strong className="text-[#2F4F3E]">Category:</strong>{" "}
//                     {data.category}
//                   </p>
//                   <p>
//                     <strong className="text-[#2F4F3E]">Fuel:</strong>{" "}
//                     {data.fuel}
//                   </p>
//                   <p>
//                     <strong className="text-[#2F4F3E]">Transmission:</strong>{" "}
//                     {data.transmission}
//                   </p>
//                   <p>
//                     <strong className="text-[#2F4F3E]">Engine Size:</strong>{" "}
//                     {data.engineSize}
//                   </p>
//                   <p>
//                     <strong className="text-[#2F4F3E]">Drivetrain:</strong>{" "}
//                     {data.drivetrain}
//                   </p>
//                   <p>
//                     <strong className="text-[#2F4F3E]">Doors:</strong>{" "}
//                     {data.doors}
//                   </p>
//                   <p>
//                     <strong className="text-[#2F4F3E]">Seats:</strong>{" "}
//                     {data.seats}
//                   </p>
//                   <p>
//                     <strong className="text-[#2F4F3E]">Mileage:</strong>{" "}
//                     {data.mileage?.toLocaleString()} km
//                   </p>
//                   <p>
//                     <strong className="text-[#2F4F3E]">Exterior:</strong>{" "}
//                     {data.exterior}
//                   </p>
//                   <p>
//                     <strong className="text-[#2F4F3E]">Interior:</strong>{" "}
//                     {data.interior}
//                   </p>
//                   <p>
//                     <strong className="text-[#2F4F3E]">Import Status:</strong>{" "}
//                     {data.importStatus}
//                   </p>
//                   <p>
//                     <strong className="text-[#2F4F3E]">Custom Import:</strong>{" "}
//                     {data.customImport}
//                   </p>
//                   <p>
//                     <strong className="text-[#2F4F3E]">Warranty:</strong>{" "}
//                     {data.warranty}
//                   </p>
//                   <p>
//                     <strong className="text-[#2F4F3E]">Wheels:</strong>{" "}
//                     {data.wheels}
//                   </p>
//                 </div>
//                 <hr className="my-4 border-[#D4A017]/20" />
//                 <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
//                   <FeatureList title="Comfort Features" items={data.comfort} />
//                   <FeatureList title="Safety Features" items={data.safety} />
//                   <FeatureList
//                     title="Technology Features"
//                     items={data.technology}
//                   />
//                   <FeatureList title="Eco-Friendly" items={data.ecoFriendly} />
//                 </div>
//               </>
//             )}
//           </div>
//         </Dialog.Content>
//       </Dialog.Root>
//     </div>
//   );
// }

// const FeatureList = ({ title, items }: { title: string; items: string[] }) => (
//   <div>
//     <h4
//       className="font-semibold text-[#2F4F3E] mb-1"
//       style={{ fontFamily: "'Fraunces', serif" }}
//     >
//       {title}
//     </h4>
//     <ul className="list-disc list-inside text-sm text-[#2F4F3E]/70 space-y-0.5">
//       {items?.map((item, i) => (
//         <li key={i}>{item}</li>
//       ))}
//     </ul>
//   </div>
// );
