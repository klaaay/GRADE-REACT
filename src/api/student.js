export const get_tasks = async (id) => {
  let data = {
    id: id
  }
  let data_str = JSON.stringify(data);
  let fetchOption = {
    method: 'POST',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
    body: data_str
  }
  try {
    const response = await fetch('/student/task', fetchOption);
    const body = await response.json();
    return body;
  } catch (e) {
    console.log(e)
  }
}