import { useState, useEffect } from "react";
import { getGifs } from "../helpers/getGifs";

export const useFetchGifs = (category) => {
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const fetchGifs = async () => {
            setIsLoading(true);
            // Intentar obtener los GIFs guardados del localStorage
            const storedGifs = localStorage.getItem(`gifs-${category}`);
            if (storedGifs) {
                const parsedGifs = JSON.parse(storedGifs);
                setImages(parsedGifs);
                setOffset(parsedGifs.length);
                setIsLoading(false);
                return;
            }

            // Si no hay GIFs guardados, hacer la petición
            const newImages = await getGifs(category, 0, 10);
            setImages(newImages);
            setOffset(10);
            setIsLoading(false);
        };

        fetchGifs();
    }, [category]);

    const addMoreGifs = async () => {
        setIsLoading(true);
        const newImages = await getGifs(category, offset, 10);
        
        setImages(prevImages => [...prevImages, ...newImages]);
        setOffset(prevOffset => prevOffset + 10);
        setIsLoading(false);
        
        return newImages;
    };

    const removeGif = (id) => {
        setImages(prevImages => prevImages.filter(img => img.id !== id));
    };

    return { images, isLoading, removeGif, addMoreGifs };
};
