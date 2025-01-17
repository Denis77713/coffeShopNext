"use server"

export async function testReqest(email: string, password: string) {
  const user = {
    email: email,
    password: password,
  }

   fetch("http://localhost:5000/api/registration", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(user),
  }).then(response => response.json()).then(data=> console.log(data))
 

  
  // fetch('http://localhost:5000/login').then(response => response.json()).then(data=> console.log(data))
}
