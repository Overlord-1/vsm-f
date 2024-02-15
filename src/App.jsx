import Header from "./components/Header";
import PLtracker from "./components/PLtracker";
import Button from "./components/Button";
import MiddleRow from "./components/MiddleRow";
import Card from "./components/Card";
function App() {
  return (
    <>
      <Header text={"Portfolio"} />
      <PLtracker
        invested={"2894.54"}
        current={"2782.3"}
        profit={"239"}
        perChg={"-4.5"}
      />
      <Button
        text={"View all stocks"}
        txtColor={"#ffffff"}
        bgColor={"#343434"}
      />
      <MiddleRow />
      <Card name={"HDFC"} avg={93.87} quantity={3} LTP={81.25} profit={434} />
      <Card name={"JIOFN"} avg={93.87} quantity={3} LTP={81.25} profit={-255} />
      <Card name={"HDFC"} avg={93.87} quantity={3} LTP={81.25} profit={434} />
      <Card name={"HDFC"} avg={93.87} quantity={3} LTP={81.25} profit={434} />
      <Card name={"HDFC"} avg={93.87} quantity={3} LTP={81.25} profit={434} />
      <Card name={"HDFC"} avg={93.87} quantity={3} LTP={81.25} profit={434} />
    </>
  );
}

export default App;
