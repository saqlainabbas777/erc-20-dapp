import { FC } from "react";
import { motion, Variants, HTMLMotionProps } from "framer-motion";

interface Props extends HTMLMotionProps<"div"> {
    text: string;
    delay?: number;
    replay: boolean;
    duration?: number;
}
const headerText = `text-center font-josefinSans text-lightGold xl:text-8xl lg:text-8xl md:text-7xl sm:text-6xl xs:text-6xl`;
const WavyText: FC<Props> = ({
                                 text,
                                 delay = 0,
                                 duration = 0.05,
                                 replay,
                                 ...props
                             }: Props) => {
    const letters = Array.from(text);

    const container: Variants = {
        hidden: {
            opacity: 0
        },
        visible: (i: number = 1) => ({
            opacity: 1,
            transition: { staggerChildren: duration, delayChildren: i * delay }
        })
    };

    const child: Variants = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 200
            }
        },
        hidden: {
            opacity: 0,
            y: 20,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 200
            }
        }
    };

    return (
        <motion.h1
            style={{ display: "flex", overflow: "hidden" }}
            variants={container}
            initial="hidden"
            animate={replay ? "visible" : "hidden"}
            {...props}
        >
            {letters.map((letter, index) => (
                <motion.span className={headerText} key={index} variants={child}>
                    {letter === " " ? "\u00A0" : letter}
                </motion.span>
            ))}
        </motion.h1>
    );
};

export default WavyText;
