export const fetchData = async (userId) => {
  try {
    const response = await fetch(`https://api.github.com/users/${userId}`);
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
}

export const myTest = async()=>{
  try{
    const response = await fetch('/api/hello');
    const body = await response.json();
    return body;
  }catch(e){
    console.log(e)
  }
}