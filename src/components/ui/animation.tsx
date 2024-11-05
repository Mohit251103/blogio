"use client";
import animation from "../../../public/animation.json"
import Lottie from "lottie-react";
const Animation = () => {
    return (
        <Lottie animationData={animation} loop={true} autoPlay={true}/>
    )
}

export default Animation