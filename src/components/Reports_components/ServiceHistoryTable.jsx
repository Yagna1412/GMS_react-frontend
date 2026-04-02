import { useState, useEffect } from "react";
import { FileText, Pencil, Trash2, Filter } from "lucide-react";

export default function ServiceHistoryTable({ services }) {

const [servicesData,setServicesData] = useState(services);
const [visible,setVisible] = useState(3);
const [sort,setSort] = useState("");
const [showSort,setShowSort] = useState(false);
const [viewItem,setViewItem] = useState(null);
const [editItem,setEditItem] = useState(null);

useEffect(()=>{
setServicesData(services);
},[services]);

const updateRating=(id,value)=>{
setServicesData(
servicesData.map(item =>
item.id===id ? {...item,rating:value} : item
)
);
};

const deleteService=(id)=>{
if(window.confirm("Are you sure you want to delete this service?")){
setServicesData(servicesData.filter(item=>item.id!==id));
}
};

const saveEdit=()=>{
setServicesData(
servicesData.map(item =>
item.id===editItem.id ? editItem : item
)
);
setEditItem(null);
};

const printInvoice=()=>{
window.print();
};

const sortedServices=[...servicesData].sort((a,b)=>{

if(sort==="date_new") return new Date(b.date)-new Date(a.date);
if(sort==="date_old") return new Date(a.date)-new Date(b.date);

if(sort==="amount_high") return b.amount-a.amount;
if(sort==="amount_low") return a.amount-b.amount;

return 0;

});

return(

<div className="bg-white border border-[#BFDBFE] rounded-xl overflow-hidden">

<div className="px-6 py-4 border-b border-[#BFDBFE] flex justify-between items-center">

<h2 className="text-[#1E3A8A] font-semibold text-lg">
Service History
</h2>

<div className="relative">

<button
onClick={()=>setShowSort(!showSort)}
className="p-2 border border-gray-300 rounded hover:bg-gray-100"
>
<Filter size={18} className="text-[#1E3A8A]" />
</button>

{showSort && (

<div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded shadow w-44 text-sm">

<button
onClick={()=>{setSort("date_new");setShowSort(false)}}
className="block w-full text-left px-3 py-2 hover:bg-gray-100"
>
Newest Date
</button>

<button
onClick={()=>{setSort("date_old");setShowSort(false)}}
className="block w-full text-left px-3 py-2 hover:bg-gray-100"
>
Oldest Date
</button>

<button
onClick={()=>{setSort("amount_high");setShowSort(false)}}
className="block w-full text-left px-3 py-2 hover:bg-gray-100"
>
Amount High → Low
</button>

<button
onClick={()=>{setSort("amount_low");setShowSort(false)}}
className="block w-full text-left px-3 py-2 hover:bg-gray-100"
>
Amount Low → High
</button>

</div>

)}

</div>

</div>

<table className="w-full text-sm">

<thead className="bg-[#E2E8F0] text-[#1E3A8A] uppercase text-xs">

<tr>
<th className="px-6 py-3 text-left">Date</th>
<th className="px-6 py-3 text-left">Service</th>
<th className="px-6 py-3 text-left">Branch</th>
<th className="px-6 py-3 text-left">Amount</th>
<th className="px-6 py-3 text-left">Rating</th>
<th className="px-6 py-3 text-left">Receipt</th>
</tr>

</thead>

<tbody className="divide-y">

{sortedServices.slice(0,visible).map(item=>(

<tr key={item.id} className="bg-white">

<td className="px-6 py-4 text-[#1E3A8A]">{item.date}</td>

<td className="px-6 py-4 text-[#64748B]">{item.service}</td>

<td className="px-6 py-4 text-[#64748B]">{item.branch}</td>

<td className="px-6 py-4 text-[#2563EB] font-medium">${item.amount}</td>

<td className="px-6 py-4">

<div className="flex gap-1 text-[#F59E0B] text-2xl cursor-pointer">
{[1,2,3,4,5].map(star=>(
<span key={star} onClick={()=>updateRating(item.id,star)}>
{star <= (item.rating || 0) ? "★" : "☆"}
</span>
))}
</div>

</td>

<td className="px-6 py-4">

<div className="flex gap-6 items-center text-sm">

<button
onClick={()=>setViewItem(item)}
className="flex items-center gap-1 text-[#2563EB]"
>
<FileText size={16}/> View
</button>

<button
onClick={()=>setEditItem({...item})}
className="flex items-center gap-1 text-green-600"
>
<Pencil size={16}/> Edit
</button>

<button
onClick={()=>deleteService(item.id)}
className="flex items-center gap-1 text-red-600"
>
<Trash2 size={16}/> Delete
</button>

</div>

</td>

</tr>

))}

</tbody>

</table>

{visible < sortedServices.length &&(

<div className="text-center py-4 border-t">

<button
onClick={()=>setVisible(v=>v+3)}
className="text-[#2563EB]"
>
Load More
</button>

</div>

)}

{/* VIEW INVOICE MODAL */}

{viewItem && (
<div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">

<div className="bg-white p-6 rounded-lg w-[420px]">

<h2 className="text-lg font-semibold text-[#1E3A8A] mb-4">
Invoice
</h2>

<p>Date: {viewItem.date}</p>
<p>Service: {viewItem.service}</p>
<p>Branch: {viewItem.branch}</p>
<p>Amount: ${viewItem.amount}</p>

<div className="flex justify-end gap-3 mt-6">

<button
onClick={printInvoice}
className="px-4 py-2 bg-blue-600 text-white rounded"
>
Print
</button>

<button
onClick={()=>setViewItem(null)}
className="px-4 py-2 border rounded"
>
Close
</button>

</div>

</div>

</div>
)}

{/* EDIT MODAL */}

{editItem && (
<div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">

<div className="bg-white p-6 rounded-lg w-[400px]">

<h3 className="text-lg font-semibold mb-4">Edit Service</h3>

<input
type="text"
value={editItem.service}
onChange={(e)=>setEditItem({...editItem,service:e.target.value})}
className="border p-2 w-full mb-3"
/>

<input
type="text"
value={editItem.branch}
onChange={(e)=>setEditItem({...editItem,branch:e.target.value})}
className="border p-2 w-full mb-3"
/>

<input
type="number"
value={editItem.amount}
onChange={(e)=>setEditItem({...editItem,amount:Number(e.target.value)})}
className="border p-2 w-full mb-3"
/>

<div className="flex justify-end gap-3">

<button
onClick={()=>setEditItem(null)}
className="px-4 py-2 border rounded"
>
Cancel
</button>

<button
onClick={saveEdit}
className="px-4 py-2 bg-green-600 text-white rounded"
>
Save
</button>

</div>

</div>

</div>
)}

</div>

);
}