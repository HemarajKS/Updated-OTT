import { URL } from "@/assets/constants/apiRequest";
import { constants } from "@/assets/constants/constants";
import Footer from "@/components/Footer/Footer";
import { request } from "@/services/fetchData";
import React from "react";

const FooterBlock = async () => {
  const data = await request(URL?.GET_FOOTER, constants.GET);

  return (
    <div>
      <Footer data={data?.data[0]} />
    </div>
  );
};

export default FooterBlock;
