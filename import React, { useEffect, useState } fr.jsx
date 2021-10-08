import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import News from "./News";

export const Banner = () => {
  const [{ count }, setCount] = useState({ count: 1 });
  // const [scaler, setScale] = useState(1);

  useEffect(() => {
    setInterval(() => {
      setCount((currentState) => ({ count: currentState.count + 1 }));
      // console.log(scaler);
    }, 1000);
  }, []);

  const Container = styled.div`
    background-color: tomato;
    grid-area: banner;
    overflow: hidden;
  `;

  const Img = styled.img`
    transform: scale(scaler);
    width: 100vw;
    height: 790px;
    transition-duration: 15s;
    /* transform: translate("-200px", "200px"); */
    /* transform: translate3d(100, 100, 100, 1); */

    /* :hover {
      transform: scale(1.3);
    } */
  `;

  return (
    <Container>
      {/* <Img
        // onMouseMove={() => {
        //   console.log(setScale(scaler + 1));
        //   // console.log();
        // }}
        // style={{}}
        src="https://s2.glbimg.com/0R_As-dWCJDclNFz2Q-vkZGgB9M=/0x64:1400x861/640x360/smart/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2021/B/n/FQ4IoJSGA1iKQn8y81NA/rib9390.jpg"
        alt="spfc"
      /> */}
      <div>Counter: {count}</div>
      <button
        onClick={() => {
          setCount((currentState) => ({ count: currentState.count + 1 }));
        }}
      >
        Increase
      </button>
    </Container>
  );
};

export default Banner;
