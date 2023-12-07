import Link from "next/link";
import { CodepenSvg, GithubSvg, LinkedinSvg } from "../../assets/svg";
import HeaderSettings from "./settings";

const Header = () => {
  return (
    <header>
      <div className="logo">
        <Link href="/">D</Link>
      </div>
      <nav>
        <div>
          <Link
            href="https://codepen.io/blackd44/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>CodePen</span>
            <span>
              <CodepenSvg />
            </span>
          </Link>
        </div>
        <div>
          <Link
            href="https://github.com/blackd44/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Github</span>
            <span>
              <GithubSvg />
            </span>
          </Link>
        </div>
        <div>
          <Link
            href="https://www.linkedin.com/in/iradukunda-benn-dalton/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Linkedin</span>
            <span>
              <LinkedinSvg />
            </span>
          </Link>
        </div>
        <HeaderSettings />
      </nav>
    </header>
  );
};

export default Header;
