import React, {useState} from "react";

function Category({ name, onCategorySelect }) {
    const [isChecked, setIsChecked] = useState(false);
    const handleClick = () => {
      setIsChecked(!isChecked);
      onCategorySelect(name);
    };
  
    return (
      <div
        className="districtCard customCheckbox districtCard-Category"
        onClick={handleClick}
        style={{ cursor: "pointer", position: "relative" }}
      >
        <h1>{name}</h1>
        <input
          type="checkbox"
          className="checkBox"
          checked={isChecked}
          onChange={(e) => e.stopPropagation()}
          style={{ cursor: "pointer" }}
        />
        <span className="customCheckmark"></span>
      </div>
    );
  }

  export default Category;