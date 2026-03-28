
import Header from "@/components/Header";
import Main from "@/components/Main";
import Footer from "@/components/Footer";



export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center min-h-screen bg-[#050505]">
      <Header/>
      <Main/>
      <Footer/>
    </div>
  );
}
