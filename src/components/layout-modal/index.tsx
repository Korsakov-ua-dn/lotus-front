import React, {useEffect, useRef} from "react";
import "./style.css";

type PropsType = {
  title: string
  onClose: () => void
  children: React.ReactNode
  labelClose: string
}

const LayoutModal:React.FC<PropsType> = (props) => {

  const frame = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let top = 10;

    if (frame.current) {

      if (window.innerWidth > frame.current.clientHeight) {
        top = Math.max(top, (window.innerHeight - frame.current.clientHeight) / 2 - top);
      }

      frame.current.style.marginTop = `${top}px`;
      document.body.style.overflow = 'hidden';

    }
    
    return () => {
      document.body.style.overflow = 'auto';
    }
  });

  return (
    <div className={"LayoutModal"}>
      <div className={"LayoutModal__frame"} ref={frame}>
        <div className={"LayoutModal__head"}>
          <h3 className={"LayoutModal__title"}>
            {props.title}
          </h3>
          <button className={"LayoutModal__close"} onClick={props.onClose}>{props.labelClose}</button>
        </div>
        <div className={"LayoutModal__content"}>
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default React.memo(LayoutModal);
