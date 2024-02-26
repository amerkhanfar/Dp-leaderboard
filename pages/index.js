import Head from "next/head";
import Image from "next/image";
import { Participants } from "../data";
import { ColorRing } from "react-loader-spinner";
import { useEffect, useState } from "react";
import axios from "axios";
import { data } from "../data";
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
  width: 185px;
  height: 185px;
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
  font-size: 14px;
  position: relative;
  width: 17vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 7vh;
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
  font-size: 14px;
  text-align: center;
`;

const Circle = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;

  top: -30px;
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
          <p style={{ color: "white", fontSize: "15px", fontWeight: "bold" }}>
            1st
          </p>
        </Circle>
      );
    case 1:
      return (
        <Circle style={{ background: "silver" }}>
          {" "}
          <p style={{ color: "white", fontSize: "15px", fontWeight: "bold" }}>
            2nd
          </p>
        </Circle>
      );

    case 2:
      return (
        <Circle style={{ background: "#CD7F32" }}>
          {" "}
          <p style={{ color: "white", fontSize: "15px", fontWeight: "bold" }}>
            3rd
          </p>
        </Circle>
      );
    case 20:
      return (
        <Circle style={{ background: "#4664AC" }}>
          {" "}
          <p style={{ color: "white", fontSize: "15px", fontWeight: "bold" }}>
            21st
          </p>
        </Circle>
      );

    case 21:
      return (
        <Circle style={{ background: "#4664AC" }}>
          {" "}
          <p style={{ color: "white", fontSize: "15px", fontWeight: "bold" }}>
            22nd
          </p>
        </Circle>
      );

    case 22:
      return (
        <Circle style={{ background: "#4664AC" }}>
          {" "}
          <p style={{ color: "white", fontSize: "15px", fontWeight: "bold" }}>
            23rd
          </p>
        </Circle>
      );

    case 30:
      return (
        <Circle style={{ background: "#4664AC" }}>
          {" "}
          <p style={{ color: "white", fontSize: "15px", fontWeight: "bold" }}>
            31st
          </p>
        </Circle>
      );

    case 31:
      return (
        <Circle style={{ background: "#4664AC" }}>
          {" "}
          <p style={{ color: "white", fontSize: "15px", fontWeight: "bold" }}>
            32nd
          </p>
        </Circle>
      );

    case 32:
      return (
        <Circle style={{ background: "#4664AC" }}>
          {" "}
          <p style={{ color: "white", fontSize: "15px", fontWeight: "bold" }}>
            33rd
          </p>
        </Circle>
      );
    default:
      return (
        <Circle style={{ background: "#4664AC" }}>
          <p style={{ color: "white", fontSize: "15px", fontWeight: "bold" }}>
            {param + 1}th
          </p>
        </Circle>
      );
  }
}
export default function Home() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loader, setLoader] = useState(true);
  const [department, setDepartment] = useState([]);
  const [transition, setTransition] = useState(false);

  const departmentScores = [
    { name: "CHO", score: 85 },
    { name: "GCC", score: 72 },
    { name: "MENA", score: 90 },
    { name: "SSA", score: 78 },
    { name: "DDW", score: 88 },
    { name: "POML", score: 75 },
    { name: "WORLD SECURITY", score: 82 },
    { name: "OTHER", score: null },
    { name: "CORPORATE (HO) ADMINISTRATION", score: 83 },
    { name: "DP WORLD FOUNDATION", score: 79 },
    { name: "GROUP PEOPLE", score: 87 },
    { name: "GROUP SECURITY", score: 76 },
    { name: "GROUP SUSTAINABILITY", score: 84 },
    { name: "GLOBAL LOGISTICS", score: 80 },
    { name: "CARGOES CUSTOMS", score: 85 },
    { name: "DT WORLD", score: 81 },
    { name: "DIGITAL TECHNOLOGY", score: 89 },
    { name: "GROUP TECHNOLOGY", score: 86 },
    { name: "E-COMMERCE", score: 88 },
    { name: "FINANCIAL SERVICES LIMITED", score: 90 },
    { name: "SEARATES", score: 83 },
    { name: "WORLD LOGISTICS PASSPORT", score: 77 },
    { name: "COMMERCIAL - INTERNATIONAL PORTS & TERMINALS", score: 92 },
    { name: "GLOBAL ENGINEERING", score: 78 },
    { name: "GLOBAL AUTOMATION", score: 85 },
    { name: "GLOBAL OPERATIONS", score: 91 },
    { name: "GOVERNMENT AFFAIRS", score: 76 },
    { name: "GROUP COMMUNICATIONS", score: 79 },
    { name: "GROUP CORPORATE SECRETARIAT", score: 82 },
    { name: "GROUP HSE", score: 88 },
    { name: "GROUP LEGAL", score: 85 },
    { name: "GROUP PLANNING & PROJECT MANAGEMENT", score: 90 },
    { name: "PORTS & TERMINALS", score: 84 },
    { name: "WORLD CRANE SERVICES", score: 81 },
    { name: "GROUP CORPORATE FINANCE & BUSINESS DEVELOPMENT", score: 89 },
    { name: "GROUP FINANCE", score: 86 },
    { name: "GROUP INSURANCE", score: 83 },
    { name: "GROUP INTERNAL AUDIT", score: 80 },
    { name: "GROUP PAYROLL", score: 84 },
    { name: "GROUP PROCUREMENT", score: 87 },
    { name: "GROUP TAX", score: 81 },
    { name: "GROUP TREASURY", score: 85 },
    { name: "INVESTOR RELATIONS", score: 88 },
  ];

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://oplus.dev/apps/dw_game/api/high-score",
      );
      setLeaderboard(response.data);

      console.log(leaderboard);

      setLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDepartment = async () => {
    try {
      const response = await axios.get(
        "https://oplus.dev/apps/dw_game/api/department-score",
      );
      setDepartment(response.data);
      console.log(response.data);
      setLoader(false);
    } catch (error) {
      console.log(error);
    }

    // setDepartment(departmentScores);
  };

  useEffect(() => {
    fetchData();
    fetchDepartment();
    const intervalId = setInterval(() => {
      fetchData();
      fetchDepartment();
      setTransition(!transition);
      console.log(transition);
    }, 90000);
    return () => {
      clearInterval(intervalId);
    };
  }, [transition]);
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
        <>
          {transition ? (
            <CardContainer>
              {/* Cards for transition true */}
              {leaderboard.map((score, i) => {
                return (
                  <Card key={i}>
                    {renderSwitch(i)}
                    <CardInfo>
                      {score.name.split(" ")[0] +
                        " " +
                        (score.name.split(" ")[1] || "")}
                    </CardInfo>
                    <CardInfo>Score: {score.score}</CardInfo>
                  </Card>
                );
              })}
            </CardContainer>
          ) : (
            <CardContainer>
              {/* Cards for transition false */}
              {department.map((dept, i) => {
                return (
                  <Card key={i}>
                    {renderSwitch(i)}
                    <CardInfo>{dept.department}</CardInfo>
                    <CardInfo>Score: {dept.score}</CardInfo>
                  </Card>
                );
              })}
            </CardContainer>
          )}
        </>
      )}
    </Container>
  );
}
