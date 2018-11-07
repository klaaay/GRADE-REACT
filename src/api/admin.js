export const search_role_list = async (role) => {
  let data = {
    role: role
  }
  let data_str = JSON.stringify(data);
  let fetchOption = {
    method: 'POST',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
    body: data_str
  }
  try {
    const response = await fetch('http://localhost:5001/admin/search_list', fetchOption);
    const body = await response.json();
    return body;
  } catch (e) {
    console.log(e)
  }
}


export const add_user = async (userName, password, repass,name, role) => {
  let user = {
    userName: userName,
    password: password,
    repass: repass,
    name:name,
    role: role
  }
  let user_str = JSON.stringify(user)
  let fetchOption = {
    method: 'POST',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
    body: user_str
  }
  try {
    const response = await fetch('http://localhost:5001/admin/add', fetchOption);
    const body = await response.json();
    return body;
  } catch (e) {
    console.log(e)
  }
}

export const change_password = async (userName, oldPass, newPass, reNewPass) => {
  let data = {
    userName: userName,
    oldPass: oldPass,
    newPass: newPass,
    reNewPass: reNewPass
  }
  let data_str = JSON.stringify(data)
  let fetchOption = {
    method: 'POST',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
    body: data_str
  }
  try {
    const response = await fetch('http://localhost:5001/public/change', fetchOption);
    const body = await response.json();
    return body;
  } catch (e) {
    console.log(e)
  }
}

export const get_classes = async()=>{
  let fetchOption = {
    method: 'GET'
  }
  try {
    const response = await fetch('http://localhost:5001/admin/getClasses', fetchOption);
    const body = await response.json();
    return body;
  } catch (e) {
    console.log(e)
  }
}

export const get_now_class_info = async(nowClass)=>{
  let data = {
    nowClass: nowClass
  }
  let data_str = JSON.stringify(data)
  let fetchOption = {
    method: 'POST',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
    body: data_str
  }
  try {
    const response = await fetch('http://localhost:5001/admin/getClassInfo', fetchOption);
    const body = await response.json();
    return body;
  } catch (e) {
    console.log(e)
  }
}


export const class_control = async(addRole,addName,nowClass)=>{
  let data = {
    addRole: addRole,
    addName: addName,
    nowClass:nowClass
  }
  let data_str = JSON.stringify(data)
  let fetchOption = {
    method: 'POST',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
    body: data_str
  }
  try {
    const response = await fetch('http://localhost:5001/admin/class_control', fetchOption);
    const body = await response.json();
    return body;
  } catch (e) {
    console.log(e)
  }
}