"use client";
import { useState } from "react";
import { AddressData } from "../page";
import Address from "./sub/Address";

interface AddressListProps {
  addresses: AddressData[] | null;
}

const AddressList = ({ addresses }: AddressListProps) => {
  return (
    <ul>
      {addresses &&
        addresses.map((address, i) => <Address key={i} address={address} />)}
    </ul>
  );
};

export default AddressList;
