import { cn } from "../utils/cn";

type Props = {
  className?: string;
};
function Title({ className }: Props) {
  return (
    <h1
      className={cn(
        "md:text-7xl text-3xl lg:text-6xl font-bold text-center text-white relative z-20",
        className
      )}
    >
      URL Shortener
    </h1>
  );
}

export default Title;
