export function printReport(page_dict_object) {
   console.log("We are starting to make the report....") 
   const sortedObject = sortObjectByValues(page_dict_object)
   
   for (const [url, count] of Object.entries(sortedObject)) {
    console.log(`Found ${count} internal links to ${url}`);
  }
  
  console.log("We are done with the report....");
}




function sortObjectByValues(obj) {
    // Convert the object to an array of [key, value] pairs
    const entries = Object.entries(obj);
    
    // Sort the entries based on the values in descending order
    entries.sort((a, b) => b[1] - a[1]);
    
    // Convert the sorted entries back to an object
    const sortedObject = Object.fromEntries(entries);
    
    return sortedObject;
  }