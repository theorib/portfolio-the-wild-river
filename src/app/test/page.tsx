// import {
//   NavigationMenuVertical,
//   NavigationMenuVerticalList,
//   NavigationMenuVerticalItem,
//   NavigationMenuVerticalContent,
//   NavigationMenuVerticalTrigger,
//   NavigationMenuVerticalLink,
//   NavigationMenuVerticalIndicator,
//   NavigationMenuVerticalSub,
//   NavigationMenuVerticalViewport,
//   NavigationMenuVerticalTooltip,
//   NavigationMenuVerticalTooltipTrigger,
//   NavigationMenuVerticalTooltipContent,
//   NavigationMenuVerticalTooltipProvider,
// } from '@/components/admin-panel/NavigationMenuVertical';
// import paths from '@/lib/constants/paths';
// import Link from 'next/link';
// import {
//   CalendarDays,
//   LayoutDashboard,
//   School,
//   Settings,
//   Users,
// } from 'lucide-react';
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from '@/components/ui/accordion';

// const iconSize = 20;
// const strokeWidth = 1;

// export default function TestPage() {
//   return (
//     <div className="w-[300px] bg-red-200">
//       <NavigationMenuVertical>
//         <NavigationMenuVerticalList>
//           <NavigationMenuVerticalItem>
//             <NavigationMenuVerticalTooltipProvider>
//               <NavigationMenuVerticalTooltip delayDuration={100}>
//                 <NavigationMenuVerticalTooltipTrigger asChild>
//                   <NavigationMenuVerticalLink asChild>
//                     <Link href={paths.dashboard.pathname}>
//                       <LayoutDashboard
//                         size={iconSize}
//                         strokeWidth={strokeWidth}
//                       />
//                       Dashboard
//                     </Link>
//                   </NavigationMenuVerticalLink>
//                 </NavigationMenuVerticalTooltipTrigger>
//                 <NavigationMenuVerticalTooltipContent side="right">
//                   Dashboard
//                 </NavigationMenuVerticalTooltipContent>
//                 <NavigationMenuVerticalLink
//                   asChild
//                 ></NavigationMenuVerticalLink>
//                 <NavigationMenuVerticalIndicator />
//               </NavigationMenuVerticalTooltip>
//             </NavigationMenuVerticalTooltipProvider>
//           </NavigationMenuVerticalItem>
//           <NavigationMenuVerticalItem asChild>
//             <NavigationMenuVerticalLink asChild>
//               <Link href={paths.bookings.pathname}>Bookings</Link>
//             </NavigationMenuVerticalLink>
//           </NavigationMenuVerticalItem>
//           <NavigationMenuVerticalItem>
//             <NavigationMenuVerticalTrigger>
//               Item with Sub Items
//             </NavigationMenuVerticalTrigger>
//             <NavigationMenuVerticalContent>
//               <NavigationMenuVerticalSub>
//                 <NavigationMenuVerticalList>
//                   <NavigationMenuVerticalItem>
//                     <NavigationMenuVerticalLink href="#">
//                       Sub Item 1
//                     </NavigationMenuVerticalLink>
//                   </NavigationMenuVerticalItem>
//                   <NavigationMenuVerticalItem>
//                     <NavigationMenuVerticalLink href="#">
//                       Sub Item 2
//                     </NavigationMenuVerticalLink>
//                   </NavigationMenuVerticalItem>
//                 </NavigationMenuVerticalList>
//               </NavigationMenuVerticalSub>
//             </NavigationMenuVerticalContent>
//           </NavigationMenuVerticalItem>
//           <NavigationMenuVerticalItem>
//             <NavigationMenuVerticalLink asChild>
//               <Link href={paths.cabins.pathname}>Cabins</Link>
//             </NavigationMenuVerticalLink>
//           </NavigationMenuVerticalItem>
//           <NavigationMenuVerticalItem>
//             <NavigationMenuVerticalLink asChild>
//               <Link href={paths.users.pathname}>Users</Link>
//             </NavigationMenuVerticalLink>
//           </NavigationMenuVerticalItem>
//           <NavigationMenuVerticalItem>
//             <NavigationMenuVerticalLink asChild>
//               <Link href={paths.settings.pathname}>Settings</Link>
//             </NavigationMenuVerticalLink>
//           </NavigationMenuVerticalItem>
//           <NavigationMenuVerticalItem>
//             <NavigationMenuVerticalTrigger>
//               Item with Sub Items 2
//             </NavigationMenuVerticalTrigger>
//             <NavigationMenuVerticalContent>
//               <NavigationMenuVerticalSub>
//                 <NavigationMenuVerticalList>
//                   <NavigationMenuVerticalItem>
//                     <NavigationMenuVerticalLink href="#">
//                       Sub Item 1
//                     </NavigationMenuVerticalLink>
//                   </NavigationMenuVerticalItem>
//                   <NavigationMenuVerticalItem>
//                     <NavigationMenuVerticalLink href="#">
//                       Sub Item 2
//                     </NavigationMenuVerticalLink>
//                   </NavigationMenuVerticalItem>
//                 </NavigationMenuVerticalList>
//               </NavigationMenuVerticalSub>
//             </NavigationMenuVerticalContent>
//           </NavigationMenuVerticalItem>
//         </NavigationMenuVerticalList>
//       </NavigationMenuVertical>
//     </div>
//   );
// }
export default function page() {
  return <div></div>;
}
