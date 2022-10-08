import { Link } from "react-router-dom";
import { classNames } from "../../util";

interface IProps {
  to: string;
  children: string;
  variant?: "hidden";
}

export const TextLink = ({ children, to, variant }: IProps) => {
  return (
    <Link
      to={to}
      className={classNames(
        "opacity-0 hover:opacity-100 px-4 py-2",
        variant === "hidden" ? "opacity-0 hover:opacity-100" : ""
      )}
    >
      {children}
    </Link>
  );
};

export default TextLink;
