import React from 'react'

const UserStoreOrdersTable = () => {
 return (
   <>
     <table className="table table-striped">
       <thead>
         <tr>
           <th scope="col">#</th>
           <th scope="col">Book Name</th>
           <th scope="col">Author</th>
           <th scope="col">Store</th>
           <th scope="col">Created At</th>
           <th scope="col">Action</th>
         </tr>
       </thead>
       <tbody>
         <tr>
           <th scope="row">1</th>
           <td>Feluda Somogro</td>
           <td>Satyajit Roy</td>
           <td>Brindabon</td>
           <td>Dec 16, 2024</td>
           <td className="d-flex gap-2 align-items-center">
             <button className="btn btn-primary">View Details</button>
           </td>
         </tr>
       </tbody>
     </table>
   </>
 );
}

export default UserStoreOrdersTable