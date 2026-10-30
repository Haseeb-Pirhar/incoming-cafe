"use client";
import React, { useState } from "react";
import { Text } from "@radix-ui/themes";

interface ExpandableTextProps {
  text?: string;
  maxLength?: number;
  className?: string;
  textStyle?: string;
}

const ExpandableText: React.FC<ExpandableTextProps> = ({
  text = "",
  maxLength = 150,
  className = "",
  textStyle = "",
}) => {
  const [expanded, setExpanded] = useState(false);

  if (!text) {
    return (
      <Text size="2" className={`text-gray-500 ${className}`}>
        -- No description provided --
      </Text>
    );
  }

  const isLong = text.length > maxLength;
  const displayText = expanded
    ? text
    : text.substring(0, maxLength) + (isLong ? "..." : "");

  return (
    <div className={`flex flex-col ${className}`}>
      <Text size="2" className={`${textStyle}`}>
        {displayText}
        {isLong && (
          <span
            onClick={() => setExpanded(!expanded)}
            className="underline text-xs text-blue-600 hover:text-blue-800 transition-all self-start mt-1 cursor-pointer!"
          >
            {expanded ? " see less" : " see more"}
          </span>
        )}
      </Text>
    </div>
  );
};

export default ExpandableText;
