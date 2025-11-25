import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/button";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";

const SingleGamePaymentCheckStatus = () => {
  const navigate = useNavigate();
  const [statusText, setStatusText] = useState("Check Status");
  const [statusImage, setStatusImage] = useState("payment-status.svg");
  const [status, setStatus] = useState("");
  const [statusInfoText, setStatusInfoText] = useState(
    "Your payment is being processed. Tap the button below to check payment status."
  );
  const [isStatusChecking, setIsStatusChecking] = useState(true);
  const [checkCount, setCheckCount] = useState(0);

  const location = useLocation();
  const {
    locationStatusText,
    locationStatusImage,
    locationStatus,
    locationStatusInfoText,
  } = location.state || {};

  useEffect(() => {
    if (location.state) {
      setStatusText(locationStatusText);
      setStatusImage(locationStatusImage);
      setStatus(locationStatus);
      setStatusInfoText(locationStatusInfoText);
    }
  }, [
    location.state,
    locationStatusText,
    locationStatusImage,
    locationStatus,
    locationStatusInfoText,
  ]);

  const user = useSelector((state) => state.user?.user);

  const memoizedUser = useMemo(() => {
    return user ? { ...user } : null;
  }, [user]);

  const transaction = useSelector((state) => state.transaction?.transactions);

  const memoizedTransaction = useMemo(() => {
    return transaction ? { ...transaction } : null;
  }, [transaction]);

  const back = () => {
    navigate(-1);
  };

  const checkPaymentStatus = async () => {
    console.log(
      `Check #${checkCount + 1} at ${new Date().toLocaleTimeString()}`
    );

    let attempts = 0;

    while (attempts < 3) {
      try {
        if (statusText === "Okay") {
          navigate("/", {
            state: {
              checkBalance: true,
            },
          });
          return;
        }

        const requestBody = {
          phone_number: `233${Number(memoizedTransaction.mobileNumber)}`,
        };
        console.log("Status Request => ", requestBody);

        const response = await fetch(
          "https://app-api.afriluck.com/api/V1/app/status-check",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${memoizedUser?.token}`,
            },
            body: JSON.stringify(requestBody),
            signal: AbortSignal.timeout(10000),
          }
        );

        const json = await response.json();
        const status = json.success.status;
        console.log(json);

        if (status === "Unpaid") {
          setStatus(status);
          setStatusText("Check Again");
          setStatusInfoText(
            "Your payment is unpaid at the moment & is being processed. Tap on the check again button to confirm final payment status."
          );
          setStatusImage("pending-status.svg");
        } else if (status === "Paid") {
          setStatus(status);
          setStatusText("Okay");
          setStatusImage("success-status.svg");
          setStatusInfoText(
            `Remember, matching all six numbers for Ghc20 is the key to claiming a life-changing jackpot prize of 70 million! Good Luck!!`
          );
          setIsStatusChecking(false);
        } else if (status === "Failed") {
          setStatus(status);
          setStatusText("Back");
          setStatusImage("error-msg.svg");
          setStatusInfoText(
            `Your payment was not successful. Please try again or contact support for assistance.`
          );
          setIsStatusChecking(false);
        }

        break;
      } catch (e) {
        if (
          attempts == 2 ||
          (e.name !== "AbortError" &&
          e.name !== "TimeoutError")
        ) {
          console.error(e);
          setStatus("Failed");
          setStatusImage("error-msg.svg");
          setStatusText("Contact Support");
          setStatusInfoText(
            "Oops. Something went wrong on our end, please contact support"
          );
          break;
        } else {
          await new Promise((resolve) => setTimeout(resolve, 2000));
        }
      }
      attempts++;
    }
  };

  useEffect(() => {
    if (!isStatusChecking || !memoizedTransaction || !memoizedUser) {
      return;
    }

    if (checkCount === 0) {
      checkPaymentStatus();
      setCheckCount(1);
      return;
    }

    if (checkCount > 3) {
      setIsStatusChecking(false);
      return;
    }

    const intervals = [10000, 15000, 30000];
    const timeoutId = setTimeout(() => {
      checkPaymentStatus();
      setCheckCount((prev) => prev + 1);
    }, intervals[checkCount - 1]);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isStatusChecking, memoizedTransaction, memoizedUser, checkCount]);

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
          <div className="font-bold font-Poppins text-black mt-5 mb-5">
            {status}
          </div>
          <p className="font-Poppins font-semibold mb-2">
            {statusText === "Okay" ? "Success" : ""}
          </p>
          <p className="text-center text-md">{statusInfoText}</p>
        </div>
        <footer className="flex flex-col h-28 m-5 mb-20">
          <div className="flex flex-row w-auto mt-5">
            <Button
              label={statusText}
              onClick={
                status === "Failed"
                  ? () => navigate("/customerservice")
                  : checkPaymentStatus
              }
              className={
                status === "Failed"
                  ? "text-white font-bold w-full h-16 rounded-lg  bg-[#A60014]"
                  : "text-white font-bold w-full h-16 rounded-lg bg-primary"
              }
            ></Button>
          </div>
        </footer>
      </div>
    </>
  );
};

export default SingleGamePaymentCheckStatus;
