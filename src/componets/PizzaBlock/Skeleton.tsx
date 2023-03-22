import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="23" y="272" rx="10" ry="10" width="251" height="27" />
    <circle cx="143" cy="137" r="122" />
    <rect x="26" y="314" rx="10" ry="10" width="248" height="88" />
    <rect x="30" y="423" rx="10" ry="10" width="74" height="31" />
    <rect x="146" y="419" rx="25" ry="25" width="123" height="42" />
  </ContentLoader>
);

export default Skeleton;
