import React, { useRef } from "react";
import "./AddMovie.css";

const AddMovie = () => {
  const titleInputRef = useRef();
  const openingTextRef = useRef();
  const releaseDateRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const newMovieObj = {
      id: Math.random().toString(),
      title: titleInputRef.current.value,
      openingText: openingTextRef.current.value,
      releaseDate: releaseDateRef.current.value,
    };
    console.log(newMovieObj)
  };
  return (
    <React.Fragment>
      <section>
        <form onSubmit={submitHandler}>
          <label>Title</label>
          <br />
          <input type="text" ref={titleInputRef}></input>
          <br />
          <label>Opening Text</label>
          <br />
          <input type="text" ref={openingTextRef}></input>
          <br />
          <label>Release Date</label>
          <br />
          <input type="text" ref={releaseDateRef}></input>
          <br />
          <button>Add Movie</button>
        </form>
      </section>
    </React.Fragment>
  );
};

export default AddMovie;
