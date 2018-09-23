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

export const publish_task = async (publisherId, classes, title, content, publishTime, endTime) => {
  let data = {
    publisherId: publisherId,
    classes: classes,
    title: title,
    content: content,
    publishTime: publishTime,
    endTime: endTime
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