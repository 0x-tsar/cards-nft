import React, { useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../providers/context";

export const Container = styled.div`
  background-color: white;
  grid-area: header;
  display: flex;
  align-items: center;
  padding-left: 20px;
  font-weight: bolder;
`;

const Header = () => {
  const { nft, setNft, marketCards, setMarketCards, myInfos, setMyInfos } =
    useContext(AuthContext);
  return <Container>{<p>Address: {myInfos.currentAddress}</p>}</Container>;
};

export default Header;
