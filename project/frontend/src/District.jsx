// District Component
function District({ name, isChecked, onDistrictSelect }) {
    const handleClick = () => {
      onDistrictSelect(name);
    };
  
    return (
      <div
        className="districtCard customCheckbox"
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

  export default District;