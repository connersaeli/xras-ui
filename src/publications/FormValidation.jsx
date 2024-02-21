export const validateForm = (
  publication,
  requiredPubFields,
  requiredAuthFields
) => {
  let formValid = true;
  const missingFields = [];

  for (const field of requiredPubFields) {
    if (!publication[field]) {
      formValid = false;
      missingFields.push(field);
    }
  }

  const authors = publication.authors || [];

  for (const author of authors) {
    for (const authField of requiredAuthFields) {
      if (!author[authField]) {
        formValid = false;
        if (!missingFields.includes(authField)) {
          missingFields.push(authField);
        }
      }
    }
  }
  return { formValid, missingFields };
};

export const invalidFormAlert = (missingFields) => {
  if (missingFields.length > 0) {
    return (
      <div role="alert">
        <p>Please provide the following information before submitting:</p>
        <ul>
          {missingFields.map((field) => (
            <li key={field}>{camelCaseToTitleCase(field)}</li>
          ))}
        </ul>
      </div>
    );
  } else {
    return null;
  }
};

export function camelCaseToTitleCase(camelCaseWord) {
  return camelCaseWord
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
