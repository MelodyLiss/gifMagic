import { useState } from 'react';
import './Gifcard.scss'

export const GifCard = ({ img, title, url, onRemove }) => {
    const [copied, setCopied] = useState(false);

    const handleCopyUrl = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // El mensaje desaparecerá después de 2 segundos
        } catch (err) {
            console.error('Error al copiar la URL:', err);
        }
    };

    return (
        <div className="card">
            <img 
                src={url} 
                alt={title} 
                onClick={handleCopyUrl}
                style={{ cursor: 'pointer' }}
            />
            <div >
                <p>{title}</p>
                <i className="fa-solid fa-delete-left" onClick={onRemove}></i>
            </div>
            {copied && <div className="copy-message">¡URL copiada!</div>}
        </div>
    );
};