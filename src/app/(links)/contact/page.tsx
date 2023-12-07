"use client";

import Input from "@/components/form/input";
import {
  ChangeEvent,
  FormEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";

const Contacts = () => {
  const button = useRef<HTMLButtonElement>(null);

  const [message, setMessage] = useState({
    fullName: "",
    email: "",
    body: "",
  });

  useEffect(() => {
    if (!button.current) return;
    if (
      message.fullName === "" ||
      message.email === "" ||
      message.body === ""
    ) {
      //setDisabled(prev => true)
      button.current.disabled = true;
    } else {
      //setDisabled(prev => false)
      button.current.disabled = false;
    }
  }, [message]);

  const changed = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setMessage((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const addMessage: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    console.log(message);

    /*
        const inputs = e.target.querySelectorAll('input, textarea')
        inputs.forEach(el => {
            el.value = ''
        })
        */
  };
  return (
    <>
      <h3>
        <span data-cursor-filter="invert(1)" data-cursor-size="50px">
          Message me{" "}
        </span>
      </h3>
      <div>
        <form onSubmit={addMessage}>
          <Input
            label="Full Name"
            defaultValue={message.fullName}
            onChange={changed}
            name="fullName"
            required
          />
          <div>
            <label>
              <span>Email</span>
              <input
                type="email"
                name="email"
                onChange={changed}
                defaultValue={message.email}
                required
              />
            </label>
          </div>
          <div>
            <label>
              <span>Message</span>
              <textarea
                name="body"
                onChange={(e) => {
                  e.target.style.height = e.target.scrollHeight + "px";
                  changed(e);
                }}
                defaultValue={message.body}
                required
              />
            </label>
          </div>
          <button
            data-cursor-filter="invert(1)"
            data-cursor-size="40px"
            ref={button}
            disabled
          >
            Send Message
          </button>
        </form>
      </div>
    </>
  );
};

export default Contacts;
