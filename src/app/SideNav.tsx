"use client";

import styles from './SideNav.module.css'
import { LinksGroup } from '../components/NavbarLinksGroup/NavbarLinksGroup';
import { usePathname, useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { IconFolder } from '@tabler/icons-react';

const SKETCHES = [
    { label: "Welcome", link: "/"},
    {
        label: "Basic", links: [
            { label: "Sketch 1", link: "/sketches/basic/sketch-1" },
            { label: "Sketch 2", link: "/sketches/basic/sketch-2" },
            { label: "White Noise", link: "/sketches/basic/white-noise" },
        ]
    }
]


export default function SideNav() {
    const pathname = usePathname();
    const router = useRouter();

    const links = SKETCHES.map((item) => <LinksGroup {...item} key={item.label} />);

    return (
        <>
            {links}
        </>
    );
}