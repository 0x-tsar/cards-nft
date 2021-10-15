import React from "react";
import styled from "styled-components";
import Link from "next/link";

export const Container = styled.div`
  background-color: #ffffff;
  border-right: 1px solid rgb(0, 0, 0, 0.3);
  grid-area: leftbar;

  ul {
    padding: 0;
    margin: 0;
  }

  ul li {
    margin-top: 10px;
    /* padding: 10px; */
    padding: 10px 70px;
    border-radius: 5px;
  }

  ul li:hover {
    color: white;
    background-color: #00bfff;
  }

  display: flex;
  justify-content: center;
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
