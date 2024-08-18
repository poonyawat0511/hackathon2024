const API = "https://66c0776dba6f27ca9a56b4ad.mockapi.io/people"

export function getPeople() {
    return fetch(API)
        .then((res) => res.json())
        .catch((error) => {
            console.log(error);
        });
}
export function createPerson(person) {

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // Send your data in the request body as JSON
      body: JSON.stringify(person),
    };
    return fetch(API, requestOptions)
      .then((res) => res.json())
      .catch((error) => {
        console.log(error);
      });
  }
  export function updatePerson(person) {

    const requestOptions = {
      method: "PUT", // or PATCH
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: person.name,
        job: person.job,
        description: person.description
      }),
    };
    return fetch(API + "/" + person.id, requestOptions)
      .then((res) => res.json())
      .catch((error) => {
        console.log(error);
      });
  }
  export function deletePerson(person) {
    return fetch(API + "/" + person.id, { method: "DELETE" })
      .then((res) => res.json())
      .catch((error) => {
        console.log(error);
      });
  }
    
  
