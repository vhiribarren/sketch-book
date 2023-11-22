"use client";

import { LinkGroup, MenuSelectionCallback, NavbarLink, NavbarLinksGroup } from "./NavbarLinksGroup/NavbarLinksGroup";

type NavbarMenuProps = {
    onMenuSelection: MenuSelectionCallback,
    menuContent: LinkGroup[],
}

export default function NavbarMenu({onMenuSelection, menuContent}: NavbarMenuProps) {
    const links = menuContent.map((group) => (
      <NavbarLinksGroup data={group} onMenuSelection={onMenuSelection} key={group.group} />
    ));

    return (
        <>
            <NavbarLink data={{title: "Welcome", slug: "/"}} onMenuSelection={onMenuSelection} />
            {links}
        </>
    );
}