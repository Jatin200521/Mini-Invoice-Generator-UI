import React from "react";
import { FaCalculator } from "react-icons/fa";

const InvoiceForm = ({ invoiceData, onUpdateInvoiceData }) => {
  return (
    <div>
      <div>
        <FaCalculator />
        <h2>Invoice Details</h2>
      </div>
      <div>
        <h3>Client Information</h3>

        <div>
          <label>Client Name</label>
          <input
            type="text"
            value={invoiceData.clientName}
            onChange={(e) => onUpdateInvoiceData("clientName", e.target.value)}
            placeholder="Enter client name"
          />
        </div>

        <div>
          <label>Invoice Date</label>
          <input
            type="date"
            value={invoiceData.invoiceDate}
            onChange={(e) => onUpdateInvoiceData("invoiceDate", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default InvoiceForm;
