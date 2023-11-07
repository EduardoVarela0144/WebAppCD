import React, { useState, useEffect } from "react";
import DeleteModalSets from "./DeleteModalSets";
'use client';
import { Modal, Tooltip } from 'flowbite-react';
import { useForm } from "react-hook-form";
import AddModalSets from "./AddModalSets";
import { useGetSetById } from "../../../../hooks/Sets/useGetSetById";
import api from "../../../../services/api";
import { all } from "axios";
import { Checkbox } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";

export default function SetsTable({
  tableData,
  setId,
  tableHeaders,
  deleteSet,
  addSet,
  // dataSet
}) {

  const [tId, settId] = useState();
  const [modalData, setModalData] = useState();
  const [allSet, setAllSet] = useState();
  const [editId, setEditId] = useState();

  const handleEditClick = async (idd) => {
    setEditId(idd);
    const response = await api.get(`/set/getSet/${idd}`);
    setAllSet(response.data);

    props2.setIsModalVisible('default')
  };

  const handleDeleteClick = async () => {
    await deleteSet(tId);

    props.setOpenModal();

  };

  const openModalSetId = (id) => {
    settId(id)
    props.setOpenModal('default')
  }

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const props = { openModal, setOpenModal };
  const props2 = { isModalVisible, setIsModalVisible };

  // ---------------Logica del editar Set-----------------------------

  const { register, handleSubmit, reset, formState, setValue } = useForm();
  const { isSubmitting } = formState;

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (allSet) {
      setQuestions(allSet.set.questions);
    }
  }, [allSet]);

  const onSubmit = async (data) => {
    const formData = {
      owner: data.owner,
      name: data.name,
      description: data.description,
      status: "active",
      questions: data.questions.map((question) => ({
        question: question.question,
        hint: question.hint,
        options: question.options,
      })),
    };

    const response2 = await api.put(`/set/editSet/${editId}`, formData);
    console.log(response2.data);
    props2.setIsModalVisible();
    window.location.reload();
  };

  const addQuestion = (questionIndex, optionIndex) => {
    const updatedQuestions = [...questions];
    const newQuestion = {
      question: "",
      hint: "",
      options: [
        { option: "", answer: false },
      ],
    };

    updatedQuestions.splice(questionIndex + 1, 0, newQuestion);

    setQuestions(updatedQuestions);
  };


  const addOption = (questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.push({ option: "", answer: false });
    setQuestions(updatedQuestions);
  };


  const removeQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const removeOption = (questionIndex, optionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.splice(optionIndex, 1);
    setQuestions(updatedQuestions);
  };

  const closeModalEdit = () => {
    props2.setIsModalVisible();
    window.location.reload();
  }


  return (
    <>
      <div className="over hiden flow-x-auto">
        <DeleteModalSets
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          setId={setId}
          deleteSet={deleteSet}
        />
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">

          <thead className="text-xs text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {tableHeaders.map((field) => (
                <th scope="col" className="px-4 py-3">
                  {field}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData?.sets
              ? tableData?.sets.map((item) => (
                <tr className="text-center items-center border-b dark:border-gray-700" key={item._id}>
                  <td className="px-4 py-3">{item.name}</td>
                  <td className="px-4 py-3">{item.description}</td>
                  <td className="px-4 py-3">{item.createdAt}</td>
                  <td className="px-4 py-3 flex items-center text-center justify-end ">
                    <button

                      className="inline-flex items-center text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 p-1.5 dark:hover-bg-gray-800 text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                      type="button"
                    >
                      <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => handleEditClick(item._id)}
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                        />
                      </svg>
                    </button>
                    <button
                      className="inline-flex items-center text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 p-1.5 dark:hover-bg-gray-800 text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                      type="button"
                      onClick={() => openModalSetId(item._id)}
                    >
                      <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          fill="currentColor"
                          d="M6.09922 0.300781C5.93212 0.30087 5.76835 0.347476 5.62625 0.435378C5.48414 0.523281 5.36931 0.649009 5.29462 0.798481L4.64302 2.10078H1.59922C1.36052 2.10078 1.13161 2.1956 0.962823 2.36439C0.79404 2.53317 0.699219 2.76209 0.699219 3.00078C0.699219 3.23948 0.79404 3.46839 0.962823 3.63718C1.13161 3.80596 1.36052 3.90078 1.59922 3.90078V12.9008C1.59922 13.3782 1.78886 13.836 2.12643 14.1736C2.46399 14.5111 2.92183 14.7008 3.39922 14.7008H10.5992C11.0766 14.7008 11.5344 14.5111 11.872 14.1736C12.2096 13.836 12.3992 13.3782 12.3992 12.9008V3.90078C12.6379 3.90078 12.8668 3.80596 13.0356 3.63718C13.2044 3.46839 13.2992 3.23948 13.2992 3.00078C13.2992 2.76209 13.2044 2.53317 13.0356 2.36439C12.8668 2.1956 12.6379 2.10078 12.3992 2.10078H9.35542L8.70382 0.798481C8.62913 0.649009 8.5143 0.523281 8.37219 0.435378C8.23009 0.347476 8.06631 0.30087 7.89922 0.300781H6.09922ZM4.29922 5.70078C4.29922 5.46209 4.39404 5.23317 4.56282 5.06439C4.73161 4.8956 4.96052 4.80078 5.19922 4.80078C5.43791 4.80078 5.66683 4.8956 5.83561 5.06439C6.0044 5.23317 6.09922 5.46209 6.09922 5.70078V11.1008C6.09922 11.3395 6.0044 11.5684 5.83561 11.7372C5.66683 11.906 5.43791 12.0008 5.19922 12.0008C4.96052 12.0008 4.73161 11.906 4.56282 11.7372C4.39404 11.5684 4.29922 11.3395 4.29922 11.1008V5.70078ZM8.79922 4.80078C8.56052 4.80078 8.33161 4.8956 8.16282 5.06439C7.99404 5.23317 7.89922 5.46209 7.89922 5.70078V11.1008C7.89922 11.3395 7.99404 11.5684 8.16282 11.7372C8.33161 11.906 8.56052 12.0008 8.79922 12.0008C9.03791 12.0008 9.26683 11.906 9.43561 11.7372C9.6044 11.5684 9.69922 11.3395 9.69922 11.1008V5.70078C9.69922 5.46209 9.6044 5.23317 9.43561 5.06439C9.26683 4.8956 9.03791 4.80078 8.79922 4.80078Z"
                        />
                      </svg>

                    </button>
                  </td>
                </tr>
              ))
              : null}
          </tbody>
        </table>

        <Modal show={props.openModal === 'default'} onClose={() => props.setOpenModal(undefined)}
          size="lg"
          className=" text-center items-center relative p-4 rounded-lg shadow dark:bg-gray-800 sm:p-12"
        >

          <div
            id="deleteModalSet"
          >
            <div className="relative p-4 w-full max-w-md max-h-full">
              <div >
                <button
                  type="button"
                  data-modal-toggle="deleteModalSet"
                  className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => props.setOpenModal()}
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
                <p className="mb-4 text-gray-500 dark:text-gray-300">
                  ¿Estás seguro que quieres eliminar este elemento?
                </p>
                <div className="flex justify-center items-center space-x-4">
                  <button
                    type="button"
                    className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                    onClick={() => props.setOpenModal()}
                  >
                    No, cancelar
                  </button>
                  <button
                    onClick={() => handleDeleteClick()}
                    className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                  >
                    Sí, estoy seguro
                  </button>
                </div>
              </div>
            </div>
          </div>

        </Modal>


        <Modal show={props2.isModalVisible === 'default'} onClose={() => props2.setIsModalVisible(undefined)}
          className="self-center overflow-y-hidden items-center sm:items-center	"
        >
          <div
            className=" overflow-hidden  overflow-y-auto overflow-x-hiden  top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
          >
            {/* <div className="relative p-4 w-full max-w-2xl max-h-full  overflow-hidden  overflow-y-auto overflow-x-hiden" > */}
            <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5 " >
              <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Editar set de preguntas
                </h3>
                <button
                  id="close"
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => closeModalEdit()}
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex">
                  <div className="w-1/2 p-1">
                    <input id="owner"
                      hidden
                      defaultValue={allSet ? allSet.set.owner : ''}
                    />
                    <label
                      htmlFor="name"
                      className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                    >Nombre del Conjunto:</label>
                    <input
                      type="text"
                      id="name"
                      className="block w-11/12 mb-2 text-sm font-medium bg-gray-50 border border-gray-300 text-gray-600 rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      {...register("name", { required: true })}
                      placeholder="Nombre del Conjunto"
                      defaultValue={allSet ? allSet.set.name : ''}

                    />
                  </div>

                  <div className="w-1/2 p-1">
                    <label
                      htmlFor="description"
                      className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                    >
                      Descripción:
                    </label>
                    <textarea id="description" {...register("description")}
                      className="block w-full h-4/5 mb-2 text-sm font-medium bg-gray-50 border border-gray-300 text-gray-600 rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      defaultValue={allSet ? allSet.set.description : ''}
                    ></textarea>
                  </div>
                </div>
                <div className="p-1">
                  <label className="block mb-2 text-md font-medium text-gray-900 dark:text-white">Preguntas:</label>
                  {questions.map((question, questionIndex) => (
                    <div key={questionIndex}>
                      <div className="my-3 ml-4 flex flex-wrap">
                        <div className="w-1/2 pr-2">
                          <label htmlFor={`question${questionIndex}`} className="text-gray-600">
                            Pregunta: {questionIndex + 1}
                          </label>
                          <input
                            type="text"
                            {...register(`questions[${questionIndex}].question`, { required: true })}
                            placeholder={`Pregunta ${questionIndex + 1}`}
                            className="block w-full mb-2 mt-1 text-sm font-medium bg-gray-50 border border-gray-300 text-gray-600 rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            defaultValue={allSet && allSet.set && allSet.set.questions && allSet.set.questions[questionIndex] ? allSet.set.questions[questionIndex].question : ''}
                          />
                        </div>
                        <div className="w-1/2 pl-2">
                          <label className="text-gray-600 invisible">
                            Pista:
                          </label>
                          <input
                            type="text"
                            {...register(`questions[${questionIndex}].hint`, { required: true })}
                            placeholder={`Pista ${questionIndex + 1}`}
                            className="block w-full mb-2 mt-1 text-sm font-medium bg-gray-50 border border-gray-300 text-gray-600 rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            defaultValue={allSet && allSet.set && allSet.set.questions && allSet.set.questions[questionIndex] ? allSet.set.questions[questionIndex].hint : ''}
                          />
                        </div>
                      </div>

                      <div className="my-2 ml-4">
                        <label className="text-gray-600">
                          Respuestas:
                        </label>
                      </div>
                      {question.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="my-2 ml-4">
                          <div className="flex flex-wrap mt-3 mb-2">
                            <div className="pr-4">
                              <Tooltip content={<div className="font-normal text-xs">Respuesta correcta</div>} animation="duration-500">
                                <Checkbox
                                  color="teal"
                                  {...register(
                                    `questions[${questionIndex}].options[${optionIndex}].answer`
                                  )}
                                  defaultChecked={
                                    allSet &&
                                      allSet.set &&
                                      allSet.set.questions &&
                                      allSet.set.questions[questionIndex] &&
                                      allSet.set.questions[questionIndex].options
                                      ? allSet.set.questions[questionIndex].options[optionIndex].answer
                                      : false
                                  }
                                  onChange={(e) => {
                                    const updatedQuestions = [...questions];
                                    updatedQuestions[questionIndex].options[optionIndex].answer =
                                      e.target.checked;
                                    setQuestions(updatedQuestions);
                                  }}
                                />
                              </Tooltip>
                            </div>
                            <div className="w-1/2 mr-8">
                              {/* <label htmlFor={`option${questionIndex}_${optionIndex}`} className="text-gray-600">
                                  Opcion: {optionIndex + 1}
                                </label> */}
                              <input
                                type="text"
                                {...register(
                                  `questions[${questionIndex}].options[${optionIndex}].option`,
                                  { required: true }
                                )}
                                placeholder={`Opción ${optionIndex + 1}`}
                                className="block mb-2 w-full text-sm font-medium bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                defaultValue={allSet && allSet.set && allSet.set.questions && allSet.set.questions[questionIndex] && allSet.set.questions[questionIndex].options && allSet.set.questions[questionIndex].options[optionIndex] ? allSet.set.questions[questionIndex].options[optionIndex].option : ''}
                              />
                            </div>
                            <Tooltip content={<div className="font-normal text-xs">Eliminar Opción</div>}>
                              <button
                                type="button"
                                onClick={() => removeOption(questionIndex, optionIndex)}
                                className="block mt-1 w-8 h-8 p-1 text-sm text-white  bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-5">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                              </button>
                            </Tooltip>

                            <Tooltip content={<div className="font-normal text-xs">Agregar Opción</div>}>
                              <button
                                type="button"
                                onClick={() => addOption(questionIndex, optionIndex)}
                                className="block mt-1 w-8 h-8 p-1 text-sm text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-center mr-2 dark:bg-blue-800 dark:hover:bg-blue-900 dark:focus:ring-blue-900"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-5">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                </svg>
                              </button>
                            </Tooltip>
                          </div>
                          {/* <div className="grid gap-2 mb-2 sm:grid-cols-2 w-1/2">

                            </div> */}
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={() => addQuestion(questionIndex)}
                        className="mt-2 p-2 text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg py-2.5 text-center mr-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                      >
                        Agregar Pregunta
                      </button>

                      <button
                        type="button"
                        onClick={() => removeQuestion(questionIndex)}
                        className="p-2 text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-lg py-2.5 text-center mr-2  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                      >
                        Eliminar Pregunta
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-6 p-2 text-white inline-flex items-center bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  <svg
                    className="mr-1 -ml-1 w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Añadir
                </button>


              </form>
            </div>
            {/* </div> */}
          </div>
        </Modal>
      </div >
    </>
  );
}
