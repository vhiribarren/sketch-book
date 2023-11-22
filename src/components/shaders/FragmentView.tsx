import { ActionIcon, Affix, Drawer, Flex, Stack, Text, Title } from "@mantine/core";
import FragmentCanvas from "./FragmentCanvas";
import React, { RefObject, useRef } from "react";
import Fragment from "./Fragment";
import { ShaderMaterial } from "three";
import { RenderCallback } from "@react-three/fiber";
import { useDisclosure, useViewportSize } from "@mantine/hooks";
import { IconAdjustments } from "@tabler/icons-react";
import styles from "./FragmentView.module.css"


type FragmentView = {
    fragmentShader: string,
    uniforms?: any,
    materialRef?: RefObject<ShaderMaterial>
    children?: React.ReactNode,
    useFrameFn?: RenderCallback,
    title?: string,
    description?: string,
};

export function FragmentView({ fragmentRef, fragmentShader, uniforms, children, materialRef, useFrameFn, title, description }: FragmentView) {

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
                direction={isMobile ? 'column' : 'row'}
                justify="center"
                align="center"
                style={{ height: "100%" }}>

                <FragmentCanvas>
                    <Fragment
                        ref={fragmentRef}
                        uniforms={uniforms}
                        fragmentShader={fragmentShader}
                        useFrameFn={useFrameFn}
                        materialRef={materialRef} />
                </FragmentCanvas>
                {children &&
                    <Drawer
                        classNames={{ inner: styles.inner, content: styles.content }}
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
                        <Flex
                            direction={isDesktop ? 'column' : 'row'}
                            justify="center"
                            align="flex-end"
                            wrap="wrap"
                            gap={10}>
                            {children}
                        </Flex>
                    </Drawer>
                }
            </Flex>

            { !isDrawerOpened &&
                <Affix position={{ bottom: 20, right: 20 }}>
                    <ActionIcon onClick={openDrawer} variant="filled" size="xl" radius="xl" aria-label="Settings">
                        <IconAdjustments style={{ width: '70%', height: '70%' }} stroke={1.5} />
                    </ActionIcon>
                </Affix>
            }

        </Stack>

    );
}