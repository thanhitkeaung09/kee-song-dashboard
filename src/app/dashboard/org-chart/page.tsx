import React from "react";
import dynamic from "next/dynamic";

const DynamicHeader = dynamic(
  () => import("../../../components/ui/dashborad/chart/OrgChart"),
  {
    ssr: false,
  }
);

const Chart = () => {
  return (
    <div className="">
      <DynamicHeader />
    </div>
  );
};

export default Chart;

// import dynamic from "next/dynamic";

// const DynamicHeader = dynamic(() => import("../../ui/organization/chart"), {
//   ssr: false,
// });

// export default function Page() {
//   return (
//     <div className="">
//       <DynamicHeader />
//     </div>
//   );
// }
