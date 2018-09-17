const person = {
    name: 'adam',
    age: 26,
    location: {
        city: 'Glasgow',
        temp: 15
    }
}

const {name, age} = person;
console.log(`${person.name} is ${person.age}`);

const [street, city, state, zip] = address;