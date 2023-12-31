"use client";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";

const PaginationButtons = ({ totalPages }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get("pageNumber") ?? "1";
  const per_page = searchParams.get("pageSize") ?? "20";
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
    router.push(
      `/User/UserList/?pageNumber=${selected + 1}&pageSize=${per_page}`
    );
  };

  const paginationVariants = {
    hidden: {
      opacity: 0,
      y: 200
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 2
      }
    }
  };
  const showNextButton = currentPage !== totalPages - 1;
  const showPrevButton = currentPage !== 0;
  return (
    <motion.div
      variants={paginationVariants}
      initial="hidden"
      animate="visible"
    >
      <ReactPaginate
        breakLabel={<span className="mr-4">.....</span>}
        nextLabel={
          showNextButton ? (
            <span className="w-10 h-10 flex items-center justify-center bg-lightGray rounded-md">
              <BsChevronRight />
            </span>
          ) : null
        }
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPages}
        previousLabel={
          showPrevButton ? (
            <span className="w-10 h-10 flex items-center justify-center bg-lightGray rounded-md mr-4">
              <BsChevronLeft />
            </span>
          ) : null
        }
        containerClassName="flex items-center justify-center mt-2 mb-2"
        pageClassName="block border- border-solid border-lightGray hover:bg-lightGray w-10 h-10 flex items-center justify-center rounded-md mr-4"
        activeClassName="bg-purple text-white"
      />
    </motion.div>
  );
};

export default PaginationButtons;
