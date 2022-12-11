import React, { useCallback } from "react";
import { ActivityType } from "../../api";
import ActivityLink from "../../components/activity-link";
import List from "../../components/list";
import {  useAppSelector } from "../../hooks";

const ActivityContainer:React.FC = () => {

  const select = useAppSelector(state => ({
    items: state.activity.data,
    error: state.activity.error,
  }));

  const renders = {
    item: useCallback<(item: ActivityType) => React.ReactNode>(item => (
      <ActivityLink key={item._id} item={item} />
    ), []),
  }

  return (
    <List items={select.items} renderItem={renders.item}/>
  )
}

export default React.memo(ActivityContainer);
