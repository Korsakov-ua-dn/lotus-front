import React from "react";
import "./style.css";
import { NavLink } from "react-router-dom";
import { MenuLinkType } from "../../containers/header";

type PropsType = {
  item: MenuLinkType
};

const MenuLink: React.FC<PropsType> = (props) => {
  return (
    <li className={"List__item Menu-link"}>
      <NavLink to={props.item.link}>{props.item.title}</NavLink>
    </li>
  );
};

export default React.memo(MenuLink);
