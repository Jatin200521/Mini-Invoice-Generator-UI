import React, { useState } from "react";
import { FaFileInvoice } from "react-icons/fa";
import InvoiceForm from "./components/InvoiceForm";
import InvoicePreview from "./components/Invoicepreview";

const App = () => {
  const [invoiceData, setInvoiceData] = useState({
    clientName: "",
    invoiceDate: new Date().toISOString().split("T")[0],
    lineItems: [{ id: 1, description: "", quantity: 1, rate: 0 }],
  });

  const updateInvoiceData = (field, value) => {
    setInvoiceData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addLineItem = () => {
    const newItem = {
      id: Date.now(),
      description: "",
      quantity: 1,
      rate: 0,
    };
    setInvoiceData((prev) => ({
      ...prev,
      lineItems: [...prev.lineItems, newItem],
    }));
  };

  const removeLineItem = (id) => {
    if (invoiceData.lineItems.length > 1) {
      setInvoiceData((prev) => ({
        ...prev,
        lineItems: prev.lineItems.filter((item) => item.id !== id),
      }));
    }
  };

  const updateLineItem = (id, field, value) => {
    setInvoiceData((prev) => ({
      ...prev,
      lineItems: prev.lineItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  };

  return (
    <div>
      <div>
        <div>
          <div>
            <FaFileInvoice />
            <h1>Invoice Generator</h1>
          </div>
          <p>Create professional invoices with live preview</p>
        </div>

        <div>
          <InvoiceForm
            invoiceData={invoiceData}
            onUpdateInvoiceData={updateInvoiceData}
            onAddLineItem={addLineItem}
            onUpdateLineItem={updateLineItem}
            onRemoveLineItem={removeLineItem}
          />

          <InvoicePreview invoiceData={invoiceData} />
        </div>
      </div>
    </div>
  );
};

export default App;
