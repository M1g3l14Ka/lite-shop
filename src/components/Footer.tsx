import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export default function Footer() {
    const getCurrentYear = new Date().getFullYear();

    return (
        <footer className="flex flex-col justify-center items-center max-w-[100vw] text-2xl w-full px-4 sm:px-6 py-12 sm:py-16 relative">
            <h1 className="text-3xl sm:text-4xl md:text-6xl mb-8 sm:mb-12 text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-blue-500 font-bold font-mono text-center px-4">
                Frequently Asked Questions
            </h1>
            
            <Accordion
                type="multiple"
                className="border-none bg-transparent text-white w-full max-w-2xl"
                defaultValue={['questions']}
            >
                <AccordionItem value="about site" className="border-none">
                    <AccordionTrigger className="text-lg sm:text-2xl md:text-3xl font-mono font-bold hover:no-underline cursor-pointer text-left">
                        What is it?
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col text-base sm:text-xl text-gray-500 h-auto">
                        <h2>This is a small website called Lite Shop. Its essence is clear from its name - it is a small online shop with simulated purchases of goods. I created it as a pet project in order to improve my skills in both the frontend and in interacting with the AI API.</h2>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="author" className="border-none">
                    <AccordionTrigger className="text-lg sm:text-2xl md:text-3xl font-mono font-bold hover:no-underline cursor-pointer text-left">
                        Who made this site?
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col text-base sm:text-xl text-gray-500 h-auto">
                        <div className="pb-2">
                            <h2>Author: <span className="text-white">Michael Kasion</span></h2>
                        </div>

                        <div>
                            <h2>
                                Links:
                                <ul className="flex flex-col gap-2 mt-2">
                                    <li><a href="https://github.com/M1g3l14Ka" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors w-fit">GitHub</a></li>
                                    <li><a href="https://www.michaelkasion.ru/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors w-fit">Own Site</a></li>
                                    <li><a href="https://t.me/M1g3L14Ka" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors w-fit">Telegram</a></li>
                                </ul>
                            </h2>
                        </div>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="site tech" className="border-none">
                    <AccordionTrigger className="text-lg sm:text-2xl md:text-3xl font-mono font-bold hover:no-underline cursor-pointer text-left">
                        What is the website written on
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col text-base sm:text-xl h-auto text-gray-500">
                        <span>Core: Next.js 16, React 19, TypeScript</span>
                        <span>Styles & Animations: Tailwind CSS v4, shadcn/ui, Framer Motion</span>
                        <span>State Management: Zustand + persist middleware </span>
                        <span>API: DummyJSON Products API</span>
                        <span>Utilities: use-debounce</span>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            <h2 className="text-xs sm:text-sm md:text-lg text-gray-500 font-bold font-mono flex justify-center items-center text-center px-4 mt-12">
                © {getCurrentYear} Kasion M.A. All materials on this website are the property of the Kasion M.A. All rights reserved.
            </h2>
        </footer>
    )
}