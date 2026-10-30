"use client";
import { motion } from "framer-motion";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { FaWhatsapp } from "react-icons/fa";
import toast from "react-hot-toast";
import ProductCardBase from "@/components/shared/ProductCardBase";
import { useCart } from "./cart/CartContext";
import { ACCENT } from "./theme";
import { Product } from "@/types/product";

export default function ProductCard({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  const { addToCart } = useCart();

  const mediaSrc =
    Array.isArray(product.media) && product.media.length > 0
      ? product.media[0]
      : undefined;

  const hasDiscount =
    product.discountPrice != null &&
    Number(product.discountPrice) > 0 &&
    Number(product.discountPrice) < Number(product.price);

  const categoryName =
    typeof product.category === "object"
      ? (product.category as any)?.name
      : null;

  const stock = product.stock != null ? Number(product.stock) : undefined;
  const outOfStock = stock != null && stock === 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (outOfStock) return;
    addToCart({
      productId: String(product._id),
      name: product.name,
      image: mediaSrc,
      price: hasDiscount
        ? Number(product.discountPrice)
        : Number(product.price),
      stock,
      category: categoryName || undefined,
    });
    toast.success(`${product.name} added to cart`);
  };

  const handleWhatsAppOrder = (e: React.MouseEvent) => {
    e.stopPropagation();
    const phoneNumber = "923294552747"; // apna business number (country code, + ke bina)
    const message = `Assalam-o-Alaikum! Mujhe ye product order karna hai:\n\n*${product.name}*\nPrice: Rs ${(hasDiscount
      ? Number(product.discountPrice)
      : Number(product.price)
    ).toLocaleString()}`;
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  return (
    <ProductCardBase
      product={product}
      index={index}
      actions={
        <div className="flex items-center gap-1.5">
          <motion.button
            type="button"
            onClick={handleWhatsAppOrder}
            whileHover={{ scale: 1.1, rotate: 6 }}
            whileTap={{ scale: 0.9 }}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 sm:h-9 sm:w-9"
            style={{ backgroundColor: "#25D366", borderColor: ACCENT.ink }}
            aria-label="Order on WhatsApp"
          >
            <FaWhatsapp className="text-base text-white sm:text-lg" />
          </motion.button>

          <motion.button
            type="button"
            disabled={outOfStock}
            onClick={handleAddToCart}
            whileHover={outOfStock ? {} : { scale: 1.1, rotate: -6 }}
            whileTap={outOfStock ? {} : { scale: 0.9 }}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 disabled:opacity-40 sm:h-9 sm:w-9"
            style={{
              backgroundColor: outOfStock ? "#ccc" : ACCENT.marigold,
              borderColor: ACCENT.ink,
            }}
            aria-label="Add to bag"
          >
            <HiOutlineShoppingBag
              className="text-base sm:text-lg"
              style={{ color: ACCENT.ink }}
            />
          </motion.button>
        </div>
      }
    />
  );
}
