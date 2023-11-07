'use client';
import { Button, Modal } from 'flowbite-react';
import React, { useState } from "react";

function formatDate(timestamp) {
  const date = new Date(timestamp);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();

  return `${day}-${month}-${year}`;
}

function QuestionsTable({ data, setId }) {
  const [filter, setFilter] = useState("all");

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  // const storeIdInLocalStorage = (id) => {
  //   setId(id);
  // };

  const [openModal, setOpenModal] = useState();
  const props = { openModal, setOpenModal };

  return (
    <div>
      {/* Filtro */}
      {/* <div className="flex items-center space-x-4 mb-3">
        <label
          htmlFor="filter"
          className="text-gray-600 dark:text-gray-400 whitespace-nowrap"
        >
          Filtrar por:
        </label>
        <select
          id="filter"
          name="filter"
          value={filter}
          onChange={handleFilterChange}
          className="block w-32 px-4 py-2 bg-white border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <option value="all">Todos</option>
          <option value="active">Activos</option>
        </select>
      </div> */}

      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Nombre del deck
            </th>
            <th scope="col" className="px-6 py-3">
              Solicitante
            </th>
            <th scope="col" className="px-6 py-3">
              Fecha
            </th>
            <th scope="col" className="px-6 py-3">
              Estatus
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Acciones</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => (
            <tr
              key={index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {item.name}
              </th>
              <td className="px-6 py-4">{item.owner.name}</td>
              <td className="px-6 py-4">{formatDate(item.createdAt)}</td>
              <td className="px-6 py-4">{item.status}</td>

              <td className="px-6 py-4 text-right">
                <a
                  href={`/Dashboard/Requests/${item._id}`}
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  // onClick={() => storeIdInLocalStorage(item._id)}
                >
                  Ver
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
          </div>
  );
}

export default QuestionsTable;
