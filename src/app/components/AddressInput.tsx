import React, { useState } from "react";
import { AddressData, Transaction } from "../page";

interface AddressListProps {
  setAddresses: (addresses: AddressData[]) => void;
  addresses: AddressData[] | null;
}

const AddressInput = ({ setAddresses, addresses }: AddressListProps) => {
  const [address, setAddress] = useState<AddressData | null>(null);
  const [input, setInput] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const formatTransactions = (txList: any, limit = 10): Transaction[] => {
    if (!Array.isArray(txList)) {
      return [];
    }
    return txList.slice(0, limit).map((tx) => ({
      id: tx.hash,
      type: tx.result < 0 ? "sent" : "received",
      amount: Math.abs(tx.result) / 100000000,
      timestamp: new Date(tx.time * 1000).toISOString(),
    }));
  };

  const fetchAddress = async (addressHash: string) => {
    try {
      const apiUrl = `https://blockchain.info/rawaddr/${addressHash}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (data.error) {
        setError("Please enter a valid address");
        return;
      }

      let current_datetime = Date.now();

      const formattedData: AddressData = {
        id: data.address,
        number_txns: data.n_tx,
        total_received: data.total_received,
        total_sent: data.total_sent,
        current_balance: data.final_balance,
        last_updated: current_datetime,
        transactions: formatTransactions(data.txs),
      };
      if (addresses) {
        setAddresses([...addresses, formattedData]);
      } else {
        setAddresses([formattedData]);
      }
    } catch (err) {
      setError(`Failed to fetch address data`);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchAddress(input);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <div>
      <span>Add an Address</span>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="Type here"
          className="mt-2 input input-bordered w-1/2 text-gray-700 placeholder-gray-400"
        />
        <div className="text-right">
          <button className="btn btn-primary px-6 py-2">Add Address</button>
        </div>
      </form>
    </div>
  );
};

export default AddressInput;
