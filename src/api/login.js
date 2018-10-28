export const login_confirm = async (userName, password) => {
  let user = {
    userName: userName,
    password: password
  }
  let user_str = JSON.stringify(user)
  let fetchOption = {
    method: 'POST',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
    body: user_str
  }
  try {
    const response = await fetch('http://localhost:5001/login', fetchOption);
    const body = await response.json();
    console.log(body)
    return body;
  } catch (e) {
    console.log(e)
  }
}