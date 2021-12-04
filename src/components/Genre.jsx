import { HashLoader } from "react-spinners";
import CardStyle from "./CardStyle";
import { Pagination } from '@mui/material';

const Genre = ({ movies, api, done , handleClicked  , clickedVideo , video , text}) => {
  return (
    <div className="trending container">
      {!done ? (
        <div className="loader">
          <HashLoader />
        </div>
      ) : (
        <div>
          <div className="popular-title">{text}</div>
          <CardStyle apiImage={api} movies={movies} media={`Movie`} video={video} handleClicked={handleClicked} clickedVideo={clickedVideo}/>
          <div className="pagination-container">
            <Pagination count={10} variant="outlined" shape="rounded" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Genre;