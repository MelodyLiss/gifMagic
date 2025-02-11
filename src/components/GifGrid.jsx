import { useState, useEffect } from "react";
import { GifCard } from "./GifCard";
import { useFetchGifs } from "../hooks/useFetchGifs";
import { useLocalStorage } from "../hooks/useLocalStorage";
import "./GifGrid.scss";
import { generateColorFromText, lightenColor } from "../helpers/dinamicColor";

export const GifGrid = ({ category, onRemoveCategory }) => {
    const [storedImages, setStoredImages] = useLocalStorage(`gifs-${category}`, []);
    const { images, isLoading, addMoreGifs } = useFetchGifs(category);
    const [isExpanded, setIsExpanded] = useState(true);

    useEffect(() => {
        if (images.length > 0) {
            setStoredImages((prevImages) => {
                // Solo actualizar si la categoría es nueva o está vacía
                return prevImages.length === 0 ? images : prevImages;
            });
        }
    }, [images, setStoredImages]);

    const toggleCategoryVisibility = () => {
        setIsExpanded((prevState) => !prevState);
    };

    // Función para eliminar un GIF y actualizar LocalStorage
    const handleRemoveGif = (id) => {
        const updatedImages = storedImages.filter(img => img.id !== id);
        setStoredImages(updatedImages);
    };

    // Función para cargar más GIFs sin perder los existentes
    const handleLoadMoreGifs = async () => {
        const newGifs = await addMoreGifs();
        setStoredImages((prevImages) => [...prevImages, ...newGifs]);
    };

    // Generar colores dinámicos para las categorías
    const headerColor = generateColorFromText(category, 50, 60);
    const backgroundColor = lightenColor(headerColor, 25);
    const buttonColor = lightenColor(headerColor, 10);

    return (
        <div className="category-container" style={{ backgroundColor }}>
            <div
                className="category-header"
                style={{ "--header-color": headerColor }}
                onClick={toggleCategoryVisibility}
            >
                <h3>{category} /</h3>
                <i className="fa-solid fa-trash-can" onClick={onRemoveCategory}></i>
            </div>

            {isExpanded && (
                <>
                    <div className="card-grid">
                        {storedImages.map((image) => (
                            <GifCard key={image.id} {...image} onRemove={() => handleRemoveGif(image.id)} />
                        ))}
                    </div>
                    {isLoading && <p>Cargando...</p>}
                    <button
                        className="add-more-button"
                        onClick={handleLoadMoreGifs}
                        disabled={isLoading}
                        style={{ backgroundColor: buttonColor }}
                    >
                        Cargar más gifs de {category}
                    </button>
                </>
            )}
        </div>
    );
};
