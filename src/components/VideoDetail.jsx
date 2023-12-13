// import React, { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import ReactPlayer from "react-player";
// import { Typography, Box, Stack } from "@mui/material";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";

// import { Videos, Loader } from "./";
// import { fetchFormAPI } from "../utils/fetchFromAPI";

// const VideoDetail = () => {
//   const [showScrollUp, setShowScrollUp] = useState(false);
//   const [videoDetail, setVideoDetail] = useState(null);
//   const [videos, setVideos] = useState(null);
//   const { id } = useParams();

//   const handlePlayerClick = () => {
//     setShowScrollUp(true);
//     window.scrollTo({
//       top: 0,
//       behavior: 'smooth'
//     });
//   };

//   const handleScrollUpClick = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: 'smooth'
//     });
//   };

//   useEffect(() => {
//     fetchFormAPI(`videos?part=snippet,statistics&id=${id}`)
//       .then((data) => setVideoDetail(data.items[0]))

//     fetchFormAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`)
//       .then((data) => setVideos(data.items))
//   }, [id]);

//   if (!videoDetail?.snippet) return <Loader />;

//   const { snippet: { title, channelId, channelTitle }, statistics: { viewCount, likeCount } } = videoDetail;

//   return (
//     <Box minHeight="95vh">
//       <Stack direction={{ xs: "column", md: "row" }}>
//         <Box flex={1}>
//           <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
//             <ReactPlayer
//               url={`https://www.youtube.com/watch?v=${id}`}
//               className="react-player"
//               controls
//               onClick={handlePlayerClick}
//             />

//             {showScrollUp && (
//               <button onClick={handleScrollUpClick}>
//                 Scroll Up
//               </button>
//             )}

//             <Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
//               {title}
//             </Typography>
//             <Stack direction="row" justifyContent="space-between" sx={{ color: "#fff" }} py={1} px={2} >
//               <Link to={`/channel/${channelId}`}>
//                 <Typography variant={{ sm: "subtitle1", md: 'h6' }} color="#fff" >
//                   {channelTitle}
//                   <CheckCircleIcon sx={{ fontSize: "12px", color: "gray", ml: "5px" }} />
//                 </Typography>
//               </Link>
//               <Stack direction="row" gap="20px" alignItems="center">
//                 <Typography variant="body1" sx={{ opacity: 0.7 }}>
//                   {parseInt(viewCount).toLocaleString()} views
//                 </Typography>
//                 <Typography variant="body1" sx={{ opacity: 0.7 }}>
//                   {parseInt(likeCount).toLocaleString()} likes
//                 </Typography>
//               </Stack>
//             </Stack>
//           </Box>
//         </Box>
//         <Box px={2} py={{ md: 1, xs: 5 }} justifyContent="center" alignItems="center" >
//           <Videos videos={videos} direction="column" />
//         </Box>
//       </Stack>
//     </Box>
//   );
// };

// export default VideoDetail;


import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { Videos, Loader } from "./";
import { fetchFormAPI } from "../utils/fetchFromAPI";

const VideoDetail = () => {
  const [showScrollUp, setShowScrollUp] = useState(false);
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState(null);
  const { id } = useParams();

  const handlePlayerClick = () => {
    setShowScrollUp(true);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleBottomToTopScroll = () => {
    const scrollStep = -window.scrollY / (1000 / 15); // Adjust speed here
    const scrollInterval = setInterval(() => {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep);
      } else {
        clearInterval(scrollInterval);
      }
    }, 15);
  };

  useEffect(() => {
    fetchFormAPI(`videos?part=snippet,statistics&id=${id}`)
      .then((data) => setVideoDetail(data.items[0]));

    fetchFormAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`)
      .then((data) => setVideos(data.items));
  }, [id]);

  if (!videoDetail?.snippet) return <Loader />;

  const { snippet: { title, channelId, channelTitle }, statistics: { viewCount, likeCount } } = videoDetail;

  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1}>
          <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              className="react-player"
              controls
              onClick={handlePlayerClick}
            />

            {showScrollUp && (
              <button onClick={handleBottomToTopScroll}>
                Scroll to Top
              </button>
            )}

            <Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
              {title}
            </Typography>
            <Stack direction="row" justifyContent="space-between" sx={{ color: "#fff" }} py={1} px={2}>
              <Link to={`/channel/${channelId}`}>
                <Typography variant={{ sm: "subtitle1", md: 'h6' }} color="#fff">
                  {channelTitle}
                  <CheckCircleIcon sx={{ fontSize: "12px", color: "gray", ml: "5px" }} />
                </Typography>
              </Link>
              <Stack direction="row" gap="20px" alignItems="center">
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(likeCount).toLocaleString()} likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box px={2} py={{ md: 1, xs: 5 }} justifyContent="center" alignItems="center">
          <Videos videos={videos} direction="column" />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
