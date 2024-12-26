import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="flex gap-1.5 opacity-75 px-4 py-1.5 justify-center border-t-[1px] border-neutral">
      <span>Made</span>
      <span>with</span>
      <Heart className="text-secondary" /> by{" "}
      <Link to="" className="link link-primary">
        Pratik
      </Link>
    </footer>
  );
}

export default Footer;
