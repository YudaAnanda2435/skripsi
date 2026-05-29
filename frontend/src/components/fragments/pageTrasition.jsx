import { motion } from "framer-motion";

const PageTransition = ({ children }) => {
  return (
    <div className="overflow-hidden relative">
      <motion.div
        initial={{ x: "0%" }}
        animate={{ x: "-100%" }}
        transition={{ duration: 0.8, ease: [0.83, 0, 0.17, 1] }}
        className="fixed top-0 left-0 w-1/2 h-full bg-black z-50"
      />

      <motion.div
        initial={{ x: "0%" }}
        animate={{ x: "100%" }}
        transition={{ duration: 0.8, ease: [0.83, 0, 0.17, 1] }}
        className="fixed top-0 right-0 w-1/2 h-full bg-black z-50"
      />

      <motion.div
        initial={{ scale: 0.95, opacity: 0, filter: "blur(10px)" }}
        animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default PageTransition;
