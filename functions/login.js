const loginUser = async (Email, Password) => {
    try {
      const response = await fetch("https://flashtransfer.herokuapp.com/api/user/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ Email, Password,millitaryId:"619b5"}),
      });
      const result = await response.json();
      console.log(result)
      if (result.error) return { error: true, errMessage: result.errMessage };
      return { token: result.message.token };
    } catch (error) {
      return { error: true, errMessage: error.message };
    }
  };
  export default loginUser;
  