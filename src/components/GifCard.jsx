import { useState } from 'react';
import './GifCard.scss'


export const GifCard = ({ img, title, url, onRemove }) => {
    const [copied, setCopied] = useState(false);

    const handleCopyUrl = () => {
        const textArea = document.createElement('textarea');
        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="card">
            <img 
                src={url} 
                alt={title} 
                onClick={handleCopyUrl}
                style={{ cursor: 'pointer' }}
            />
            <div>
                <p>{title}</p>
                <i className="fa-solid fa-delete-left" onClick={onRemove}></i>
            </div>
            {copied && <div className="copy-message">¡URL copiada!</div>}
        </div>
    );
};