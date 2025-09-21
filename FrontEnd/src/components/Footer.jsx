import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <div className="w-full bg-white shadow-md relative bottom-0 z-10">
        <footer className=" flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-secondary">
          <p className="text-xs text-muted-foreground">
            &copy;{new Date().getFullYear()} B2B Connect. All rights reserved.
          </p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link
              href="#"
              className="text-xs hover:underline underline-offset-4"
              prefetch={false}
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="text-xs hover:underline underline-offset-4"
              prefetch={false}
            >
              Privacy
            </Link>
          </nav>
        </footer>
      </div>
    </>
  );
}

export default Footer;
