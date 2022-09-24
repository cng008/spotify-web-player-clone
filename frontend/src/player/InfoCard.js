import React, { useEffect, useState } from 'react';
import { useStateValue } from '../StateProvider';
import { Link } from 'react-router-dom';
// import { changeTrack } from '../../actions';
import './InfoCard.css';

import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';

function InfoCard({ data, borderRadius }) {
  //   const [{ trackData, isPlaying }, dispatch] = useStateValue();
  //   const [isthisplay, setIsthisPlay] = useState(false);
  // console.debug('InfoCard', 'trackData=', trackData, 'isPlaying=', isPlaying);

  //   useEffect(() => {
  //     setIsthisPlay(parseInt(data.index) && trackData.trackKey[0]);
  //     mapStateToProps(props);
  //   });

  //   const mapStateToProps = state => {
  //     dispatch({
  //       type: 'SET_PLAYLISTS',
  //       trackData: state.trackData,
  //       isPlaying: true
  //     });
  //   };

  return (
    <div className="InfoCardMBox">
      {/* <Link to={`/playlists/${data?.handle}`}> */}
      <div className="InfoCardM">
        <div className={borderRadius}>
          <img src={data?.image} alt={data?.name} />
        </div>
        <div className="InfoCardM-Title">
          <h3>{data?.name}</h3>
          <p>{data?.description ? data?.description : 'Artist'}</p>
        </div>
      </div>
      {/* </Link> */}
      {/* <div
        onClick={() => changeTrack([parseInt(data.index), 0])}
        className={`$IconBox} ${
          isthisplay && isPlaying ? 'ActiveIconBox' : ''
        }`}
      >
        <PlayCircleFilledIcon isthisplay={isthisplay} />
      </div> */}
    </div>
  );
}

export default InfoCard;
