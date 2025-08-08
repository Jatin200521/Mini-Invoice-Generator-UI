import React from "react";
import { FaFileInvoice } from "react-icons/fa";
import "../CSS/InvoicePreview.css";

const InvoicePreview = ({ invoiceData, calculations }) => {
  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const generateInvoiceNumber = () => {
    const date = new Date();
    return `INV-${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(Date.now()).slice(-4)}`;
  };

  return (
    <div className="invoice-preview-container">
      <div className="preview-header">
        <FaFileInvoice className="preview-icon" />
        <h2 className="preview-title">Live Preview</h2>
      </div>

      <div className="invoice-box">
        <div className="invoice-title-section">
          <h1 className="invoice-title-text">INVOICE</h1>
          <p className="invoice-number">#{generateInvoiceNumber()}</p>
        </div>

        <div className="invoice-details">
          <div>
            <h3 className="bill-to-title">Bill To:</h3>
            <p className="bill-to-name">
              {invoiceData.clientName || "Client Name"}
            </p>
          </div>
          <div className="text-right">
            <h3 className="invoice-date-title">Invoice Date:</h3>
            <p className="invoice-date-text">
              {invoiceData.invoiceDate
                ? formatDate(invoiceData.invoiceDate)
                : formatDate(new Date())}
            </p>
          </div>
        </div>

        <div className="table-container">
          <table className="invoice-table">
            <thead>
              <tr className="table-head">
                <th className="table-th th-left">Description</th>
                <th className="table-th th-center">Qty</th>
                <th className="table-th th-right">Rate</th>
                <th className="table-th th-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.lineItems.map((item, index) => (
                <tr key={item.id}>
                  <td className="table-td">
                    {item.description || `Item ${index + 1}`}
                  </td>
                  <td className="table-td td-center">{item.quantity}</td>
                  <td className="table-td td-right">
                    {formatCurrency(item.rate)}
                  </td>
                  <td className="table-td td-right amount-bold">
                    {formatCurrency((item.quantity || 0) * (item.rate || 0))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="totals-container">
          <div className="totals-list">
            <div className="total-line">
              <span className="text-gray-700">Subtotal:</span>
              <span className="font-medium">
                {formatCurrency(calculations.subtotal)}
              </span>
            </div>
            <div className="total-line">
              <span className="text-gray-700">GST (18%):</span>
              <span className="font-medium">
                {formatCurrency(calculations.gst)}
              </span>
            </div>
            <div className="total-border">
              <div className="total-final">
                <span className="total-final-text">Total:</span>
                <span className="total-final-amount">
                  {formatCurrency(calculations.total)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer">
          <p className="footer-text">Thank you for your business!</p>
        </div>
      </div>
    </div>
  );
};

export default InvoicePreview;
