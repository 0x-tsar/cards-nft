import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { AuthContext } from "../providers/context";
import Router from "next/router";

export const Container = styled.div`
  /* background-color: white; */
  background-color: rgb(26, 33, 42);

  grid-area: header;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* color: #1c1c1c; */
  color: white;
  border-bottom: 1px solid rgb(0, 0, 0, 0.3);
  padding: 10px;
  font-size: 21px;
`;

const Header = () => {
  const { myInfos, search, setSearch, changed, setChanged } =
    useContext(AuthContext);
  // const [searchh, setSearchh] = useState("");

  const handleForm = (e) => {
    // setSearchh(e.target.value);
    setSearch(e.target.value);
    // console.log(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //do solidity search here
    //display all cards from this club
    setChanged(true);

    setTimeout(() => {
      setChanged(false);
    }, 300);
  };

  useEffect(() => {
    //go to searcher
    // Router.push("/searcher");
  }, [changed]);

  return (
    <Container>
      <p>Account: {myInfos.account}</p>
      <div>
        <form action="submit" onSubmit={handleSubmit}>
          <input
            type="text"
            value={search}
            name={search}
            style={{
              width: "220px",
              height: "40px",
              fontSize: "20px",
              outline: "none",
              borderRadius: "6px",
            }}
            onChange={(e) => handleForm(e)}
            placeholder="Pesquise um time.."
          />
        </form>
      </div>
      <p>Balance: {myInfos.balanceEther}</p>
    </Container>
  );
};

export default Header;
