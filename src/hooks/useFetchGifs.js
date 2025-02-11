import { useState, useEffect } from "react";
import { getGifs } from "../helpers/getGifs";

export const useFetchGifs = (category, setStoredImages) => {
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchGifs = async () => {
            setIsLoading(true);
            const newImages = await getGifs(category);
            setImages(newImages);
            setStoredImages(newImages); // Guardar en localStorage
            setIsLoading(false);
        };

        fetchGifs();
    }, [category]); // ❌ Eliminamos `setStoredImages` de las dependencias

    const addMoreGifs = async () => {
        setIsLoading(true);
        const newImages = await getGifs(category);

        setImages((prevImages) => {
            const updatedImages = [...prevImages, ...newImages];
            setStoredImages(updatedImages); // Guardar en localStorage
            return updatedImages;
        });

        setIsLoading(false);
    };

    const removeGif = (id) => {
        setImages((prevImages) => {
            const updatedImages = prevImages.filter(img => img.id !== id);
            setStoredImages(updatedImages); // Guardar en localStorage
            return updatedImages;
        });
    };

    return { images, isLoading, removeGif, addMoreGifs };
};
