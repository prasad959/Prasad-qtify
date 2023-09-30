import React from "react";
import styles from "./MenuItems.module.css";
import { useNavigate } from "react-router-dom";

const MenuItems = ({ albums }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className={styles.wrapper}>
        {albums?.length
          ? albums.map((item) => (
              <div className={styles.menuItemWrapper}>
                <div className={styles.wrappers}
                onClick={() => navigate(`/album/${item?.slug}`)}>
                  <div className={styles.imgTextWrapper}>
                    <div className={styles.thumbnailWrapper}>
                      <img
                        src={item?.image}
                        alt="albumImage"
                        width="66"
                        height="71"
                      />
                    </div>
                    <h4>{item?.title}</h4>
                  </div>
                  <div className={styles.folloWrapper}>
                    <h4>{item?.follows} Follows</h4>
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>
    </>
  );
};

export default MenuItems;
