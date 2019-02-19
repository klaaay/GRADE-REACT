export const get_tasks = async (id) => {
  let data = {
    id: id
  }
  let data_str = JSON.stringify(data);
  let fetchOption = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: data_str
  }
  try {
    // const response = await fetch('http://localhost:5001/student/task', fetchOption);
    const response = await fetch('http://119.23.201.7:5001/student/task', fetchOption);
    const body = await response.json();
    return body;
  } catch (e) {
    console.log(e)
  }
}

export const get_asked_tasks = async (id) => {
  let data = {
    id: id
  }
  let data_str = JSON.stringify(data);
  let fetchOption = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: data_str
  }
  try {
    // const response = await fetch('http://localhost:5001/student/askedTasks', fetchOption);
    const response = await fetch('http://119.23.201.7:5001/student/askedTasks', fetchOption);
    const body = await response.json();
    return body;
  } catch (e) {
    console.log(e)
  }
}

export const get_eval_records = async (id) => {
  let data = {
    userId: id
  }
  let data_str = JSON.stringify(data);
  let fetchOption = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: data_str
  }
  try {
    // const response = await fetch('http://localhost:5001/student/evalRecords', fetchOption);
    const response = await fetch('http://119.23.201.7:5001/student/evalRecords', fetchOption);
    const body = await response.json();
    return body;
  } catch (e) {
    console.log(e)
  }
}