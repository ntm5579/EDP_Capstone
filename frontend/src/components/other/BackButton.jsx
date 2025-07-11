import { useNavigate } from "react-router-dom"

function BackButton() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Navigate one step back in history
  };

  return (
    <button className="border px-2 py-1.5 rounded-lg bg-[#D62828] text-white hover:bg-red-800 cursor-pointer font-bold" onClick={goBack}>Go Back</button>
  );
}

export default BackButton