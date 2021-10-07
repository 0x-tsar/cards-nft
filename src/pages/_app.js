import "../../styles/globals.css";
import styled from "styled-components";
import Header from "../Components/Header";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: blue;
  display: grid;
  grid-template-areas:
    "header"
    "main";

  grid-template-rows: 60px 1fr;
  grid-template-columns: 1fr;

  /* flex-direction: column; */
`;

function MyApp({ Component, pageProps }) {
  return (
    <Container>
      <Header />
      <Component {...pageProps} />
    </Container>
  );
}

export default MyApp;
