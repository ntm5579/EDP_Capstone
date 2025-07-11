import React from "react";
import BackButton from "../other/BackButton";
function OrderHistory() {
  return (
    <>
      <div className="w-[1200px] border mx-auto mt-20 bg-black text-white p-8 rounded-lg">
        <div className="mb-4">
          <BackButton />
        </div>
        <div>View Orders</div>
      </div>
    </>
  );
}

export default OrderHistory;
