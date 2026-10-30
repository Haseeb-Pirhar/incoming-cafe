import React from "react";
import clsx from "clsx";
import { Box, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import accountsImage from "../../public/accountsimage.png";
import mobileResImg from "../../public/mobileResImg.png";
import applogo from "../../public/app-logo.png";
import Image from "next/image";

interface OnboardingProps {
  heading?: string;
  children?: React.ReactNode;
  variant?: "default";
  className?: string;
}

const OnboardingLayout: React.FC<OnboardingProps> = ({
  heading,
  children,
  variant = "default",
  className,
}) => {
  const baseStyles = "";

  const variantStyles = {
    default: "",
  };

  return (
    <Box className={clsx(baseStyles, variantStyles[variant], className)}>
      <Flex className="flex justify-between flex-col-reverse lg:flex-row">
        <Flex
          direction="column"
          gap="6"
          justify="center"
          className="w-full lg:w-[60%] lg:px-[4rem] md:px-[2rem] px-[1rem] relative"
        >
          <Box
            className="!hidden md:!hidden lg:!block absolute top-10"
            px="4"
            py="6"
          >
            <Image
              width={100}
              height={100}
              src={applogo}
              alt="App Logo"
              className="h-12 w-auto"
            />
          </Box>
          {heading && (
            <Text
              size="6"
              align="center"
              className="!hidden md:!hidden lg:!block "
            >
              {heading}
            </Text>
          )}

          <Box p="4">{children}</Box>
        </Flex>
        <Box className="w-full lg:w-[40%] ">
          <div className="relative ">
            <div className="absolute bg-black/30 inset-0 z-10 flex items-center justify-center lg:hidden ">
              <Flex direction="column" gap="4" justify="center" align="center"> 
                <Image
                  width={100}
                  height={100}
                  src={applogo}
                  alt="App Logo"
                  className="h-20 w-auto"
                />
                {heading && (
                  <Text size="6" className="text-white">
                    {heading}
                  </Text>
                )}
              </Flex>
            </div>

            <div className="relative ">
              <Image
                src={accountsImage}
                alt=""
                className="object-cover w-full h-[360px] relative  lg:h-screen lg:block  hidden"
              />
              <div className="absolute inset-0 bg-black/30"></div>
              <Image
                src={mobileResImg}
                alt=""
                className="object-cover w-full md:h-[360px]  lg:hidden md:block block "
              />
            </div>
          </div>
        </Box>
      </Flex>
    </Box>
  );
};

export default OnboardingLayout;
