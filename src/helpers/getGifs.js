export const getGifs = async (category, offset = 0, limit = 3) => {
    const url = `https://api.giphy.com/v1/gifs/search?api_key=qiNWsEiO1MxNo9kscZYsHZ6XcEuo11k0&q=${category}&limit=${limit}&offset=${offset}`;
    const respuesta = await fetch(url);
    const { data } = await respuesta.json();
    const gifs = data.map(img => ({
        id: img.id,
        title: img.title,
        url: img.images.downsized_medium.url
    }));
    return gifs;
};