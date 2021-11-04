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
  /* height: 100vh; */
  flex-wrap: wrap;
  align-content: flex-start;

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
  /* height: 200px; */
  align-content: flex-start;
  display: flex;
  justify-content: center;

  /* padding: 100px 0; */
  /* align-items: center; */
  flex-wrap: wrap;

  button {
    height: 60px;
    margin: 10px;
  }
`;

export const HolderTeams = styled.div`
  width: 100%;
  height: min-content;
  /* background-color: red; */
  margin-top: 100px;
  align-content: flex-start;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  /* word-wrap: break-word; */

  div {
    margin-bottom: 10px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    cursor: pointer;

    div {
      padding: 4px;
    }

    .seriea:hover {
      color: white;
      background-color: #20c997;
    }

    .serieb:hover {
      color: white;
      background-color: #20c997;
    }

    .europa:hover {
      color: white;
      background-color: #20c997;
    }
  }
`;

export const EachTeam = styled.div`
  width: 60px;
  height: 60px;
  /* background-color: black; */
  border-radius: 2px;
  margin: 2px;
  cursor: pointer;
`;

const teams_badges_a = [
  {
    ticker: "atletico-goianiense",
    name: "Atlético Goianiense",
    picture: "/alteticogo.png",
  },
  {
    ticker: "america-mineiro",
    name: "América Mineiro",
    picture: "/america-mg.png",
  },
  {
    ticker: "atletico-mineiro",
    name: "Atlético Mineiro",
    picture: "/atleticomg.png",
  },
  { ticker: "bahia", name: "Bahia", picture: "/bahia.png" },
  { ticker: "bragantino", name: "Bragantino", picture: "/bragantino.png" },
  { ticker: "ceara", name: "Ceará", picture: "/ceara.png" },
  { ticker: "chapecoense", name: "Chapecoense", picture: "/chapecoense.png" },
  { ticker: "corinthians", name: "Corinthians", picture: "/corinthians.png" },
  { ticker: "cuiaba", name: "Cuiabá", picture: "/cuiaba.png" },
  { ticker: "flamengo", name: "Flamengo", picture: "/flamengo.png" },
  { ticker: "fluminense", name: "Fluminense", picture: "/fluminense.png" },
  { ticker: "fortaleza", name: "Fortaleza", picture: "/fortaleza.png" },
  { ticker: "gremio", name: "Grêmio", picture: "/gremio.png" },
  {
    ticker: "internacional",
    name: "Internacional",
    picture: "/internacional.png",
  },
  { ticker: "juventude", name: "Juventude", picture: "/juventude.png" },
  { ticker: "palmeiras", name: "Palmeiras", picture: "/palmeiras.png" },
  {
    ticker: "athletico-paranaense",
    name: "Athletico Paranaense",
    picture: "/paranaense.png",
  },
  { ticker: "santos", name: "Santos", picture: "/santos.png" },
  { ticker: "sao-paulo", name: "São Paulo", picture: "/spfc.png" },
  { ticker: "sport", name: "Sport", picture: "/sport.png" },
];

const teams_badges_b = [
  { name: "Avaí", picture: "/avai.png" },
  { name: "Botafogo", picture: "/botafogo.png" },
  { name: "Brasil de Pelotas", picture: "/brasildepelotas.png" },
  { name: "Brusque", picture: "/brusque.png" },
  { name: "Confiança", picture: "/confianca.png" },
  { name: "Coritiba", picture: "/coritiba.png" },
  { name: "CRB", picture: "/crb.png" },
  { name: "Cruzeiro", picture: "/cruzeiro.png" },
  { name: "CSA", picture: "/csa.png" },
  { name: "Goiás", picture: "/goias.png" },
  { name: "Guarani", picture: "/guarani.png" },
  { name: "Londrina", picture: "/londrina.png" },
  { name: "Nautico", picture: "/nautico.png" },
  { name: "Operário", picture: "/operario.png" },
  { name: "Ponte Preta", picture: "/pontepreta.png" },
  { name: "Remo", picture: "/remo.png" },
  { name: "Sampaio Correa", picture: "/sampaiocorrea.png" },
  { name: "Vasco", picture: "/vasco.png" },
  { name: "Vila Nova", picture: "/vilanova.png" },
  { name: "Vitória", picture: "/vitoria.png" },
];

const teams_badges_europe = [
  { name: "Arsenal", picture: "/arsenal.png" },
  { name: "Atletico Madrid", picture: "/atleticomadrid.png" },
  { name: "Barcelona", picture: "/barcelona.png" },
  { name: "Bayern", picture: "/bayern.png" },
  { name: "Benfica", picture: "/benfica.png" },
  { name: "Borussia", picture: "/bvb.png" },
  { name: "Chelsea", picture: "/chelsea.png" },
  { name: "Manchester City", picture: "/city.png" },
  { name: "Internazionale", picture: "/internazionale.png" },
  { name: "Juventus", picture: "/juventus.png" },
  { name: "Liverpool", picture: "/liverpool.png" },
  { name: "Lyon", picture: "/lyon.png" },
  { name: "Real Madrid", picture: "/madrid.png" },
  { name: "Manchester United", picture: "/manunited.png" },
  { name: "Milan", picture: "/milan.png" },
  { name: "Napoli", picture: "/napoli.png" },
  { name: "Porto", picture: "/porto.png" },
  { name: "PSG", picture: "/psg.png" },
  { name: "Roma", picture: "/roma.png" },
  { name: "Tottenham", picture: "/tottenham.png" },
];

const clubsChart = (active) => {
  if (active === 0) {
    return (
      <>
        {teams_badges_a.map((item, key) => {
          return (
            <Link href={`/clubs/${item.ticker.toLowerCase()}`} key={key}>
              <a
              // onClick={() => setRefresh(!refresh)}
              >
                <EachTeam>
                  <img src={`/seriea/${item.picture}`} alt={item.ticker} />
                </EachTeam>
              </a>
            </Link>
          );
        })}
      </>
    );

    // return <img src="/a.png" width="100%" height="70%" />;
  } else if (active === 1) {
    return (
      <>
        {teams_badges_b.map((item, key) => {
          return (
            <Link href={`/clubs/${item.ticker.toLowerCase()}`} key={key}>
              <a
              // onClick={() => setRefresh(!refresh)}
              >
                <EachTeam>
                  <img src={`/serieb/${item.picture}`} alt={item.ticker} />
                </EachTeam>
              </a>
            </Link>
          );
        })}
      </>
    );
    // return <img src="/b.png" width="100%" height="70%" />;
  } else {
    return (
      <>
        {teams_badges_europe.map((item, key) => {
          return (
            <Link href={`/clubs/${item.ticker.toLowerCase()}`} key={key}>
              <a
              // onClick={() => setRefresh(!refresh)}
              >
                <EachTeam>
                  <img src={`/europe/${item.picture}`} alt={item.ticker} />
                </EachTeam>
              </a>
            </Link>
          );
        })}
      </>
    );
    // return <img src="/e.png" width="100%" height="70%" />;
  }
};

const LeftBar = () => {
  const { refresh, setRefresh } = useContext(AuthContext);
  const [isActive, setIsActive] = useState(0);
  const [club, setClub] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");

    //send to contract a request for admin
    //address/name or name/address or both?
  };

  const onChange = (e) => {
    setClub(e.target.value);
  };

  return (
    <Container>
      <div style={{ marginBottom: "100px" }}>
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
        <button
          style={{ marginBottom: "100px" }}
          type="submit"
          className="btn btn-primary"
        >
          <Link href={"/create"}>
            <a>
              <li style={{ color: "white", listStyle: "none" }}>
                {" "}
                Create new card
              </li>
            </a>
          </Link>
        </button>

        {/* <form
          onSubmit={(e) => handleSubmit(e)}
          style={{
            // backgroundColor: "olive",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            padding: "10px",
          }}
        > */}
        {/* &nbsp; */}
        {/* <input
            type="text"
            placeholder="Type the club"
            style={{ height: "50px" }}
          />
          <br />
          <small>Type the club you want to be a creator for</small>

          <button
            className="btn btn-secondary"
            type="submit"
            style={{ marginBottom: "20px" }}
          >
            Require for Card Creator
          </button>
        </form> */}
      </HolderCreator>

      <HolderTeams>
        <div>
          <div
            className="seriea"
            isactive={isActive}
            onClick={() => setIsActive(0)}
            //
          >
            Série A
          </div>
          <div
            className="serieb"
            isactive={isActive}
            onClick={() => setIsActive(1)}
          >
            Série B
          </div>
          <div
            className="europa"
            isactive={isActive}
            onClick={() => setIsActive(2)}
          >
            Europa
          </div>
        </div>

        <div
          style={{
            // marginTop: "20px",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {clubsChart(isActive)}
        </div>
      </HolderTeams>
    </Container>
  );
};

export default LeftBar;
