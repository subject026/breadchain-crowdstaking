import React from "react";

export const Logo: React.FC = (props) => {
  return (
    <div className="flex items-center">
      <img
        className="h-5"
        src="data:image.jpeg;base64, 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"
        alt=""
      />
    </div>
  );
};

export default Logo;
