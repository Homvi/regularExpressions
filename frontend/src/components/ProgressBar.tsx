import React from "react";

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => (
  <div className="w-full bg-gray-200 rounded-none md:rounded-full h-2.5 max-w-xl">
    <div
      className="bg-[#052138] h-2.5 rounded-none md:rounded-full transition-all duration-200"
      style={{ width: `${progress}%` }}
    ></div>
  </div>
);

export default ProgressBar;
