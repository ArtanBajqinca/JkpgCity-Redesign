import React, { useState, useEffect } from "react";
import "./App.css";
import "./Font.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { IoIosArrowRoundUp } from "react-icons/io";

function App() {
  const [districts, setDistricts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const districts = await fetchDistricts();
      const categories = await fetchCategories();
      const companies = await fetchCompanies();

      setDistricts(districts);
      setCategories(categories);
      setCompanies(companies);
    };

    fetchData();
  }, []);

  // Fetch companies from the backend
  async function fetchCompanies() {
    const response = await fetch("http://localhost:3001/companies");
    const companies = await response.json();
    return companies;
  }

  // Fetch districts from the backend
  async function fetchDistricts() {
    const response = await fetch("http://localhost:3001/districts");
    const districts = await response.json();
    return districts;
  }

  // Fetch categories from the backend
  async function fetchCategories() {
    const response = await fetch("http://localhost:3001/categories");
    const categories = await response.json();
    return categories;
  }

  return (
    <>
      <FirstSection />
      <SecondSection />
      <ThirdSection
        districts={districts}
        categories={categories}
        companies={companies}
      />
    </>
  );
}

// First Section including Navbar
function FirstSection() {
  return (
    <div className="firstSectionBody">
      <CustomNavbar />
      <div className="firstSectionContentDiv">
        <h1>REKREATION</h1>
        <h2>
          I Jönköpings stadskärna hittar du allt för att må bra, med ett stort
          utbud av olika gym, frisörer och salonger - allt för att skämma bort
          dig själv.
        </h2>
      </div>
    </div>
  );
}

// Second Section Component
function SecondSection() {
  return (
    <div className="secondSectionBody">
      <img
        src="./img/jkpgDistricts.svg"
        alt="jkpgcity districts"
        className="jkpgDistrictsLogo"
      />
    </div>
  );
}

function ThirdSection({ districts, categories, companies }) {
  const [selectedDistricts, setSelectedDistricts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [clearDistricts, setClearDistricts] = useState(false); // State to track whether districts should be cleared

  const handleDistrictSelect = (district) => {
    if (selectedDistricts.includes(district)) {
      setSelectedDistricts(selectedDistricts.filter((d) => d !== district));
    } else {
      setSelectedDistricts([...selectedDistricts, district]);
    }
  };

  const handleCategorySelect = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleClearDistricts = () => {
    setSelectedDistricts([]); // Clear selected districts
    setClearDistricts(true); // Update state to trigger re-render
    setTimeout(() => {
      setClearDistricts(false); // Reset clearDistricts state after a short delay
    }, 100);
  };

  const filteredCompanies = companies.filter((company) => {
    const districtFilterPassed =
      selectedDistricts.length > 0
        ? selectedDistricts.includes(company.district)
        : true;
    const categoryFilterPassed =
      selectedCategories.length > 0
        ? company.category
          ? selectedCategories.includes(company.category.toLowerCase())
          : false
        : true;
    return districtFilterPassed && categoryFilterPassed;
  });

  return (
    <div className="thirdSectionBody">
      <div className="districtDiv">
        {districts.map((district, index) => (
          <District
            key={index}
            name={district.toUpperCase()}
            isChecked={clearDistricts ? false : selectedDistricts.includes(district)} // Pass isChecked state and update it based on clearDistricts state
            onDistrictSelect={() => handleDistrictSelect(district)}
          />
        ))}
      </div>

      {/* <div className="categoryDiv">
        {categories.map((category, index) => (
          <Category
            key={index}
            name={category.toUpperCase()}
            className="categoryName"
            onCategorySelect={() => handleCategorySelect(category)}
          />
        ))}
      </div> */}

      <button className="clearDistrictButton" onClick={handleClearDistricts}>Rensa Distrikt</button>

      <AccordionList categories={categories} companies={filteredCompanies} />
    </div>
  );
}


// Custom Navbar Component
function CustomNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="navbarContainer">
      <div className="navbarSection">
        <div className="navbarLogo">
          <img src="./img/jkpgcity.svg" alt="jkpgCity" />
        </div>
        <div className="navbarLinks">
          <a href="uptäck" className="Links activeLink">
            UPPTÄCK
          </a>
          <a href="evenemang" className="Links">
            EVENEMANG
          </a>
          <a href="stadsdelar" className="Links">
            STADSDELAR
          </a>
          <a href="information" className="Links">
            INFORMATION
          </a>
          <div className="Hamburger-menu" onClick={toggleDropdown}>
            {isOpen ? (
              <img src="/img/hamburger-menu-closed.svg" alt="" />
            ) : (
              <img src="/img/hamburger-menu-open.svg" alt="" />
            )}
          </div>
          {isOpen && (
            <div className="dropdownMenu">
              <a href="dropdown-link1" className="dropdownLink">
                Artiklar
              </a>
              <a href="dropdown-link2" className="dropdownLink">
                Kontakt
              </a>
              <a href="dropdown-link3" className="dropdownLink">
                Aktör
              </a>
              <a href="dropdown-link3" className="dropdownLink">
                Om
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// District Component
function District({ name, isChecked, onDistrictSelect }) {
  const handleClick = () => {
    onDistrictSelect(name); // Add this line
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


// Category Component
function Category({ name, onCategorySelect }) {
  const [isChecked, setIsChecked] = useState(false);
  const handleClick = () => {
    setIsChecked(!isChecked);
    onCategorySelect(name); // Add this line
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

// Accordion List Component
function AccordionList({ categories, companies }) {
  const groupedData = categories.reduce((acc, category) => {
    acc[category] = companies.filter((company) => company.type === category);
    return acc;
  }, {});

  return (
    <div className="accordion-list">
      {categories.map((category, index) => (
        <React.Fragment key={index}>
          <CategoryTitle name={category.toUpperCase()} />
          <AccordionGroup items={groupedData[category]} />
        </React.Fragment>
      ))}
    </div>
  );
}

// Category Title Component
function CategoryTitle(props) {
  return (
    <div className="categoryTitleDiv">
      <h1>{props.name}</h1>
    </div>
  );
}

// Accordion Group Component
function AccordionGroup({ items }) {
  return (
    <div className="accordion-group">
      {items.map((item, index) => (
        <Accordion
          key={index}
          name={item.name}
          district={item.district}
          url={item.url}
        />
      ))}
    </div>
  );
}

// Accordion Component
function Accordion({ name, district, url }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const selectIcon = (district) => {
    switch (district) {
      case "rådhusparken":
        return <img src="./img/rådhusparkenIcon.svg" alt="rådhusparken" />;
      case "atollen":
        return <img src="./img/atollenIcon.svg" alt="atollen" />;
      case "öster":
        return <img src="./img/österIcon.svg" alt="Home" />;
      case "kulturhuset spira":
        return <img src="./img/kulturHusetSpiraIcon.svg" alt="Home" />;
      case "högskolan":
        return <img src="./img/högskolanIcon.svg" alt="Home" />;
      case "väster":
        return <img src="./img/västerIcon.svg" alt="Home" />;
      case "stationen":
        return <img src="./img/stationenIcon.svg" alt="Home" />;
      case "tändsticksområdet":
        return <img src="./img/tändSticksOmrådetIcon.svg" alt="Home" />;
      // Add more cases for other districts as needed
      default:
        return <img src="./img/default.png" alt="Default" />; // Default icon
    }
  };

  return (
    <div className="accordion">
      <div className="accordion-header" onClick={toggleAccordion}>
        <h3>{name}</h3>
        {isOpen ? (
          <IoIosArrowRoundUp className="accordionArrow open" />
        ) : (
          <IoIosArrowRoundUp className="accordionArrow" />
        )}
      </div>
      <div className={`accordion-content ${isOpen ? "open" : ""}`}>
        <span>
          {selectIcon(district)}
          <h1>Distrikt: {district}</h1>
        </span>
        <br />
        <span>
          <img src="./img/webIcon.svg" alt="webIcon" />
          <h1>
            <a href={url}>{url}</a>
          </h1>
        </span>
      </div>
    </div>
  );
}

export default App;
