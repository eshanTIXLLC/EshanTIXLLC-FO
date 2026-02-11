import React from "react";

type MessengerModalProps = {
  product: any; // চাইলে product এর জন্য আলাদা type বানানো যাবে
  variant: string;
  orderQuantity: number;
  price: number;
  onClose: () => void;
  onConfirm: () => void;
};

const MessengerModal: React.FC<MessengerModalProps> = ({
  product,
  variant,
  orderQuantity,
  price,
  onClose,
  onConfirm,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
      <div className="bg-white text-black rounded-xl shadow-xl w-[400px] p-6 relative">
        <h2 className="text-xl font-bold mb-4 text-center">📦 Confirm Your Order</h2>

        {/* Product Preview */}
        <div className="flex items-center gap-3 mb-4">
          <img
            src={product?.images?.[0]?.image ?? "/noimage.png"}
            alt={product?.name}
            className="w-16 h-16 rounded-lg object-cover"
          />
          <div>
            <h3 className="font-semibold">{product?.name}</h3>
            <p className="text-sm text-gray-600">Variant: {variant}</p>
            <p className="text-sm text-gray-600">Quantity: {orderQuantity}</p>
            <p className="font-bold mt-1">Total: {(price ?? 0) * orderQuantity} TK</p>
          </div>
        </div>

        <p className="text-sm text-green-600 font-medium text-center mb-4">
          ✅ Order copied! Just paste in Messenger and confirm.
        </p>

        {/* Buttons */}
        <div className="flex justify-between gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded-lg bg-gray-300 text-black font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2 rounded-lg bg-[#0084ff] text-white font-semibold shadow-md hover:bg-[#0072e6]"
          >
            Open Messenger
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessengerModal;
