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

export const HolderTeams = styled.div`
  width: 100%;
  height: 400px;
  background-color: blueviolet;

  div {
    display: flex;
    flex-direction: row;
    justify-content: center;
    /* margin: 10px; */
    cursor: pointer;
    /* background-color: black; */

    div {
      padding: 4px;
    }

    .seriea:hover {
      color: white;
      background-color: black;
    }

    .serieb:hover {
      color: white;
      background-color: black;
    }

    .europa:hover {
      color: white;
      background-color: black;
    }
  }
`;

const LeftBar = () => {
  const { refresh, setRefresh } = useContext(AuthContext);

  return (
    <Container>
      <div>
        <ul style={{ listStyleType: "none" }}>
          <Link href={"/"}>
            <a onClick={() => setRefresh(!refresh)}>
              <li>Home</li>
            </a>
          </Link>

          <Link href={"/market"}>
            <a onClick={() => setRefresh(!refresh)}>
              <li>Market</li>
            </a>
          </Link>

          {/* <Link href={"/explorer"}>
            <a>
              <li>Explorer</li>
            </a>
          </Link> */}
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

      <HolderTeams>
        <div>
          <div className="seriea">Série A</div>
          <div className="serieb">Série B</div>
          <div className="europa">Série Europa</div>
        </div>

        <div style={{ width: "100%", height: "100%" }}>
          <img src="a.png" width="100%" height="95%" />
          {/* <img src="b.png" width="100%" height="95%" />
          <img src="e.png" width="100%" height="95%" /> */}
        </div>
      </HolderTeams>
    </Container>
  );
};

export default LeftBar;
