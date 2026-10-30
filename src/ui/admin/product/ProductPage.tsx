"use client";
import { deleteProduct, getAllProducts } from "@/api/api-call/product-api";
import DialogDelete from "@/components/dialog-alert/DialogDelete";
import MediaPreview from "@/components/ui/MediaPreview";
import Loader from "@/components/ui/loader";
import { Box, Button } from "@radix-ui/themes";
import { Tag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlinePlus, HiOutlineXMark } from "react-icons/hi2";
import * as Dialog from "@radix-ui/react-dialog";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Product } from "@/types/product";
import ProductForm from "./ProductForm";
import AdminProductCard from "@/components/admin/ProductCard";

const t = (key: string) => {
  const translations: Record<string, string> = {
    totalProducts: "Total Products",
    products: "Products",
    noProductsAvailable: "No products available",
  };
  return translations[key] || key;
};

const ProductPage = () => {
  const [totalProducts, setTotalProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 1,
  });
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const optimisticallyUpdate = (updated: Product) => {
    setTotalProducts((prev) =>
      prev.map((p) => (p._id === updated._id ? updated : p)),
    );
    setEditDialogOpen(false);
    setEditProduct(null);
  };

  const getProducts = async (page = 1) => {
    setLoading(true);
    const res = await getAllProducts(page);
    if (res) {
      setTotalProducts(res.data as Product[]);
      if (res.pagination) {
        setPagination((prev) => ({
          ...prev,
          ...res.pagination,
          pages: res.pagination.pages ?? prev.pages,
        }));
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    getProducts(pagination.page);
  }, [pagination.page]);

  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  const handleDelete = async (id: string) => {
    const res = await deleteProduct(id);
    if (!res) {
      toast.error("Failed to delete product item.");
      return;
    }
    toast.success("Product item deleted successfully.");
    setTotalProducts((prev) => prev.filter((p) => p._id !== id));
  };

  const addOptimistically = (product: Product) => {
    setTotalProducts((prev) => [product, ...prev]);
    setDialogOpen(false);
  };

  return (
    <div style={{ fontFamily: "'Work Sans', sans-serif" }}>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1
            className="text-3xl font-bold text-[#2F4F3E]"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            {t("totalProducts")}
          </h1>
          <p className="text-xs text-[#2F4F3E]/50 mt-1">
            {pagination.total || totalProducts.length} item
            {(pagination.total || totalProducts.length) === 1 ? "" : "s"} listed
          </p>
        </div>

        {/* Add Product — opens the form in a modal dialog */}
        <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
          <Dialog.Trigger asChild>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 bg-[#A5432A] hover:bg-[#A5432A]/90 text-[#FAF3E3] px-4 py-2 rounded-full font-medium shadow-md shadow-[#A5432A]/30 cursor-pointer"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              <HiOutlinePlus className="text-lg" />
              Add Product
            </motion.button>
          </Dialog.Trigger>

          <AnimatePresence>
            {dialogOpen && (
              <Dialog.Portal forceMount>
                <Dialog.Overlay asChild forceMount>
                  <motion.div
                    className="fixed inset-0 bg-[#2F4F3E]/60 backdrop-blur-sm z-40"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                </Dialog.Overlay>

                <Dialog.Content asChild forceMount>
                  <motion.div
                    className="fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-md -translate-x-1/2 -translate-y-1/2 max-h-[88vh] overflow-y-auto rounded-2xl bg-white shadow-2xl"
                    initial={{ opacity: 0, scale: 0.92, y: 16 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.92, y: 16 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  >
                    <Dialog.Close asChild>
                      <button className="absolute top-3 right-3 z-10 text-[#FAF3E3]/80 hover:text-[#FAF3E3] transition-colors cursor-pointer">
                        <HiOutlineXMark className="text-xl" />
                      </button>
                    </Dialog.Close>
                    <ProductForm addOptimistically={addOptimistically} />
                  </motion.div>
                </Dialog.Content>
              </Dialog.Portal>
            )}
          </AnimatePresence>
        </Dialog.Root>
      </div>

      {loading ? (
        <Loader label={t("products")} />
      ) : totalProducts?.length === 0 ? (
        <Box className="text-center h-50! bg-[#FAF3E3] rounded-2xl border border-[#D4A017]/30">
          <div className="flex justify-center items-center h-full">
            <b className="text-[#2F4F3E]/60 font-normal">
              {t("noProductsAvailable")}
            </b>
          </div>
        </Box>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
          {totalProducts.map((product, index) => (
            <AdminProductCard
              key={product._id}
              product={product}
              index={index}
              onEdit={(p) => {
                setEditProduct(p);
                setEditDialogOpen(true);
              }}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {totalProducts?.length > 0 && (
        <div className="flex justify-center items-center gap-3 mt-14">
          <Button
            variant="outline"
            size="2"
            disabled={pagination.page === 1}
            onClick={() => handlePageChange(pagination.page - 1)}
            className="!border-[#2F4F3E]/30 !text-[#2F4F3E] hover:!bg-[#2F4F3E]/5 disabled:!opacity-40"
          >
            Previous
          </Button>
          <span
            className="px-3 py-2 text-[#2F4F3E]/70 text-sm"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Page {pagination.page} of {pagination.pages}
          </span>
          <Button
            variant="outline"
            size="2"
            disabled={pagination.page === pagination.pages}
            onClick={() => handlePageChange(pagination.page + 1)}
            className="!border-[#2F4F3E]/30 !text-[#2F4F3E] hover:!bg-[#2F4F3E]/5 disabled:!opacity-40"
          >
            Next
          </Button>
        </div>
      )}
      <Dialog.Root open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <AnimatePresence>
          {editDialogOpen && editProduct && (
            <Dialog.Portal forceMount>
              <Dialog.Overlay asChild forceMount>
                <motion.div
                  className="fixed inset-0 bg-[#2F4F3E]/60 backdrop-blur-sm z-40"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
              </Dialog.Overlay>
              <Dialog.Content asChild forceMount>
                <motion.div
                  className="fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-md -translate-x-1/2 -translate-y-1/2 max-h-[88vh] overflow-y-auto rounded-2xl bg-white shadow-2xl"
                  initial={{ opacity: 0, scale: 0.92, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: 16 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <Dialog.Close asChild>
                    <button className="absolute top-3 right-3 z-10 text-[#FAF3E3]/80 hover:text-[#FAF3E3] transition-colors cursor-pointer">
                      <HiOutlineXMark className="text-xl" />
                    </button>
                  </Dialog.Close>
                  <ProductForm
                    data={editProduct}
                    edit={true}
                    id={editProduct._id}
                    optimisticallyUpdate={optimisticallyUpdate}
                  />
                </motion.div>
              </Dialog.Content>
            </Dialog.Portal>
          )}
        </AnimatePresence>
      </Dialog.Root>
    </div>
  );
};

export default ProductPage;
