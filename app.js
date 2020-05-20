// Question. Suppose we have two arrays, say customers[] and activeCustomers[]. If need to find the inactive customers in inactiveCustomers[]. then using 3rd party library we can easily find the difference of these two arrays to find the inactiveCustomers[].
const customers = ["Sandeep", "Ajay", "Ankit", "Deepanshu"];
const activeCustomers = ["Ajay", "Deepanshu"];
const inactiveCustomers = _.difference(customers, activeCustomers);

console.log(inactiveCustomers);
