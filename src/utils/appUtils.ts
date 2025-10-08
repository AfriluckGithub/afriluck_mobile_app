export const resendOtpUtils = async (setError: any, setLoading: any, phoneNumber: any, grantedToken: any) => {
    setError("Resending verification code...");
    setLoading(true);
    console.log("Sending otp to => ", phoneNumber);
    console.log("With token => ", grantedToken);
    try {
      const data = await fetch('http://10.180.180.22:5011/api/V1/app/resend-otp', {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${grantedToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "phoneNumber": phoneNumber
        })
      })

      if(data.status === 200) {
        setLoading(false);
        setError("Verification code resent successfully");
        const json = await data.json();
        console.log(json);
      }else{
        setLoading(false);
        setError("An error occurred");
        console.log("An error occurred");
        console.log(data);
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }