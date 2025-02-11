import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {GifMagic} from './GifMagic.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GifMagic/>
  </StrictMode>,
);
