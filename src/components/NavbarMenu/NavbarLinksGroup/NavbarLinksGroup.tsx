import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconChevronDown } from '@tabler/icons-react';
import { UnstyledButton, Text, Box } from '@mantine/core';
import classes from './NavbarLinksGroup.module.css';

export type LinkGroup = {
  group: string;
  pages: PageLink[];
}

type PageLink = {
  title: string;
  slug: string;
}

export type MenuSelectionCallback = () => void;

function hasActiveLink(data: LinkGroup, pathname: string) {
  return data.pages.some((page) => {
    return page.slug === pathname;
  });
}

interface NavbarLinkProps {
  data: PageLink;
  onMenuSelection: MenuSelectionCallback;
  linkRef?: React.ForwardedRef<HTMLAnchorElement>;
}

export function NavbarLink({ data, onMenuSelection, linkRef }: NavbarLinkProps) {
  const pathname = usePathname();
  return (
    <UnstyledButton
      component={Link}
      href={data.slug}
      mod={{ active: data.slug === pathname }}
      className={classes.link}
      onClick={onMenuSelection}
      ref={linkRef}
    >
      {data.title}
    </UnstyledButton>
  );
}

interface NavbarLinksGroupProps {
  data: LinkGroup;
  onMenuSelection(): void;
}

export function NavbarLinksGroup({ data, onMenuSelection }: NavbarLinksGroupProps) {
  const pathname = usePathname();
  const [opened, setOpened] = useState(hasActiveLink(data, pathname));
  const itemRefs = useRef<Record<string, HTMLAnchorElement>>({});

  const scrollToLink = (pathname: string) => {
    const element = itemRefs.current[pathname];

    if (!element) {
      return;
    }

    const height = typeof window !== 'undefined' ? window.innerHeight : 0;
    const { top, bottom } = element.getBoundingClientRect();

    if (top < 60 || bottom > height) {
      element.scrollIntoView({ block: 'center' });
    }
  };

  useEffect(() => {
    if (hasActiveLink(data, pathname)) {
      setOpened(true);
      setTimeout(() => scrollToLink(pathname), 10);
    }
  }, [pathname, data]);

  const pages = data.pages.map((page) => {
    return (
      <NavbarLink
        key={page.slug}
        data={page}
        onMenuSelection={onMenuSelection}
        linkRef={(node) => {
          itemRefs.current[page.slug] = node!;
        }}
      />
    );
  });

  return (
    <Box className={classes.group} mod={{ opened }}>
      <UnstyledButton className={classes.header} onClick={() => setOpened((o) => !o)}>
        <IconChevronDown className={classes.chevron} data-collapsed={!opened || undefined} />
        <Text className={classes.title}>{data.group.replace('-', ' ')}</Text>
      </UnstyledButton>
      {opened && pages}
    </Box>
  );
}