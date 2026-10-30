"use client";
import { motion } from "framer-motion";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import ProductCardBase from "@/components/shared/ProductCardBase";
import DialogDelete from "@/components/dialog-alert/DialogDelete";
import { ACCENT } from "@/components/user-dashboard/theme";
import { Product } from "@/types/product";

export default function AdminProductCard({
  product,
  index,
  onEdit,
  onDelete,
}: {
  product: Product;
  index: number;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <ProductCardBase
      product={product}
      index={index}
      actions={
        <div className="flex items-center gap-1.5">
          <motion.button
            type="button"
            onClick={() => onEdit(product)}
            whileHover={{ scale: 1.1, rotate: -6 }}
            whileTap={{ scale: 0.9 }}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 sm:h-9 sm:w-9"
            style={{ backgroundColor: ACCENT.teal, borderColor: ACCENT.ink }}
            aria-label="Edit product"
          >
            <HiOutlinePencilSquare className="text-base text-white sm:text-lg" />
          </motion.button>

          <div
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 sm:h-9 sm:w-9"
            style={{ backgroundColor: ACCENT.coral, borderColor: ACCENT.ink }}
          >
            <DialogDelete
              func={() => onDelete(String(product._id))}
              type="Product"
            />
          </div>
        </div>
      }
    />
  );
}
