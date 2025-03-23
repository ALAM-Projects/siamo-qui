async function GET(url = "", data = {}, token?: string) {
  try {
    const headers: HeadersInit = {};
    if (token) headers.Authorization = `Bearer ${token}`;

    const queryParams = new URLSearchParams(data);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api` +
        url +
        "?" +
        queryParams.toString(),
      {
        method: "GET",
        headers,
      }
    );

    return await response.json();
  } catch (e) {
    console.error(e);
  }
}

// Example POST method implementation:
async function POST(
  url = "",
  data = {},
  token?: string,
  includeFile = false,
  receiveJson = true
) {
  try {
    // Default options are marked with *
    const headers: HeadersInit = {};
    if (!includeFile) headers["Content-Type"] = "application/json";
    if (token) headers.Authorization = `Bearer ${token}`;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api` + url,
      {
        method: "POST",
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers,
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      }
    );
    return receiveJson ? await response.json() : response; // parses JSON response into native JavaScript objects
  } catch (e) {
    console.error(e);
  }
}

async function POSTFILE(
  url = "",
  data: any,
  token?: string,
  includeFile = false,
  receiveJson = true
) {
  try {
    // Default options are marked with *
    const headers: HeadersInit = {};
    if (!includeFile) headers["Content-Type"] = "application/json";
    if (token) headers.Authorization = `Bearer ${token}`;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api` + url,
      {
        method: "POST",
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers,
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: data, // body data type must match "Content-Type" header
      }
    );
    return receiveJson ? await response.json() : response; // parses JSON response into native JavaScript objects
  } catch (e) {
    console.error(e);
  }
}

// Example PUT method implementation:
async function PUT(
  url = "",
  data = {},
  token?: string,
  includeFile = false,
  receiveJson = true
) {
  try {
    // Default options are marked with *
    const headers: HeadersInit = {};
    if (!includeFile) headers["Content-Type"] = "application/json";
    if (token) headers.Authorization = `Bearer ${token}`;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api` + url,
      {
        method: "PUT",
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers,
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      }
    );
    return receiveJson ? await response.json() : response; // parses JSON response into native JavaScript objects
  } catch (e) {
    console.error(e);
  }
}

// Example PUT method implementation:
async function PATCH(
  url = "",
  data = {},
  token?: string,
  includeFile = false,
  receiveJson = false
) {
  try {
    // Default options are marked with *
    const headers: HeadersInit = {};
    if (!includeFile) headers["Content-Type"] = "application/json";
    if (token) headers.Authorization = `Bearer ${token}`;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api` + url,
      {
        method: "PATCH",
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers,
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      }
    );
    return receiveJson ? await response.json() : response; // parses JSON response into native JavaScript objects
  } catch (e) {
    console.error(e);
  }
}

// Example DELETE method implementation:
async function DELETE(
  url = "",
  data = {},
  token?: string,
  includeFile = false,
  receiveJson = true
) {
  try {
    // Default options are marked with *
    const headers: HeadersInit = {};
    if (!includeFile) headers["Content-Type"] = "application/json";
    if (token) headers.Authorization = `Bearer ${token}`;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api` + url,
      {
        method: "DELETE",
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers,
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      }
    );
    return receiveJson ? await response.json() : response; // parses JSON response into native JavaScript objects
  } catch (e) {
    console.error(e);
  }
}

// async function POSTFILE_DOWNLOAD(
//   url: string,
//   data: any,
//   token?: string,
//   filename = "download.pdf"
// ) {
//   try {
//     console.log("DATA", JSON.stringify(data));
//     const headers: HeadersInit = {
//       "Content-Type": "application/json",
//     };
//     if (token) headers.Authorization = `Bearer ${token}`;
//     console.log("HERE", process.env.NEXT_PUBLIC_BASE_URL + url);
//     const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + url, {
//       method: "POST",
//       mode: "cors", // no-cors, *cors, same-origin
//       cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
//       credentials: "same-origin", // include, *same-origin, omit
//       headers,
//       redirect: "follow", // manual, *follow, error
//       referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//       body: JSON.stringify(data), // body data type must match "Content-Type" header
//     });

//     console.log("RESPONSEEEEEEEEEEEE", response);

//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }

//     const blob = await response.blob();
//     return { blob, filename };
//     // saveAs(blob, filename);
//   } catch (error) {
//     console.error("Error downloading the file:", error);
//   }
// }
export const defaultActions = {
  POST,
  POSTFILE,
  GET,
  PATCH,
  PUT,
  DELETE,
  // POSTFILE_DOWNLOAD,
};
