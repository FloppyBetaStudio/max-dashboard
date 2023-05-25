// 1. import `NextUIProvider` component
import {Button, createTheme, Navbar, NextUIProvider, Text, Spacer} from '@nextui-org/react';
import {useEffect, useState} from "react";
import Footer from "../components/footer";
import Link from "next/link";
import NoSsr from "../components/NoSsr";

function MyApp({Component, pageProps}) {

    const [themeType, setThemeType] = useState('light');


    useEffect(() => {
        if(matchMedia('(prefers-color-scheme: dark)').matches) {
            setThemeType("dark")
        }
    }, [])

    let theme = createTheme({type: themeType})
    return (
        // 2. Use at the root of your app

        <NextUIProvider theme={theme}>
            <NoSsr>
            <Navbar isBordered variant="floating" id="navBar">
                <Navbar.Brand>

                    <Text h1>
                        MaxCraftMC
                    </Text>
                </Navbar.Brand>

                <Navbar.Content>

                </Navbar.Content>
            </Navbar>
                <Spacer></Spacer>
            <Component {...pageProps} />
                <Spacer></Spacer>
            <Footer></Footer></NoSsr>
        </NextUIProvider>
    );
}

export default MyApp;
