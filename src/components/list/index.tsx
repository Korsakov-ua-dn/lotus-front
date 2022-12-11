import React from "react";
import "./style.css"

type PropsType = {
  items: any[]
  renderItem: (item: any) => React.ReactNode
}

const List:React.FC<PropsType> = (props) => {

  return (
    <ul className={'List'}>
      { props.items.map(item => props.renderItem(item)) }
    </ul>
  )
}

export default React.memo(List);
