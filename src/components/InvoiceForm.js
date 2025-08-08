import React from "react";
import { FaPlus, FaCalculator } from "react-icons/fa";
import LineItemRow from "./LineItemRow";

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
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  return (
    <div>
      <div>
        <FaCalculator />
        <h2>Invoice Details</h2>
      </div>

      <div>
        <div>
          <h3>Client Information</h3>

          <div>
            <label>Client Name</label>
            <input
              type="text"
              value={invoiceData.clientName}
              onChange={(e) =>
                onUpdateInvoiceData("clientName", e.target.value)
              }
              placeholder="Enter client name"
            />
            {errors.clientName && <p>{errors.clientName}</p>}
          </div>

          <div>
            <label>Invoice Date *</label>
            <input
              type="date"
              value={invoiceData.invoiceDate}
              onChange={(e) =>
                onUpdateInvoiceData("invoiceDate", e.target.value)
              }
            />
            {errors.invoiceDate && <p>{errors.invoiceDate}</p>}
          </div>
        </div>

        <div>
          <div>
            <h3>Line Items</h3>
            <button type="button" onClick={onAddLineItem}>
              <FaPlus />
              Add Item
            </button>
          </div>

          <div>
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

        <button type="button" onClick={onValidateForm}>
          Validate Form
        </button>
      </div>
    </div>
  );
};

export default InvoiceForm;
