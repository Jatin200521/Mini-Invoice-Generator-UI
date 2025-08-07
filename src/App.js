import React, { useState } from "react";
import { FaFileInvoice } from "react-icons/fa";
import InvoiceForm from "./components/Invoicepreview";
import InvoicePreview from "./components/InvoiceForm";

const App = () => {
  const [invoiceData, setInvoiceData] = useState({
    clientName: "",
    invoiceDate: new Date().toISOString().split("T")[0],
    lineItems: [{ id: 1, description: "", quantity: 1, rate: 0 }],
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!invoiceData.clientName.trim()) {
      newErrors.clientName = "Client name is required";
    }

    if (!invoiceData.invoiceDate) {
      newErrors.invoiceDate = "Invoice date is required";
    }

    invoiceData.lineItems.forEach((item, index) => {
      if (!item.description.trim()) {
        newErrors[`description_${index}`] = "Description is required";
      }
      if (item.quantity <= 0) {
        newErrors[`quantity_${index}`] = "Quantity must be greater than 0";
      }
      if (item.rate < 0) {
        newErrors[`rate_${index}`] = "Rate cannot be negative";
      }
    });

    setErrors(newErrors);

    const isValid = Object.keys(newErrors).length === 0;
    if (isValid) {
      alert("Form is valid! Invoice is ready to be processed.");
    }

    return isValid;
  };

  const updateInvoiceData = (field, value) => {
    setInvoiceData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
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

      const newErrors = { ...errors };
      const removedIndex = invoiceData.lineItems.findIndex(
        (item) => item.id === id
      );
      delete newErrors[`description_${removedIndex}`];
      delete newErrors[`quantity_${removedIndex}`];
      delete newErrors[`rate_${removedIndex}`];
      setErrors(newErrors);
    }
  };

  const updateLineItem = (id, field, value) => {
    setInvoiceData((prev) => ({
      ...prev,
      lineItems: prev.lineItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));

    const index = invoiceData.lineItems.findIndex((item) => item.id === id);
    const errorKey = `${field}_${index}`;
    if (errors[errorKey]) {
      setErrors((prev) => ({
        ...prev,
        [errorKey]: undefined,
      }));
    }
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
            errors={errors}
            onValidateForm={validateForm}
          />

          <InvoicePreview invoiceData={invoiceData} />
        </div>
      </div>
    </div>
  );
};

export default App;
