import "../../styles/globals.css";
import styled from "styled-components";
import Header from "../Components/Header";
import LeftBar from "../Components/LeftBar";
import Head from "next/head";

import { AuthProvider } from "../providers/context";

export const Container = styled.div`
  background-color: rgb(230, 230, 230);
  /* background-color: tomato; */
  display: grid;
  grid-template-areas:
    "header header"
    "leftbar main";

  overflow: hidden;

  /* grid-column-gap: 6px; */
  grid-row-gap: 1px;
  /* grid-gap: 0px; */

  grid-template-columns: 200px 1fr;
  grid-template-rows: 60px calc(100vh - 60px);

  overflow: hidden;
`;

function MyApp({ Component, pageProps }) {
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

      <Container>
        <Header />
        <LeftBar />
        <Component {...pageProps} />
      </Container>
    </AuthProvider>
  );
}

export default MyApp;
