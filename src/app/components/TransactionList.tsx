import React from "react";
import { ITransaction } from "../page";
import Transaction from "./sub/Transaction";

interface TransactionListProps {
  transactions: ITransaction[];
}

const TransactionList = ({ transactions }: TransactionListProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 p-6 border-b">
        Transactions
      </h2>
      {!transactions || transactions.length === 0 ? (
        <div className="p-6 text-gray-500 text-center">
          No transactions found
        </div>
      ) : (
        <ul className="divide-y divide-gray-100">
          {transactions.map((transaction, i) => (
            <li
              key={i}
              className="hover:bg-gray-50 transition-colors duration-150"
            >
              <Transaction transaction={transaction} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransactionList;
