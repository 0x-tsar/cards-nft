import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { AuthContext } from "../providers/context";

export const Container = styled.div`
  background-color: #ffffff;
  border-right: 1px solid rgb(0, 0, 0, 0.3);
  grid-area: leftbar;
  background-color: rgb(26, 33, 42);
  color: white;

  display: flex;
  flex-wrap: wrap;

  ul {
    padding: 0;
    margin: 0;
  }

  a {
    color: rgba(0, 0, 0, 0);
  }

  ul li {
    text-decoration: none;

    outline: none;
    color: white;
    margin-top: 10px;
    /* padding: 10px; */
    padding: 10px 70px;
    border-radius: 1px;
  }

  ul li:hover {
    color: white;
    background-color: #11af5b;
  }

  display: flex;
  justify-content: center;
`;

export const HolderCreator = styled.div`
  width: 100%;
  height: 200px;
  /* background-color: red; */

  display: flex;
  justify-content: center;
  /* padding: 100px 0; */
  align-items: center;
  flex-wrap: wrap;

  button {
    height: 60px;
  }
`;

const LeftBar = () => {
  // const [whichTab, setWhichTab] = useState(1);
  const { whichTab, setWhichTab } = useContext(AuthContext);
  const funWhich = (which) => {
    if (which === 1) {
      return (
        <li style={{ backgroundColor: "#11af5b", color: "white" }}>Home</li>
      );
    } else if (which === 2) {
      return (
        <li style={{ backgroundColor: "#11af5b", color: "white" }}>Market</li>
      );
    } else if (which === 3) {
      return (
        <li style={{ backgroundColor: "#11af5b", color: "white" }}>Explorer</li>
      );
    }
  };
  // funWhich(whichTab)
  return (
    <Container>
      <div>
        <ul style={{ listStyleType: "none" }}>
          <Link href={"/"}>
            <a onClick={() => setWhichTab(1)}>
              {whichTab === 1 ? (
                <li style={{ backgroundColor: "#11af5b", color: "white" }}>
                  Home
                </li>
              ) : (
                <li>Home</li>
              )}
            </a>
          </Link>

          <Link href={"/market"}>
            <a onClick={() => setWhichTab(2)}>
              {whichTab === 2 ? (
                <li style={{ backgroundColor: "#11af5b", color: "white" }}>
                  Market
                </li>
              ) : (
                <li>Market</li>
              )}
            </a>
          </Link>

          <Link href={"/explorer"}>
            <a onClick={() => setWhichTab(3)}>
              {whichTab === 3 ? (
                <li style={{ backgroundColor: "#11af5b", color: "white" }}>
                  Explorer
                </li>
              ) : (
                <li>Explorer</li>
              )}
            </a>
          </Link>
        </ul>
      </div>

      <HolderCreator>
        <button type="button" className="btn btn-primary">
          <Link href={"/create"}>
            <a>
              <li style={{ color: "white", listStyle: "none" }}> Create new</li>
            </a>
          </Link>
        </button>

        <button type="button" className="btn btn-secondary">
          Require for Card Creator
        </button>
      </HolderCreator>
    </Container>
  );
};

export default LeftBar;
