import React from "react";

type Props = {
  title: string;
  children?: React.ReactNode;
};

const Heading = ({ title, children }: Props) => {
  return (
    <div className="flex items-center flex-col lg:px-64 text-center">
      <h1 className="text-3xl font-bold mb-4 font-spartan">{title}</h1>
      <p className="text-gray-500 text-lg font-spartan">{children}</p>
    </div>
  );
};

export default Heading;
