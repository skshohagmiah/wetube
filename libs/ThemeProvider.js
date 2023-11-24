'use client'
import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({children}){
    const [mode, setMode] = useState(true);

    useEffect(() => {
        const storedMode = localStorage.getItem('mode');
        if (storedMode) {
          setMode(JSON.parse(storedMode));
        }
      }, []);
    

    const handleTheme = () => {
        setMode(!mode)
        localStorage.setItem('mode',!mode);
    }

    return(
        <ThemeContext.Provider value={{
            mode: mode,
             handleTheme:handleTheme}}>
            <div className={mode ? 'light' : 'dark'}>
                 {children}
            </div>
        </ThemeContext.Provider>
    )

}