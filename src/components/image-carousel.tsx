import { useState } from 'react';
import getImageURL from '../shared/get-image-url';

type ImageCarouselProps = {
  wrapperClasses?: string;
  leftButtonClasses?: string;
  rightButtonClasses?: string;
  imageClasses?: string;
  bulletContainerClasses?: string;
  bulletClasses?: string;

  imageAlt: string;
  mainImage?: string;
  images: string[];
};

export default function ImageCarousel({ wrapperClasses = '', leftButtonClasses = '', rightButtonClasses = '',
  imageClasses = '', bulletContainerClasses = '', bulletClasses = '',
  imageAlt, mainImage, images }: ImageCarouselProps): JSX.Element {
  const leftBorder = 0; // 0 = avatar
  const rightBorder = images.length;

  const [onLeftBorder, setOnLeftBorder] = useState(true);
  const [onRightBorder, setOnRightBorder] = useState(leftBorder < rightBorder);

  const [, setCurrentImageNumber] = useState(leftBorder);
  const [currentImageURL, setCurrentImageURL] = useState(getImageURL(mainImage));

  const updateCurrentImage = (currentNumber: number) => {
    if (currentNumber <= leftBorder) {
      setCurrentImageURL(getImageURL(mainImage));
    }
    setCurrentImageURL(getImageURL(images[currentNumber - 1]));
  };

  const handlePreviousImageClick = () => {
    setCurrentImageNumber((prev) => {
      if (onLeftBorder) {
        return leftBorder;
      }

      const newValue = prev - 1;
      setOnLeftBorder(newValue <= leftBorder);
      updateCurrentImage(newValue);
      return newValue;
    });
  };
  const handleNextImageClick = () => {
    setCurrentImageNumber((prev) => {
      if (onRightBorder) {
        return rightBorder;
      }

      const newValue = prev + 1;
      setOnRightBorder(newValue >= rightBorder);
      updateCurrentImage(newValue);
      return newValue;
    });
  };

  return (
    <div className={wrapperClasses}>
      <button className={`${leftButtonClasses} btn-reset`}
        onClick={handlePreviousImageClick} disabled={onLeftBorder}
      />
      <img className={imageClasses} src={currentImageURL} alt={imageAlt} />
      <button className={`${rightButtonClasses} btn-reset`}
        onClick={handleNextImageClick} disabled={onRightBorder}
      />
      <div className={`${bulletContainerClasses} bullets`}>
        <span className={`${bulletClasses} bullet ${onLeftBorder ? '' : 'bullet--active'}`} />
        <span className={`${bulletClasses} bullet bullet--active`} />
        <span className={`${bulletClasses} bullet ${onRightBorder ? '' : 'bullet--active'}`} />
      </div>
    </div>
  );
}
