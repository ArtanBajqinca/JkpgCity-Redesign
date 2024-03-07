import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import "./Font.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { HiArrowNarrowUp } from "react-icons/hi";

function App() {
  const [districts, setDistricts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const fetchCompanies = useCallback(async () => {
    const response = await fetch("http://localhost:3001/companies");
    const companies = await response.json();
    return companies;
  }, []);

  const fetchDistricts = useCallback(async () => {
    const response = await fetch("http://localhost:3001/districts");
    const districts = await response.json();
    return districts;
  }, []);

  const fetchCategories = useCallback(async () => {
    const response = await fetch("http://localhost:3001/categories");
    const categories = await response.json();
    return categories;
  }, []);

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

  const filteredCategories = selectedDistrict
    ? categories.filter((category) =>
        companies.some(
          (company) =>
            company.district === selectedDistrict &&
            company.category === category
        )
      )
    : categories;

  return (
    <>
      <FirstSection />
      <SecondSection />
      <ThirdSection
        districts={districts}
        categories={filteredCategories}
        companies={companies}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
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

function ThirdSection({
  districts,
  categories,
  companies,
  selectedCategories,
  setSelectedCategories,
}) {
  const [selectedDistricts, setSelectedDistricts] = useState([]);

  const handleDistrictSelect = (district) => {
    if (selectedDistricts.includes(district.toLowerCase())) {
      setSelectedDistricts(
        selectedDistricts.filter(
          (d) => d.toLowerCase() !== district.toLowerCase()
        )
      );
    } else {
      setSelectedDistricts([...selectedDistricts, district.toLowerCase()]);
    }
  };

  const handleCategorySelect = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const filteredCompanies = companies.filter((company) => {
    const districtFilterPassed =
      selectedDistricts.length === 0 ||
      selectedDistricts.includes(company.district.toLowerCase());
    const categoryFilterPassed =
      selectedCategories.length === 0 ||
      selectedCategories.includes(company.type);

    return districtFilterPassed && categoryFilterPassed;
  });

  const filteredCategories = categories.filter((category) =>
    companies.some(
      (company) =>
        selectedDistricts.includes(company.district.toLowerCase()) &&
        company.category === category
    )
  );

  return (
    <div className="thirdSectionBody">
      <div className="districtDiv">
        {districts.map((district, index) => (
          <District
            key={index}
            name={district.toUpperCase()}
            isChecked={selectedDistricts.includes(district.toLowerCase())}
            onDistrictSelect={() => handleDistrictSelect(district)}
          />
        ))}
      </div>

      <div className="categoryDiv">
        {categories.map(
          (category, index) => (
            console.log(category),
            (
              <Category
                key={index}
                name={category.toUpperCase()}
                className="categoryName"
                onCategorySelect={() => handleCategorySelect(category)}
              />
            )
          )
        )}
      </div>
      <AccordionList
        categories={categories}
        companies={filteredCompanies}
        selectedCategories={selectedCategories}
      />
    </div>
  );
}

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

// Category Component
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

// Accordion List Component
function AccordionList({ categories, companies, selectedCategories }) {
  // Create a grouped data structure where the key is the category
  const groupedData = companies.reduce((acc, company) => {
    const category = company.type;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(company);
    return acc;
  }, {});

  // Decide which categories to show. If there are selected categories, filter to only show those.
  // Otherwise, show all categories.
  const categoriesToShow =
    selectedCategories.length > 0
      ? categories.filter((category) => selectedCategories.includes(category))
      : categories;

  return (
    <div className="accordion-list">
      {categoriesToShow.map((category, index) => (
        <React.Fragment key={index}>
          <CategoryTitle name={category} />
          <AccordionGroup items={groupedData[category] || []} />
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
        return <img src="./img/rådhusparkenIcon.svg" alt="rådhusparken icon" />;
      case "atollen":
        return <img src="./img/atollenIcon.svg" alt="atollen icon" />;
      case "öster":
        return <img src="./img/österIcon.svg" alt="öster icon" />;
      case "kulturhuset spira":
        return <img src="./img/kulturHusetSpiraIcon.svg" alt="spira icon" />;
      case "högskolan":
        return <img src="./img/högskolanIcon.svg" alt="högksolan icon" />;
      case "väster":
        return <img src="./img/västerIcon.svg" alt="väster icon" />;
      case "stationen":
        return <img src="./img/stationenIcon.svg" alt="stationen icon" />;
      case "tändsticksområdet":
        return (
          <img
            src="./img/tändSticksOmrådetIcon.svg"
            alt="tändsticksområdet icon"
          />
        );
    }
  };

  return (
    <div className="accordion">
      <div className="accordion-header" onClick={toggleAccordion}>
        <h3>{name}</h3>
        {isOpen ? (
          <HiArrowNarrowUp className="accordionArrow open" />
        ) : (
          <HiArrowNarrowUp className="accordionArrow" />
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
              <a href="dropdown-link4" className="dropdownLink">
                Om
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
