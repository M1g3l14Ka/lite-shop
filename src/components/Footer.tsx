

export default function Footer() {
    
    const getCurrentYear = new Date().getFullYear();

    return(
        <footer>
            <h1 className="text-xl text-gray-500 font-bold font-mono flex justify-center items-center m-4">
                © {getCurrentYear} Kasion M.A. All materials on this website are the property of the Kasion M.A. All rights reserved.
            </h1>
        </footer>
    )
}
