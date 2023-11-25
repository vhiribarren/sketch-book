import { ActionIcon, Affix, Drawer, Flex, Stack, Text, Title } from "@mantine/core";
import FragmentCanvas from "./FragmentCanvas";
import React, { ForwardedRef, useRef } from "react";
import Fragment, { FragmentHandle } from "./Fragment";
import { RenderCallback } from "@react-three/fiber";
import { useDisclosure, useViewportSize } from "@mantine/hooks";
import { IconAdjustments } from "@tabler/icons-react";
import styles from "./FragmentView.module.css";


type FragmentViewProps = {
    fragmentShader: string,
    uniforms?: any,
    fragmentRef?: ForwardedRef<FragmentHandle>,
    children?: React.ReactNode,
    useFrameFn?: RenderCallback,
    title?: string,
    description?: string,
    autoRender?: boolean,
};

export function FragmentView({ fragmentRef, fragmentShader, uniforms, children, useFrameFn, title, description, autoRender = false }: FragmentViewProps) {

    const { width } = useViewportSize();
    const drawerTargetRef = useRef<HTMLDivElement>(null);
    const isMobile = width < 700;
    const isDesktop = !isMobile;
    const [isDrawerOpened, { open: openDrawer, close: closeDrawer }] = useDisclosure(isDesktop);

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
                        useFrameFn={useFrameFn}
                        ref={fragmentRef}
                    />
                </FragmentCanvas>
                {children &&
                    <Drawer
                    size={300}
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
                        {children}
                    </Drawer>
                }
            </Flex>

            {!isDrawerOpened && children &&
                <Affix position={{ bottom: 20, right: 20 }}>
                    <ActionIcon onClick={openDrawer} variant="filled" size="xl" radius="xl" aria-label="Settings">
                        <IconAdjustments style={{ width: "70%", height: "70%" }} stroke={1.5} />
                    </ActionIcon>
                </Affix>
            }

        </Stack>

    );
}