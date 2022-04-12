import React, { useContext } from "react";
import { StateContext } from "../context/StateContext";

const EmployeeDetails = () => {
  const { dataSingleEmployee, errorSingleEmployee } = useContext(StateContext);

  /*
    (1)
    まず始めに、Errorが発生していないか判定し、
    Errorならば、このEmployeeDetailコンポーネントにErrorメッセージを表示する

    (2)
    次に、Error判定をパスした後、
    Employeeの属性データが存在する場合、Detailデータを画面に表示する。
    */

  // (1) Error処理
  if (errorSingleEmployee) {
    return (
      <>
        <h3>Employee Details</h3>
        {errorSingleEmployee.message}
      </>
    );
  }

  return (
    <>
      <h3>Employee Details</h3>
      {/* (1) Error処理  ********** 以下の文は、最新のuseLazyQuery(apollo client)では動作しないので、コメントアウト。  */}
      {/* {errorSingleEmployee && errorSingleEmployee.message} */}

      {/* (2) Detailデータの表示処理 */}
      {dataSingleEmployee && dataSingleEmployee.employee && (
        <>
          <h3>ID: </h3>
          {dataSingleEmployee.employee.id}
          <h3>Employee name: </h3>
          {dataSingleEmployee.employee.name}
          <h3>Year of join: </h3>
          {dataSingleEmployee.employee.joinYear}
          <h3>Department name: </h3>
          {dataSingleEmployee.employee.department.deptName}
        </>
      )}
    </>
  );
};

export default EmployeeDetails;
