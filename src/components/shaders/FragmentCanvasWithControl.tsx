import { Flex } from "@mantine/core";
import FragmentCanvas from "./FragmentCanvas";
import Fragment from "./Fragment";
import React from "react";

type FragmentCanvasWithControlProps = {
    control?: React.ReactNode,
    fragment: React.ReactNode,
};

export function FragmentCanvasWithControl({ fragment, control }: FragmentCanvasWithControlProps) {
    return (
        <Flex
            direction={{ base: 'column', sm: 'row' }}
            mih={20}
            gap="xl"
            justify="center"
            align="center"
            style={{ background: "white", height: "100%" }}>
            <FragmentCanvas>
                {fragment}
            </FragmentCanvas>
            {control &&
                <div>
                    {control}
                </div>
            }
        </Flex>
    );
}