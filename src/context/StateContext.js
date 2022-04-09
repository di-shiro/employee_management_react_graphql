import React, { createContext, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_SINGLE_EMPLOYEE } from "../queries";
export const StateContext = createContext();

/*
GraphQLのuseMutationは、コンポーネントがマウントされた時に発動する。
例えるなら、以下のようにuseEffectの第２引数が空配列[] だけのような感じ。
  useEffect( () => {} , [])

  一方、今回使うuseLazyQueryは、以下のように、第２引数に更新トリガーとしたいstateを設定したような感じ。
  useEffect( () => {} , [editedId])


 */

const StateContextProvider = (props) => {
  const [name, setName] = useState("");
  const [joinYear, setJoinYear] = useState(2020);
  const [deptName, setDeptName] = useState("");
  const [selectedDept, setSelectedDept] = useState("");
  const [editedId, setEditedId] = useState("");

  /*
  fetchPolicy: "network-only"の設定をすることで、
  getSingleEmployee関数が呼ばれた時に、毎回サーバーからデータを取得する。
   */
  const [
    getSingleEmployee,
    { data: dataSingleEmployee, error: errorSingleEmployee },
  ] = useLazyQuery(GET_SINGLE_EMPLOYEE, {
    fetchPolicy: "network-only",
  });

  return (
    <StateContext.Provider
      value={{
        name,
        setName,
        joinYear,
        setJoinYear,
        deptName,
        setDeptName,
        selectedDept,
        setSelectedDept,
        editedId,
        setEditedId,
        dataSingleEmployee,
        errorSingleEmployee,
        getSingleEmployee,
      }}
    >
      {props.children}
    </StateContext.Provider>
  );
};

export default StateContextProvider;
