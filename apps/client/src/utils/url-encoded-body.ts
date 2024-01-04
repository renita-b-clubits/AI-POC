export const urlEncodedBody = (
  details: Record<string, string>
): URLSearchParams => {
  // const formBody = [];
  // for (const property in details) {
  //   const encodedKey = encodeURIComponent(property);
  //   const encodedValue = encodeURIComponent(details[property]);
  //   formBody.push(encodedKey + "=" + encodedValue);
  // }
  // return formBody.join("&");
  return new URLSearchParams(details);
};
