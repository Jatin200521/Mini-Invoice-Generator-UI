import React from "react";
import { FaTrash } from "react-icons/fa";
import "../CSS/LineItem.css";

const LineItemRow = ({
  item,
  index,
  onUpdate,
  onRemove,
  canRemove,
  errors = {},
}) => {
  const handleInputChange = (field, value) => {
    onUpdate(item.id, field, value);
  };

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);

  const hasErrors =
    errors[`description_${index}`] ||
    errors[`quantity_${index}`] ||
    errors[`rate_${index}`];

  return (
    <div
      className={`line-item-container ${
        hasErrors ? "line-item-error" : "line-item-normal"
      }`}
    >
      <div className="line-item-header">
        <h4 className="line-item-title">Item {index + 1}</h4>
        {canRemove && (
          <button
            type="button"
            onClick={() => onRemove(item.id)}
            className="remove-btn"
            title="Remove item"
          >
            <FaTrash className="remove-icon" />
          </button>
        )}
      </div>

      <div className="fields">
        <div>
          <label className="label">Description</label>
          <input
            type="text"
            value={item.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            className={`input ${
              errors[`description_${index}`] ? "input-error" : "input-normal"
            }`}
            placeholder="Describe your service or product"
          />
          {errors[`description_${index}`] && (
            <p className="error-text">{errors[`description_${index}`]}</p>
          )}
        </div>

        <div className="grid-two">
          <div>
            <label className="label">Quantity</label>
            <input
              type="number"
              min="1"
              step="1"
              value={item.quantity}
              onChange={(e) =>
                handleInputChange("quantity", parseInt(e.target.value) || 1)
              }
              className={`input ${
                errors[`quantity_${index}`] ? "input-error" : "input-normal"
              }`}
            />
            {errors[`quantity_${index}`] && (
              <p className="error-text">{errors[`quantity_${index}`]}</p>
            )}
          </div>

          <div>
            <label className="label">Rate (₹)</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={item.rate}
              onChange={(e) =>
                handleInputChange("rate", parseFloat(e.target.value) || 0)
              }
              className={`input ${
                errors[`rate_${index}`] ? "input-error" : "input-normal"
              }`}
            />
            {errors[`rate_${index}`] && (
              <p className="error-text">{errors[`rate_${index}`]}</p>
            )}
          </div>
        </div>

        <div className="text-right">
          <span className="amount-text">
            Amount: {formatCurrency((item.quantity || 0) * (item.rate || 0))}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LineItemRow;
