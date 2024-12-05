"use client";
import { IAddress } from "@/app/page";
import React, { useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { MdOutlineExpandLess, MdOutlineExpandMore } from "react-icons/md";
import TransactionList from "../TransactionList";

interface AddressProps {
  address: IAddress;
  onDelete: (addressId: string) => void;
}

const Address = ({ address, onDelete }: AddressProps) => {
  const [expand, setExpand] = useState(false);

  return (
    <div className="border-b border-gray-100 last:border-none">
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setExpand(!expand)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                {expand ? (
                  <MdOutlineExpandLess size={20} />
                ) : (
                  <MdOutlineExpandMore size={20} />
                )}
              </button>
              <span className="font-mono text-sm text-gray-800 break-all">
                {address.id}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <div className="text-sm text-gray-500">Balance</div>
                <div className="font-semibold text-gray-900">
                  {(address.current_balance / 100000000).toFixed(8)} BTC
                </div>
              </div>

              <div>
                <div className="text-sm text-gray-500">Transactions</div>
                <div className="font-semibold text-gray-900">
                  {address.number_txns.toLocaleString()}
                </div>
              </div>

              <div>
                <div className="text-sm text-gray-500">Last Updated</div>
                <div className="text-sm text-gray-600">
                  {new Date(address.last_updated).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={() => onDelete(address.id)}
            className="text-gray-400 hover:text-red-500 transition-colors p-1"
          >
            <FaRegTrashCan size={16} />
          </button>
        </div>
      </div>
      {expand && (
        <div className="border-t border-gray-100 bg-gray-50">
          <div className="p-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">
              Transaction History
            </h3>
            <TransactionList transactions={address.transactions} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Address;
