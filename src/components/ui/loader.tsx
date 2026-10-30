import { Loader2 } from "lucide-react";
import React from "react";

interface LoaderProps {
  label?: string;
  labelColor?: string;
  loaderColor?: string;
}

const Loader: React.FC<LoaderProps> = ({
  label = "",
  labelColor = "text-black",
  loaderColor = "text-black",
}) => {
  return (
    <div className="flex items-center justify-center h-[200px]">
      <div className="flex items-center space-x-2">
        <Loader2 className={`w-6 h-6 animate-spin ${loaderColor}`} />
        <span className={`${labelColor} font-medium`}>
          Loading {label}
          {label ? "..." : "..."}
        </span>
      </div>
    </div>
  );
};

export default Loader;
