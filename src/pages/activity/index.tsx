import React, { useEffect } from "react";
import Layout from "../../components/layout";
import ActivityContainer from "../../containers/activity-container";
import Header from "../../containers/header";
import { useAppDispatch } from "../../hooks";
import { fetchAll } from "../../store/activity-slice";

const Activity:React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAll())
  }, [dispatch])

  return (
    <Layout>
      <Header />
      <ActivityContainer />
    </Layout>
  );
};

export default React.memo(Activity);
