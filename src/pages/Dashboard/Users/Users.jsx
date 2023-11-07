import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../components/DashboardLayout";

//Hooks Imports
import { useGetUsers } from "../../../hooks/Users/useGetUsers";
import { useGetUserById } from "../../../hooks/Users/useGetUserById";
import { useEditUser } from "../../../hooks/Users/useEditUser";
import { useAddUser } from "../../../hooks/Users/useAddUser";
import { useDeleteUser } from "../../../hooks/Users/useDeleteUser";

import Dashboard from "../../../components/Dashboard/Dashboard";

export default function Users() {
  const { data, refetch } = useGetUsers(1,"");
  const [id, setId] = useState();
  const { data: dataById, refetch: refetchdataById } = useGetUserById(id);

  const { postUser, isLoading, isError } = useAddUser();
  const {
    editUser,
    isLoading: editLoading,
    isError: editError,
  } = useEditUser();
  const {
    deleteUser,
    isLoading: deleteLoading,
    isError: deleteError,
  } = useDeleteUser();

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
    "Apellidos",
    "Correo electrónico",
    "linkedin",
    "Foto de perfil",
    "Contraseña",
  ];
  const tableFilters = ["Jugadores", "Líderes", "Administradores"];

  useEffect(() => {
    if (!isLoading && !isError) {
      refetch();
    }
  }, [isLoading]);

  useEffect(() => {
    if (!editError && !editError) {
      refetch();
    }
  }, [editLoading]);

  useEffect(() => {
    if (!deleteError && !deleteLoading) {
      refetch();
    }
  }, [deleteLoading]);

  useEffect(() => {
    refetchdataById(id);
  }, [id]);

  return (
    <DashboardLayout>
      <Dashboard
        title="usuario"
        tableData={data}
        itemData={dataById?.user}
        tableQueryData={tableQueryData}
        tableHeaders={tableHeaders}
        addMethod={postUser}
        editMethod={editUser}
        deleteMethod={deleteUser}
        showFilter={false}
        showPagination={false}
        showSearchBar={false}
        tableFilters={tableFilters}
        id={id}
        setId={setId}
        
      />
    </DashboardLayout>
  );
}
