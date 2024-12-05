"use client";
import { useState } from "react";
import AddressList from "./components/AddressList";
import AddressInput from "./components/AddressInput";

export interface IAddress {
  id: string;
  number_txns: number;
  total_received: number;
  total_sent: number;
  current_balance: number;
  last_updated: string | number;
  transactions: ITransaction[];
}
export interface ITransaction {
  id: string;
  type: "sent" | "received";
  amount: number;
  timestamp: string;
}

export const sampleAddressData: IAddress[] = [
  {
    id: "123",
    number_txns: 5,
    total_received: 123,
    total_sent: 23,
    current_balance: 100,
    last_updated: "11/10/1993",
    transactions: [
      { id: "234312", type: "sent", amount: -5, timestamp: "11/10/1993" },
      { id: "234312", type: "sent", amount: -5, timestamp: "11/10/1993" },
    ],
  },
  {
    id: "124",
    number_txns: 6,
    total_received: 22,
    total_sent: 1,
    current_balance: 21,
    last_updated: "11/10/1993",
    transactions: [
      { id: "234312", type: "sent", amount: -5, timestamp: "11/10/1993" },
      { id: "234312", type: "sent", amount: -5, timestamp: "11/10/1993" },
    ],
  },
];

const sampleTransactions: Record<string, ITransaction[]> = {
  "123": [
    { id: "tx1", type: "received", amount: 50, timestamp: "2024-03-01" },
    { id: "tx2", type: "sent", amount: 20, timestamp: "2024-03-02" },
  ],
  "124": [{ id: "tx3", type: "received", amount: 21, timestamp: "2024-03-03" }],
};

export default function Home() {
  const [addresses, setAddresses] = useState<IAddress[] | null>(
    sampleAddressData
  );
  return (
    <div>
      <AddressInput setAddresses={setAddresses} addresses={addresses} />
      <AddressList addresses={addresses} setAddresses={setAddresses} />
    </div>
  );
}
