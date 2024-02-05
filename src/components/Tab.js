import React from "react";

const Tab = props => {
  console.log("Tab props ", props)
  return <div>{props.children}</div>;
};

export default Tab;
