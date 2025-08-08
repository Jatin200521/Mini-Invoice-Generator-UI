import React from "react";
import { FaPlus, FaCalculator } from "react-icons/fa";
import LineItemRow from "./LineItemRow";
import "../CSS/InvoiceForm.css";

const InvoiceForm = ({
  invoiceData,
  onUpdateInvoiceData,
  onAddLineItem,
  onUpdateLineItem,
  onRemoveLineItem,
  errors,
  onValidateForm,
  calculations,
}) => {
  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);

  return (
    <div className="invoice-container">
      <div className="invoice-header">
        <FaCalculator className="invoice-icon" />
        <h2 className="invoice-title">Invoice Details</h2>
      </div>

      <div className="section">
        <div className="space-y-4">
          <h3 className="section-title">Client Information</h3>

          <div>
            <label className="label">Client Name </label>
            <input
              type="text"
              value={invoiceData.clientName}
              onChange={(e) =>
                onUpdateInvoiceData("clientName", e.target.value)
              }
              className={`input ${
                errors.clientName ? "input-error" : "input-normal"
              }`}
              placeholder="Enter client name"
            />
            {errors.clientName && (
              <p className="error-text">{errors.clientName}</p>
            )}
          </div>

          <div>
            <label className="label">Invoice Date </label>
            <input
              type="date"
              value={invoiceData.invoiceDate}
              onChange={(e) =>
                onUpdateInvoiceData("invoiceDate", e.target.value)
              }
              className={`input ${
                errors.invoiceDate ? "input-error" : "input-normal"
              }`}
            />
            {errors.invoiceDate && (
              <p className="error-text">{errors.invoiceDate}</p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="line-items-header">
            <h3 className="section-title flex-1">Line Items</h3>
            <button
              type="button"
              onClick={onAddLineItem}
              className="add-item-btn"
            >
              <FaPlus className="add-item-icon" /> Add Item
            </button>
          </div>

          <div className="space-y-4">
            {invoiceData.lineItems.map((item, index) => (
              <LineItemRow
                key={item.id}
                item={item}
                index={index}
                onUpdate={onUpdateLineItem}
                onRemove={onRemoveLineItem}
                canRemove={invoiceData.lineItems.length > 1}
                errors={errors}
              />
            ))}
          </div>
        </div>
        <div className="summary">
          <div className="summary-text">
            <div className="summary-line">
              <span className="text-gray-700">Subtotal:</span>
              <span className="font-medium">
                {formatCurrency(calculations.subtotal)}
              </span>
            </div>
            <div className="summary-line">
              <span className="text-gray-700">GST (18%):</span>
              <span className="font-medium">
                {formatCurrency(calculations.gst)}
              </span>
            </div>
            <div className="summary-total">
              <span className="font-semibold text-gray-900">Total:</span>
              <span className="total-text">
                {formatCurrency(calculations.total)}
              </span>
            </div>
          </div>
        </div>

        <button type="button" onClick={onValidateForm} className="validate-btn">
          Validate Form
        </button>
      </div>
    </div>
  );
};

export default InvoiceForm;
