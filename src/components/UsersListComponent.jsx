import React from 'react'
import ParticlesBackground from "./ParticlesBackground";
import { Avatar } from "flowbite-react";

export default function UsersListComponent({playersInLobby, pinGame, startGame, handleLeaveWaitingRoom}) {
  return (
    <div className="bg-black w-full h-full relative">
    <ParticlesBackground>
      <div className="flex w-full items-center justify-center">
        <div className="bg-white rounded-3xl px-12 py-4 flex flex-col items-center w-full sm:w-5/6 md:w-5/6 lg:w-5/6  h-auto sm:h-3/4 ">
          <div className="w-full flex items-center space-x-4 justify-between">
            <button className="flex justify-center space-x-2" onClick={() => handleLeaveWaitingRoom()}>
              <a
                className="rounded-full h-8 w-8 bg-black text-white font-bold flex items-center justify-center"
              >
                ←
              </a>
              <p className="font-bold text-xl">Regresar</p>
            </button>
            <button
              onClick={() => startGame(pinGame)}
              disabled={playersInLobby.length === 0 ? true : false}
              className={`text-white  ${
                playersInLobby.length === 0 ? "bg-gray-300" : "bg-black"
              } rounded-full font-bold px-4 py-2 text-md`}
            >
              Comenzar
            </button>
          </div>
          <div className="h-74 w-full overflow-y-auto no-scrollbar flex-col items-center justify-center">
            <div className="flex-col w-full ">
              {playersInLobby.length === 0 && (
                <div className="my-24 flex flex-col justify-center items-center">
                  <div
                    className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status"
                  >
                    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                      Loading...
                    </span>
                  </div>
                  <p className="text-black font-bold  text-2xl sm:text-3xl text-center italic">
                    Esperando que se unan jugadores
                  </p>
                </div>
              )}
              {playersInLobby.map((player, index) => (
                <div
                  key={index}
                  className="flex px-2 flex-row border-b-2 border-black py-2 space-x-2 items-center"
                >
                  {player.img !== "" ? (
                    <Avatar img={player.img} status="online" rounded />
                  ) : (
                    <Avatar
                      status="online"
                      placeholderInitials={
                        player.name[0] + player.lastName[0]
                      }
                      rounded
                    />
                  )}

                  <p>
                    {player?.name} {player.lastName}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ParticlesBackground>
  </div>
  )
}
