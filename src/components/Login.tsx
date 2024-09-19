import React, {useEffect} from "react";
import {call_server_endpoint} from "../utils/server";

export const Login = () => {
    useEffect(() => {
        const callServer = async () => {
            window.location.href = `${process.env.REACT_APP_SERVER_URL}/login`;
            const result = await call_server_endpoint(`/login`)
            console.log(result)
            // TODO - store bearer token and redirect to home
        }

        callServer()
    }, [])

    return (
        <></>
    )
}