import React, { useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import styles from "./Pagination.module.css"

const CustomPagination = ({ page, pageLimit, totalCount, onPageChange }) => {
    const [pageCount, setPageCount] = useState(0);
    useEffect(() => {
      const pageCount = Math.ceil(totalCount / pageLimit);
      setPageCount(pageCount);
    }, [totalCount, pageLimit]);
  
    const handleChange=(e,value)=> {
      onPageChange(value)
    }
  
    return (
      <div className={styles.wrapper}>
          <Pagination
              count={pageCount}
              page={page}
              onChange={handleChange}
              id={styles.paginationWrapper}
              variant="outlined"
              color="secondary"
          />
      </div>
    );
  };

export default CustomPagination