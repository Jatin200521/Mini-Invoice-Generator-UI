import React, { useState, useMemo } from "react";
import { FaFileInvoice } from "react-icons/fa";
import InvoiceForm from "./components/InvoiceForm";
import InvoicePreview from "./components/Invoicepreview";
import "./index.css";

const App = () => {
  const [theme, setTheme] = useState("dark");

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
      window.print();
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
    <div
      className={`min-h-screen py-8 transition-colors duration-500 ${
        theme === "dark"
          ? "bg-gradient-to-b from-gray-500 to-black"
          : "bg-gradient-to-b from-purple-200 via-pink-200 to-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <FaFileInvoice
              className={`h-8 w-8 mr-2 ${
                theme === "dark" ? "text-blue-400" : "text-blue-600"
              }`}
            />
            <h1
              className={`text-3xl font-bold ${
                theme === "dark" ? "text-gray-100" : "text-gray-900"
              }`}
            >
              Invoice Generator
            </h1>
          </div>

          <button
            onClick={() =>
              setTheme((prev) => (prev === "dark" ? "light" : "dark"))
            }
            className="px-4 py-2 rounded-lg border shadow-sm bg-white hover:bg-gray-100 transition"
          >
            {theme === "dark" ? "Dark Mode" : "light Mode"}
          </button>
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
