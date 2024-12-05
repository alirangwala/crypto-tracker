"use client";
import { useEffect, useState } from "react";
import AddressList from "./components/AddressList";
import AddressInput from "./components/AddressInput";
import AggregatedAddresses from "./components/AggregatedAddresses";

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

export default function Home() {
  const [addresses, setAddresses] = useState<IAddress[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await fetch("/api/addresses");
      const data = await response.json();
      setAddresses(data);
    } catch (error) {
      console.error("Failed to fetch addresses:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAddress = async (addressId: string) => {
    try {
      setAddresses(addresses?.filter((addr) => addr.id !== addressId) || null);
    } catch (error) {
      console.error("Failed to delete address:", error);
    }
  };

  const handleAddAddress = async (address: IAddress) => {
    try {
      const response = await fetch("/api/addresses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(address),
      });
      const newAddress = await response.json();
      setAddresses((prev) => (prev ? [...prev, newAddress] : [newAddress]));
    } catch (error) {
      console.error("Failed to add address:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <AddressInput setAddresses={setAddresses} addresses={addresses} />
      <AddressList
        addresses={addresses}
        onDeleteAddress={handleDeleteAddress}
      />
      <AggregatedAddresses addresses={addresses} />
    </div>
  );
}
