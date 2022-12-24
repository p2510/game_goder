export default async function () {
  const response = await fetch(
    "https://w75mzcji.directus.app/items/requesthome/1"
  ).then((res) => {
    return res.json();
  });

  useFetch(
    `https://w75mzcji.directus.app/items/requesthome/${response.data.id}`,
    {
      method: "PATCH",
      body: {
        number: response.data.number + 1,
      },
    }
  );

}
