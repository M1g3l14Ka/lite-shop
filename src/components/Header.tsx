'use client'

import { motion } from "framer-motion"
import { useState } from "react"


export default function Header() {

    const [filterItem, setFilterItem] = useState('')

    return(
        <motion.header
            initial={{opacity:0, y:20}}
            animate={{opacity:1, y:0}}
            transition={{duration:0.8}}
            className="flex justify-center items-center p-2 m-2 border-b border-dashed border-white w-7xl gap-4"
        >
            <div className="flex flex-col items-center text-2xl font-mono rounded-xl">
                <div className="mx-2 rounded-full p-2">
                    <input 
                        value={filterItem}
                        type="text" 
                        placeholder="What are u looking ?"
                        onChange={(e) => setFilterItem(e.target.value)}
                        className="rounded-full w-2xl bg-[#050505] py-2 border border-white text-center text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-blue-500"
                        onKeyDown={
                            (e) => e.key === "Enter" 
                        }
                    />
                </div>

            </div>

        </motion.header>
    )
}
