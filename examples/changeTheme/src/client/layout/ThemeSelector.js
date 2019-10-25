import React from 'react';

import { IconButton, Menu, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { PaletteOutlined } from '@material-ui/icons';

import { useThemeManagerContext, deepCompareObj } from 'next-mui-helper/es';

import allThemes from '../style/theme';

const useStyles = makeStyles({
  colorCard: {
    width: 90,
    height: 30,
  },
});

function ThemeSelector() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { theme, setTheme } = useThemeManagerContext();
  const classes = useStyles();

  const handleClick = React.useCallback(e => {
    setAnchorEl(e.currentTarget);
  }, []);

  const handleClose = React.useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleChangeTheme = React.useCallback(
    themeName => {
      return () => {
        setTheme(allThemes[themeName]);
        handleClose();
      };
    },
    [setTheme, handleClose],
  );

  return (
    <>
      <IconButton
        aria-controls="theme-selector"
        aria-haspopup="true"
        onClick={handleClick}
        color="inherit"
      >
        <PaletteOutlined />
      </IconButton>
      <Menu
        id="theme-selector"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {Object.keys(allThemes).map(themeName => (
          <MenuItem
            key={themeName}
            onClick={handleChangeTheme(themeName)}
            selected={deepCompareObj(theme, allThemes[themeName])}
          >
            <div
              className={classes.colorCard}
              style={{
                background: allThemes[themeName].palette.primary[500],
              }}
            />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export default React.memo(ThemeSelector);
