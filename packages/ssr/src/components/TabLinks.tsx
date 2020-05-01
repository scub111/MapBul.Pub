import React, { useEffect } from 'react';
import Link from 'next/link';
import { Tabs, Tab, makeStyles, Theme, createStyles } from '@material-ui/core';
import { theme } from 'themes';
import { IPageUrl } from 'interfaces';
import { useTranslation } from 'hooks';
import { useRouter } from 'next/router';
import { getActive } from 'utils';

const useStyles = makeStyles((_: Theme) =>
  createStyles({
    tabRoot: {},
    tabIndicator: {
      opacity: 0.9,
      height: 4,
    },
  }),
);

const TabEx: React.FC<IPageUrl> = ({ page, url, ...props }) => {
  const { t, locale } = useTranslation();
  const href = `/${locale}${url}`;
  return (
    <Link key={page} href={`/[lang]${url}`} as={href} scroll={false}>
      <Tab
        label={t(page)}
        id={page}
        style={{ textTransform: 'none', fontSize: theme.typography.h5.fontSize }}
        component={'a'}
        href={href}
        {...props}
      />
    </Link>
  );
};

export const TabLinks: React.FC<{ sections: Array<IPageUrl> }> = ({ sections }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(1);
  const router = useRouter();

  useEffect(() => {
    setValue(sections.findIndex(item => getActive(`/[lang]${item.url}`, router.pathname)));
  }, []);

  return (
    <Tabs
      value={value}
      style={{ width: '100%' }}
      variant="fullWidth"
      classes={{ root: classes.tabRoot, indicator: classes.tabIndicator }}
    >
      {sections.map((section: IPageUrl, index: number) => (
        <TabEx key={index} page={section.page} url={section.url} />
      ))}
    </Tabs>
  );
};
