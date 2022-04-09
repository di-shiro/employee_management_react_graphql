import React, { createContext, useState } from "react";
export const StateContext = createContext();

const StateContextProvider = (props) => {
  const [name, setName] = useState("");
  const [joinYear, setJoinYear] = useState(2020);
  const [deptName, setDeptName] = useState("");
  const [selectedDept, setSelectedDept] = useState("");
  const [editedId, setEditedId] = useState("");

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
      }}
    >
      {props.children}
    </StateContext.Provider>
  );
};

export default StateContextProvider;
