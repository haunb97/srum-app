import React, { useState } from "react";
import BigCard from "../../components/BigCards";

function Home() {
  const [isShowTwelfthCard, setIsShowTwelfthCard] = useState(false);
  const [number, setNumber] = useState();
  const onClick = (value: any) => {
    console.log("%c value", "color: green", value);
    setNumber(value);
    setIsShowTwelfthCard(!isShowTwelfthCard);
  };
  const renderTwelfthCard = () => {
    let listCart: any = [];
    for (let a = 1; a < 13; a++) {
      listCart.push(
        <div
          onClick={() => onClick(a)}
          className="bg-blue-200 w-full-sm w-1/2-lg h-full rounded-md text-white text-4xl flex items-center justify-center"
        >
          {a}
        </div>
      );
    }
    return listCart;
  };
  return (
    <div className="flip-container ">
      <div
        className={`flipper  h-screen w-screen ${
          isShowTwelfthCard ? "rotate-block" : ""
        }`}
      >
        <div
          className={` font grid grid-flow-row grid-cols-3 grid-rows-4 gap-x-2 gap-y-2 h-full p-10`}
        >
          {renderTwelfthCard()}
        </div>
        <div className="back">
          <BigCard backToListCard={onClick} number={number} />
        </div>
      </div>
    </div>
  );
}

export default Home;
