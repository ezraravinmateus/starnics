import {
    ChakraProvider,
    HStack,
    Button,
    Heading,
    Stack,
    Flex,
    useToast,
    Image,
    Divider,
} from "@chakra-ui/react";
import React, { useState, useEffect, Fragment } from "react";
import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";

// Guide
// https://codesandbox.io/p/sandbox/how-to-start-and-stop-timer-display-in-reactjs-jfo6t
// https://codesandbox.io/p/sandbox/usetimer-react-timer-hook-ne3et?file=%2Fsrc%2FApp.js
// https://codesandbox.io/p/sandbox/countdown-timer-action-start-stop-resume-reset-9jweo

import soundAlarm from "./assets/sounds/alarm.mp3";
import { PitLapList } from "./PitLapList";
import logoStarnics from "./assets/Logo Starnics.png";

export const Timer = () => {
    const toast = useToast();
    const [START_MINUTES, setStartMinutes] = useState(0);
    const [START_SECOND, setStartSeconds] = useState(0);

    const [currentMinutes, setMinutes] = useState(START_MINUTES);
    const [currentSeconds, setSeconds] = useState(START_SECOND);
    const [currentMillis, setMillis] = useState("000");

    const [isStop, setIsStop] = useState(false);
    const [duration, setDuration] = useState(0);
    const [START_DURATION, setStartDuration] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [isFinish, setIsFinish] = useState(false);
    const [isZero, setIsZero] = useState(true);

    const [list, setList] = useState([]);
    const [id, setID] = useState(1);

    if (!isRunning && !isStop && !isFinish) {
        if (START_MINUTES || START_SECOND != 0) {
            setIsZero(false);
        } else {
            setIsZero(true);
        }
    }

    const setBeginningTime = (setTime, time) => {
        setTime(time < 10 ? "0" + time : time);
    };

    const startHandler = () => {
        // Set Time
        setBeginningTime(setMinutes, START_MINUTES);
        setBeginningTime(setSeconds, START_SECOND);

        // Set Start Duration
        setStartDuration(
            (parseInt(START_SECOND, 10) + 60 * parseInt(START_MINUTES, 10)) *
                1000 +
                parseInt(currentMillis)
        );
        // Set Duration
        setDuration(
            (parseInt(START_SECOND, 10) + 60 * parseInt(START_MINUTES, 10)) *
                1000 +
                parseInt(currentMillis)
        );
        setIsRunning(true);
    };
    const stopHandler = () => {
        // stop timer
        setIsStop(true);
        setIsRunning(false);
    };
    const resetHandler = () => {
        setMinutes(START_MINUTES);
        setSeconds(START_SECOND);
        setMillis("000");
        setIsRunning(false);
        setIsStop(false);
        setIsFinish(false);
        setDuration(START_DURATION);
        deleteList();
        setID(1);
    };

    const deleteList = () => {
        setList([]);
    };

    const resumeHandler = () => {
        let newDuration =
            (parseInt(currentMinutes, 10) * 60 + parseInt(currentSeconds, 10)) *
                1000 +
            parseInt(currentMillis);
        setDuration(newDuration);
        setIsRunning(true);
        setIsStop(false);
    };

    const notify = () => {
        toast({
            id: "1",
            status: "warning",
            title: "TIME'S UP!",
            duration: 5000,
            variant: "unstyled",
            description: "Please reset and/or setup a new time!",
            containerStyle: {
                borderRadius: "full",
                backgroundColor: "red.500",
                textColor: "white",
                boxSize: "9xl",
                boxShadow: "none",
            },
        });
        new Audio(soundAlarm).play();
    };

    const emptyTimer = () => {
        setMillis("000");
        setDuration(0);
        setIsStop(true);
        setIsRunning(false);
        setIsFinish(true);
    };

    if (isFinish) {
        notify();
    }

    useEffect(() => {
        if (isRunning === true) {
            let timer = duration;
            // var minutes, seconds;
            const interval = setInterval(function () {
                if (--timer <= 0) {
                    emptyTimer();
                    // resetHandler();
                } else {
                    let total_seconds = parseInt(Math.floor(timer / 1000));
                    let total_minutes = parseInt(
                        Math.floor(total_seconds / 60)
                    );
                    let milliSeconds = parseInt(timer % 1000);
                    let seconds = parseInt(total_seconds % 60);
                    let minutes = parseInt(total_minutes % 60);

                    // minutes = parseInt(timer / 60, 10);
                    // seconds = parseInt(timer % 60, 10);

                    minutes = minutes < 10 ? "0" + minutes : minutes;
                    seconds = seconds < 10 ? "0" + seconds : seconds;
                    milliSeconds =
                        milliSeconds < 100
                            ? milliSeconds < 10
                                ? "00" + milliSeconds
                                : "0" + milliSeconds
                            : milliSeconds;

                    setMinutes(minutes);
                    setSeconds(seconds);
                    setMillis(milliSeconds);
                    setDuration(timer);
                    timer -= 2.9;
                }
            });
            return () => clearInterval(interval);
        }
    }, [isRunning]);

    const fontButton = "5vh";
    const paddingButtonX = "5vw";
    const paddingButtonY = "5vh";
    const spacingY = "3vh";

    const button = {
        fixedPosition: "15vw",
        iconSize: "5vw",
        height: "fit-content",
        width: "fit-content",
        basicColor: "blue.500",
        basicHoverColor: "blue.400",
        ghostColor: "gray.300",
        ghostHoverColor: "gray.100",
        redColor: "red.500",
        redHoverColor: "red.400",
        greenColor: "green.500",
        greenHoverColor: "green.400",
        borderRadius: "full",
        variant: "unstyled",
        textColor: "white",
    };

    const getTime = (time) => {
        return time < 10 ? `0${time}` : time;
    };

    const increaseTime = (setTime, time, incrementInterval) => {
        setIsZero(false);
        if (time + incrementInterval > 59) {
            setTime(0);
        } else {
            setTime(time + incrementInterval);
        }
    };

    const decreaseTime = (setTime, time, decrementInterval) => {
        if (time - decrementInterval < 0) {
            setTime(59);
        } else {
            setTime(time - decrementInterval);
        }
    };

    return (
        <Stack align={"center"} justify={"center"}>
            <Heading
                mt={"12"}
                fontSize={"3xl"}
                position={"relative"}
                alignSelf={"start"}
                left={"24vw"}
                color={"red.500"}
                textDecoration={"underline"}
                textDecorationColor={"green.500"}
                fontStyle={"italic"}
            >
                STARNICS
            </Heading>
            <HStack>
                <Stack
                    spacing={{ base: "4", sm: "8", md: spacingY }}
                    position={"fixed"}
                    left={button.fixedPosition}
                    visibility={!isStop && !isRunning ? "visible" : "hidden"}
                >
                    <Button
                        variant={button.variant}
                        backgroundColor={button.basicColor}
                        borderRadius={button.borderRadius}
                        textColor={button.textColor}
                        onClick={() =>
                            increaseTime(setStartMinutes, START_MINUTES, 5)
                        }
                    >
                        +5
                    </Button>
                    <Button
                        height={{ base: "5vh", sm: "10vw", md: button.height }}
                        width={{ base: "5vh", sm: "10vw", md: button.width }}
                        variant={button.variant}
                        backgroundColor={button.basicColor}
                        borderRadius={button.borderRadius}
                        textColor={button.textColor}
                        onClick={() =>
                            increaseTime(setStartMinutes, START_MINUTES, 1)
                        }
                    >
                        <ChevronUpIcon
                            fontSize={{
                                base: "10vw",
                                sm: "5vw",
                                md: button.iconSize,
                            }}
                        />
                    </Button>
                    <Button
                        height={{ base: "5vh", sm: "10vw", md: button.height }}
                        width={{ base: "5vh", sm: "10vw", md: button.width }}
                        variant={button.variant}
                        backgroundColor={button.basicColor}
                        borderRadius={button.borderRadius}
                        textColor={button.textColor}
                        onClick={() =>
                            decreaseTime(setStartMinutes, START_MINUTES, 1)
                        }
                    >
                        <ChevronDownIcon
                            fontSize={{
                                base: "10vw",
                                sm: "5vw",
                                md: button.iconSize,
                            }}
                        />
                    </Button>
                    <Button
                        variant={button.variant}
                        backgroundColor={button.basicColor}
                        borderRadius={button.borderRadius}
                        textColor={button.textColor}
                        onClick={() =>
                            decreaseTime(setStartMinutes, START_MINUTES, 5)
                        }
                    >
                        -5
                    </Button>
                </Stack>

                <Stack justify={"end"} align={"end"}>
                    <Heading fontSize={{ base: "15vw", md: "20vw" }}>
                        {!isRunning && !isStop
                            ? getTime(START_MINUTES)
                            : currentMinutes}
                        :
                        {!isRunning && !isStop
                            ? getTime(START_SECOND)
                            : currentSeconds}
                    </Heading>
                    <Heading
                        fontSize={{ base: "5vw", sm: "5vw", md: "5vh" }}
                        marginTop={{ base: "-3vh", sm: "-5vw", md: "-5vw" }}
                    >
                        {currentMillis}
                    </Heading>
                </Stack>

                <Stack
                    spacing={{ base: "4", sm: "8", md: spacingY }}
                    position={"fixed"}
                    right={button.fixedPosition}
                    visibility={!isStop && !isRunning ? "visible" : "hidden"}
                >
                    <Button
                        variant={button.variant}
                        backgroundColor={button.basicColor}
                        borderRadius={button.borderRadius}
                        textColor={button.textColor}
                        onClick={() =>
                            increaseTime(setStartSeconds, START_SECOND, 5)
                        }
                    >
                        +5
                    </Button>
                    <Button
                        height={{ base: "5vh", sm: "10vw", md: button.height }}
                        width={{ base: "5vh", sm: "10vw", md: button.width }}
                        variant={button.variant}
                        backgroundColor={button.basicColor}
                        borderRadius={button.borderRadius}
                        textColor={button.textColor}
                        onClick={() =>
                            increaseTime(setStartSeconds, START_SECOND, 1)
                        }
                    >
                        <ChevronUpIcon
                            fontSize={{
                                base: "10vw",
                                sm: "5vw",
                                md: button.iconSize,
                            }}
                        />
                    </Button>
                    <Button
                        height={{ base: "5vh", sm: "10vw", md: button.height }}
                        width={{ base: "5vh", sm: "10vw", md: button.width }}
                        variant={button.variant}
                        backgroundColor={button.basicColor}
                        borderRadius={button.borderRadius}
                        textColor={button.textColor}
                        onClick={() =>
                            decreaseTime(setStartSeconds, START_SECOND, 1)
                        }
                    >
                        <ChevronDownIcon
                            fontSize={{
                                base: "10vw",
                                sm: "5vw",
                                md: button.iconSize,
                            }}
                        />
                    </Button>
                    <Button
                        variant={button.variant}
                        backgroundColor={button.basicColor}
                        borderRadius={button.borderRadius}
                        textColor={button.textColor}
                        onClick={() =>
                            decreaseTime(setStartSeconds, START_SECOND, 5)
                        }
                    >
                        -5
                    </Button>
                </Stack>
            </HStack>

            <HStack spacing={"8"}>
                {!isRunning && !isStop && (
                    <Button
                        textColor={button.textColor}
                        backgroundColor={
                            !isZero ? button.basicColor : button.ghostHoverColor
                        }
                        _hover={
                            !isZero
                                ? {
                                      backgroundColor: button.basicHoverColor,
                                  }
                                : { backgroundColor: button.ghostHoverColor }
                        }
                        borderRadius={button.borderRadius}
                        paddingX={{ base: "8", sm: "16", md: paddingButtonX }}
                        paddingY={{ base: "4", sm: "8", md: paddingButtonY }}
                        fontSize={{ base: "16", sm: "24", md: fontButton }}
                        onClick={!isZero ? startHandler : void 0}
                        cursor={!isZero ? "pointer" : "not-allowed"}
                    >
                        START
                    </Button>
                )}
                {isRunning && (
                    <Button
                        textColor={button.textColor}
                        backgroundColor={button.redColor}
                        _hover={{
                            backgroundColor: button.redHoverColor,
                        }}
                        borderRadius={button.borderRadius}
                        paddingX={{ base: "8", sm: "16", md: paddingButtonX }}
                        paddingY={{ base: "4", sm: "8", md: paddingButtonY }}
                        fontSize={{ base: "16", sm: "24", md: fontButton }}
                        onClick={stopHandler}
                    >
                        PAUSE
                    </Button>
                )}

                {isStop && (
                    <Button
                        textColor={button.textColor}
                        backgroundColor={
                            !isFinish ? button.greenColor : button.ghostColor
                        }
                        _hover={
                            !isFinish
                                ? {
                                      backgroundColor: button.greenHoverColor,
                                  }
                                : {
                                      backgroundColor: button.ghostHoverColor,
                                  }
                        }
                        borderRadius={button.borderRadius}
                        paddingX={{ base: "8", sm: "16", md: paddingButtonX }}
                        paddingY={{ base: "4", sm: "8", md: paddingButtonY }}
                        fontSize={{ base: "16", sm: "24", md: fontButton }}
                        onClick={!isFinish ? resumeHandler : () => void 0}
                        cursor={!isFinish ? "pointer" : "not-allowed"}
                    >
                        {!isFinish ? "RESUME" : "START"}
                    </Button>
                )}

                <Button
                    borderRadius={button.borderRadius}
                    paddingX={{ base: "8", sm: "16", md: paddingButtonX }}
                    paddingY={{ base: "4", sm: "8", md: paddingButtonY }}
                    fontSize={{ base: "16", sm: "24", md: fontButton }}
                    onClick={!isStop ? void 0 : resetHandler}
                    disabled={!isStop}
                    textColor={button.textColor}
                    cursor={!isStop ? "not-allowed" : "pointer"}
                    backgroundColor={
                        !isStop ? button.ghostColor : button.basicColor
                    }
                    _hover={
                        !isStop
                            ? {
                                  backgroundColor: button.ghostHoverColor,
                              }
                            : {
                                  backgroundColor: button.basicHoverColor,
                              }
                    }
                >
                    RESET
                </Button>
            </HStack>
            {/* <p>{duration}</p> */}

            <HStack w={"100vw"} justify={"space-around"}>
                <Stack>
                    {/* <Image
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Logo_AHM.svg/2560px-Logo_AHM.svg.png"
                        w={"10vw"}
                    ></Image> */}
                </Stack>
                <PitLapList
                    id={id}
                    setID={setID}
                    isRunning={isRunning}
                    isStop={isStop}
                    list={list}
                    setList={setList}
                    duration={(START_DURATION - duration) / 1000}
                ></PitLapList>
                <Stack>
                    {/* <Image
                        src="https://upload.wikimedia.org/wikipedia/commons/7/7b/Honda_Logo.svg"
                        w={"10vw"}
                    ></Image> */}
                </Stack>
            </HStack>
        </Stack>
    );
};
