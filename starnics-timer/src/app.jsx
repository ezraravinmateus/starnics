import { useState } from "preact/hooks";
import { Timer } from "./Timer";
import { Flex } from "@chakra-ui/react";

export function App() {
    return (
        <Flex justifyContent={"center"} paddingBottom={"5vh"}>
            <Timer></Timer>
        </Flex>
    );
}
