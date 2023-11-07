import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "../../../components/DashboardLayout";
import SetCarrousel from "../../../components/SetCarrousel";
import setMock from "../../../mocks/Set.json";
import { useGetRequest } from "../../../hooks/Request/useGetRequest";
import { useGetSetByIdRequest } from "../../../hooks/Request/useGetSetByIdRequest";
import api from "../../../services/api";

function RequestDetails() {
  const [isLoading, setIsLoading] = useState(false);
  const {id} = useParams();

  const handleApproveClick = async () => {
    setIsLoading(true);
    try {
      const requestBody = {
        setId: id,
        accepted: true,
      };

      // await fetch(`http://localhost:3000/api/bab/set/changeSetStatus/`, {
      //   method: "PUT",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(requestBody),
      // });
      const respose = await api.put(`/set/changeSetStatus/`, requestBody);
      window.location.href = "/dashboard/requests";
    } catch (error) {

      console.error("Error al aprobar la solicitud:", error);
    } finally {
      setIsLoading(false);
    }
  };

  function Icon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-6 w-6"
      >
        <path
          fillRule="evenodd"
          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
          clipRule="evenodd"
        />
      </svg>
    );
  }

  return (
    <DashboardLayout title="Solicitud de preguntas">
    <div className="w-full h-auto rounded-2xl flex flex-col px-8 md:px-16">
          <div className="py-6 flex flex-1 justify-center items-center border-2 border-transparent border-b-zinc-400">
          
        <SetCarrousel  />
          </div>

          {/* Button */}
          <div className="flex flex-row w-full items-center justify-between p-6">
            <button 
            
            className="bg-zinc-600 rounded-full text-white py-3 w-full md:w-1/3 md:text-xl">
              Rechazar
            </button>
            <button
              onClick={handleApproveClick}
              className="bg-zinc-800 rounded-full text-white py-3 w-full md:w-1/3 md:text-xl"
              disabled={isLoading} 
            >
              {isLoading ? "Aprobando..." : "Aprobar solicitud"}
            </button>
          </div>
        </div>
  </DashboardLayout>
  )
}

export default RequestDetails