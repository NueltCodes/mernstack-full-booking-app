import "./featuredProperties.scss";
import useFetch from "../../hooks/useFetch.js";

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch("/hotels/?feature=true&limit=4");

  return (
    <div className="fp">
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          <div className="fpItems">
            {data.map((item) => (
              <div className="fpItem" key={item._id}>
                <img src={item.images} alt="" className="fpImg" />
                <span className="fpName">{item.name}</span>
                <span className="fpCity">{item.city}</span>
                <span className="fpPrice">
                  Starting from ${item.cheapestPrice}
                </span>

                {item.rating && (
                  <div className="fpRatings">
                    <button>{item.rating}</button>
                    <span>Execellent</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
