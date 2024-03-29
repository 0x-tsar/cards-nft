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
  transform: scale(0.9);

  &:hover {
    transform: scale(1);
  }
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
  {
    ticker: "avai",
    name: "Avaí",
    picture: "/avai.png",
  },
  { ticker: "botafogo", name: "Botafogo", picture: "/botafogo.png" },
  {
    ticker: "brasil-de-pelotas",
    name: "Brasil de Pelotas",
    picture: "/brasildepelotas.png",
  },
  { ticker: "brusque", name: "Brusque", picture: "/brusque.png" },
  { ticker: "confianca", name: "Confiança", picture: "/confianca.png" },
  { ticker: "coritiba", name: "Coritiba", picture: "/coritiba.png" },
  { ticker: "crb", name: "CRB", picture: "/crb.png" },
  { ticker: "cruzeiro", name: "Cruzeiro", picture: "/cruzeiro.png" },
  { ticker: "csa", name: "CSA", picture: "/csa.png" },
  { ticker: "goias", name: "Goiás", picture: "/goias.png" },
  { ticker: "guarani", name: "Guarani", picture: "/guarani.png" },
  { ticker: "londrina", name: "Londrina", picture: "/londrina.png" },
  { ticker: "nautico", name: "Nautico", picture: "/nautico.png" },
  { ticker: "operario", name: "Operário", picture: "/operario.png" },
  { ticker: "ponte-preta", name: "Ponte Preta", picture: "/pontepreta.png" },
  { ticker: "remo", name: "Remo", picture: "/remo.png" },
  {
    ticker: "sampaio-correa",
    name: "Sampaio Correa",
    picture: "/sampaiocorrea.png",
  },
  { ticker: "vasco", name: "Vasco", picture: "/vasco.png" },
  { ticker: "vila-nova", name: "Vila Nova", picture: "/vilanova.png" },
  { ticker: "vitoria", name: "Vitória", picture: "/vitoria.png" },
];

const teams_badges_europe = [
  { ticker: "arsenal", name: "Arsenal", picture: "/arsenal.png" },
  {
    ticker: "atletico-madrid",
    name: "Atletico Madrid",
    picture: "/atleticomadrid.png",
  },
  { ticker: "barcelona", name: "Barcelona", picture: "/barcelona.png" },
  { ticker: "bayern", name: "Bayern", picture: "/bayern.png" },
  { ticker: "benfica", name: "Benfica", picture: "/benfica.png" },
  { ticker: "borussia", name: "Borussia", picture: "/bvb.png" },
  { ticker: "chelsea", name: "Chelsea", picture: "/chelsea.png" },
  { ticker: "manchester-city", name: "Manchester City", picture: "/city.png" },
  {
    ticker: "internazionale",
    name: "Internazionale",
    picture: "/internazionale.png",
  },
  { ticker: "juventus", name: "Juventus", picture: "/juventus.png" },
  { ticker: "liverpool", name: "Liverpool", picture: "/liverpool.png" },
  { ticker: "lyon", name: "Lyon", picture: "/lyon.png" },
  { ticker: "real-madrid", name: "Real Madrid", picture: "/madrid.png" },
  {
    ticker: "manchester-united",
    name: "Manchester United",
    picture: "/manunited.png",
  },
  { ticker: "milan", name: "Milan", picture: "/milan.png" },
  { ticker: "napoli", name: "Napoli", picture: "/napoli.png" },
  { ticker: "porto", name: "Porto", picture: "/porto.png" },
  { ticker: "psg", name: "PSG", picture: "/psg.png" },
  { ticker: "roma", name: "Roma", picture: "/roma.png" },
  { ticker: "tottenham", name: "Tottenham", picture: "/tottenham.png" },
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
