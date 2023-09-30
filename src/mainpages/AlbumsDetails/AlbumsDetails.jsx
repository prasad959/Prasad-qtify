import React, { useEffect, useMemo, useState } from "react";
import styles from "./AlbumsDetails.module.css";
import NavBar from "../../components/NavBar/NavBar";
import { ReactComponent as LeftArrowIcon } from "../../assets/LeftArrow.svg";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Footer from "../../components/Footer/Footer";
import { ReactComponent as ShuffleIcon } from "../../assets/shuffleIcon.svg";
import { ReactComponent as LibraryIcon } from "../../assets/libraryIcon.svg";
import { convertMsToTime } from "../../config/helper-methods";

import CustomPagination from "../../components/Pagination/CustomPagination";

const AlbumsDetails = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [albumsDetails, setAlbumsDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const onPageChange=(pageNo)=>{
    setPage(pageNo)
  }

  const totalTimeInMs = useMemo(() => {
    return albumsDetails?.songs?.reduce((sum, item) => {
      return sum + item?.durationInMs;
    }, 0);
  }, [albumsDetails]);

  const displayData = useMemo(() => {
    return albumsDetails?.songs?.slice((page - 1) * 10, page * 10);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, albumsDetails]);

  const fetachAlbumDetails = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `https://qtify-backend-labs.crio.do/album/${slug}`
      );

      setAlbumsDetails(res?.data?.id ? res.data : {});
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
      navigate("/");
    }
  };
  useEffect(() => {
    if (slug) {
      fetachAlbumDetails();
    } else {
      navigate("/");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);
  return (
    <div className={styles.wrapper}>
      <NavBar logo={true} feedback={true} />

      <div className={styles.leftArrowWrapper}>
        <div className={styles.leftArrow} onClick={() => navigate("/")}>
          <LeftArrowIcon />
        </div>
      </div>
      {albumsDetails?.id?.length ? (
        <div className={styles.albums_content_wrapper}>
          <div className={styles.albums_content_header}>
            <div className={styles.albums_img_container}>
              <img src={albumsDetails.image} alt="" width={288} height={329} />
            </div>
            <div className={styles.albums_header_text}>
              <h1>Best of {albumsDetails?.title} in 2023</h1>
              <p>{albumsDetails?.description}</p>
              <div className={styles.songs_details}>
                <p>{albumsDetails?.songs?.length} songs</p>
                <p>{convertMsToTime(totalTimeInMs)}</p>
                <p>{albumsDetails.follows} Follows</p>
              </div>
              <div className={styles.btn_container}>
                <div className={styles.shuffle_btn_container}>
                  <ShuffleIcon />
                  <p>Shuffle</p>
                </div>
                <div className={styles.library_btn_container}>
                  <LibraryIcon />p Add to library
                </div>
              </div>
            </div>
          </div>
          {/* Paginations */}
          <div className={styles.pagination_container}>
            <CustomPagination
            page={page}
            pageLimit={10}
            totalCount={albumsDetails?.songs?.length}
            onPageChange={onPageChange}
            />
          </div>
          {/* Table */}
          <div className={styles.table_container}>
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Artists</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                {displayData?.map((each, index) => (
                  <tr className={styles.table_row} key={index}>
                    <td className={styles.title_name}>
                      <img
                        src={each?.image}
                        alt="album"
                        width={59}
                        height={64}
                      />
                      <p>{each?.title}</p>
                    </td>
                    <td>Rs.{each?.artists[0]}</td>
                    <td>{convertMsToTime(each?.durationInMs)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : isLoading ? (
        <>Loading ...</>
      ) : (
        <>"No DataFound"</>
      )}

      <Footer />
    </div>
  );
};

export default AlbumsDetails;
