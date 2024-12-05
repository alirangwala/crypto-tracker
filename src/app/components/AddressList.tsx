"use client";
import { useState } from "react";
import { IAddress } from "../page";
import Address from "./sub/Address";

interface AddressListProps {
  addresses: IAddress[] | null;
  setAddresses: (addresses: IAddress[] | null) => void;
}

const AddressList = ({ addresses, setAddresses }: AddressListProps) => {
  const handleDelete = (addressId: string) => {
    if (!addresses) return;
    const updatedAddresses = addresses.filter((addr) => addr.id !== addressId);
    setAddresses(updatedAddresses.length > 0 ? updatedAddresses : null);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 p-6 border-b">
        Your Addresses
      </h2>
      {!addresses || addresses.length === 0 ? (
        <div className="p-6 text-gray-500 text-center">
          No addresses added yet
        </div>
      ) : (
        <ul className="divide-y divide-gray-100">
          {addresses.map((address, i) => (
            <li
              key={i}
              className="hover:bg-gray-50 transition-colors duration-150"
            >
              <Address address={address} onDelete={handleDelete} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddressList;
