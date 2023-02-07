import Head from "next/head";
import Image from "next/image";
import { Participants } from "../data";
import { ColorRing } from "react-loader-spinner";
import { useEffect, useState } from "react";
import axios from "axios";

import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  /* background: linear-gradient(
    39deg,
    rgba(32, 16, 52, 1) 0%,
    rgba(62, 60, 144, 1) 50%,
    rgba(49, 42, 134, 1) 100%
  ); ; */
  background-color: #35224c;
`;

const Logo = styled.div`
  background-image: url("/white.png");
  width: 200px;
  height: 200px;
  background-size: contain;
  background-repeat: no-repeat;
  transition: all 2s;
`;
const CenterContainer = styled.div`
  display: flex;

  justify-content: center;
  width: 100%;
  height: fit-content;
`;

const CenterLoader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50%;
`;

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  width: 85vw;
  height: fit-content;
  align-self: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
`;

const Topright = styled.div`
  position: absolute;
  right: 0px;
  top: 0px;
  width: 400px;
  height: 200px;
  background-image: url("/topright1.png");
  background-size: cover;
`;

const TopLeft = styled.div`
  position: absolute;
  left: -20px;
  top: -20px;
  width: 400px;
  height: 200px;
  background-image: url("/topleft1.png");
  background-size: cover;
`;

const Card = styled.div`
  position: relative;

  color: white;
  color: black;
  font-size: 16px;
  position: relative;
  width: 11vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 9.5vw;
  background: rgb(32, 16, 52);
  background: #d3d3d3;
  border-radius: 10px;
  border-top: 10px solid black;
  border-image: linear-gradient(to left, red, rgba(0, 0, 0, 0)) 1 100%;
  transition: all 2s;
`;

const Leaderboard = styled.p`
  color: white;

  font-size: 35px;
`;

const BottomRight = styled.div`
  position: absolute;
  right: 0px;
  bottom: 0;
  width: 400px;
  height: 200px;
  background-image: url("./bottomright1.png");
  background-size: cover;
`;

const BottomLeft = styled.div`
  position: absolute;
  left: -20px;
  bottom: 0;
  width: 400px;
  height: 200px;
  background-image: url("./bottomleft1.png");
  background-size: cover;
`;

const CardInfo = styled.div`
  font-size: 20px;
  text-align: center;
`;

const Circle = styled.div`
  position: absolute;
  width: 80px;
  height: 80px;

  top: -50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function renderSwitch(param) {
  switch (param) {
    case 0:
      return (
        <Circle style={{ background: "gold" }}>
          <p style={{ color: "white", fontSize: "20px", fontWeight: "bold" }}>
            1st
          </p>
        </Circle>
      );
    case 1:
      return (
        <Circle style={{ background: "silver" }}>
          {" "}
          <p style={{ color: "white", fontSize: "20px", fontWeight: "bold" }}>
            2nd
          </p>
        </Circle>
      );

    case 2:
      return (
        <Circle style={{ background: "#CD7F32" }}>
          {" "}
          <p style={{ color: "white", fontSize: "20px", fontWeight: "bold" }}>
            3rd
          </p>
        </Circle>
      );
    default:
      return null;
  }
}
export default function Home() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loader, setLoader] = useState(true);
  const fetchData = async () => {
    console.log(11);
    try {
      const response = await axios.get(
        "https://oplus.dev/apps/dw_game/api/high-score",
      );
      setLeaderboard(response.data);

      setLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(() => {
      fetchData();
    }, 600000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return (
    <Container>
      <Topright />
      <TopLeft />
      <BottomLeft />
      <BottomRight />

      <CenterContainer>
        <Logo />
      </CenterContainer>

      {loader || !leaderboard.length ? (
        <CenterLoader>
          <ColorRing
            visible={true}
            height='200'
            width='200'
            ariaLabel='blocks-loading'
            wrapperStyle={{}}
            wrapperClass='blocks-wrapper'
            colors={[
              "#CA2D60",
              "#5EB47C",
              "#EAE8EC",
              "#ffffff",
              "#ffffff",
              "#ffffff",
            ]}
          />
        </CenterLoader>
      ) : (
        <CardContainer>
          {leaderboard.map((score, i) => {
            return (
              <Card key={score.id}>
                {renderSwitch(i)}
                <CardInfo>
                  {/* {score.name.charAt(0).toUpperCase() + score.name.slice(1)} */}
                  {score.name.split(" ")[0] +
                    " " +
                    (score.name.split(" ")[1] || "")}
                </CardInfo>
                <CardInfo>Score: {score.score}</CardInfo>
              </Card>
            );
          })}
        </CardContainer>
      )}
    </Container>
  );
}
