import React, { useRef } from "react";
import styled from "styled-components";
import Card from "../Components/Card";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const Market = () => {
  const ref = useRef();

  return (
    <Container>
      {["./card1.png", "./card2.png", "./card3.png"].map((item, key) => {
        return (
          <>
            <Card key={key} card={item} ref={ref}></Card>
          </>
        );
      })}
    </Container>
  );
};

export default Market;
