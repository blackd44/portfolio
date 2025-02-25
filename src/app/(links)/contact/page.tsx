// "use client";
import PageHeader from "@/app/_components/ui/page-header";
import css from "./style.module.scss";
import CopyValue from "@/app/_components/ui/copy-value";
import { cn } from "@/utils/utils";

const Contacts = () => {
  return (
    <>
      <PageHeader>Message me</PageHeader>
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
          <span>
            <span>iradukunda-benn-dalton</span>
            <br />
            <a target="_blank_">
              https://www.linkedin.com/in/iradukunda-benn-dalton/
            </a>
          </span>
        </CopyValue>
      </div>
    </>
  );
};

export default Contacts;
