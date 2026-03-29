'use client'

import { motion } from "framer-motion"

export default function Header() {
    return(
        <motion.header
            initial={{opacity:0, y:20}}
            animate={{opacity:1, y:0}}
            transition={{duration:0.8}}
            className="flex justify-center items-center p-4 mb-4 border-b border-dashed border-white w-full gap-4"
        >
        </motion.header>
    )
}
