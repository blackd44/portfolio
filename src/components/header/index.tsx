import Link from "next/link";
import { CodepenSvg, GithubSvg, LinkedinSvg } from "../../assets/svg";
import HeaderSettings from "./settings";
import { ReactNode } from "react";

type prop = {
  href: string;
  children?: ReactNode;
  icon?: ReactNode;
};
export function NavLink({ href = "", children, icon }: prop) {
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer">
      <span>{children}</span>
      <span>{icon}</span>
    </Link>
  );
}

const Header = () => {
  return (
    <header>
      <div className="logo">
        <Link href="/">BD</Link>
      </div>
      <nav>
        <div>
          <NavLink href="https://codepen.io/blackd44/" icon={<CodepenSvg />}>
            CodePen
          </NavLink>
        </div>
        <div>
          <NavLink href="https://github.com/blackd44/" icon={<GithubSvg />}>
            Github
          </NavLink>
        </div>
        <div>
          <NavLink
            href="https://www.linkedin.com/in/iradukunda-benn-dalton/"
            icon={<LinkedinSvg />}
          >
            Linkedin
          </NavLink>
        </div>
        <HeaderSettings />
      </nav>
    </header>
  );
};

export default Header;
