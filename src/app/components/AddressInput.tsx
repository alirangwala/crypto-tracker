import React, { useState } from "react";
import { IAddress, ITransaction } from "../page";

interface AddressListProps {
  setAddresses: (addresses: IAddress[]) => void;
  addresses: IAddress[] | null;
}

const AddressInput = ({ setAddresses, addresses }: AddressListProps) => {
  const [input, setInput] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const formatTransactions = (txList: any, limit = 10): ITransaction[] => {
    if (!Array.isArray(txList)) {
      return [];
    }
    return txList
      .sort((a, b) => b.time - a.time)
      .slice(0, limit)
      .map((tx) => ({
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

      if (response.status == 404) {
        setError("Please enter a valid address");
        setInput("");
        return;
      }
      const data = await response.json();

      if (
        addresses &&
        addresses?.some((address) => address.id === data.address)
      ) {
        setError("Address has already been added");
        setInput("");
        return;
      }

      let current_datetime = Date.now();

      const formattedData: IAddress = {
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
      setError(null);
      setInput("");
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
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Add Bitcoin Address
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            value={input}
            onChange={handleChange}
            placeholder="Enter Bitcoin address"
            disabled={isLoading}
            className="flex-1 rounded-md border border-gray-300 px-4 py-2
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     disabled:bg-gray-100 disabled:cursor-not-allowed
                     text-gray-700 placeholder-gray-400"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-blue-500 text-white px-6 py-2 rounded-md
                     hover:bg-blue-600 transition-colors duration-200
                     disabled:bg-blue-300 disabled:cursor-not-allowed
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {isLoading ? "Adding..." : "Add Address"}
          </button>
        </div>
        {error && (
          <div className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-md p-3">
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default AddressInput;
