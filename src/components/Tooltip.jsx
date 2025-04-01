import { useState } from 'react';
import './Tooltip.scss';

export const Tooltip = ({ children, text }) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div 
            className="tooltip-container"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            {children}
            {isVisible && (
                <div className="tooltip">
                    {text}
                    <div className="tooltip-arrow"></div>
                </div>
            )}
        </div>
    );
}; 