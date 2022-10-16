import "./searchItem.scss";
import { Link } from "react-router-dom";

const SearchItem = ({ item }) => {
  return (
    <div className="searchItem">
      <img src={item.images?.[0]} alt="" className="siImg" />
      <div className="s-Desc">
        <h1 className="s-Title">{item.name}</h1>
        <span className="s-Distance">{item.distance}</span>
        <span className="s-TaxiOpt">Free Airport Taxi</span>
        <span className="s-Sub">Studio Apartment with Air conditioning</span>
        <span className="s-Features">{item.shortDesc}</span>
        <span className="s-CancelOp">Free cancellation</span>
        <span className="s-CancelOptSub">
          You can cancel later, so lock in this great price today!
        </span>
      </div>

      <div className="s-Details">
        {item.rating && (
          <div className="s-Rating">
            <span>Execellent</span>
            <button>{item.rating}</button>
          </div>
        )}

        <div className="s-DetailsTexts">
          <span className="s-Price">${item.cheapestPrice}</span>
          <span className="s-TaxOpt">Includes taxes and fees</span>
          <Link to={`/hotels/${item._id}`}>
            <button className="s-CheckBtn">See availability</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
