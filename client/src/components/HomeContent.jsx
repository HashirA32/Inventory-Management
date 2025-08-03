import React from "react";
import MainChart from "./MainChart";
import { SideChart } from "./SideChart";
import { FaBoxes } from "react-icons/fa";

const HomeContent = () => {
  return (
    <>
      <div className="my-17 mx-5 w-full flex flex-col justify-center items-center">
        <div className="flex flex-col md:flex-row items-center justify-center gap-20 ">
          <div className="border rounded-2xl w-90 h-40 p-5">
            <div className="font-bold text-2xl">Inventory Summary</div>
            <div className="flex p-3 m-2 gap-2 ">
              <div className="flex flex-col gap-1 p-1 items-center justify-center w-[50%]">
                <div>
                  <FaBoxes />
                </div>
                <div>1546</div>
                <div className="text-[12px]">Quantity in Hand</div>
              </div>
              <div className="border-r-1 border-[#2123233d]"></div>
              <div className="flex flex-col gap-1 p-1 items-center justify-center ">
                <div>
                  <FaBoxes />
                </div>
                <div>1546</div>
                <div className="text-[12px]">Quantity to be dilivered</div>
              </div>
            </div>
          </div>
          <div>
            <SideChart />
          </div>
        </div>
        <div className="w-full px-10 my-5 ">
          <div className="font-bold text-2xl my-5">Sales Overview</div>
          <MainChart />
        </div>
      </div>
    </>
  );
};

export default HomeContent;
