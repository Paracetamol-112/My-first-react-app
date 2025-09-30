import { IoHeartSharp, IoHeartOutline } from "react-icons/io5";
import { useState } from "react";

interface props {
  onClick: () => void;
}

const LikeBtn = ({ onClick }: props) => {
  const [likeStatus, setLikeStatus] = useState(false);
  const toggle = () => {
    setLikeStatus(!likeStatus);
    onClick();
  };
  if (likeStatus) {
    return <IoHeartSharp color="red" size={40} onClick={toggle} />;
  } else {
    return <IoHeartOutline color="black" size={40} onClick={toggle} />;
  }
};

export default LikeBtn;
