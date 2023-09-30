import React, { useEffect, useState } from 'react'
import { ReactComponent as LeftArrow } from "../../../assets/LeftArrow.svg"
import { useSwiper } from 'swiper/react'
import styles from "../Carousel.module.css"

const CarouselLeftNavigation = () => {
    const swiper = useSwiper();
    const [isBegin,setIsBegin]=useState(true);

    useEffect(()=> {
        swiper.on("slideChange",()=> {
            setIsBegin(swiper.isBeginning);
        })
    },[swiper])
  return (
    <div className={styles.leftNavigation}>
        {!isBegin && <LeftArrow onClick={() => swiper.slidePrev()} />}
    </div>
  )
}

export default CarouselLeftNavigation