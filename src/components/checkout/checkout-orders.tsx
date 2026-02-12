"use client";

import useCartInfo from "@/hooks/use-cart-info";
import { IProduct } from "@/types/product-d-t";
import { useAppDispatch } from "@/redux/hook";
import { remove_product } from "@/redux/features/cart";
import { useEffect } from "react";

type IProps = {
  cart_products: IProduct[];
  paymentMethod?: string;
  setPaymentMethod?: (val: string) => void;
  deliveryFee?: number;
};

const CheckoutOrders = ({
  cart_products,
  paymentMethod,
  setPaymentMethod,
  deliveryFee = 100,
}: IProps) => {
  const { total } = useCartInfo();
  const dispatch = useAppDispatch();

  useEffect(() => {
    setPaymentMethod?.("Cash on Delivery"); // default selected
  }, []);

  const coupon = JSON.parse(localStorage.getItem("coupon") as any);
  const couponDiscount = coupon
    ? coupon.orderPriceLimit
      ? coupon.orderPriceLimit <= total
        ? coupon.discountAmount ?? 0
        : 0
      : coupon.discountAmount ?? 0
    : 0;

  const handleRemoveProduct = (productId: number, title: string) => {
    dispatch(remove_product({ id: productId, title }));
  };

  return (
    <div className="checkout-wrapper">
      <h3 className="checkout-title">Your Order</h3>

      {cart_products.map((item: any, i) => (
        <div key={i} className="product-row">
          <div className="product-left">
            <img
              src={item?.image || "/noimage.png"}
              alt={item?.name}
              className="thumb"
            />

            <div className="info">
              <p className="title">
                {item?.name} ({item?.variant})
              </p>
              <span className="qty">Qty: {item.orderQuantity}</span>
            </div>
          </div>

          <div className="product-right">
            <span className="price">
              ${(item.discountedRetailPrice * item.orderQuantity).toFixed(2)} 
            </span>

            <button
              className="remove-btn"
              onClick={() => handleRemoveProduct(item.id, item.name)}
            >
              ✕
            </button>
          </div>
        </div>
      ))}

      <div className="summary-box">
        <div className="row">
          <span>Delivery</span>
          <span>${deliveryFee.toFixed(2)} </span>
        </div>

        {couponDiscount > 0 && (
          <div className="row discount">
            <span>Coupon Discount</span>
            <span>- ${couponDiscount.toFixed(2)} </span>
          </div>
        )}

        <div className="row total">
          <span>Total</span>
          <span>
            ${(total + deliveryFee - couponDiscount).toFixed(2)}
          </span>
        </div>
      </div>

      {/* PAYMENT METHOD */}
      <div className="payment-box">
        <p className="payment-title">Payment Method</p>

        <label className="radio-item">
          <input
            type="radio"
            value="Cash on Delivery"
            name="payment"
            checked={paymentMethod === "Cash on Delivery"}
            onChange={(e) => setPaymentMethod?.(e.target.value)}
          />
          Cash on Delivery 
          
        </label>
{/* 
        <label className="radio-item">
          <input
            type="radio"
            value="Online Payment"
            name="payment"
            checked={paymentMethod === "Online Payment"}
            onChange={(e) => setPaymentMethod?.(e.target.value)}
          />
          Online Payment
        </label> */}
      </div>

      {/* PAY BUTTON
      <button className="confirm-btn">
        {paymentMethod === "Online Payment"
          ? "Pay Now"
          : "Place Order (COD)"}
      </button> */}

      {/* INLINE CSS */}
    <style jsx>{`
.checkout-wrapper {
  background: #fff;
  border-radius: 16px;
  padding: 20px;
  max-width: 600px;
  margin: auto;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  font-family: 'Inter', sans-serif;
  background: linear-gradient(135deg, #f8f8f8 0%, #eaeaea 100%);
}

.checkout-title {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 16px;
  border-bottom: 2px solid #ccc;
  padding-bottom: 10px;
  color: #111;
}

.product-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 12px;
  margin-bottom: 12px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 4px 14px rgba(0,0,0,0.06);
  transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
}

.product-row:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.1);
  background: #f0f0f0;
}

.product-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.thumb {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 12px;
  border: 1px solid #ccc;
}

.info {
  max-width: 200px;
}

.title {
  font-size: 15px;
  font-weight: 600;
  line-height: 1.2;
  margin: 0;
  color: #111;
}

.qty {
  font-size: 14px;
  color: #555;
  background: #e0e0e0;
  padding: 2px 6px;
  border-radius: 6px;
  display: inline-block;
  margin-top: 4px;
}

.product-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.price {
  font-weight: 700;
  color: #222;
  font-size: 16px;
  background: linear-gradient(90deg, #555, #111);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  white-space: nowrap;
}

.remove-btn {
  background: #fa2020ff;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 4px 9px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
}

.remove-btn:hover {
  background: #000;
  transform: scale(1.1);
}

/* SUMMARY */
.summary-box {
  background: #f5f5f5;
  margin-top: 16px;
  border-radius: 12px;
  padding: 16px;
  border: 1px solid #ddd;
}

.row {
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  padding: 6px 0;
}

.discount span:last-child {
  color: #555;
  font-weight: 600;
}

.total {
  border-top: 2px dashed #ccc;
  margin-top: 8px;
  padding-top: 8px;
  font-size: 22px;
  font-weight: 700;
  color: #111;
  background: linear-gradient(90deg, #000, #555);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* PAYMENT */
.payment-box {
  margin-top: 20px;
}

.payment-title {
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 16px;
  color: #111;
}

.radio-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  margin-bottom: 6px;
  cursor: pointer;
  background: #fff;
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  transition: background 0.2s, transform 0.2s, border-color 0.2s;
}

.radio-item:hover {
  background: #f0f0f0;
  transform: translateX(2px);
  border-color: #999;
}

.confirm-btn {
  width: 100%;
  margin-top: 16px;
  background: linear-gradient(135deg, #111, #555);
  border: none;
  border-radius: 12px;
  padding: 12px;
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  cursor: pointer;
  transition: transform 0.2s, background 0.2s;
}

.confirm-btn:hover {
  transform: scale(1.03);
  background: linear-gradient(135deg, #000, #222);
}

/* MOBILE RESPONSIVE */
@media (max-width: 480px) {
  .product-row {
    flex-direction: column;
    align-items: flex-start;
  }

  .product-left {
    width: 100%;
  }

  .price {
    font-size: 14px;
  }

  .checkout-title {
    font-size: 20px;
  }

  .radio-item {
    font-size: 14px;
  }
}
`}</style>

    </div>
  );
};

export default CheckoutOrders;
