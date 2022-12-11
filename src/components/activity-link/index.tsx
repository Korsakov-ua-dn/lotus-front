import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { ActivityType } from "../../api";
import { POPUPS } from "../../const";

type PropsType = {
  item: ActivityType,
};

const ActivityLink: React.FC<PropsType> = (props) => {
  
  const popups = JSON.stringify([
    {
      name: POPUPS.ROOM,
      id: props.item._id
    }
  ]);

  const params = new URLSearchParams({ popups });

  return (
    <li className={"List__item Activity-link"}>
      <Link to={`/activity?${params}`}>
        <span className="Activity-link__title">{props.item.title}</span>
        Участники торгов:
        { props.item.bidders.map((b, i) => <span className="Activity-link__bidder" key={i}>{i + 1 + ". " + b.name}</span>)}
      </Link>
    </li>
  );
};

export default React.memo(ActivityLink);
