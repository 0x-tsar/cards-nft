import React from "react";
import styled from "styled-components";
import Link from "next/link";

export const Container = styled.div`
  background-color: #00ff6e;
  grid-area: leftbar;
`;

const LeftBar = () => {
  return (
    <Container>
      <ul style={{ listStyleType: "none" }}>
        <Link href={"/"}>
          <a>
            <li>Home</li>
          </a>
        </Link>

        <Link href={"/market"}>
          <a>
            <li>Market</li>
          </a>
        </Link>
      </ul>
    </Container>
  );
};

export default LeftBar;
