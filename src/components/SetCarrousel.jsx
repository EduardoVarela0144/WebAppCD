import { useState, useEffect, useRef } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import api from "../services/api";

function SetCarrousel() {
  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/set/getSet/${id}`);
        setData(response.data.set.questions);
      } catch (error) {
        console.error("Error al obtener la solicitud:", error);
      }
    };

    fetchData();
  }, [id]);

  const responsive = {
    0: { items: 1 },

  };

  const carousel = useRef(null);

  const handlePrevSlide = () => {
    carousel?.current.slidePrev();
  };

  const handleNextSlide = () => {
    carousel?.current.slideNext();
  };

  return (
    <>
      <button
        className="bg-white rounded-full p-1 hover:bg-gray-200"
        onClick={handlePrevSlide}
      >
        <BsFillArrowLeftCircleFill size={32} color="gray" />
      </button>
      {data.length > 0 ? (
        <AliceCarousel
          items={data.map((question, index) => (
            <div
              key={index}
              className="bg-zinc-800 rounded-3xl mx-5 h-48 md:h-48 lg:h-56 xl:h-64 flex items-center justify-center px-3 flex-col space-y-4"
            >
              <p className="font-bold text-xl md:text-xl lg:text-xl xl:text-2xl text-white text-center">
                {question.question}
              </p>
              <p className="font-light italic text-lg text-zinc-300 text-center">
                Pista: {question.hint}
              </p>
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex}>
                  <p className={`text-lg text-white text-center ${option.answer ? 'font-bold text-xl' : 'font-normal'}`}>{option.option}</p>
                  
                </div>
              ))}

            </div>

          ))}
          responsive={responsive}
          animationDuration={400}
          disableButtonsControls={true}
          disableDotsControls={true}
          ref={carousel}
        />
      ) : (
        <p>Cargando...</p>
      )}
      <button
        className="bg-white rounded-full p-1 hover:bg-gray-200"
        onClick={handleNextSlide}
      >
        <BsFillArrowRightCircleFill size={32} color="gray" />
      </button>
    </>
  );
}

export default SetCarrousel;
