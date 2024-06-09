export const getUpdatedParams = (setEmail = true) => {
  const url = new URL(document.location.href);
  const searchParams = new URLSearchParams(url.search);

  if (setEmail) {
    searchParams.set("email", "true");
  } else {
    searchParams.delete("email");
  }

  return searchParams.toString();
};
