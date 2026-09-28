import Link from "next/link";

const Footer = () => {
  return (
    <footer>
      <span>©{new Date().getFullYear()}</span>
      <span>
        <Link href="/">Benn Dalton</Link>
      </span>
    </footer>
  );
};

export default Footer;
