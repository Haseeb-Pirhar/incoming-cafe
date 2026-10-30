import React from "react";
import { Avatar, Flex, Text } from "@radix-ui/themes";
interface DashboadCardProps {
  image?: string;
  title?: string;
  subtitle?: string;
  radius?: "full" | "large" | "medium" | "small" | "none";
  size?: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
  titleSize?: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
  subTitleSize?: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
}

const ReusableAvatar: React.FC<DashboadCardProps> = ({
  image,
  title,
  radius,
  size,
  subtitle,
  titleSize,
  subTitleSize,
}) => {
  return (
    <Flex gap="3" align="center">
      <Avatar
        size={size || "3"}
        src={image}
        radius={radius || "full"}
        fallback={title?.charAt(0) || ""}
      />
      <Flex direction="column">
        <Text size={titleSize || "2"} weight="medium">
          {title}
        </Text>
        {subtitle && (
          <Text size={subTitleSize || "1"} className="text-muted-foreground">
            {subtitle}
          </Text>
        )}
      </Flex>
    </Flex>
  );
};

export default ReusableAvatar;
