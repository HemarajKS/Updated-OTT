"use client";
import { URL } from "@/assets/constants/apiRequest";
import { constants } from "@/assets/constants/constants";
import InfiniteScroll from "@/components/InfiniteScroll/InfiniteScroll";
import Rails from "@/package/Rails/Rails";
import { ErrorLogger } from "@/services/ErrorLogger";
import getComponent from "@/services/PackageSelector";
import { request } from "@/services/fetchData";
import React, { useEffect, useState } from "react";

const TvShows = () => {
  const logger = new ErrorLogger();

  const fetchDataFromApi = async (
    skip: number,
    limit: number
  ): Promise<{ responseData: any[]; totalPages: number }> => {
    try {
      const response = await request(`${URL?.GET_ALL_TV_SHOWS}`, constants.GET);

      return {
        responseData: response?.data[0]?.packages,
        totalPages: Math.ceil(
          response?.pagination?.totalItems / constants.API_DATA_LIMIT - 1
        ),
      };
    } catch (error) {
      logger.logError("Menu", error, new Date().toISOString());
      return { responseData: [], totalPages: 0 };
    }
  };

  return (
    <>
      <InfiniteScroll
        fetchData={fetchDataFromApi}
        limit={5}
        containerClassName={""}
      >
        <ItemRenderer />
      </InfiniteScroll>
    </>
  );
};

const ItemRenderer: React.FC<{ item?: any }> = ({ item }) => {
  const Component = getComponent(item.packageType);

  return (
    <div key={item.id}>
      <Component data={item.contents} title={item.title} />
    </div>
  );
};

export default TvShows;
