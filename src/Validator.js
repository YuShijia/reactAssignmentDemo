
export const validator = (values, fieldName) => {
  let errors = {};
  switch (fieldName) {
    case "firstName":
        validateFirstName(values.firstName, errors);
        break;

    case "lastName":
        validateLastName(values.lastName, errors);
        break;

    case "description":
        validateDescription(values.description, errors);
        break;

    case "email":
        validateEmail(values.email, errors);
        break;

    default:
  }
  return errors;
};

function validateFirstName(firstName,errors) {
    let result = true;

    if (!firstName) {
      errors.firstName = "First Name is Required";
      result = false;
    } 
    return result;
}

function validateLastName(lastName,errors) {
    let result = true;

    if (!lastName) {
      errors.lastName = "Last Name is Required";
      result = false;
    } 
    return result;
}

function validateDescription(Description,errors) {
    let result = true;

    if (!Description) {
      errors.Description = "Small Description is Required";
      result = false;
    } 
    return result;
}

// ******************************
function validateEmail(email, errors) {
  let result = true;

  if (!email) {
    errors.email = "Email is Required";
    result = false;
  } else {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    result = re.test(String(email).toLowerCase());
    if (!result) errors.email = "Invalid Email address";
  }
  return result;
}
