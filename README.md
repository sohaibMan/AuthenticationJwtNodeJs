# AuthenticationJwtNodeJs

#registre a user
POST /api/auth/signup

## users data

```
{
"name":"sohaib",
"email":"sohaibaaq@gmail.com",
"password":"khalidelamarni200322",
"_id":"63a20b7229c569374aa54b9d"
}
```

```
{
"name":"ali",
"email":"alialoli@gmail.com",
"password":"alolaloani123",
"_id":"63a20be1891551ba21e48a1d"
}
```

POST /api/auth/login
(provide email and password)

```
{
  "email":"alialoli@gmail.com",
  "password":"alolaloani123"
}
```

-->correct

```
{
"email":"alialoli@gmail.com",
"password":"alolaloani1"
}
```

-->password incorrect

in postman

```

```
