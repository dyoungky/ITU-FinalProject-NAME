import React, { useState } from 'react';
import "./FilterPanel.css";

interface FilterPanelProps {
  onFilterChange: (filters: { type: string[]; color: string[]; material: string[] }) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ onFilterChange }) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(true); // State to control visibility

  const types = ["pants", "top"];
  const colors = ["black", "gray", "white", "blue", "beige", "green"];
  const materials = ["viscose", "lyocell", "cotton", "polyester", "polyamide", "elastane", "linen"];

  const handleTypeChange = (type: string) => {
    const updatedTypes = selectedTypes.includes(type)
      ? selectedTypes.filter(t => t !== type)
      : [...selectedTypes, type];
    setSelectedTypes(updatedTypes);
    onFilterChange({ type: updatedTypes, color: selectedColors, material: selectedMaterials });
  };

  const handleColorChange = (color: string) => {
    const updatedColors = selectedColors.includes(color)
      ? selectedColors.filter(c => c !== color)
      : [...selectedColors, color];
    setSelectedColors(updatedColors);
    onFilterChange({ type: selectedTypes, color: updatedColors, material: selectedMaterials });
  };

  const handleMaterialChange = (material: string) => {
    const updatedMaterials = selectedMaterials.includes(material)
      ? selectedMaterials.filter(m => m !== material)
      : [...selectedMaterials, material];
    setSelectedMaterials(updatedMaterials);
    onFilterChange({ type: selectedTypes, color: selectedColors, material: updatedMaterials });
  };

  const handleReset = () => {
    setSelectedTypes([]);
    setSelectedColors([]);
    setSelectedMaterials([]);
    onFilterChange({ type: [], color: [], material: [] });
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <button className="toggle-button" onClick={toggleVisibility}>
        {isVisible ? 'Hide Filters' : 'Show Filters'}
      </button>
      <div className={`filter-panel ${isVisible ? '' : 'hidden'}`}>
        <button onClick={handleReset}>Reset All Filters</button>
        <h4>Filter by Type</h4>
        {types.map(type => (
          <div key={type}>
            <input
              type="checkbox"
              checked={selectedTypes.includes(type)}
              onChange={() => handleTypeChange(type)}
            />
            <label>{type}</label>
          </div>
        ))}
        <h4>Filter by Color</h4>
        {colors.map(color => (
          <button
              key={color}
              className={`color-button ${color.toLowerCase()} ${selectedColors.includes(color) ? 'clicked' : ''}`}
              onClick={() => handleColorChange(color)}
          />
        ))}
        <h4>Filter by Material</h4>
        {materials.map(material => (
          <div key={material}>
            <input
              type="checkbox"
              checked={selectedMaterials.includes(material)}
              onChange={() => handleMaterialChange(material)}
            />
            <label>{material}</label>
          </div>
        ))}
      </div>
    </>
  );
};

export default FilterPanel;
