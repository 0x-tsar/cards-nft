import "../../styles/globals.css";
import styled from "styled-components";
import Header from "../Components/Header";
import LeftBar from "../Components/LeftBar";
import Head from "next/head";

import { AuthProvider } from "../providers/context";
import { useState } from "react";

export const Container = styled.div`
  /* background-color: rgb(230, 230, 230); */
  background-color: #1f262f;
  /* background-color: rgb(26, 33, 42); */

  display: grid;
  grid-template-areas:
    "header header"
    "leftbar main";

  overflow: hidden;

  grid-column-gap: 1px;
  grid-row-gap: 1px;
  grid-gap: 1px;

  grid-template-columns: 300px 1fr;
  grid-template-rows: 80px;

  height: 100vh;
  /* grid-template-rows: 80px calc(100vh - 80px); */

  overflow: hidden;
`;

export const LoadingScreen = styled.div`
  width: 300px;
  height: 300px;
  background-color: red;
  color: white;
  background-color: black;
  /* background: linear-gradient(20deg, blue, blueviolet); */
  z-index: 5;
  border-radius: 10px;

  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  font-size: 25px;
  display: ${(props) => props.visibility};
`;

function MyApp({ Component, pageProps }) {
  const [vis, setVis] = useState("none");

  const changeVis = (v) => {
    setVis(v);
  };

  return (
    <AuthProvider>
      <Head>
        <title>Cards NFT</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        {/* <link
          href="https://fonts.googleapis.com/css2?family=Kanit:ital@0;1&display=swap"
          rel="stylesheet"
        /> */}
      </Head>

      <div
        style={{
          // display: "flex",
          // justifyContent: "center",
          // alignItems: "center",
          position: "absolute",
          marginLeft: "50%",
          marginTop: "30vh",
        }}
      >
        {/* flex or none */}
        <LoadingScreen visibility={vis}>
          <div>
            <img
              src="./loading.gif"
              width="100px"
              style={{ marginLeft: "75px" }}
            ></img>
            <div>Processing payment..</div>
          </div>
        </LoadingScreen>
      </div>

      <Container>
        <Header />
        <LeftBar />
        <Component changeVis={changeVis} {...pageProps} />
      </Container>
    </AuthProvider>
  );
}

export default MyApp;
