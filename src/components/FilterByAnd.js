import React, { useState } from "react";
import styles from "./FilterByAnd.module.css";
import SearchIcon from "@material-ui/icons/Search";
import { useLazyQuery } from "@apollo/client";
import { SEARCH_AND_EMPLOYEE } from "../queries";

const FilterByAnd = () => {
  const [searchName, setSearchName] = useState("");
  const [searchJoin, setSearchJoin] = useState(2020);
  const [searchDept, setSearchDept] = useState("");
  const [searchAndEmployee, { data: dataSearchAnd, error: errorSearchAnd }] =
    useLazyQuery(SEARCH_AND_EMPLOYEE, {
      fetchPolicy: "network-only",
    });

  return (
    <>
      <h3>Filter by AND condition</h3>
      {/* Employee Name */}
      <input
        className={styles.filterByAnd__input}
        placeholder="employee name ?"
        type="text"
        value={searchName}
        onChange={(e) => {
          setSearchName(e.target.value);
        }}
      />

      {/* Join Year: 入社年度の最小値は、 min='2000' */}
      <input
        className={styles.filterByAnd__input}
        type="number"
        min="0"
        value={searchJoin}
        onChange={(e) => {
          setSearchJoin(e.target.value || 0);
        }}
      />

      {/* Department: 部門名 */}
      <input
        placeholder="department name ?"
        type="text"
        value={searchDept}
        onChange={(e) => {
          setSearchDept(e.target.value);
        }}
      />

      {/* 検索実行ボタン
          joinYearのフィルタリングを無効化したい場合は、
          joinYear: null を指定しなければならないのだが、
          InputFormに直接 null を入力することができないので、
          代替策として、
          InputFormに「0」が入力された場合は、これを null と置き換える
          という処理を付け加えている。
       */}
      <div>
        <SearchIcon
          className={styles.filterByAnd__search}
          onClick={async () => {
            let tempData;
            if (searchJoin === 0) {
              tempData = null;
            } else {
              tempData = searchJoin;
            }
            await searchAndEmployee({
              variables: {
                name: searchName,
                joinYear: tempData,
                dept: searchDept,
              },
            });
            setSearchName("");
            setSearchJoin(0);
            setSearchDept("");
          }}
        />
      </div>
      <ul className={styles.filterByAnd__list}>
        {errorSearchAnd && <h3>{errorSearchAnd.message}</h3>}
        {dataSearchAnd &&
          dataSearchAnd.allEmployees &&
          dataSearchAnd.allEmployees.edges.map((empl) => (
            <li className={styles.filterByAnd__item} key={empl.node.id}>
              {empl.node.name}
              {" / "}
              {empl.node.joinYear}
              {" / "}
              {empl.node.department.deptName}
            </li>
          ))}
      </ul>
    </>
  );
};

export default FilterByAnd;
