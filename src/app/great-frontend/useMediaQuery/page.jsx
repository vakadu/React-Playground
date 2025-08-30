'use client'

import { useMediaQuery } from "./_useMediaQuery";

export default function UseMediaQuery() {
  const isSmallDevice = useMediaQuery('only screen and (max-width: 768px)');

  return <div>{isSmallDevice && <a href="#">Menu</a>}</div>;

}
