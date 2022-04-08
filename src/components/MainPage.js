import React, { useEffect } from "react";
import styles from "./MainPage.module.css";
import { useQuery } from "@apollo/react-hooks";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { GET_DEPTS, GET_EMPLOYEES } from "../queries";
import { Grid } from "@material-ui/core";
import jwtDecode from "jwt-decode";
import EmployeeList from "./EmployeeList";

const MainPage = () => {
  const {
    loading: loadingDepts,
    data: dataDepts,
    error: errorDepts,
  } = useQuery(GET_DEPTS);

  const {
    loading: loadingEmployees,
    data: dataEmployees,
    error: errorEmployees,
  } = useQuery(GET_EMPLOYEES);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const decodedToken = jwtDecode(localStorage.getItem("token"));
      if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
      }
    } else {
      window.location.href = "/";
    }
  }, [errorEmployees, errorDepts]);

  if (loadingEmployees || loadingDepts) {
    return <h1>Loading from server</h1>;
  } else if (errorEmployees || errorDepts) {
    return (
      <>
        <h1>Employee data fetch error : {errorEmployees.message}</h1>
        <h1>Department data fetch error : {errorDepts.message}</h1>
      </>
    );
  }

  return (
    <div className={styles.mainPage}>
      <h1>
        GraphQL lesson
        <ExitToAppIcon
          className={styles.mainPage__out}
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
        />
      </h1>
      <Grid container>
        <Grid item xs={5}>
          <EmployeeList dataEmployees={dataEmployees} />
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={3}></Grid>
      </Grid>
    </div>
  );
};

export default MainPage;
