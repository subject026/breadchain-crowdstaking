import { Link } from 'react-router-dom';

export function Logo() {
  return (
    <div className="flex items-center">
      <Link to="/">
        <img
          className="h-4 sm:h-5 md:h-7"
          src="data:image.jpeg;base64, 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"
          alt=""
        />
      </Link>
    </div>
  );
}

export default Logo;
