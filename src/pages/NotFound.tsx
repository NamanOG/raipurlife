import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="grid min-h-screen place-items-center bg-background px-4">
      <div className="max-w-md border border-border bg-card p-8 text-center shadow-lg">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Error</p>
        <h1 className="mt-2 text-5xl font-bold">404</h1>
        <p className="mt-3 text-muted-foreground">The page you are looking for does not exist or was moved.</p>
        <Link
          to="/"
          className="mt-6 inline-flex h-11 items-center justify-center border border-foreground bg-foreground px-6 text-sm font-semibold uppercase tracking-wide text-background transition-colors hover:bg-foreground/90"
        >
          Return home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
