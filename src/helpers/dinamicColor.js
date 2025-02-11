export const generateColorFromText = (text, saturation = 80, lightness = 60) => {
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
        hash = text.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash) % 360;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

export const lightenColor = (color, amount = 20) => {
    let [h, s, l] = color.match(/\d+/g).map(Number);
    l = Math.min(l + amount, 100);
    return `hsl(${h}, ${s}%, ${l}%)`;
};

