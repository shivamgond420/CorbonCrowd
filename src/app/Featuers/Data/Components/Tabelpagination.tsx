"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ItemError,
  ItemSelector,
  PageCarbonAmetionDataAsync,
} from "../DataSlice";
import { Button } from "@/components/ui/button";
const Tabelpagination = () => {
  const dispatch = useDispatch();
  const Endpage = useSelector(ItemError);
  const DataTabel = useSelector(ItemSelector);
  const limit = 10;

  const [page, setPage] = useState<number>(0);

  const NextPaginationLog = () => {
    const nextPage = page + 1;
    dispatch(PageCarbonAmetionDataAsync({ offset: nextPage, limit: limit }));
    setPage(nextPage);
  };

  const PrevPaginationLog = () => {
    const prevPage = page - 1;
    dispatch(PageCarbonAmetionDataAsync({ offset: prevPage, limit: limit }));
    setPage(prevPage);
  };

  const startRange = page * limit + 1;
  const endRange = Math.min(startRange + limit - 1, 100); // Assuming total entries are 100

  return (
    <div>
      <div className="flex flex-col items-center">
        {/* Help text */}
        <span className="text-sm text-gray-700 dark:text-gray-400">
          Showing {"  "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {startRange}
          </span>{" "}
          to{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {endRange}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            100
          </span>{" "}
          Entries
        </span>
        {/* Buttons */}
        <div className="inline-flex space-x-3 mt-2 xs:mt-0">
          <Button
            onClick={PrevPaginationLog}
            disabled={page === 0} // Disable prev button on first page
          >
            Prev
          </Button>
          <Button
            onClick={NextPaginationLog}
            disabled={DataTabel.length < 10 || Endpage === "dataEnd"} // Disable next button on last page
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Tabelpagination;
