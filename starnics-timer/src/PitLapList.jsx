import {
    Box,
    Button,
    Checkbox,
    Flex,
    Input,
    Text,
    useToast,
    Heading,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useState, useRef } from "react";

export const PitLapList = ({
    duration,
    list,
    setList,
    isRunning,
    isStop,
    id,
    setID,
}) => {
    const itemRef = useRef();
    const toast = useToast();

    const onAdd = () => {
        let pit = itemRef.current.value;
        if (pit === "") {
            toast({
                title: "Error",
                description: "Invalid Pit",
                status: "error",
                duration: 2000,
                position: "top-left",
                isClosable: true,
            });
        } else if (list.findIndex((v) => v.pit === `PIT ${pit}`) !== -1) {
            toast({
                title: "Error",
                description: "Duplicate Pit",
                status: "error",
                duration: 1000,
                position: "top-left",
                isClosable: true,
            });
        } else {
            let time = "";
            let seconds = parseInt(duration % 60);
            let minutes = parseInt(duration / 60);
            if (duration < 60) {
                time =
                    seconds < 10
                        ? `00:0${parseInt(seconds)}`
                        : `00:${parseInt(seconds)}`;
            } else {
                time =
                    minutes < 10
                        ? seconds < 10
                            ? `0${minutes}:0${parseInt(seconds)}`
                            : `0${minutes}:${parseInt(seconds)}`
                        : seconds < 10
                        ? `${minutes}:0${parseInt(seconds)}`
                        : `${minutes}:${parseInt(seconds)}`;
            }
            setList([...list, { id: id, pit: `PIT ${pit}`, duration: time }]);
            setID(id + 1);
        }
        itemRef.current.value = "";
    };

    return (
        <Box mt={"4"}>
            <Flex justifyContent="center" gap="10px" alignItems="center">
                <Input
                    variant={"unstyled"}
                    px={"4"}
                    py={"2"}
                    placeholder="add your pit here"
                    borderRadius={"full"}
                    color={"blue.500"}
                    border="3px solid"
                    ref={itemRef}
                />
                <Button
                    onClick={!isRunning ? (!isStop ? void 0 : onAdd) : onAdd}
                    borderRadius={"full"}
                    variant={"unstyled"}
                    bgColor={
                        !isRunning
                            ? !isStop
                                ? "gray.500"
                                : "blue.500"
                            : "blue.500"
                    }
                    cursor={
                        !isRunning
                            ? !isStop
                                ? "not-allowed"
                                : "pointer"
                            : "pointer"
                    }
                    color={"white"}
                >
                    <AddIcon />
                </Button>
            </Flex>

            <Flex
                flexDir="column"
                alignItems="center"
                gap="10px"
                margin="20px 0"
            >
                <TableContainer
                    width={"75vw"}
                    border={"1px"}
                    color={"blue.500"}
                    borderRadius={"xl"}
                >
                    <Table variant="unstyled">
                        <Thead>
                            <Tr>
                                <Th>No</Th>
                                <Th textAlign={"center"}>Pit</Th>
                                <Th textAlign={"right"} isNumeric>
                                    Time
                                </Th>
                            </Tr>
                        </Thead>
                        {list.map((value, index) => {
                            return (
                                <Tbody key={index}>
                                    <Tr>
                                        <Td>{value.id}</Td>
                                        <Td textAlign={"center"}>
                                            {value.pit}
                                        </Td>
                                        <Td textAlign={"right"} isNumeric>
                                            {value.duration}
                                        </Td>
                                    </Tr>
                                </Tbody>
                            );
                        })}
                    </Table>
                </TableContainer>
            </Flex>
        </Box>
    );
};
