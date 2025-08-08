import React from "react";
import { FaFileInvoice } from "react-icons/fa";

const InvoicePreview = ({ invoiceData, calculations }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const generateInvoiceNumber = () => {
    const date = new Date();
    return `INV-${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(Date.now()).slice(-4)}`;
  };

  return (
    <div>
      <div>
        <FaFileInvoice />
        <h2>Live Preview</h2>
      </div>

      <div style={{ minHeight: "600px" }}>
        <div>
          <h1>INVOICE</h1>
          <p>#{generateInvoiceNumber()}</p>
        </div>

        <div>
          <div>
            <h3>Bill To:</h3>
            <p>{invoiceData.clientName || "Client Name"}</p>
          </div>
          <div>
            <h3>Invoice Date:</h3>
            <p>
              {invoiceData.invoiceDate
                ? formatDate(invoiceData.invoiceDate)
                : formatDate(new Date())}
            </p>
          </div>
        </div>

        <div>
          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Qty</th>
                <th>Rate</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.lineItems.map((item, index) => (
                <tr key={item.id}>
                  <td>{item.description || `Item ${index + 1}`}</td>
                  <td>{item.quantity}</td>
                  <td>{formatCurrency(item.rate)}</td>
                  <td>
                    {formatCurrency((item.quantity || 0) * (item.rate || 0))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <div>
            <div>
              <span>Subtotal:</span>
              <span>{formatCurrency(calculations.subtotal)}</span>
            </div>
            <div>
              <span>GST (18%):</span>
              <span>{formatCurrency(calculations.gst)}</span>
            </div>
            <div>
              <span>Total:</span>
              <span>{formatCurrency(calculations.total)}</span>
            </div>
          </div>
        </div>

        <div>
          <p>Thank you for your business!</p>
        </div>
      </div>
    </div>
  );
};

export default InvoicePreview;
