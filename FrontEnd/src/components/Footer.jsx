import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <footer className="w-full border-t bg-secondary">
        <div className="flex flex-col gap-2 sm:flex-row py-6 w-full items-center px-4 md:px-6">
          <p className="text-xs text-muted-foreground">
            &copy;{new Date().getFullYear()} B2B Connect. All rights reserved.
          </p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link to="#" className="text-xs hover:underline underline-offset-4">
              Terms of Service
            </Link>
            <Link to="#" className="text-xs hover:underline underline-offset-4">
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
    </>
  );
}

export default Footer;
