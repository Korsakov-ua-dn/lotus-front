import React from "react";
import { ActivityType } from "../../api";
import { TradingDataType } from "../../utils/get-actual-trading-data";
import Bidder from "../bidder";
import "./style.css";

type PropsType = {
  selectActivity: ActivityType
  tradingData: TradingDataType
};

const BiddersTable: React.FC<PropsType> = (props) => {
  return (
    <div className="Bidder-table">
      <div className="Bidder">
        <div className="Bidder__timer">ХОД</div>
        <div className="Bidder__header">ПАРАМЕТРЫ И ТРЕБОВАНИЯ</div>
        <div className="Bidder__name"></div>
      </div>
      {
        props.selectActivity.bidders.map(
          (bidder, idx) => <Bidder  key={bidder.id}
                                    bidder={bidder}
                                    index={idx}
                                    active={
                                      idx + 1 === props.tradingData.activeBidder 
                                      ? props.tradingData 
                                      : null
                                    }/>)
      }
    </div>
  );
};

export default React.memo(BiddersTable);
