export const add_user = async (userName,password,repass,role)=>{
  let user = {
    userName:userName,
    password:password,
    repass:repass,
    role:role
  }
  let user_str = JSON.stringify(user)
  let fetchOption = {
    method: 'POST',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
    body: user_str
  }
  try {
    const response = await fetch('/admin/add', fetchOption);
    const body = await response.json();
    console.log(body)
    return body;
  } catch (e) {
    console.log(e)
  }
}