// "use client";
import css from "./style.module.scss"

const Contacts = () => {
  // const button = useRef<HTMLButtonElement>(null);

  // const [message, setMessage] = useState({
  //   fullName: "",
  //   email: "",
  //   body: "",
  // });

  // useEffect(() => {
  //   if (!button.current) return;
  //   if (
  //     message.fullName === "" ||
  //     message.email === "" ||
  //     message.body === ""
  //   ) {
  //     //setDisabled(prev => true)
  //     button.current.disabled = true;
  //   } else {
  //     //setDisabled(prev => false)
  //     button.current.disabled = false;
  //   }
  // }, [message]);

  // const changed = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
  //   setMessage((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  // };

  // const addMessage: FormEventHandler<HTMLFormElement> = (e) => {
  //   e.preventDefault();

  //   console.log(message);

  //   /*
  //       const inputs = e.target.querySelectorAll('input, textarea')
  //       inputs.forEach(el => {
  //           el.value = ''
  //       })
  //       */
  // };
  return (
    <>
      <h3>
        <span data-cursor-filter="invert(1)" data-cursor-size="50px">
          Message me
        </span>
      </h3>
      <div className={css.links}>
        <p>
          <b>Phone Number:</b>
          <span>+250798895340</span>
        </p>
        <p>
          <b>Email:</b>
          <span>irabd44@gmail.com</span>
        </p>
        <p>
          <b>LinkedIn:</b>
          <span>
            <span>iradukunda-benn-dalton</span>
            <br />
            <a target="_blank_">
              https://www.linkedin.com/in/iradukunda-benn-dalton/
            </a>
          </span>
        </p>
      </div>
    </>
  );
};

export default Contacts;
