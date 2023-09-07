import {FC, MouseEventHandler} from "react";

type TButtonProps = {
    styles: string,
    text: string,
    onClick: MouseEventHandler<HTMLButtonElement> 
};

const Button: FC<TButtonProps> = ({ styles, text, onClick }) => (
  <button onClick={onClick} type="button" className={`py-4 px-6 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none ${styles}`}>
    {text}
  </button>
);

export default Button;