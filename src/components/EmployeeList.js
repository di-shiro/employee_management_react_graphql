import React from "react";
import styles from "./EmployeeList.module.css";

const EmployeeList = ({ dataEmployees }) => {
  return (
    <>
      <h3>Employee List</h3>
      <ul className={styles.employeeList__list}>
        {dataEmployees &&
          dataEmployees.allEmployees &&
          dataEmployees.allEmployees.edges.map((empl) => (
            <li className={styles.employeeList__item} key={empl.node.id}>
              <span>
                {empl.node.name} {" / "}
                {empl.node.joinYear}
                {" / "}
                {empl.node.department.deptName}
              </span>
            </li>
          ))}
      </ul>
    </>
  );
};

export default EmployeeList;
