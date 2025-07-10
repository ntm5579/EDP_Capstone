import { useNavigate } from "react-router-dom"

function BackButton() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Navigate one step back in history
  };

  return (
    <button className="w-[100px] h-[90px] rounded-lg bg-black hover:bg-white text-white hover:text-black" onClick={goBack}>Go Back</button>
  );
}

export default BackButton