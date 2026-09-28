import PageHeader from "@/app/_components/ui/page-header";
import css from "./style.module.scss";
import CopyValue from "@/app/_components/ui/copy-value";
import { cn } from "@/utils/utils";
import ContactForm from "./contact-form";

const Contacts = () => {
  return (
    <>
      <PageHeader>Message me</PageHeader>
      <div>
        <ContactForm />
      </div>
      <PageHeader className="pt-4 text-2xl!">Or reach me directly</PageHeader>
      <div className={cn(css.links, "space-y-2")}>
        <CopyValue value="+250798895340">
          <b>Phone Number:</b>
          <span>+250798895340</span>
        </CopyValue>
        <CopyValue value="irabd44@gmail.com">
          <b>Email:</b>
          <span>irabd44@gmail.com</span>
        </CopyValue>
        <CopyValue value="https://www.linkedin.com/in/iradukunda-benn-dalton/">
          <b>LinkedIn:</b>
          <a
            href="https://www.linkedin.com/in/iradukunda-benn-dalton/"
            target="_blank"
            rel="noopener noreferrer"
          >
            iradukunda-benn-dalton
          </a>
        </CopyValue>
      </div>
    </>
  );
};

export default Contacts;
