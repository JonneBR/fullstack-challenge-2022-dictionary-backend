# Sign Up

🔲✅❎

> ## Architecture
* The following images show how the architecture has evolved
[![alt architecture](./public/img/signup/architecture-part-one.PNG)]
> ## Success Case

1. 🔲 Receives a **POST** request at **/auth/signup** route
2. ✅ Validate required data as **name**, **email**, **password** and **passwordConfirmation**
3. ✅ Validate if **password** and **passwordConfirmation** match
4. ✅ Validate if **email** is valid
5. 🔲 **Validate** if already exist a user with the given email
6. 🔲 Generates a **encrypted** password (it cannot be decrypted)
7. 🔲 **Create** an account with the informations provided and replaces the password for an encrypted one
8. 🔲 Generate a **token** from the user's ID
9. 🔲 **Update** the user's data with the generated token
10. 🔲 Return status **200** with the id, name and token

> ## Exceptions

1. 🔲 Return status **404** if API route doesn't exist
2. ✅ Return status **400** if name, email, password or passwordConfirmation won't be entered
3. ✅ Return status **400** if password and passwordConfirmation won't be equal
4. ✅ Return status **400** if email field is an invalid one
5. 🔲 Return status **403** if provided email is already taken
6. 🔲 Return status **500** if it gives an error when generating encrypted password
7. 🔲 Return status **500** if it gives an error when creating user's account
8. 🔲 Return status **500** if it gives an error when generating access token
9. 🔲 Return status **500** if it gives an error when updating user's information with generated token