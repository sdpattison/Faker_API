const express = require('express');
const faker = require('faker');
const app = express();
const port = 8000;
app.use(express.json());
app.use(express.urlencoded({ extended : true }));


class User{
    constructor(id){
        this.id = id;
        this.firstName = faker.name.firstName();
        this.lastName = faker.name.lastName();
        this.phoneNumber = faker.phone.phoneNumber();
        this.email = faker.internet.email();
        this.password = faker.internet.password();
    }
}

const userList = [];
const companyList = [];

createUsers=(limit)=>{
    for(i = 1; i <= limit; i++){
        userList.push(new User(i));
    }
    return userList;
}
createUsers(10);

createUser = ()=>{
    let user = new User(11);
    return user;
}
let newUser = createUser();

class Company{
    constructor(id){
        this.id = id;
        this.name = faker.company.companyName();
        this.streetAddress = faker.address.streetAddress();
        this.city = faker.address.city();
        this.state = faker.address.state();
        this.zipCode = faker.address.zipCode();
        this.country = faker.address.country();
    }
}

createCompany = (id) =>{
    let company = new Company(id);
    return company;
}
let newCompany = createCompany(1);

app.get("/api/users", (req, res) =>{
    res.json(userList);
});

app.get("/api/users/new", (req, res) =>{
    userList.push(newUser);
    res.json(newUser);
});

app.get("/api/company/new", (req, res) =>{
    companyList.push(newCompany);
    res.json(newCompany);
});
app.get("/api/user/company/new", (req, res) =>{
    companyList.push(newCompany);
    userList.push(newUser);
    res.json({ "user" : newUser ,"company": newCompany});
});

app.listen( port, () => console.log(`Listening on port: ${port}`))