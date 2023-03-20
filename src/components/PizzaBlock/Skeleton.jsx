import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = () => (
  <ContentLoader
    speed={2}
    width={315}
    height={532}
    viewBox="0 0 315 532"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="139" cy="126" r="125"/>
    <rect x="2" y="271" rx="5" ry="5" width="277" height="20"/>
    <rect x="1" y="313" rx="5" ry="5" width="280" height="88"/>
    <rect x="1" y="431" rx="5" ry="5" width="91" height="27"/>
    <rect x="127" y="420" rx="25" ry="25" width="153" height="46"/>
  </ContentLoader>
)
export default Skeleton