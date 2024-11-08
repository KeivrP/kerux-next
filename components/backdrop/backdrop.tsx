'use client'
import React, { useContext, useState, createContext } from "react";
import Backdrop from "@mui/material/Backdrop";
import { makeStyles } from "@mui/styles"; // Importar makeStyles desde @mui/styles
import Loader from "./loader";

interface BackdropGlobalProps {
    children: React.ReactNode;
}

interface BackdropContextProps {
    handleLoading: (msg: string, open: boolean) => void;
    //hideLoading: () => void;
}

//Este contexto se puede utilizar para compartir datos 
//entre componentes en una aplicación de React.
const BackdropContext = createContext<BackdropContextProps | undefined>(undefined);

//La fucnion para acceder al valor almacendado en el contexto
export const useBackdrop = () => {
    const context = useContext(BackdropContext);
    if (!context) {
        throw new Error("useBackdrop must be used within a BackdropProvider");
    }
    return context;
};

const useStyles = makeStyles(() => ({
    backdrop: {
        zIndex: 4200,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }  
}));

const BackdropGlobal: React.FC<BackdropGlobalProps> = ({
    children,

}) => {
    const [open, setOpen] = useState(false);
    const [backdropMsg, setBackdropMsg] = useState("");
    const classes = useStyles(); 
    
    const handleLoading = (msg: string, open: boolean) => {
        setOpen(open);
        setBackdropMsg(msg);
    };
    
    return (
        <BackdropContext.Provider value={{ handleLoading }}>
            {children}
            <Backdrop className={classes.backdrop} open={open} >
                <Loader />
                {backdropMsg}
            </Backdrop>
            
        </BackdropContext.Provider>
    );
};

export default BackdropGlobal;
