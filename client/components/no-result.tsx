import Image from "next/image";
import React from "react";

interface INoResult {
  text: string;
  className?: string;
  imageSize?: "sm" | "md" | "lg";
}

export default function NoResult({
  text,
  className = "",
  imageSize = "md",
}: INoResult) {
  const sizeMap = {
    sm: { width: 150, height: 150 },
    md: { width: 200, height: 200 },
    lg: { width: 250, height: 250 },
  };

  return (
    <div
      className={`flex flex-col items-center justify-center text-center p-6 ${className}`}
    >
      <div className="relative mb-6">
        <Image
          src={"/no-result.svg"}
          alt="No results found"
          width={sizeMap[imageSize].width}
          height={sizeMap[imageSize].height}
          className="opacity-90"
        />
      </div>

      <h3 className="text-xl font-semibold text-gray-700 mb-2">{text}</h3>
    </div>
  );
}
