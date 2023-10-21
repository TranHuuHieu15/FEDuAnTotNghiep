import { Rating } from "@material-tailwind/react";

const Comment = () => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1072 2"
        fill="none"
        className="w-full h-1 my-3"
      >
        <path d="M0 1L1072 0.999887" stroke="#D1D5DB" />
      </svg>
      <div className="grid grid-cols-12 mx-2 my-4">
        <div className="flex justify-center ">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZmFjZSUyMGFzaWElMjBnaXJsfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
            alt=""
            className="rounded-full w-14 h-14"
          />
        </div>

        <div className="flex flex-col col-span-11 gap-2 mx-2">
          <p>Emily</p>
          <p>July 11,2023</p>
          <Rating value={4} readonly />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
            quaerat nisi cumque! Incidunt necessitatibus esse, illum harum autem
            rerum dolores maxime asperiores, neque nulla quibusdam ratione. Odio
            soluta nostrum veritatis!
          </p>
        </div>
      </div>
    </>
  );
};

export default Comment;
