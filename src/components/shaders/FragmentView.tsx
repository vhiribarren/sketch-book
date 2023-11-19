import { Flex } from "@mantine/core";
import FragmentCanvas from "./FragmentCanvas";
import React from "react";

type FragmentView = {
    control?: React.ReactNode,
    fragment: React.ReactNode,
};

export function FragmentView({ fragment, control }: FragmentView) {
    return (
        <Flex
            direction={{ base: 'column', sm: 'row' }}
            gap="20"
            justify="center"
            align="center"
            style={{ height: "100%" }}>
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