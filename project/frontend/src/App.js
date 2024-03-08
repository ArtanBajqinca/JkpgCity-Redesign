import React, { useState, useEffect, useCallback } from "react";
import "./App.css"; // Main app styles
import "./Font.css"; // Font styles
import CustomNavbar from "./CustomNavBar";
import District from "./District";
import Category from "./Category";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap for styling
import { HiArrowNarrowUp } from "react-icons/hi"; // React icons for UI elements

function App() {
  // State hooks to manage districts, categories, companies, selected categories, and selected district
  const [districts, setDistricts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedDistrict] = useState(null);

  // Fetching data from local server using useCallback to avoid unnecessary re-fetches on re-renders
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

  // useEffect to fetch initial data on component mount
  useEffect(() => {
    const fetchData = async () => {
      const districts = await fetchDistricts();
      const categories = await fetchCategories();
      const companies = await fetchCompanies();

      // Updating state with fetched data
      setDistricts(districts);
      setCategories(categories);
      setCompanies(companies);
    };
    fetchData();
  }, []);

  // Filtering categories based on selected district
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

// Component representing the first section of the app,
// including the navbar and introductory content
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

// Component for the second section of the app, usually
// for displaying additional information or graphics
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

// Third section component handling the main interactive
// part of the application, including filters and company listings
function ThirdSection({
  districts,
  categories,
  companies,
  selectedCategories,
  setSelectedCategories,
}) {
  const [selectedDistricts, setSelectedDistricts] = useState([]);

  // Functions to handle user interactions for selecting/deselecting districts and categories
  const handleDistrictSelect = (district) => {
    // Logic to add or remove districts from the selection based on current state
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
    // Similar logic for categories
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  // Filtering companies based on selected districts and categories
  const filteredCompanies = companies.filter((company) => {
    const districtFilterPassed =
      selectedDistricts.length === 0 ||
      selectedDistricts.includes(company.district.toLowerCase());
    const categoryFilterPassed =
      selectedCategories.length === 0 ||
      selectedCategories.includes(company.type);

    return districtFilterPassed && categoryFilterPassed;
  });

  // Rendering district and category filters, along with filtered company listings
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
          <CategoryTitle name={category.toUpperCase()} />
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
            <a href={"//" + url} target="_blank" rel="noopener noreferrer">
              {url}
            </a>{" "}
          </h1>
        </span>
      </div>
    </div>
  );
}

export default App;
