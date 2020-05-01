import * as React from 'react';
import {
  Typography,
  Toolbar,
  AppBar as MuiAppBar,
  useTheme,
  useScrollTrigger,
  Container,
} from '@material-ui/core';
import { LocaleSwitcher, TabLinks } from '.';
import { Routes } from '../constants';
import { WindowProps, IPageUrl } from 'interfaces';

const sections: Array<IPageUrl> = [
  {
    page: 'main',
    url: '',
  },
  {
    page: 'articles',
    url: `/${Routes.articles}`,
  },
  {
    page: 'events',
    url: `/${Routes.events}`,
  },
];

export const AppBar: React.FC<WindowProps> = ({ window }) => {
  const theme = useTheme();
  const notZeroTrigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return (
    <MuiAppBar component="nav" elevation={notZeroTrigger ? 10 : 0}>
      <Container maxWidth="lg">
        {!notZeroTrigger && (
          <Toolbar variant="dense" style={{ borderBottom: `1px solid ${theme.palette.divider}` }}>
            <Typography variant="h5" color="inherit" align="center" noWrap style={{ flex: 1 }}>
              X-island
            </Typography>
            <LocaleSwitcher />
          </Toolbar>
        )}
        <Toolbar variant="dense">
          <TabLinks sections={sections} />
          {notZeroTrigger && <LocaleSwitcher />}
        </Toolbar>
      </Container>
    </MuiAppBar>
  );
};
