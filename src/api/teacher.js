export const search_class_list = async (id) => {
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
    const response = await fetch('/teacher/class', fetchOption);
    const body = await response.json();
    return body;
  } catch (e) {
    console.log(e)
  }
}

export const publish_task = async (
  publisherId,
  classes,
  title,
  content,
  publishTime,
  endTime,
  teacherProportion,
  selfProportion,
  groupProportion,
  groupNumber
) => {
  let data = {
    publisherId: publisherId,
    classes: classes,
    title: title,
    content: content,
    publishTime: publishTime,
    endTime: endTime,
    teacherProportion: teacherProportion,
    selfProportion: selfProportion,
    groupProportion: groupProportion,
    groupNumber: groupNumber
  }
  let data_str = JSON.stringify(data)
  let fetchOption = {
    method: 'POST',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
    body: data_str
  }
  try {
    const response = await fetch('/teacher/publish', fetchOption);
    const body = await response.json();
    return body;
  } catch (e) {
    console.log(e)
  }
}

export const get_published_taks = async (id) => {
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
    const response = await fetch('/teacher/published', fetchOption);
    const body = await response.json();
    return body;
  } catch (e) {
    console.log(e)
  }
}

export const delete_published_task = async (id) => {
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
    const response = await fetch('/teacher/delete', fetchOption);
    const body = await response.json();
    return body;
  } catch (e) {
    console.log(e)
  }
}