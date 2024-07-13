import { cn } from "@/lib/utils";
import { ReactNode } from "react";

// decorator that decorate text with dash under line as default but can accept different text decoration 
// props through the className prop i.e. decoration-wavey in todays's highlight in authScreen
const UnderlinedText = ({ children, className }: { children: ReactNode; className?: string }) => {
	return (
		<span className={cn("underline underline-offset-4 decoration-dashed decoration-sky-400", className)}>
			{children}
		</span>
	);
};
export default UnderlinedText;
