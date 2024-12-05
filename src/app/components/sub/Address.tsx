"use client";
import { AddressData } from "@/app/page";
import React, { useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { MdOutlineExpandLess, MdOutlineExpandMore } from "react-icons/md";

interface AddressProps {
  address: AddressData;
}

// const handleDelete() => {
//     return
// }

const Address = ({ address }: AddressProps) => {
  const [expand, setExpand] = useState(false);
  const handleExpand = () => {
    setExpand(!expand);
  };
  return (
    <li className="flex items-center h-8 space-x-2">
      {expand ? (
        <MdOutlineExpandMore onClick={handleExpand} />
      ) : (
        <MdOutlineExpandLess onClick={handleExpand} />
      )}
      <div>{address.id}</div>
      <div>Number of Transactions: {address.number_txns}</div>
      <div>Balance: {address.current_balance}</div>
      <div>
        <FaRegTrashCan onClick={() => console.log("deleted")} />
      </div>
      <div>{JSON.stringify(address.transactions)}</div>
    </li>
  );
};

export default Address;
