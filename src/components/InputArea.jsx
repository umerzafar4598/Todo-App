import { useState } from "react";

export default function InputArea(props) {
  const [inputText, setInputText] = useState({
    title: "",
    date: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setInputText((prev) => ({ ...prev, [name]: value }));
  }

  function handleAdd() {
    if (!inputText.title || !inputText.date) return;

    props.onAdd(inputText);
    setInputText({ title: "", date: "" });
  }

  return (
    <div className="input-area">
      <div className="inputs">
        <input
          name="title"
          type="text"
          placeholder="Enter a task..."
          onChange={handleChange}
          value={inputText.title}
        />

        <label style={{fontSize : "20px"}}>
          Set Deadline
          <input
            name="date"
            className="input-date"
            type="date"
            onChange={handleChange}
            value={inputText.date}
          />
        </label>
      </div>

      <button className="add-btn" onClick={handleAdd}>
        Add
      </button>
    </div>
  );
}
