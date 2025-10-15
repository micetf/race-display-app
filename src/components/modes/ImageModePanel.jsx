// src/components/modes/ImageModePanel.jsx
import ImageSelector from "../ImageSelector";

function ImageModePanel({ imageUrl, imageDisplayed, onImageUrlChange }) {
    return (
        <ImageSelector
            imageUrl={imageUrl}
            imageDisplayed={imageDisplayed}
            onImageUrlChange={onImageUrlChange}
        />
    );
}

export default ImageModePanel;
