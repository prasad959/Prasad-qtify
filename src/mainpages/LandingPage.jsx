import React, { useState, useEffect } from "react";
import { fetchTopAlbums, fetchNewAlbums, fetchAllSongs } from "../api/Api.js";
import NavBar from "../components/NavBar/NavBar.jsx";
import SearchBar from "../components/SearchBar/SearchBar.jsx";
import styles from "./LandingPage.module.css";
import HeroSection from "../components/HeroPage/HeroSection.jsx";
import Section from "../components/Section/Section.jsx";
import FilterTabs from "../components/FilterTabs/FilterTabs.jsx";
import { accordionData } from "../config/helper-config.js";
import CustomAccordion from "../components/Accordion/CustomAccordion.jsx";
import Footer from "../components/Footer/Footer.jsx";



const LandingPage = () => {
  const [topAlbumData, setTopAlbumData] = useState([]);
  const [newAlbumData, setNewAlbumData] = useState([]);
  const [allSongsData, setAllSongsData] = useState([]);
  const [loadingState, setLoadingState] = useState({
    topAlbum: true,
    newAlbum: true,
    allSongs: true,
  });

  const mangaeLoadingState = (key = "", value = false) => {
    setLoadingState((prev) => ({ ...prev, [key]: value }));
  };

  const generateTopAlbumData = async () => {
    try {
      mangaeLoadingState("topAlbum", true);
      const data = await fetchTopAlbums();
      // console.log(data);
      setTopAlbumData(data);
      mangaeLoadingState("topAlbum", false);
    } catch (err) {
      mangaeLoadingState("topAlbum", false);
      console.log(err);
    }
  };
  const generateNewAlbumData = async () => {
    try {
      mangaeLoadingState("newAlbum", true);
      const data = await fetchNewAlbums();
      // console.log(data);
      setNewAlbumData(data);
      mangaeLoadingState("newAlbum", false);
    } catch (err) {
      mangaeLoadingState("newAlbum", false);
      console.log(err);
    }
  };
  const generateAllSongsData = async () => {
    try {
      mangaeLoadingState("allSongs", true);
      const data = await fetchAllSongs();
      console.log(data);
      setAllSongsData(data);
      mangaeLoadingState("allSongs", false);
    } catch (err) {
      mangaeLoadingState("allSongs", false);
      console.log(err);
    }
  };

  useEffect(() => {
    generateTopAlbumData();
    generateNewAlbumData();
    generateAllSongsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const dropdownData = topAlbumData?.concat(newAlbumData);
  return (
    <>
      <NavBar data={dropdownData} logo={true} search={true} feedback={true} />
      <div className={styles.landingPageSearchWrapper}>
        <SearchBar
          placeholder="Search a album of your choice"
          data={dropdownData}
        />
      </div>
      <HeroSection />
      <div className={styles.sectionWrapper}>
        <Section
          title="Top Albums"
          data={topAlbumData} //api call
          type="album"
          loadingState={loadingState.topAlbum}
        />
        <Section
          title="New Albums"
          data={newAlbumData}
          type="album"
          loadingState={loadingState.newAlbum}
        />
      </div>
      <hr className={styles.line}></hr>
      <div className={styles.filter_songs_wrapper}>
        <div>
          <h3 className={styles.tabsTitle}>Songs</h3>
          <FilterTabs
           data={allSongsData} loadingState={loadingState.allSongs}
          />
        </div>
      </div>
      <hr className={styles.line}></hr>
      <div className={styles.customAccordionWrapper}>
        <h1 className={styles.accordionHeader}>FAQS</h1>

        {accordionData?.length ? (
          accordionData.map((each, index) => {
            return <CustomAccordion key={index} data={each} />;
          })
        ) : (
          <></>
        )}
      </div>
      <Footer />
    </>
  );
};

export default LandingPage;
