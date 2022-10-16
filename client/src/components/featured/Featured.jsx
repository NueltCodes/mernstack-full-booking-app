import useFetch from "../../hooks/useFetch.js";
import "./featured.scss";

const Featured = () => {
  const { data, loading, error } = useFetch(
    "/hotels/countByCity?cities=berlin,madrid,london"
  );
  return (
    <div className="featured">
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          {" "}
          <div className="featuredItem">
            <img
              src="https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o="
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitle">
              <h1>Berlin</h1>
              <h2>{data[1]} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://q-xx.bstatic.com/xdata/images/xphoto/533x300/71365537.jpg?k=aab55a712d088602738a94f84e75bcf9954b5b6208343eef1e9f2f2a2a75b75e&o="
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitle">
              <h1>Madrid</h1>
              <h2>{data[1]} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o="
              alt="come out"
              className="featuredImg"
            />
            <div className="featuredTitle">
              <h1>London</h1>
              <h2>{data[2]} properties</h2>
            </div>
          </div>{" "}
        </>
      )}
    </div>
  );
};

export default Featured;
