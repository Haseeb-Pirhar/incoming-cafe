"use client";
import React, { useState, useEffect } from "react";
import DialogDelete from "./dialog-alert/DialogDelete";
import DialogUpdate from "./dialog-alert/DialogUpdate";
import { Button, Flex, Inset, Text } from "@radix-ui/themes";
import moment from "moment";
import { IoHeart } from "react-icons/io5";
import { PiEnvelopeSimpleThin } from "react-icons/pi";
import { BsChatSquareDots } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
import Link from "next/link";
import { likeItem } from "@/api/api-call/products";
import { Likes } from "@/types/recientItem";
import { User } from "@/types";

const ProductCard = ({
  type,
  data,
  currentUser,
  deleteOptimistically,
  editOptimistically,
  liked,
}: {
  type: string;
  data: any;
  currentUser: User | null;
  deleteOptimistically: (id: string) => void;
  editOptimistically: any;
  liked: Likes[];
}) => {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setIsLiked(
      liked.some(
        (like: { item: { _id: string } }) => like.item?._id === data._id
      )
    );
  }, [liked, data._id]);

  const handleLikeToggle = async () => {
    setIsLiked((prev: any) => !prev);
    try {
      await likeItem(data?.listingType, data.owner._id, data._id);
    } catch (error) {
      setIsLiked((prev: any) => !prev);
      console.error("Error toggling like:", error);
    }
  };
  return (
    <>
      {currentUser?._id !== data?.owner?._id && (
        <div className="my-2">
          <Inset
            clip="padding-box"
            side="top"
            pb="current"
            className="!rounded-xl relative overflow-hidden"
          >
            <img
              src={data?.media?.[0]}
              alt="Property Image"
              style={{
                display: "block",
                objectFit: "cover",
                width: "100%",
                height: 200,
                backgroundColor: "var(--gray-5)",
              }}
            />
            <div className="absolute bg-black/10 inset-0  w-full ">
              {currentUser?._id && (
                <div className="flex justify-end ">
                  <div
                    className="m-3 w-fit z-50 bg-[#0F172A14] rounded-full p-2 text-white cursor-pointer hover:bg-[#0F172A26] transition-all"
                    onClick={handleLikeToggle}
                  >
                    {isLiked ? (
                      <IoHeart size="1.5rem" color="red" />
                    ) : (
                      <CiHeart size="1.5rem" />
                    )}
                  </div>
                </div>
              )}
            </div>
          </Inset>
          <Flex direction="column" gap="1" className="p-4">
            <Text size="2">{data.title}</Text>
            <Text size="3" weight="medium">
              {data.price}
            </Text>
            <Flex justify="between">
              <Text size="1">{data.city}</Text>
              <Text size="1">{moment(data?.createdAt).format("D MMM")} </Text>
            </Flex>
          </Flex>
          <hr className="!border-[0.1px] border-gray-300" />
          {currentUser?._id === data?.owner ||
          currentUser?._id === data?.owner?._id ? (
            <div className="flex justify-center items-center gap-2 p-2">
              <DialogUpdate
                optimisticallyUpdate={editOptimistically}
                id={data._id}
                type={`edit-${type}`}
                data={data}
                edit={true}
              />
              <DialogDelete
                type={type}
                func={() => deleteOptimistically(data._id)}
              />
              <Button className="text-lg capitalize !min-w-[30%] !cursor-pointer !border !border-[#D0DAEE] px-3 py-1 !rounded-md font-medium !bg-transparent !text-[#1D2A44]">
                Mark Sold
              </Button>
            </div>
          ) : (
            <div className="flex justify-center items-center gap-2 p-2">
              <Button className="text-lg  capitalize !min-w-[48%] !cursor-pointer !border !border-[#D0DAEE] px-3 py-1 !rounded-md font-medium !bg-transparent !text-[#1D2A44]">
                <Link
                  href={`mailto:${data?.owner?.email}`}
                  className="!flex !justify-center !items-center !gap-1"
                >
                  <PiEnvelopeSimpleThin size="1.3rem" />
                  Mail
                </Link>
              </Button>

              <Button className="text-lg capitalize !cursor-pointer !min-w-[48%] !flex !justify-center !items-center !gap-[5px]   px-3 py-1 !rounded-md font-medium !bg-[#F25822] !text-white">
                <BsChatSquareDots size="1rem" />
                Chat
              </Button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ProductCard;
