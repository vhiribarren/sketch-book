"use client";

import styles from './SideNav.module.css'
import { Menu } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const SKETCHES = [
    { title: "Welcome", url: "/" },
    {
        title: "Basic", children: [
            { title: "Sketch 1", url: "/sketches/basic/sketch-1" },
            { title: "Sketch 2", url: "/sketches/basic/sketch-2" },
        ]
    }
]

function generateMenuItems(sketches: Array<any>, router: AppRouterInstance): Array<any> {
    const menu = []
    for (const item of sketches) {
        let menuItem = null;
        if ("children" in item) {
            let subMenuItems = generateMenuItems(item.children, router);
            menuItem = { key: item.title, label: item.title, children: subMenuItems };
        }
        else {
            menuItem = { key: item.url, label: item.title, onClick: () => router.push(item.url) };
        }
        menu.push(menuItem);
    }
    return menu;
}


export default function SideNav() {
    const pathname = usePathname();
    const router = useRouter();
    const items = generateMenuItems(SKETCHES, router);
    return (
        <>
            <Menu
                mode="inline"
                items={items}
                theme="dark"
                defaultSelectedKeys={[pathname]}
            />
        </>
    );
}