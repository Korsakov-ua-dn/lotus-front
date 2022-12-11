import React from "react";
import { BiddersType } from "../../api";
import { formatTime } from "../../utils/format-time";
import { TradingDataType } from "../../utils/get-actual-trading-data";
import "./style.css";

type PropsType = {
  bidder: BiddersType;
  index: number;
  active: TradingDataType | null;
};

const Bidder: React.FC<PropsType> = (props) => {
  const classN = `Bidder__timer ${props.active ? "Bidder__timer_active" : ""}`;
  return (
    <div className="Bidder">
      <div className={classN}>
        {props.active &&
          formatTime(props.active.minuteLeft)
          + ":" +
          formatTime(props.active.secondLeft)}
      </div>
      <div className="Bidder__header">УЧАСТНИК №{props.index}</div>
      <div className="Bidder__name">{props.bidder.name}</div>
    </div>
  );
};

export default React.memo(Bidder);
