"use client";

import { ActionIcon, Affix, Drawer, Flex, Stack, Text, Title } from "@mantine/core";
import FragmentCanvas from "./FragmentCanvas";
import React, { useRef } from "react";
import Fragment, { FragmentHandle } from "./Fragment";
import { useDisclosure, useViewportSize } from "@mantine/hooks";
import { IconAdjustments } from "@tabler/icons-react";
import styles from "./FragmentView.module.css";
import tunnel from "tunnel-rat";
import { UniformsContext } from "./uniforms";


type ChildrenProps = {
    children: React.ReactNode
};

export type FragmentLogic = {
    controlUiTunnel: React.FC<ChildrenProps>,
};

type FragmentViewProps = {
    fragmentShader: string,
    uniforms?: any,
    title?: string,
    description?: string,
    autoRender?: boolean,
    control?: React.FC<FragmentLogic>,
    withUi?: boolean,
};

type Pixels = number;

const DESKTOP_THRESHOLD: Pixels = 680;


export function FragmentView({
    control, fragmentShader, uniforms, title, description,
    withUi = false, autoRender = false
} : FragmentViewProps) {

    const fragmentRef = useRef<FragmentHandle>(null!);
    const { width } = useViewportSize();
    const drawerTargetRef = useRef<HTMLDivElement>(null);
    const isMobile = (width as Pixels) < DESKTOP_THRESHOLD;
    const isDesktop = !isMobile;
    const [isDrawerOpened, { open: openDrawer, close: closeDrawer }] = useDisclosure(isDesktop);
    const Control = control;
    const ui = tunnel();

    return (

        <Stack style={{ height: "100%" }}>

            {title && <Title order={1}>{title}</Title>}
            {description && <Text>{description}</Text>}

            <Flex ref={drawerTargetRef}
                direction={isMobile ? "column" : "row"}
                justify="center"
                align="center"
                style={{ height: "100%" }}>

                <FragmentCanvas autoRender={autoRender}>
                    <Fragment
                        uniforms={uniforms}
                        fragmentShader={fragmentShader}
                        ref={fragmentRef}
                    />
                    {Control &&
                    <UniformsContext.Provider value={fragmentRef}>
                         <Control controlUiTunnel={ui.In} />
                    </UniformsContext.Provider>
                    }
                </FragmentCanvas>

                {withUi &&
                    <Drawer
                        classNames={{ root: styles.drawerRoot, inner: styles.drawerInner, content: styles.drawerContent }}
                        title="Parameters"
                        opened={isDrawerOpened}
                        onClose={closeDrawer}
                        withCloseButton={true}
                        closeOnClickOutside={isMobile}
                        withOverlay={isMobile}
                        overlayProps={{ backgroundOpacity: 0.2 }}
                        portalProps={
                            isMobile
                                ? undefined
                                : { target: drawerTargetRef.current as HTMLElement }
                        }
                        position={isMobile ? "bottom" : "right"}>
                             <ui.Out />
                    </Drawer>
                }
                
            </Flex>

            {!isDrawerOpened && withUi &&
                <Affix position={{ bottom: 20, right: 20 }}>
                    <ActionIcon onClick={openDrawer} variant="filled" size="xl" radius="xl" aria-label="Settings">
                        <IconAdjustments style={{ width: "70%", height: "70%" }} stroke={1.5} />
                    </ActionIcon>
                </Affix>
            }

        </Stack>

    );
}