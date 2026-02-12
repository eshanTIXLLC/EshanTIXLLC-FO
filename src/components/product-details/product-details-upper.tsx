"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { add_cart_product, decrement, increment } from "@/redux/features/cart";
import { handleOpenModal } from "@/redux/features/utility";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useRouter } from "next/navigation";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import { ShoppingCart, MessageCircle, Send, Star } from "lucide-react";

type IProps = {
  product: any;
  style_2?: boolean;
  bottomShow?: boolean;
  isModal?: boolean;
};

const ProductDetailsUpper = ({
  product,
  style_2,
  bottomShow = true,
  isModal = true,
}: IProps) => {
  const [variant, setVariant] = useState<any>("");
  const [price, setPrice] = useState<number | null>(null);
  const [retailPrice, setRetailPrice] = useState<number | null>(null);
  const [costPrice, setCostPrice] = useState<number | null>(null);
  const [discountPrice, setDiscountPrice] = useState<number | null>(null);
  const [discountPercent, setDiscountPercent] = useState<number | null>(null);
  const [productAttributeId, setProductAttributeId] = useState<string>("");
  const [stock, setStock] = useState<number>(product?.productAttributes[0]?.stockAmount ?? 0);
  const [toastMessage, setToastMessage] = useState<string>("");
  const { orderQuantity } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [activeImg, setActiveImg] = useState(product?.images[0]?.image ?? "/noimage.png");

  const handleImageActive = (img: string) => setActiveImg(img);

  const handleAddToCart = () => {
    if (!variant) {
      setToastMessage("Please select a variant");
      return;
    }
    dispatch(
      add_cart_product({
        name: product?.name,
        image: product?.images[0]?.image,
        id: product?.id + variant,
        variant,
        orderQuantity,
        discountedRetailPrice: price ?? 0,
        costPrice: costPrice ?? 0,
        retailPrice: retailPrice ?? 0,
        discountPrice: discountPrice ?? 0,
        discountPercent: discountPercent ?? 0,
        totalCostPrice: (costPrice ?? 0) * orderQuantity,
        totalPrice: (price ?? 0) * orderQuantity,
        productId: product?.id,
        productAttributeId,
      })
    );
    dispatch(handleOpenModal());
    setToastMessage("✓ Added to Cart");
  };

  const handleOrderWhatsApp = () => {
    if (!variant) {
      setToastMessage("Please select a variant");
      return;
    }
    const whatsappNumber = "+1 786 619 8378";
    const message = `Hello! I want to order:
- Product: ${product.name}
- Variant/Size: ${variant}
- Quantity: ${orderQuantity}
- Price per unit: $ ${price ?? 0}
- Total Price: $ ${(price ?? 0) * orderQuantity} 
- Delivery Charge: Dhaka 80 TK, Outside Dhaka 120 TK`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank");
  };

  const handleOrderMessenger = () => {
    if (!variant) {
      setToastMessage("Please select a variant");
      return;
    }
    const fbPageUsername = "";
    const message = `Hello! I want to order:
- Product: ${product.name}
- Variant/Size: ${variant}
- Quantity: ${orderQuantity}
- Price per unit: ${price ?? 0} $
- Total Price: ${(price ?? 0) * orderQuantity} $`

    navigator.clipboard.writeText(message)
      .then(() => {
        setToastMessage("✓ Message copied! Paste it in Messenger");
        window.open(`https://m.me/${fbPageUsername}`, "_blank");
        setTimeout(() => setToastMessage(""), 4000);
      })
      .catch(() => {
        setToastMessage("Please copy message manually");
        window.open(`https://m.me/${fbPageUsername}`, "_blank");
      });
  };

  const avgRating =
    product?.review?.reduce((acc: number, r: { rating: number }) => acc + r.rating, 0) /
      (product?.review?.length || 1) || 0;

  return (
    <div style={{ width: "100%", maxWidth: "1200px", margin: "0 auto", display: "flex", flexDirection: "row", gap: "40px", flexWrap: "wrap" }}>
      {/* Product Images */}
      {product && (
        <div style={{ flex: "1 1 400px", display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              borderRadius: "16px",
              overflow: "hidden",
              border: "1px solid #e5e5e5",
              backgroundColor: "#f9f9f9",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "300px",
            }}
          >
            <InnerImageZoom src={activeImg} width={400} height={450} hasSpacer={true} />
          </div>

          <div style={{ display: "flex", gap: "12px", overflowX: "auto", paddingBottom: "8px" }}>
            {product?.images?.map((img: any, i: any) => (
              <button
                key={i + new Date()}
                onClick={() => handleImageActive(img?.image)}
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "12px",
                  border: img?.image === activeImg ? "2px solid #000000" : "1px solid #e5e5e5",
                  background: "#f9f9f9",
                  padding: "4px",
                  cursor: "pointer",
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.3s ease",
                }}
              >
                <Image src={img?.image} alt="product-thumbnail" width={72} height={72} style={{ objectFit: "contain", width: "100%", height: "100%" }} />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Product Details */}
      <div style={{ flex: "1 1 400px", display: "flex", flexDirection: "column", gap: "20px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#000", margin: 0, lineHeight: 1.2 }}>{product.name}</h1>

        {/* Rating */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
          <div style={{ display: "flex", gap: "2px" }}>
            {[0, 1, 2, 3, 4].map((i) => (
              <Star
                key={i}
                style={{
                  width: "16px",
                  height: "16px",
                  fill: avgRating > i ? "#f97316" : "#e5e5e5",
                  color: avgRating > i ? "#f97316" : "#e5e5e5",
                }}
              />
            ))}
          </div>
          <span style={{ fontSize: "13px", fontWeight: 600, color: "#666" }}>
            {product?.review?.length} reviews · 👁️ {product?.viewCount} views
          </span>
        </div>

        {/* Price Section */}
        <div style={{ padding: "16px", borderRadius: "12px", border: "1.5px solid #e5e5e5", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", background: "#fff", display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
            <span style={{ fontSize: "28px", fontWeight: 800, color: "#000" }}>${price ?? product.productAttributes[0]?.discountedRetailPrice}</span>
            {retailPrice && discountPrice && discountPrice > 0 && (
              <>
                <span style={{ fontSize: "16px", fontWeight: 600, color: "#999", textDecoration: "line-through" }}>{retailPrice}</span>
                <div style={{ display: "flex", alignItems: "center", gap: "4px", backgroundColor: "#FEE2E2", color: "#DC2626", padding: "6px 12px", borderRadius: "8px", fontSize: "13px", fontWeight: 700 }}>
                  💰 Save {discountPercent}%
                </div>
              </>
            )}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", fontWeight: 600, color: "#16a34a", backgroundColor: "#DCFCE7", padding: "8px 12px", borderRadius: "8px", border: "1px solid #BBF7D0" }}>
            ✓ In Stock
          </div>
          <p style={{ fontSize: "12px", fontWeight: 500, color: "#666", margin: "0" }}>
           Buy over $50 & get FREE shipping across the USA
          </p>
        </div>

    {/* Short Description */}
{product?.shortDescription && (
  <div
    style={{
      border: "1px solid #eee",
      padding: "16px",
      borderRadius: "12px",
      background: "#f9f9f9",
    }}
  >
    <div
      style={{
        fontSize: "14px",
        fontWeight: 400,
        color: "#000000ff",
        lineHeight: 1.6,
      }}
      dangerouslySetInnerHTML={{
        __html: product.shortDescription
          .replace(/style="[^"]*"/g, "")
          .replace(/<span[^>]*>/g, "")
          .replace(/<\/span>/g, ""),
      }}
    />
  </div>
)}


        {/* Variant Selection */}
        <div>
          <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#000", marginBottom: "8px", textTransform: "uppercase" }}>
            Select Variant <span style={{ color: "#f97316" }}>*</span>
          </label>
          <div style={{ display: "flex", gap: "8px", overflowX: "auto", padding: "8px 0", flexWrap: "wrap" }}>
            {product?.productAttributes?.map((size: any, i: number) => (
              <button
                key={i}
                onClick={() => {
                  setVariant(size?.size);
                  setPrice(size?.discountedRetailPrice ?? 0);
                  setRetailPrice(size?.retailPrice ?? 0);
                  setCostPrice(size?.costPrice ?? 0);
                  setDiscountPrice(size?.discountPrice ?? 0);
                  setDiscountPercent(size?.discountPercent ?? 0);
                  setProductAttributeId(size?.id);
                  setStock(size?.stockAmount);
                }}
                style={{
                  padding: "10px 16px",
                  borderRadius: "8px",
                  border: variant === size?.size ? "2px solid #000" : "1px solid #e5e5e5",
                  backgroundColor: variant === size?.size ? "#000" : "#f9f9f9",
                  color: variant === size?.size ? "#fff" : "#000",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                  transition: "all 0.3s ease",
                }}
              >
                {size?.size}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity Selector */}
        <div>
          <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#000", marginBottom: "8px", textTransform: "uppercase" }}>
            Quantity
          </label>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", width: "fit-content", backgroundColor: "#f9f9f9", borderRadius: "8px", border: "1px solid #e5e5e5", padding: "4px" }}>
            <button onClick={() => dispatch(decrement())} style={{ width: "36px", height: "36px", border: "none", background: "transparent", cursor: "pointer", fontSize: "18px", fontWeight: 700, color: "#000", display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
            <input type="text" value={orderQuantity} readOnly disabled style={{ width: "48px", textAlign: "center", border: "none", background: "transparent", fontSize: "14px", fontWeight: 700, color: "#000" }} />
            <button onClick={() => dispatch(increment())} style={{ width: "36px", height: "36px", border: "none", background: "transparent", cursor: "pointer", fontSize: "18px", fontWeight: 700, color: "#000", display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          {stock > 0 ? (
            <>
              <button onClick={handleAddToCart} style={{ flex: 1, padding: "14px 20px", borderRadius: "8px", border: "2px solid #000", background: "#fff", color: "#000", fontSize: "13px", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                <ShoppingCart style={{ width: "16px", height: "16px" }} /> Add to Cart
              </button>
              <button onClick={() => {
                if (!variant) { setToastMessage("Please select a variant"); return; }
                dispatch(add_cart_product({
                  name: product?.name, image: product?.images[0]?.image, id: product?.id + variant, variant,
                  orderQuantity, discountedRetailPrice: price ?? 0, costPrice, retailPrice, discountPrice, discountPercent,
                  totalCostPrice: (costPrice ?? 0) * orderQuantity, totalPrice: (price ?? 0) * orderQuantity, productId: product?.id, productAttributeId
                }));
                router.push("/checkout");
              }} style={{ flex: 1, padding: "14px 20px", borderRadius: "8px", border: "none", background: "#000", color: "#fff", fontSize: "13px", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                <Send style={{ width: "16px", height: "16px" }} /> Order Now
              </button>
            </>
          ) : (
            <div style={{ flex: 1, padding: "14px 20px", borderRadius: "8px", border: "2px solid #DC2626", background: "#FEE2E2", color: "#DC2626", fontSize: "13px", fontWeight: 700, textAlign: "center" }}>
              Out of Stock
            </div>
          )}
        </div>

        {/* WhatsApp & Messenger */}
        {bottomShow && stock > 0 && (
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "12px" }}>
            <button onClick={handleOrderWhatsApp} style={{ flex: 1, padding: "12px 0", borderRadius: "8px", border: "none", backgroundColor: "#25D366", color: "#fff", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", cursor: "pointer" }}>
              <MessageCircle style={{ width: "16px", height: "16px" }} /> Order via WhatsApp
            </button>
            <button onClick={handleOrderMessenger} style={{ flex: 1, padding: "12px 0", borderRadius: "8px", border: "none", backgroundColor: "#0084FF", color: "#fff", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", cursor: "pointer" }}>
              <MessageCircle style={{ width: "16px", height: "16px" }} /> Order via Messenger
            </button>
          </div>
        )}

        {/* Toast */}
        {toastMessage && (
          <div style={{ position: "fixed", bottom: "80px", right: "20px", padding: "12px 20px", backgroundColor: "#000", color: "#fff", borderRadius: "8px", fontWeight: 600, zIndex: 999 }}>
            {toastMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailsUpper;
