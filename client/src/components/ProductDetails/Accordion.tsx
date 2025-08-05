import React, { useState } from "react";
import "./ProductDetails.css";

function Accordion({ title, content }: { title: string; content: string }) {
  const [isActive, setIsActive] = useState(false);

  const toggleAccordion = () => {
    setIsActive(!isActive);
  };

  return (
    <div className={`accordion ${isActive ? "active" : ""}`} onClick={toggleAccordion}>
      <button className="accordion_description">{title}</button>
      <div className="accordion_content" style={{ display: isActive ? "block" : "none" }}>
        <p>{content}</p>
      </div>
    </div>
  );
}

export default Accordion;
