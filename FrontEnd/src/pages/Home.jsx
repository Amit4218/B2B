import { Button } from "@/components/ui/button";
import { ArrowRight, MessageSquare, Shield, Users } from "lucide-react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="bg-slate-700 text-primary-foreground ">
      <div className="max-w-7xl my-auto mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight tracking-[-.10em]">
          Connect Buyers & Sellers
          <br />
          <span className="text-accent">In Bulk Business</span>
        </h1>
        <p className="text-md  opacity-90 max-w-3xl mx-auto leading-tight tracking-tighter mb-10">
          Post your bulk requirements and get competitive quotes from verified
          suppliers. Streamline your B2B sourcing process with our secure
          platform.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button variant="secondary" size="lg" asChild>
            <Link
              to="/post-requirement"
              className="flex items-center space-x-2"
            >
              <span>Get Started</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>

        <section className="grid md:grid-cols-3 gap-10">
          <div className="text-center">
            <div className="bg-primary-foreground/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Users className="h-8 w-8 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Verified Suppliers</h3>
            <p className="opacity-80">
              Connect with pre-screened, reliable suppliers for your bulk needs.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-primary-foreground/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <MessageSquare className="h-8 w-8 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Direct Communication</h3>
            <p className="opacity-80">
              Private messaging system for secure quote negotiations.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-primary-foreground/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Shield className="h-8 w-8 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure Platform</h3>
            <p className="opacity-80">
              Safe environment with built-in safety measures and guidelines.
            </p>
          </div>
        </section>
      </div>
    </section>
  );
}

export default Home;
