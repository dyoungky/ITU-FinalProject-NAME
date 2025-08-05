import React, { useState } from 'react';
import "./ImageGallery.css";

interface Props {
  imgUrls: string[];
}

const ImageGallery: React.FC<Props> = ({ imgUrls }) => {
  const [selectedImage, setSelectedImage] = useState<string>(imgUrls[0]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleImageClick = (url: string, index: number) => {
    setSelectedImage(url);
    setCurrentIndex(index);
  };

  const handleNextImage = () => {
    const nextIndex = (currentIndex + 1) % imgUrls.length;
    setSelectedImage(imgUrls[nextIndex]);
    setCurrentIndex(nextIndex);
  };

  const handlePrevImage = () => {
    const prevIndex = (currentIndex - 1 + imgUrls.length) % imgUrls.length;
    setSelectedImage(imgUrls[prevIndex]);
    setCurrentIndex(prevIndex);
  };

  return (
    <div className="image-gallery">
      <div className="thumbnails">
        {imgUrls.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`Image ${index + 1}`}
            onClick={() => handleImageClick(url, index)}
            className={selectedImage === url ? 'selected' : ''}
          />
        ))}
      </div>
      <div className="main-image">
        <img src={selectedImage} alt="Main" />
        {imgUrls.length > 1 && (
          <div className="arrow-buttons">
            <button onClick={handlePrevImage}>&lt;</button>
            <button onClick={handleNextImage}>&gt;</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGallery;