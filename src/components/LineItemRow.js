import React from "react";
import { FaTrash } from "react-icons/fa";

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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  return (
    <div>
      <div>
        <h4>Item {index + 1}</h4>
        {canRemove && (
          <button
            type="button"
            onClick={() => onRemove(item.id)}
            title="Remove item"
          >
            <FaTrash />
          </button>
        )}
      </div>

      <div>
        <div>
          <label>Description *</label>
          <input
            type="text"
            value={item.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            placeholder="Describe your service or product"
          />
          {errors[`description_${index}`] && (
            <p>{errors[`description_${index}`]}</p>
          )}
        </div>

        <div>
          <div>
            <label>Quantity *</label>
            <input
              type="number"
              min="1"
              step="1"
              value={item.quantity}
              onChange={(e) =>
                handleInputChange("quantity", parseInt(e.target.value) || 1)
              }
            />
            {errors[`quantity_${index}`] && (
              <p>{errors[`quantity_${index}`]}</p>
            )}
          </div>

          <div>
            <label>Rate (₹) *</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={item.rate}
              onChange={(e) =>
                handleInputChange("rate", parseFloat(e.target.value) || 0)
              }
            />
            {errors[`rate_${index}`] && <p>{errors[`rate_${index}`]}</p>}
          </div>
        </div>

        <div>
          <span>
            Amount: {formatCurrency((item.quantity || 0) * (item.rate || 0))}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LineItemRow;
