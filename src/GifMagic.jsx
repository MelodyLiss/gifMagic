import React, { useState } from 'react';
import { AddCategory } from './components/AddCategory';
import { GifGrid } from './components/GifGrid';
import { useLocalStorage } from './hooks/useLocalStorage';

import './assets/css/globales.scss';
import logo from '../src/assets/img/logo_pag.png';

export const GifMagic = () => {
    const [categories, setCategories] = useLocalStorage('categories', []);
    const [error, setError] = useState('');

    const onAddCategory = (newCategory) => {
        if (categories.includes(newCategory)) {
            setError(`${newCategory} ya existe`);
            setTimeout(() => setError(''), 3000); 
            return;
        }
        setError('');
        setCategories([newCategory, ...categories]);
    };

    const onRemoveCategory = (categoryToRemove) => {
        setCategories(categories.filter(category => category !== categoryToRemove));
    };

    return (
        <>
            <header>
                <img className='imglogo' src={logo} alt="" />
                <div className="category-header">
                    <AddCategory onNewCategory={onAddCategory} />
                </div>
                {error && <div className="error-message">{error}</div>}
            </header>

            <main>
                {categories.map((category) => (
                    <GifGrid
                        key={category}
                        category={category}
                        onRemoveCategory={() => onRemoveCategory(category)}
                    />
                ))}
            </main>

            <footer>
                <p>Elaborado por </p>
                <a href="https://www.linkedin.com/in/melodydev" target="_blank" rel="noopener noreferrer">
                <p> Melody.Dev🍊🧡</p>
                </a>
            </footer>
        </>
    );
};
