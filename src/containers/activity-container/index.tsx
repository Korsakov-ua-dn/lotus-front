import React, { useCallback } from "react";
import { ActivityType } from "../../api";
import ActivityLink from "../../components/activity-link";
import List from "../../components/list";
import { useAppSelector } from "../../hooks";

const ActivityContainer: React.FC = () => {
  const select = useAppSelector((state) => ({
    items: state.activity.data,
    error: state.activity.error,
    loading: state.activity.loading,
  }));

  const renders = {
    item: useCallback<(item: ActivityType) => React.ReactNode>(
      (item) => <ActivityLink key={item._id} item={item} />,
      []
    ),
  };

  return (
    <>
      {select.loading && "Загрузка информации..."}

      {!select.loading && select.error}
      
      {!select.error && !select.loading && (
        <List items={select.items} renderItem={renders.item} />
      )}
    </>
  );
};

export default React.memo(ActivityContainer);
