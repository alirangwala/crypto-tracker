import { IAddress } from "@/app/page";

interface AggregatedAddressesProps {
  addresses: IAddress[] | null;
}

const AggregatedAddresses = ({ addresses }: AggregatedAddressesProps) => {
  if (!addresses || addresses.length === 0) {
    return null;
  }

  const totalBalance = addresses.reduce(
    (sum, addr) => sum + addr.current_balance,
    0
  );

  const totalTransactions = addresses.reduce(
    (sum, addr) => sum + addr.number_txns,
    0
  );

  return (
    <div className="bg-white rounded-lg shadow-sm mt-6">
      <h2 className="text-lg font-semibold text-gray-900 p-6 border-b">
        Your Balance
      </h2>
      <div className="p-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div className="text-sm text-gray-500 mb-1">Total Balance</div>
            <div className="text-2xl font-semibold text-gray-900">
              {(totalBalance / 100000000).toFixed(8)} BTC
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-500 mb-1">Total Transactions</div>
            <div className="text-2xl font-semibold text-gray-900">
              {totalTransactions.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AggregatedAddresses;
