import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedDivProps extends HTMLMotionProps<"div"> {
  delay?: number;
}

export function AnimatedDiv({
  delay = 0,
  children,
  className,
  ...props
}: AnimatedDivProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}