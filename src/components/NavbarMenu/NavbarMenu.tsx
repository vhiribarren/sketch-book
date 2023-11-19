"use client";

import { MenuSelectionCallback, NavbarLink, NavbarLinksGroup } from './NavbarLinksGroup/NavbarLinksGroup';

type NavbarMenuProps = {
    onMenuSelection: MenuSelectionCallback
}

const SKETCHES = [
    {
        group: "Basic", pages: [
            { title: "Sketch 1", slug: "/sketches/basic/sketch-1" },
            { title: "Sketch 2", slug: "/sketches/basic/sketch-2" },
            { title: "White Noise", slug: "/sketches/basic/white-noise" },
            { title: "Value Noise", slug: "/sketches/basic/value-noise" },

        ]
    }
]

export default function NavbarMenu({onMenuSelection}: NavbarMenuProps) {
    const links = SKETCHES.map((group) => (
      <NavbarLinksGroup data={group} onMenuSelection={onMenuSelection} key={group.group} />
    ));

    return (
        <>
            <NavbarLink data={{title: "Welcome", slug: "/"}} onMenuSelection={onMenuSelection} />
            {links}
        </>
    );
}