import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


export default function Footer() {
    
    const getCurrentYear = new Date().getFullYear();

    return(
        <footer className="flex flex-col justify-center items-center max-w-7xl text-2xl h-screen mt-auto relative w-full">
            <h1 className="text-6xl mb-12 text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-blue-500 font-bold font-mono">
                Frequently Asked Questions 
            </h1>
            <Accordion
                type="multiple"
                className="border-none bg-transparent text-white w-4xl h-auto"
                defaultValue={['questions']}
            >
                
                <AccordionItem value="about site" className="border-none">
                    <AccordionTrigger className="text-3xl font-mono font-bold hover:no-underline cursor-pointer">What is it? </AccordionTrigger>
                    <AccordionContent className="flex flex-col text-xl text-gray-500 h-auto">
                        <h2>This is a small website called Lite Shop. Its essence is clear from its name - it is a small online shop with simulated purchases of goods. I created it as a pet project in order to improve my skills in both the frontend and in interacting with the AI API.</h2>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="author" className="border-none">
                    <AccordionTrigger className="text-3xl font-mono font-bold hover:no-underline cursor-pointer">Who made this site?</AccordionTrigger>
                    <AccordionContent className="flex flex-col text-xl text-gray-500 h-auto">
                        
                        <div className="pb-2">
                            <h2>Author: <span className="text-white">Michael Kasion</span></h2>
                        </div>

                        <div>
                            <h2>
                                Links: 
                                <ul>
                                    <li><a href="https://github.com/M1g3l14Ka" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors w-fit">GitHub</a></li>
                                    <li><a href="https://michael-resume.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors w-fit">Own Site</a></li>
                                    <li><a href="https://t.me/M1g3L14Ka" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors w-fit">Telegram</a></li>
                                </ul>
                            </h2>
                        </div>

                    </AccordionContent>
                </AccordionItem>
 
                <AccordionItem value="site tech" className="border-none">
                    <AccordionTrigger className="text-3xl font-mono font-bold hover:no-underline cursor-pointer">What is the website written on</AccordionTrigger>
                    <AccordionContent className="flex flex-col text-xl h-auto text-gray-500">
                        <span>Core: TypeScript</span>
                        <span>Framework: Next.js 16, React 19</span>
                        <span>Styles & Animations: TailWind CSS v4, shadcn/ui, Framer-Motion</span>
                        <span>API: Gemini API</span>
                    </AccordionContent>
                </AccordionItem>

            </Accordion>

            <h2 className="text-lg text-gray-500 font-bold font-mono flex justify-center items-center absolute inset-x-0 bottom-0 pb-4">
                © {getCurrentYear} Kasion M.A. All materials on this website are the property of the Kasion M.A. All rights reserved.
            </h2>
        </footer>
    )
}
