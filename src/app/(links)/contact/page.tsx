import PageHeader from "@/app/_components/ui/page-header";
import css from "./style.module.scss";
import { cn } from "@/utils/utils";
import { Send } from "lucide-react";
import Channels from "./channels";
import ContactForm from "./contact-form";

const Contacts = () => {
  return (
    <>
      <PageHeader>Message me</PageHeader>
      <div className={cn(css.contact, "@container")}>
        <div className={css.grid}>
          <section className={cn(css.panel, "tone-1")}>
            <header className={css.head}>
              <span className={css.icon}>
                <Send className="size-5" />
              </span>
              <span>
                <span className={css.side}>Send a message</span>
                <span className={css.focus}>Replies go to your email</span>
              </span>
            </header>
            <ContactForm />
          </section>

          <Channels />
        </div>
      </div>
    </>
  );
};

export default Contacts;
