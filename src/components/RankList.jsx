import React, { useEffect, useState } from "react";
import Rank from "./Rank";
import axios from "axios";

const RankList = () => {
  const token = localStorage.getItem("authToken");
  // let ranks = [
  //   { rank: 1, name: "Ruchir", score: 3432 },
  //   { rank: 2, name: "Rajas", score: 343 },
  //   { rank: 3, name: "Hari", score: 224 },
  //   { rank: 4, name: "Ram", score: 100 },
  //   { rank: 5, name: "Krishna", score: 90 },
  //   { rank: 6, name: "Ruchir", score: 79 },
  //   { rank: 7, name: "Ruchir", score: 60 },
  //   { rank: 8, name: "Ruchir", score: 42 },
  //   { rank: 9, name: "Ruchir", score: 0 },
  // ];
  // let top3 = ranks.slice(0, 3);
  // ranks = ranks.slice(3);
  const colors = ["#FFD700", "#C0C0C0", "#CD7F32"];
  const [ranks,setRanks] = useState([]);
  const [top3,setTop] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try{

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const rankList = await axios.get(
          "http://134.209.159.172:8080/game/info/leaderboard",
          config
        );
        console.log(rankList.data.data);
        setTop(rankList.data.data.slice(0,3));
        setRanks(rankList.data.data.slice(3));
        // setRanks(rankList.data.data);
      }
      catch{
        console.log("Error");
      }


    };
    fetchData();
  }, [token]);


  return (
    <>
      {top3.map((parameter, index) => (
        <Rank
          color={colors[index]}
          topRank={true}
          rank={parameter.rank}
          name={parameter.name}
          score={parameter.wealth}
        />
      ))}

      {ranks.map((parameter) => (
        <Rank
          color={"#686870"}
          topRank={false}
          rank={parameter.rank}
          name={parameter.name}
          score={parameter.wealth}
        />
      ))}

      {/* <Rank
        color={"#FFD700"}
        topRank={true}
        rank={1}
        name={"Ruchir"}
        score={122121}
      />
      <Rank
        color={"#C0C0C0"}
        topRank={true}
        rank={2}
        name={"Ruchir"}
        score={122121}
      />
      <Rank
        color={"#CD7F32"}
        topRank={true}
        rank={3}
        name={"Ruchir"}
        score={122121}
      />
      <Rank
        color={"#686870"}
        topRank={false}
        rank={4}
        name={"Ruchir"}
        score={122121}
      />
      <Rank
        color={"#686870"}
        topRank={false}
        rank={5}
        name={"Ruchir"}
        score={122121}
      />
      <Rank
        color={"#686870"}
        topRank={false}
        rank={6}
        name={"Ruchir"}
        score={122121}
      />
      <Rank
        color={"#686870"}
        topRank={false}
        rank={7}
        name={"Ruchir"}
        score={122121}
      /> */}
    </>
  );
};

export default RankList;
