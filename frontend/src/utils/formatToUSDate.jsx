export function formatToUSDate(dateString) {
  try {
    const date = new Date(dateString); 
    if (isNaN(date)) {
      throw new Error("Invalid date string");
    }

    // Format options
    const options = { year: "numeric", month: "short", day: "numeric" };

    // Convert to US format using Intl.DateTimeFormat
    return new Intl.DateTimeFormat("en-US", options).format(date);
  } catch (error) {
    console.error(error.message);
    return null; 
  }
}

