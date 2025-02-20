import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./../output.css";
import Button from "../components/button";
import { useSelector } from "react-redux";
import { useMemo, useState } from "react";
//import { clearTransactionData } from "../store/transactionSlice";

const SingleGamePaymentCheckStatus = () => {
  const navigate = useNavigate();
  //const dispatch = useDispatch();
  //const user = useSelector((state) => state.user.user);
  //const user = useSelector((state) => state.user?.user) || {};
  const [statusText, setStatusText] = useState("Check Status");
  const [statusImage, setStatusImage] = useState("payment-status.svg");
  const [statusInfoText, setStatusInfoText] = useState(
    "Your payment is being processed. Tap the button below to check payment status."
  );

  const transaction =
    useSelector((state) => state.transaction?.transactions);

  const memoizedTransaction = useMemo(() => {
    return transaction ? { ...transaction } : null;
  }, [transaction]);

  const back = () => {
    navigate("/single_game_payment");
  };

  const checkPaymentStatus = async () => {
    try {
      if (statusText === "Okay") {
        navigate("/");
      }
      const requestBody = {
        phone_number: `233${Number(memoizedTransaction.mobileNumber)}`,
      };
      console.log("Status Request => ", requestBody);

      const response = await fetch(
        "https://app.afriluck.com/api/V1/app/status-check",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );
      const json = await response.json();
      const status = json.success.status;
      console.log(json);

      if (status === "Unpaid") {
        console.log("Gets here...");

        setStatusText("Check Again");
        setStatusInfoText(
          "Your payment is being processed. Tap on the check again button to confirm final payment status."
        );
        setStatusImage("pending-status.svg");
      } else if (status === "Paid") {
        setStatusText("Okay");
        setStatusImage("success-status.svg");
        setStatusInfoText(
          "Congratulations in advance. Thanks for your contribution. For any prize below GHS 12,000.00, wins will be redeemed instantly to your wins account. For any prize equal or above GHS 12,000.00, Please contact Afriluck for verification."
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div className="flex flex-col w-full h-screen p-5 bg-[#F7F7F7]">
        <div className=" h-16 w-full p-5 rounded-lg bg-[#F7F7F7]">
          <div className="flex flex-row gap-10 items-center bg-[#F7F7F7]">
            <div onClick={back} className="">
              <FontAwesomeIcon icon={faChevronLeft} />
            </div>
            <div className="font-normal text-xl font-Poppins">
              Payment Status
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center h-full w-full p-5 rounded-lg bg-[#F7F7F7]">
          <img className="h-30 w-30" src={statusImage} alt="check" />
          <p className="font-Poppins font-semibold mb-2">
            {statusText === "Okay" ? "Success" : ""}
          </p>
          <p className="text-center text-md">{statusInfoText}</p>
        </div>
        <footer className="flex flex-col h-28 m-5 bg-[#F7F7F7]">
          <div className="flex flex-row w-auto mt-10 bg-[#F7F7F7]">
            <Button
              label={statusText}
              onClick={checkPaymentStatus}
              disabled={false}
              className="text-white font-bold w-full h-16 rounded-lg bg-primary"
            ></Button>
          </div>
        </footer>
      </div>
    </>
  );
};

export default SingleGamePaymentCheckStatus;
