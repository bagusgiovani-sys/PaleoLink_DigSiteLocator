import {useRef, useEffect,} from "react"
import { gsap } from "gsap"


const CustomCursor = () => {
    // References for cursor elements
    const cursorRef = useRef(null);
    const cursorBorderRef = useRef(null);

    // Hide CustomCursor on mobile devices //
    const isMobile = typeof window !== "undefined" &&
    window.matchMedia("(max-width: 768px)").matches;

    if (isMobile) {
        return null;
    }

    useEffect(() => {
      // Get CustomCursor elements //
      const cursor = cursorRef.current;
      const cursorBorder = cursorBorderRef.current;

      // initial position //
      gsap.set([cursor, cursorBorder], {
        xPercent: -50,
        yPercent: -50
      });

      // variables for cursor position with different speeds //

      const xTo =gsap.quickTo(cursor, "x", {
        duration: 0.2, ease: "power3.out"})
        
      const yTo =gsap.quickTo(cursor, "y", {
        duration: 0.2, ease: "power3.out"})

      const xToBorder =gsap.quickTo(cursorBorder, "x", {
        duration: 0.28, ease: "power3.out"})

      const yToBorder =gsap.quickTo(cursorBorder, "y", {
        duration: 0.28, ease: "power3.out"})

      // Mouse move handler //
      const CursorMove = (e: MouseEvent) => {
        xTo(e.clientX)
        yTo(e.clientY)
        xToBorder(e.clientX)
        yToBorder(e.clientY)
      }

      // Add event listener for mouse move //
      window.addEventListener("mousemove", CursorMove);

      // Add click Animation //

      document.addEventListener("mousedown", () => {
        gsap.to([cursor, cursorBorder], {
          scale: 0.6,
          duration: 0.2,
    

        });
      });

      document.addEventListener("mouseup", () => {
        gsap.to([cursor, cursorBorder], {
          scale: 1,
          duration: 0.2,
        });
      });

      



    }, []); // [] to run only once on mount //





      


  return (
    <>
        {/* Main Cursor Dot */}
        <div
            ref={cursorRef}
            className="fixed top-0 left-0 w-[20px] h-[20px] bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference">
        </div>

        <div
            ref={cursorBorderRef}
            className="fixed top-0 left-0 w-[50px] h-[50px] border rounded-full border-white pointer-events-none z-[9999] mix-blend-difference opacity-50">      
        </div>
    </>
  )
}

export default CustomCursor