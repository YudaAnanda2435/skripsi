import { ArrowBigUpDash } from "lucide-react";
import { useEffect, useState } from "react";

const ButtonUp = () => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const footer = document.querySelector("footer")

        if (!footer) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setShow(entry.isIntersecting)
            },
            { threshold: 0.1 }
        )
        observer.observe(footer)

        return () => observer.disconnect();
    }, []);

    const handleScrollTop =() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    return (
        <button href="/" onClick={ handleScrollTop } className={`p-3 z-10 fixed bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-lp hover:bg-lp/85 cursor-pointer text-white transition-all duration-300 ease-in-out ${show ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0 pointer-events-none"}`}>
            <ArrowBigUpDash/>
        </button>
    )
}
export default ButtonUp