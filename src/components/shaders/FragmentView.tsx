"use client";

import { ActionIcon, Affix, Drawer, Flex, MantineThemeProvider, NumberInput, Select, Slider, Stack, Switch, Text, Title, createTheme } from "@mantine/core";
import FragmentCanvas from "./FragmentCanvas";
import React, { useEffect, useRef, useState } from "react";
import Fragment, { FragmentHandle } from "./Fragment";
import { useDisclosure, useViewportSize } from "@mantine/hooks";
import { IconAdjustments } from "@tabler/icons-react";
import styles from "./FragmentView.module.css";
import tunnel from "tunnel-rat";
import { UniformsContext } from "./uniforms";
import { useSearchParams } from "next/navigation";


type ChildrenProps = {
    children: React.ReactNode
};

export type FragmentLogic = {
    controlUiTunnel: React.FC<ChildrenProps>,
};

type FragmentViewProps = {
    fragmentShader: string,
    title?: string,
    description?: string,
    autoRender?: boolean,
    control?: React.FC<FragmentLogic>,
    withUi?: boolean,
};

type Pixels = number;

const DESKTOP_THRESHOLD: Pixels = 680;


const THEME_DRAWER_CONTROL = createTheme({
    components: {
        NumberInput: NumberInput.extend({
            defaultProps: {
                size: "xs",
            },
        }),
        Select: Select.extend({
            defaultProps: {
                size: "xs",
            },
        }),
        Switch: Switch.extend({
            defaultProps: {
                size: "xs",
                labelPosition: "left",
            },
        }),
        Slider: Slider.extend({
            defaultProps: {
                size: "xs",
            },
        }),
    },
});
  


export function FragmentView({
    control, fragmentShader, title, description,
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

    const searchParams = useSearchParams();
    const hasWithControlQueryParam = searchParams.has("withControl");

    const displayControl = hasWithControlQueryParam || withUi;

    const [loadFragment, setLoadFragment] = useState(control ? false : true);
    const [uniforms, setUniforms] = useState({});
    const addUniform = (uniformName: string, defaultValue: any) => {
        if (uniformName in uniforms) {
            return;
        }
        setUniforms((state) => ({... state, [uniformName]: {value: defaultValue}}));
    };
    useEffect(() => {
        if (Object.keys(uniforms).length !== 0) {
            setLoadFragment(true);
        }
    }, [uniforms]);

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
                    {loadFragment &&
                        <Fragment
                        uniforms={uniforms}
                        fragmentShader={fragmentShader}
                        ref={fragmentRef} />
                    }
                    {Control &&
                    <UniformsContext.Provider value={{fragmentRef, addUniform}}>
                         <Control controlUiTunnel={ui.In} />
                    </UniformsContext.Provider>
                    }
                </FragmentCanvas>

                { displayControl &&
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
                            <MantineThemeProvider theme={THEME_DRAWER_CONTROL}>
                                <ui.Out />
                            </MantineThemeProvider>
                    </Drawer>
                }
                
            </Flex>

            {!isDrawerOpened && displayControl &&
                <Affix position={{ bottom: 20, right: 20 }}>
                    <ActionIcon onClick={openDrawer} variant="filled" size="xl" radius="xl" aria-label="Settings">
                        <IconAdjustments style={{ width: "70%", height: "70%" }} stroke={1.5} />
                    </ActionIcon>
                </Affix>
            }

        </Stack>

    );
}