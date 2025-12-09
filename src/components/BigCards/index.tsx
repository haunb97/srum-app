import React, { useState } from "react";

interface Props {
  backToListCard: (value: boolean) => void;
  number?: number;
}
export default function BigCart(props: Props) {
  const { backToListCard, number } = props;
  const [isShowTwelfthCard, setIsShowTwelfthCard] = useState(true);
  const onClick = async () => {
    await handleDelay(() => setIsShowTwelfthCard(!isShowTwelfthCard));
    console.log("🔥 - onClick - onClick:");
  };

  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const handleDelay = async (callBack: () => void) => {
    await delay(3000);
    callBack();
    console.log("🔥 - BigCart - handleDelay:");
  };

  const onClickBack = () => {
    setIsShowTwelfthCard(true);
    backToListCard(false);
  };
  return (
    <div className="relative bg-white w-full h-full flip-container ">
      <div
        className={`flipper w-full h-full flex items-stretch  ${
          isShowTwelfthCard ? "rotate-block" : ""
        }`}
        onClick={onClick}
      >
        <div className="font bg-blue-200 w-60 h-80 mx-auto text-4xl flex items-center justify-center self-center text-white z-50 rounded-md">
          {`${isShowTwelfthCard ? "" : number} `}
        </div>
      </div>
      <div className="absolute bottom-10 w-full h-1/6 flex justify-center p-4">
        <button
          className="bg-blue-700 w-28 h-10 rounded-md text-white mt-auto"
          onClick={onClickBack}
        >
          Back
        </button>
      </div>
    </div>
  );
}
