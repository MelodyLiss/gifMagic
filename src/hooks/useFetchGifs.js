import { useState, useEffect } from "react";
import { getGifs } from "../helpers/getGifs";

export const useFetchGifs = (category) => {
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const fetchGifs = async () => {
            setIsLoading(true);
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
