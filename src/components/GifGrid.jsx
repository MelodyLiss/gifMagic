import { useState, useEffect } from "react";
import { GifCard } from "./GifCard";
import { useFetchGifs } from "../hooks/useFetchGifs";
import { useLocalStorage } from "../hooks/useLocalStorage";
import "./GifGrid.scss";
import { generateColorFromText, lightenColor } from "../helpers/dinamicColor";

export const GifGrid = ({ category, onRemoveCategory }) => {
    const [storedImages, setStoredImages] = useLocalStorage(`gifs-${category}`, []);
    const { images, isLoading, addMoreGifs, removeGif } = useFetchGifs(category);
    const [isExpanded, setIsExpanded] = useState(true);

    useEffect(() => {
        if (images.length > 0) {
            setStoredImages(images);
        }
    }, [images, setStoredImages]);

    const toggleCategoryVisibility = () => {
        setIsExpanded((prevState) => !prevState);
    };

    const handleRemoveGif = (id) => {
        removeGif(id);
        setStoredImages(prevImages => prevImages.filter(img => img.id !== id));
    };

    const handleLoadMoreGifs = async () => {
        const newGifs = await addMoreGifs();
        setStoredImages(prevImages => [...prevImages, ...newGifs]);
    };

    

    const headerColor = generateColorFromText(category, 50, 60);
    const backgroundColor = lightenColor(headerColor, 25);
    const buttonColor = lightenColor(headerColor, 10);

    return (
        <div className={`category-container ${!isExpanded ? 'collapsed' : ''}`} style={{ backgroundColor }}>
            <div
                className="category-header"
                style={{ "--header-color": headerColor }}
                onClick={toggleCategoryVisibility}
            >
                <h3>{category}</h3>
                <i className="fa-solid fa-trash-can" onClick={onRemoveCategory}></i>
            </div>

            {isExpanded && (
                <>
                    <div className="card-grid">
                        {storedImages.map((image) => (
                            <GifCard key={image.id} {...image} onRemove={() => handleRemoveGif(image.id)} />
                        ))}
                    </div>
                    {isLoading && <p className="loading-message">Cargando...</p>}
                    <button
                        className="add-more-button"
                        onClick={handleLoadMoreGifs}
                        disabled={isLoading}
                        style={{ backgroundColor: buttonColor }}
                    >
                        {isLoading ? 'Cargando...' : `Cargar más gifs de ${category}`}
                    </button>
                </>
            )}
        </div>
    );
};
