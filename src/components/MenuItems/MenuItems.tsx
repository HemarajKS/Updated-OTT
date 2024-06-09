import React from "react";
import DropdownItem from "../DropdownItem/DropdownItem";

const MenuItems = ({ menuData }: any) => {
  return (
    <div className="relative font-sans font-semibold text-20 leading-26.4px text-light-grey-1 flex max-sm:text-18">
      {menuData.length > 0 &&
        menuData.map((menu: any) =>
          menu.items.map((item: any, index: number) => (
            <div key={index}>
              <DropdownItem item={item} />
            </div>
          ))
        )}
    </div>
  );
};

export default MenuItems;
