import React from 'react';
import { AddCategory } from './components/AddCategory';
import { GifGrid } from './components/GifGrid';
import { useLocalStorage } from './hooks/useLocalStorage';

import './assets/css/globales.scss';
import logo from '../src/assets/img/logo_pag.png';

export const GifMagic = () => {
    const [categories, setCategories] = useLocalStorage('categories', []);

    const onAddCategory = (newCategory) => {
        if (categories.includes(newCategory)) {
            return console.log(`${newCategory} ya existe`);
        }
        setCategories([newCategory, ...categories]);
    };

    const onRemoveCategory = (categoryToRemove) => {
        setCategories(categories.filter(category => category !== categoryToRemove));
    };

    return (
        <>
            <header>
                <img className='imglogo' src={logo} alt="" />
                <AddCategory onNewCategory={onAddCategory} />
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
                <p>Elaborado por Melody.Dev 🍊🧡</p>
            </footer>
        </>
    );
};
