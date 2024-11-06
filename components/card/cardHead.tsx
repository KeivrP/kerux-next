import { Card as MuiCard, useTheme } from '@mui/material';

interface CardProps {
  children: React.ReactNode; 
}

const CardHead: React.FC<CardProps> = ({ children }) => {

  return (
    <MuiCard 
      sx={{
        display: 'flex',
        padding: '22px 31px',
        alignItems: 'center',
        gap: '33px',
        borderRadius: '8px',
        backgroundColor: '#FFFFFF',
        boxShadow: '0px 3px 14px 2px rgba(0, 0, 0, 0.12)',
        // ...otros estilos  
      }}
    >
      {children}
    </MuiCard>
  );
}

export default CardHead;