import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Menu, { MenuProps } from '@mui/material/Menu';

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: 'rgb(55, 65, 81)',
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
    ...theme.applyStyles('dark', {
      color: theme.palette.grey[300],
    }),
  },
}));

interface CustomizedMenusProps {
  buttonText: string;
  icon?: React.ReactNode; // Optional icon or image
  children: React.ReactNode; // Menu items
  anchorOrigin?: { vertical: 'top' | 'bottom'; horizontal: 'left' | 'right' }; // Menu anchor origin
  transformOrigin?: { vertical: 'top' | 'bottom'; horizontal: 'left' | 'right' }; // Menu transform origin
  onOpenChange?: (isOpen: boolean) => void; // Callback for open state change
}

export default function CustomizedMenus({
  buttonText,
  icon,
  children,
  anchorOrigin = { vertical: 'bottom', horizontal: 'right' }, // Default values
  transformOrigin = { vertical: 'top', horizontal: 'right' }, // Default values
  onOpenChange, // Receive the callback
}: CustomizedMenusProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    if (onOpenChange) onOpenChange(true); // Notify parent that the menu is open
  };

  const handleClose = () => {
    setAnchorEl(null);
    if (onOpenChange) onOpenChange(false); // Notify parent that the menu is closed
  };

  return (
    <div>
      <button
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        className="flex items-center text-sm pe-1 font-medium text-gray-900 rounded-full hover:text-blue-600 dark:hover:text-blue-500 md:me-0 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-white"
        type="button"
        onClick={handleClick}
      >
        <span className="sr-only">Open user menu</span>
        {icon && <span className="mr-2">{icon}</span>} {/* Render icon if provided */}
        {buttonText}
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={anchorOrigin} // Use the provided anchorOrigin
        transformOrigin={transformOrigin} // Use the provided transformOrigin
      >
        {children}
      </StyledMenu>
    </div>
  );
}