import React, { useState } from "react";

function CreateArea(props) {
  const [note, setNote] = useState(
    props.questions[props.currentQuestionIndex].note || ""
  );

  function handleChange(event) {
    setNote(event.target.value);
    let arr = [...props.questions];
    arr[props.currentQuestionIndex].note = event.target.value;
    props.setQuestions(arr);
  }

  return (
    <div>
      <form className="notepad">
        <textarea
          name="content"
          onChange={handleChange}
          value={note}
          placeholder="Take a note..."
          rows="3"
          required
        />
      </form>
    </div>
  );
}

export default CreateArea;
