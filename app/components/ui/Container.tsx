type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

/** Centered max-width wrapper with consistent responsive gutters. */
export default function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}
