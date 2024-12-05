import { ITransaction } from "@/app/page";
import React from "react";

interface TransactionProps {
  transaction: ITransaction;
}

const Transaction = ({ transaction }: TransactionProps) => {
  return (
    <div className="p-4 bg-white rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
      <div className="flex justify-between items-start gap-4">
        <div>
          <div className="font-mono text-sm text-gray-700 break-all">
            {transaction.id}
          </div>
          <div className="text-sm text-gray-500 mt-1">
            {new Date(transaction.timestamp).toLocaleString()}
          </div>
        </div>

        <div
          className={`
          text-sm font-semibold whitespace-nowrap
          ${transaction.type === "received" ? "text-green-600" : "text-red-600"}
        `}
        >
          {transaction.type === "received" ? "+" : "-"}
          {transaction.amount.toFixed(8)} BTC
        </div>
      </div>
    </div>
  );
};

export default Transaction;
