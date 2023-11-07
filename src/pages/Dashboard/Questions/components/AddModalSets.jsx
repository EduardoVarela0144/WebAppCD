import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Checkbox } from "@material-tailwind/react";
import { Modal, Tooltip } from 'flowbite-react';

export default function AddModalSets({ addSet }) {
    const { register, handleSubmit, reset, formState } = useForm();
    const { isSubmitting } = formState;
    const [questions, setQuestions] = useState([
        {
            question: "",
            hint: "",
            options: [
                { option: "", answer: false },
                { option: "", answer: false },
            ],
        },
    ]);

    const onSubmit = async (data) => {
        const formData = {
            owner: "650bf447fe90416a7b0a390a",
            name: data.name,
            description: data.description,
            status: "active",
            questions: data.questions.map((question) => ({
                question: question.question,
                hint: question.hint,
                options: question.options,
            })),
        };
        // console.log(data);
        // console.log(formData);
        await addSet(formData);
        window.location.reload();
        reset();
    };

    const addQuestion = () => {
        setQuestions([
            ...questions,
            {
                question: "",
                hint: "",
                options: [
                    { option: "", answer: false },
                    { option: "", answer: false },
                ],
            },
        ]);
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

    return (
        <div
            id="createSetModals"
            tabIndex="-1"
            aria-hidden="true"
            className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
            <div className="relative p-4 w-full max-w-2xl max-h-full">
                <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                    <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Añadir set de preguntas
                        </h3>
                        <button
                            id="close"
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            data-modal-target="createSetModals"
                            data-modal-toggle="createSetModals"
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
                        <div className="flex" >
                            <div className="w-1/2 p-1" >
                                <label htmlFor="name"
                                    className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                                >Nombre del Conjunto:</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="block w-11/12 mb-2 text-sm font-medium bg-gray-50 border border-gray-300 text-gray-600 rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    {...register("name", { required: true })}
                                    placeholder="Nombre del Conjunto"
                                />
                            </div>
                            <div className="w-1/2 p-1" >
                                <label
                                    htmlFor="description"
                                    className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                                >
                                    Descripción:
                                </label>
                                <textarea id="description" {...register("description")}
                                    className="block w-full h-4/5 mb-2 text-sm font-medium bg-gray-50 border border-gray-300 text-gray-600 rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                />
                            </div>
                        </div>


                        <div className="p-1">
                            <label
                                className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                            >Preguntas:</label>

                            {questions.map((question, questionIndex) => (
                                <div key={questionIndex} >
                                    <div className="my-3 ml-4 flex flex-wrap">
                                        <div className="w-1/2 pr-2">
                                            <label htmlFor="question"
                                                className="text-gray-600"
                                            >Pregunta: {questionIndex + 1}</label>
                                            <input
                                                type="text"
                                                {...register(`questions[${questionIndex}].question`, { required: true })}
                                                placeholder={`Pregunta ${questionIndex + 1}`}
                                                className="block w-full mb-2 mt-1 text-sm font-medium bg-gray-50 border border-gray-300 text-gray-600 rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
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
                                                className="block mb-2 text-sm font-medium bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
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
                                                        />
                                                    </Tooltip>
                                                </div>
                                                <div className="w-1/2 mr-8">
                                                    <input
                                                        type="text"
                                                        {...register(
                                                            `questions[${questionIndex}].options[${optionIndex}].option`,
                                                            { required: true }
                                                        )}
                                                        placeholder={`Opción ${optionIndex + 1}`}
                                                        className="block mb-2 w-full text-sm font-medium bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
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
                                                        onClick={() => addOption(questionIndex)}
                                                        className="block mt-1 w-8 h-8 p-1 text-sm text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-center mr-2 dark:bg-blue-800 dark:hover:bg-blue-900 dark:focus:ring-blue-900"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-5">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                                        </svg>
                                                    </button>
                                                </Tooltip>
                                            </div>


                                        </div>
                                    ))}

                                    <button type="button" 
                                    onClick={addQuestion}
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
                        <button type="submit" disabled={isSubmitting}
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
            </div>
        </div>
    );
}
