import React, { useCallback, useMemo } from "react";
import List from "../../components/list";
import MenuLink from "../../components/menu-link";

const Header:React.FC = () => {

  const options = {
    menu: useMemo<MenuLinkType[]>(() => ([
      {key: 1, title: "Главная", link: '/'},
      {key: 2, title: "Текущие торги", link: '/activity'},
    ]), []),
  }

  const renders = {
    item: useCallback<(item: MenuLinkType) => React.ReactNode>(item => (
      <MenuLink key={item.key} item={item} />
    ), []),
  }

  return (
    <List items={options.menu} renderItem={renders.item}/>
  )
}

export default React.memo(Header);

// types
export type MenuLinkType = {
  key: number,
  title: string,
  link: string,
}
