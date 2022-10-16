import "./hotel.scss";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import PlaceIcon from "@mui/icons-material/Place";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import CancelIcon from "@mui/icons-material/Cancel";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import useFetch from "../../hooks/useFetch.js";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Reserve from "../../components/reserve/Reserve";

const Hotel = () => {
  const location = useLocation();

  // console.log(location); You can get the id through this
  const id = location.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { data, loading, error } = useFetch(`/hotels/find/${id}`);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { date, options } = useContext(SearchContext);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2?.getTime() - date1?.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const days = dayDifference(date[0]?.endDate, date[0]?.startDate);

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };
  const handleMove = (direction) => {
    let newSlideNumber;
    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }
    setSlideNumber(newSlideNumber);
  };

  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };
  return (
    <div className="hotel">
      <Navbar />
      <Header type="list" />
      {loading ? (
        "loading"
      ) : (
        <>
          <div className="hotelContainer">
            {open && (
              <div className="slider">
                <CancelIcon className="close" onClick={() => setOpen(false)} />
                <ArrowCircleLeftIcon
                  className="arrow"
                  onClick={() => handleMove("l")}
                />
                <div className="sliderWrapper">
                  <img
                    src={data.images[slideNumber]}
                    alt=""
                    className="sliderImg"
                  />
                </div>
                <ArrowCircleRightIcon
                  className="arrow"
                  onClick={() => handleMove("r")}
                />
              </div>
            )}

            <div className="hotelWrapper">
              <button className="bookNow">Reserve or Book Now!</button>
              <h1 className="hotelTitle">{data.name}</h1>
              <div className="hotelAddress">
                <PlaceIcon style={{ color: "red" }} />
                <span>{data.address}</span>
              </div>

              <span className="hotelDistance">
                Excellent location - {data.distance}m from center
              </span>

              <span className="hotelPrice">
                Book a stay over €{data.cheapestPrice} at this property and get
                a free airport taxi
              </span>

              <div className="hotelImgs">
                {data.images?.map((image, i) => (
                  <div className="hotelImgsWrapper" key={i}>
                    <img
                      onClick={() => handleOpen(i)}
                      src={image}
                      alt=""
                      className="hotelImg"
                    />
                  </div>
                ))}
              </div>

              <div className="hotelDetails">
                <div className="hotelDetailsTxt">
                  <h1 className="hotelTitle">{data.title}</h1>
                  <p className="hotelDesc">{data.desc}</p>
                </div>

                <div className="hotelDetailsPrice">
                  <h1>Perfect for a {days}-night stay!</h1>
                  <span>
                    Located in the real heart of Krakow, this property has an
                    excellent location score of 9.8!
                  </span>
                  <h2>
                    <b>${days * data.cheapestPrice * options?.room}</b> ({days}{" "}
                    nights)
                  </h2>
                  <button onClick={handleClick}>Reserve or Book Now!</button>
                </div>
              </div>
            </div>

            <MailList />
            <Footer />
          </div>
        </>
      )}
      {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
    </div>
  );
};

export default Hotel;
