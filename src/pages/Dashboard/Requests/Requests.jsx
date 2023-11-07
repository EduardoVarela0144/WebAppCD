import DashboardLayout from "../../../components/DashboardLayout";
import DeckRequest from '../../../mocks/DeckRequest.json'
import QuestionsTable from "../Requests/components/QuestionsTable";
import { useGetRequest } from "../../../hooks/Request/useGetRequest";
import RequestDetails from "./RequestDetails";
import React, { useEffect, useState } from "react";
import CustomDeck from "./CustomDeck";

export default function Requests() {

  const { data } = useGetRequest();

  const { id, setId } = useState();

  return (
    <DashboardLayout title="Solicitud de preguntas">
      <div className="w-full flex flex-row justify-between">
        <div className="flex flex-row space-x-2">
          {/* <p>Filtro:</p>
          <p className="font-bold text-green-500">Nuevas</p> */}
          <button
            type="button"
            data-modal-show="requestSet"
            data-modal-toggle="requestSet"
            className="mt-3 flex items-center justify-center text-white bg-blue-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
          >
            <svg
              className="h-3.5 w-3.5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                clip-rule="evenodd"
                fill-rule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              />
            </svg>
            Solucitar Deck Personalizado
          </button>
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-3">
        <QuestionsTable
          data={data?.sets}
          setId={setId}
        />
      </div>
      <CustomDeck />
    </DashboardLayout>
  );
}
