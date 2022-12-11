import React, { useEffect } from "react";
import Layout from "../../components/layout";
import Header from "../../containers/header";

const Main:React.FC = () => {
  return (
    <Layout>
      <Header />
    </Layout>
  );
};

export default React.memo(Main);
