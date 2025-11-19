import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { NavLink, useLocation } from 'react-router-dom';
import usersIcon from '../../assets/user.svg';
import globbyLogo from '../../assets/next-face-bo.png';

const navItems = [
  { 
    label: 'News', 
    icon: usersIcon, 
    to: '/news',
    hasSubItems: true,
    subItems: [
      { label: 'View News', to: '/news' },
      { label: 'Add News', to: '/news/add' },
    ]
  },
];

export default function Sidebar({ sidebarWidth = '17.778rem' }) {
  const location = useLocation();
  const [openConfigurations, setOpenConfigurations] = useState(
    location.pathname.startsWith('/configurations')
  );
  const [openNews, setOpenNews] = useState(
    location.pathname.startsWith('/news')
  );

  // Close configurations menu when navigating to other pages
  React.useEffect(() => {
    if (!location.pathname.startsWith('/configurations')) {
      setOpenConfigurations(false);
    } else {
      setOpenConfigurations(true);
    }
    
    if (location.pathname.startsWith('/news')) {
      setOpenNews(true);
    } else {
      setOpenNews(false);
    }
  }, [location.pathname]);
  return (
    <Drawer
      variant="permanent"
      PaperProps={{
        sx: {
          width: sidebarWidth,
          bgcolor: '#fff',
          borderRight: '1px solid #e5e7eb',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          paddingBlock: '0.889rem',
          height: '100dvh',
        },
      }}
      sx={{ width: sidebarWidth, flexShrink: 0 }}
    >
      {/* Logo */}
      <NavLink to="/" style={{ textDecoration: 'none' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: '0.444rem',
            px: '1.333rem',
            py: '0.889rem',
            cursor: 'pointer',
          }}
        >
          <img
            src={globbyLogo}
            alt="Globby logo"
            style={{
              marginRight: '0.44rem',
              width: '10.4rem',
              height: '2.4rem',
            }}
          />

        </Box>
      </NavLink>
      <List sx={{ flex: 1, pt: 0 }}>
        {navItems.map((item, idx) => {
          const isActive = location.pathname === item.to;
          const isConfigurationsOpen =
            location.pathname.startsWith('/configurations');
          const isNewsOpen = location.pathname.startsWith('/news');
          // Only highlight main item if it's the exact route (not subitems)
          const isMainItemActive = item.hasSubItems ? false : isActive;
          
          // Determine which menu is open
          const isThisMenuOpen = item.label === 'News' ? openNews : openConfigurations;

          return (
            <Box key={item.label}>
              {/* Main Navigation Item */}
              <ListItemButton
                component={item.hasSubItems ? 'div' : NavLink}
                to={item.hasSubItems ? undefined : item.to}
                {...(!item.hasSubItems && item.to === '/' ? { end: true } : {})}
                onClick={
                  item.hasSubItems
                    ? () => {
                        if (item.label === 'News') {
                          setOpenNews(!openNews);
                        } else {
                          setOpenConfigurations(!openConfigurations);
                        }
                      }
                    : () => {
                        setOpenConfigurations(false);
                        setOpenNews(false);
                      }
                }
                sx={{
                  mb: item.hasSubItems && isThisMenuOpen ? '0' : '0.444rem',
                  px: '1.333rem',
                  py: '0.889rem',
                  bgcolor: 'transparent',
                  '&:hover': {
                    color: '#3788F4',
                    bgcolor: 'transparent',
                    '& .SidebarIcon': {
                      filter:
                        'invert(34%) sepia(97%) saturate(747%) hue-rotate(186deg) brightness(97%) contrast(101%)',
                    },
                    '& .MuiListItemText-primary': { color: '#3788F4' },
                  },
                  color: isMainItemActive ? '#3788F4' : '#111928',
                  fontWeight: 400,
                  fontSize: '1rem',
                  transition: 'color 0.2s',
                  '& .MuiListItemText-primary': {
                    fontSize: '1rem',
                    color: isMainItemActive ? '#3788F4' : '#111928',
                    fontWeight: 400,
                    transition: 'color 0.2s',
                  },
                }}
              >
                <ListItemIcon className="SidebarIcon" sx={{ minWidth: '2rem' }}>
                  <img
                    src={item.icon}
                    alt={item.label + ' icon'}
                    style={{
                      width: '1.33rem',
                      height: '1.33rem',
                      display: 'block',
                      filter: isMainItemActive
                        ? 'invert(34%) sepia(97%) saturate(747%) hue-rotate(186deg) brightness(97%) contrast(101%)'
                        : 'none',
                      transition: 'filter 0.2s',
                    }}
                  />
                </ListItemIcon>
                <ListItemText primary={item.label} />
                {item.hasSubItems &&
                  (isThisMenuOpen ? (
                    <ExpandLess sx={{ color: '#111928' }} />
                  ) : (
                    <ExpandMore sx={{ color: '#111928' }} />
                  ))}
              </ListItemButton>

              {/* Sub Items */}
              {item.hasSubItems && (
                <Collapse in={isThisMenuOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.subItems.map(subItem => {
                      const isSubItemActive = location.pathname === subItem.to;
                      return (
                        <ListItemButton
                          key={subItem.label}
                          component={NavLink}
                          to={subItem.to}
                          sx={{
                            pl: '3.5rem',
                            pr: '1.333rem',
                            py: '0.389rem',
                            mb: '0.444rem',
                            bgcolor: 'transparent',
                            '&:hover': {
                              bgcolor: 'transparent',
                              '& .MuiListItemText-primary': {
                                color: '#3788F4',
                              },
                            },
                            '& .MuiListItemText-primary': {
                              fontSize: '1rem',
                              color: isSubItemActive ? '#3788F4' : '#111928',
                              fontWeight: 400,
                              transition: 'color 0.2s',
                            },
                          }}
                        >
                          <ListItemText primary={subItem.label} />
                        </ListItemButton>
                      );
                    })}
                  </List>
                </Collapse>
              )}
            </Box>
          );
        })}
      </List>
   
    </Drawer>
  );
}
