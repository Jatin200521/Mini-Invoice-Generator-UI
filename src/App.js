import React, { useState, useMemo } from "react";
import { FaFileInvoice } from "react-icons/fa";
import InvoiceForm from "./components/InvoiceForm";
import InvoicePreview from "./components/Invoicepreview";
import "./index.css";

const App = () => {
  const [invoiceData, setInvoiceData] = useState({
    clientName: "",
    invoiceDate: new Date().toISOString().split("T")[0],
    lineItems: [{ id: 1, description: "", quantity: 1, rate: 0 }],
  });

  const [errors, setErrors] = useState({});

  const calculations = useMemo(() => {
    const subtotal = invoiceData.lineItems.reduce((sum, item) => {
      return (
        sum + (parseFloat(item.quantity) || 0) * (parseFloat(item.rate) || 0)
      );
    }, 0);

    const gst = subtotal * 0.18;
    const total = subtotal + gst;

    return { subtotal, gst, total };
  }, [invoiceData.lineItems]);

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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <FaFileInvoice className="h-8 w-8 text-blue-600 mr-2" />
            <h1 className="text-3xl font-bold text-gray-900">
              Invoice Generator
            </h1>
          </div>
          <p className="text-gray-600">
            Create professional invoices with live preview
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <InvoiceForm
            invoiceData={invoiceData}
            onUpdateInvoiceData={updateInvoiceData}
            onAddLineItem={addLineItem}
            onUpdateLineItem={updateLineItem}
            onRemoveLineItem={removeLineItem}
            errors={errors}
            onValidateForm={validateForm}
            calculations={calculations}
          />

          <InvoicePreview
            invoiceData={invoiceData}
            calculations={calculations}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
