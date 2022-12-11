import React, { useEffect } from "react";
import { useAppDispatch } from "../../hooks";
import { fetchOne } from "../../store/activity-slice";
import RoomContainer from "../room-container";

type PropsType = {
  name: "room"
  id?: string
}

const Room: React.FC<PropsType> = (props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    
    if (props.id) {
      dispatch(fetchOne(props.id))
    }

  }, [dispatch, props.id])

  return <RoomContainer/>
};

export default React.memo(Room);
