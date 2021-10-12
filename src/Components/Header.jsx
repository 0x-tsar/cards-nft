import React, { useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../providers/context";

export const Container = styled.div`
  background-color: white;
  grid-area: header;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #1c1c1c;
  border-bottom: 1px solid rgb(0, 0, 0, 0.3);
  padding: 5px;
`;

const Header = () => {
  const { myInfos } = useContext(AuthContext);

  return (
    <Container>
      <p>Account: {myInfos.account}</p>
      <p>Balance: {myInfos.balanceEther}</p>
    </Container>
  );
};

export default Header;
