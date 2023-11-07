import React, { useRef } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";

function SetCarrouselSessions({ data, type }) {
  const responsive = {
    0: { items: 1 },
    620: { items: 2 },
    1000: { items: 3 },
  };

  const carousel = useRef(null);

  const handlePrevSlide = () => {
    carousel.current.slidePrev();
  };

  const handleNextSlide = () => {
    carousel.current.slideNext();
  };

  return (
    <>
      <button
        className="bg-white rounded-full p-1 hover-bg-gray-200 absolute top-1/2 transform -translate-y-1/2 left-4"
        onClick={handlePrevSlide}
      >
        <BsFillArrowLeftCircleFill size={32} color="gray" />
      </button>
      <AliceCarousel
        items={data.map((card, index) => (
          <div
            key={index}
            className="bg-black rounded-3xl w-3/4 h-60 md:h-60 lg:h-70 xl:h-80 flex items-center justify-center mx-auto px-3"
          >
            {type === "title" ? (
              <p className="font-bold text-2xl md:text-2xl lg:text-2xl xl:text-4xl text-white text-center">
                {card.description}
              </p>
            ) : (
              <div>
                <p className="font-bold text-2xl md:text-2xl lg:text-2xl xl:text-4xl text-white text-center">
                  {card.description}
                </p>
                <br />
                <p className="font-light italic text-2xl text-zinc-300 text-center">
                  <span className="font-bold">{card.guests}</span> usuarios
                  invitados
                </p>
                <br />
                <p className="text-2xl text-white text-center">
                  Programado para el:
                  <br />
                  {card.date}
                </p>
              </div>
            )}
          </div>
        ))}
        responsive={responsive}
        animationDuration={400}
        disableButtonsControls={true}
        disableDotsControls={true}
        ref={carousel}
      />
      <button
        className="bg-white rounded-full p-1 hover-bg-gray-200 absolute top-1/2 transform -translate-y-1/2 right-4"
        onClick={handleNextSlide}
      >
        <BsFillArrowRightCircleFill size={32} color="gray" />
      </button>
    </>
  );
}

export default SetCarrouselSessions;
