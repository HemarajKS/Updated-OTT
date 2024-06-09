"use client";
import { request } from "@/services/fetchData";
import { constants } from "@/assets/constants/constants";
import type { Metadata } from "next";
import { URL } from "@/assets/constants/apiRequest";
import { useEffect, useState } from "react";
import { ErrorLogger } from "@/services/ErrorLogger";
import getComponent from "@/services/PackageSelector";

// export const metadata: Metadata = {
//   title: "Home Page",
//   description: "...",
// };

const Home = () => {
  // const [homeData, setHomeData] = useState([]);
  // const logger = new ErrorLogger();

  // const fetchHomeData = async () => {
  //   try {
  //     const data = await request(URL?.GET_Home_Data, constants.GET);
  //     setHomeData(data?.curation?.packages);
  //   } catch (error: any) {
  //     logger.logError(
  //       "Menu",
  //       error?.message as string,
  //       new Date().toISOString()
  //     );
  //   }
  // };

  // useEffect(() => {
  //   fetchHomeData();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // {
  //   homeData &&
  //     homeData?.length > 0 &&
  //     homeData?.map((content: any, i: number) => {
  //       const Component = getComponent(content.packageType);

  //       return (
  //         <div key={i}>
  //           <Component data={content.items} title={content.title} />
  //         </div>
  //       );
  //     });
  // }

  return <main className="h-full"></main>;
};

export default Home;
