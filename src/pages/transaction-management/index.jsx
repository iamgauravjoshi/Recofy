import React, { useState, useEffect } from "react";
import Header from "../../components/ui/PortalHeader";
import Breadcrumb from "../../components/ui/Breadcrumb";

import Button from "../../components/ui/Button";
import TransactionFilters from "./components/TransactionFilters";
import TransactionTable from "./components/TransactionTable";
import AddTransactionModal from "./components/AddTransactionModal";
import BulkOperationsToolbar from "./components/BulkOperationsToolbar";
import TransactionSummary from "./components/TransactionSummary";

const TransactionManagement = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [selectedTransactions, setSelectedTransactions] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "desc",
  });

  // Mock transaction data
  useEffect(() => {
    const mockTransactions = [
      {
        id: 1,
        date: "2024-09-14",
        description: "Monthly Salary Payment",
        amount: 85000,
        type: "credit",
        category: "income",
        account: "SBI Current Account",
        reference: "SAL/2024/09/001",
        createdAt: "2024-09-14T05:04:08.471Z",
      },
      {
        id: 2,
        date: "2024-09-13",
        description: "Office Supplies Purchase",
        amount: 2500,
        type: "debit",
        category: "office",
        account: "Petty Cash",
        reference: "PO/2024/156",
        createdAt: "2024-09-13T10:30:00.000Z",
      },
      {
        id: 3,
        date: "2024-09-12",
        description: "Electricity Bill Payment",
        amount: 3200,
        type: "debit",
        category: "utilities",
        account: "HDFC Savings Account",
        reference: "ELEC/2024/08",
        createdAt: "2024-09-12T14:15:30.000Z",
      },
      {
        id: 4,
        date: "2024-09-11",
        description: "Client Payment Received",
        amount: 45000,
        type: "credit",
        category: "income",
        account: "SBI Current Account",
        reference: "INV/2024/089",
        createdAt: "2024-09-11T09:45:00.000Z",
      },
      {
        id: 5,
        date: "2024-09-10",
        description: "Marketing Campaign - Google Ads",
        amount: 8500,
        type: "debit",
        category: "marketing",
        account: "Credit Card",
        reference: "GADS/2024/09",
        createdAt: "2024-09-10T16:20:00.000Z",
      },
      {
        id: 6,
        date: "2024-09-09",
        description: "Business Travel - Mumbai",
        amount: 12000,
        type: "debit",
        category: "travel",
        account: "Credit Card",
        reference: "TRV/2024/023",
        createdAt: "2024-09-09T08:30:00.000Z",
      },
      {
        id: 7,
        date: "2024-09-08",
        description: "Investment in Mutual Funds",
        amount: 25000,
        type: "debit",
        category: "investment",
        account: "Investment Account",
        reference: "MF/2024/SIP/09",
        createdAt: "2024-09-08T11:00:00.000Z",
      },
      {
        id: 8,
        date: "2024-09-07",
        description: "GST Payment - Q2 2024",
        amount: 15000,
        type: "debit",
        category: "tax",
        account: "SBI Current Account",
        reference: "GST/2024/Q2",
        createdAt: "2024-09-07T13:45:00.000Z",
      },
      {
        id: 9,
        date: "2024-09-06",
        description: "Freelance Project Payment",
        amount: 28000,
        type: "credit",
        category: "income",
        account: "HDFC Savings Account",
        reference: "FRLNC/2024/034",
        createdAt: "2024-09-06T15:30:00.000Z",
      },
      {
        id: 10,
        date: "2024-09-05",
        description: "Internet & Phone Bill",
        amount: 1800,
        type: "debit",
        category: "utilities",
        account: "HDFC Savings Account",
        reference: "INET/2024/08",
        createdAt: "2024-09-05T12:15:00.000Z",
      },
    ];

    setTransactions(mockTransactions);
    setFilteredTransactions(mockTransactions);
  }, []);

  const handleFiltersChange = (filters) => {
    let filtered = [...transactions];

    // Apply search filter
    if (filters?.searchTerm) {
      filtered = filtered?.filter(
        (transaction) =>
          transaction?.description
            ?.toLowerCase()
            ?.includes(filters?.searchTerm?.toLowerCase()) ||
          transaction?.reference
            ?.toLowerCase()
            ?.includes(filters?.searchTerm?.toLowerCase())
      );
    }

    // Apply date filters
    if (filters?.dateFrom) {
      filtered = filtered?.filter(
        (transaction) => transaction?.date >= filters?.dateFrom
      );
    }
    if (filters?.dateTo) {
      filtered = filtered?.filter(
        (transaction) => transaction?.date <= filters?.dateTo
      );
    }

    // Apply category filter
    if (filters?.category) {
      filtered = filtered?.filter(
        (transaction) => transaction?.category === filters?.category
      );
    }

    // Apply account filter
    if (filters?.account) {
      filtered = filtered?.filter((transaction) =>
        transaction?.account
          ?.toLowerCase()
          ?.includes(filters?.account?.toLowerCase())
      );
    }

    // Apply amount filters
    if (filters?.amountMin) {
      filtered = filtered?.filter(
        (transaction) => transaction?.amount >= parseFloat(filters?.amountMin)
      );
    }
    if (filters?.amountMax) {
      filtered = filtered?.filter(
        (transaction) => transaction?.amount <= parseFloat(filters?.amountMax)
      );
    }

    setFilteredTransactions(filtered);
    setSelectedTransactions([]);
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig?.key === key && sortConfig?.direction === "asc") {
      direction = "desc";
    }

    const sortedTransactions = [...filteredTransactions]?.sort((a, b) => {
      if (key === "amount") {
        return direction === "asc" ? a?.[key] - b?.[key] : b?.[key] - a?.[key];
      }
      if (key === "date") {
        return direction === "asc"
          ? new Date(a[key]) - new Date(b[key])
          : new Date(b[key]) - new Date(a[key]);
      }
      const aValue = a?.[key]?.toString()?.toLowerCase() || "";
      const bValue = b?.[key]?.toString()?.toLowerCase() || "";
      return direction === "asc"
        ? aValue?.localeCompare(bValue)
        : bValue?.localeCompare(aValue);
    });

    setFilteredTransactions(sortedTransactions);
    setSortConfig({ key, direction });
  };

  const handleAddTransaction = (newTransaction) => {
    const updatedTransactions = [newTransaction, ...transactions];
    setTransactions(updatedTransactions);
    setFilteredTransactions(updatedTransactions);
  };

  const handleEditTransaction = (id, editData) => {
    const updatedTransactions = transactions?.map((transaction) =>
      transaction?.id === id
        ? { ...transaction, ...editData, amount: parseFloat(editData?.amount) }
        : transaction
    );
    setTransactions(updatedTransactions);
    setFilteredTransactions(
      updatedTransactions?.filter((t) =>
        filteredTransactions?.some((ft) => ft?.id === t?.id)
      )
    );
  };

  const handleDeleteTransaction = (id) => {
    const updatedTransactions = transactions?.filter(
      (transaction) => transaction?.id !== id
    );
    setTransactions(updatedTransactions);
    setFilteredTransactions(
      filteredTransactions?.filter((transaction) => transaction?.id !== id)
    );
    setSelectedTransactions(selectedTransactions?.filter((tid) => tid !== id));
  };

  const handleBulkDelete = () => {
    const updatedTransactions = transactions?.filter(
      (transaction) => !selectedTransactions?.includes(transaction?.id)
    );
    setTransactions(updatedTransactions);
    setFilteredTransactions(
      filteredTransactions?.filter(
        (transaction) => !selectedTransactions?.includes(transaction?.id)
      )
    );
    setSelectedTransactions([]);
  };

  const handleBulkCategorize = (category) => {
    const updatedTransactions = transactions?.map((transaction) =>
      selectedTransactions?.includes(transaction?.id)
        ? { ...transaction, category }
        : transaction
    );
    setTransactions(updatedTransactions);
    setFilteredTransactions(
      updatedTransactions?.filter((t) =>
        filteredTransactions?.some((ft) => ft?.id === t?.id)
      )
    );
    setSelectedTransactions([]);
  };

  const handleBulkEdit = () => {
    // This would open a bulk edit modal in a real implementation
    console.log("Bulk edit for transactions:", selectedTransactions);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb />

          {/* Page Header */}
          <div className="flex gap-2 items-center justify-between mb-8 flex-col-reverse md:flex-row">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Transaction Management
              </h1>
              <p className="text-muted-foreground mt-2">
                Record, edit, and organize your financial transactions with
                AI-powered automation
              </p>
            </div>
            <Button
              onClick={() => setIsAddModalOpen(true)}
              iconName="Plus"
              iconPosition="left"
              className="shadow-moderate"
            >
              Add Transaction
            </Button>
          </div>

          {/* Transaction Summary */}
          <TransactionSummary
            transactions={transactions}
            filteredTransactions={filteredTransactions}
          />

          {/* Filters */}
          <TransactionFilters
            onFiltersChange={handleFiltersChange}
            resultsCount={filteredTransactions?.length}
          />

          {/* Bulk Operations */}
          <BulkOperationsToolbar
            selectedCount={selectedTransactions?.length}
            onBulkEdit={handleBulkEdit}
            onBulkDelete={handleBulkDelete}
            onBulkCategorize={handleBulkCategorize}
            onClearSelection={() => setSelectedTransactions([])}
          />

          {/* Transaction Table */}
          <TransactionTable
            transactions={filteredTransactions}
            onEdit={handleEditTransaction}
            onDelete={handleDeleteTransaction}
            selectedTransactions={selectedTransactions}
            onSelectionChange={setSelectedTransactions}
            sortConfig={sortConfig}
            onSort={handleSort}
          />

          {/* Quick Actions */}
          <div className="mt-8 flex flex-col md:flex-row items-center justify-center space-x-4">
            <Button variant="outline" iconName="Download" iconPosition="left">
              Export Transactions
            </Button>
            <Button variant="outline" iconName="Upload" iconPosition="left">
              Import Transactions
            </Button>
            <Button variant="outline" iconName="FileText" iconPosition="left">
              Generate Report
            </Button>
          </div>
        </div>
      </main>
      {/* Add Transaction Modal */}
      <AddTransactionModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddTransaction}
      />
    </div>
  );
};

export default TransactionManagement;
