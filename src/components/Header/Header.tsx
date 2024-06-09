"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import search from "../../assets/icons/search.svg";
import profile from "../../assets/icons/profile.svg";
import { constants, profileOptions } from "@/assets/constants/constants";
import Logo from "../Logo/Logo";
import MenuItems from "../MenuItems/MenuItems";
import List from "../List/List";
import { request } from "@/services/fetchData";
import { URL } from "@/assets/constants/apiRequest";
import { ErrorLogger } from "@/services/ErrorLogger";
import { useAuth } from "@/contexts/auth-context/authContext";
import { frontendRoutes } from "@/assets/constants/frontend-routes";
import strings from "@/assets/strings/strings.json";
import useBreakpoint from "@/hooks/useBreakpoint";
import SideMenu from "../SideMenu/SideMenu";

const Header = () => {
  const logger = new ErrorLogger();
  const [menuData, setMenuData] = useState({});
  const { isLoggedIn, logout } = useAuth();
  const breakpoint = useBreakpoint();

  const fetchMenuData = async () => {
    try {
      const data = await request(URL.GET_MENU, constants.GET);
      setMenuData(data?.data);
    } catch (error) {
      logger.logError("Menu", error, new Date().toISOString());
    }
  };

  useEffect(() => {
    fetchMenuData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const option = isLoggedIn ? strings.signOut : strings.signIn;
    const url = isLoggedIn ? "" : frontendRoutes.LOGIN;
    const func = isLoggedIn ? logout : undefined;

    addSignInOption(option, url, func);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  const addSignInOption = (option: string, url: string, func?: () => void) => {
    const signInOutIndex = profileOptions.children.findIndex(
      (item) => item.title === strings.signIn || item.title === strings.signOut
    );

    if (signInOutIndex !== -1) {
      profileOptions.children[signInOutIndex] = {
        title: option,
        url: url,
        function: func,
      };
    } else {
      profileOptions.children.unshift({
        title: option,
        url: url,
        function: func,
      });
    }
  };

  return (
    <div className="bg-black">
      <div className="container mx-auto flex gap-[50px] justify-between items-center relative max-sm:gap-[3px]">
        {breakpoint === "sm" ||
        breakpoint === "md" ||
        breakpoint === "default" ? (
          <SideMenu menuData={menuData} />
        ) : (
          <Logo />
        )}
        {breakpoint === "sm" ||
        breakpoint === "md" ||
        breakpoint === "default" ? (
          <Logo />
        ) : (
          menuData && <MenuItems menuData={menuData} />
        )}

        <div className=" font-sans font-semibold text-20 leading-26.4px text-light-grey-1 flex gap-[20px] items-center max-sm:gap-[3px]">
          <div
            className={` px-[10px] h-[64px] flex items-center hover:bg-dark-grey text-white cursor-pointer
            `}
          >
            <Image src={search} alt={"Search"} />
          </div>

          <div
            className={` px-[10px] h-[64px] flex items-center relative group hover:bg-dark-grey text-white cursor-pointer`}
          >
            <Image src={profile} alt="profile" className="h-[32px] w-[32px]" />
            <div className="bg-white hidden group-hover:block z-10">
              {<List options={profileOptions} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
