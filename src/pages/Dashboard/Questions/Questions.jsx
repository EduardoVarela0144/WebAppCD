import DashboardLayout from "../../../components/DashboardLayout";
import React, { useEffect, useState } from "react";
import QuestionDashboard from "./QuestionDashboard";
import { useGetSets } from "../../../hooks/Sets/useGetSets";
import { usePostSet } from "../../../hooks/Sets/usePostSet";
import { useDeleteSet } from "../../../hooks/Sets/useDeleteSet";
import { useGetSetById } from "../../../hooks/Sets/useGetSetById";

export default function Questions () {
  const { data, refetch } = useGetSets();
  const [id, setId] = useState();

  const { postSet, isLoading, isError } = usePostSet();
  // const { data: set } = useGetSetById(getId);
  const {deleteSet} = useDeleteSet(id);
  
  //const { data: dataById } = useGetSetById(id);
  const tableQueryData = [
    "name",
    "lastName",
    "email",
    "linkedinURL",
    "img",
    "password",
  ];
  const tableHeaders = [
    "Nombre",
    "Descripción",
    "Fecha de creación",
    "Acción",
  ];
  return (
    <DashboardLayout >
      <QuestionDashboard 
        tableData={data}
        tableQueryData={tableQueryData}
        tableHeaders={tableHeaders}
        setId={setId}
        addSet={postSet}
        deleteSet={deleteSet}
        id={id}
        
      />
    </DashboardLayout>
   )
}
