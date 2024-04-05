'use client'
import {useState,useEffect} from 'react';
import { collection, addDoc,getDoc,query, querySnapshot, onSnapshot,deleteDoc,doc} from "firebase/firestore"; 
import { db } from './firebase';
import style from "../app/style/style.module.css"



export default function Home() {
  const [items,setItems]=useState([
    // {name:'Coffee',price:4.95},
    // {name:'Groceries',price:15.65},
    // {name:'movie',price:24.90},
    // {name:'chowmein',price:10.90},
  ]);

  const [newItem,setNewItem]=useState({name:'',price:''});
  const [total,setTotal]=useState(0);

//  Add items to database
  const addItem=async(e)=>{
    e.preventDefault();
    if(newItem.name!='' && newItem.price!=''){
      await addDoc(collection(db,'items'),{
        name:newItem.name.trim(),
        price:newItem.price
      });
      setItems([...items,newItem]);
      setNewItem({name:'',price:''})
    }
  }



// Read items from database
useEffect(()=>{
  const q=query(collection(db,'items'));
  const unsub=onSnapshot(q,(querySnapshot)=>{
    let itemsArr=[];
    
    querySnapshot.forEach((doc)=>{
      itemsArr.push({...doc.data(),id:doc.id});
    });
    setItems(itemsArr);
    // Read total 
  const findTotal=()=>{
    const tot=itemsArr.reduce((sum,item)=>sum+parseFloat(item.price),0);
    setTotal(tot);
  };
  findTotal();
  return () => unsub();
});
}, []);


// Delete items from database

const deleteItem=async(id)=>{
  await deleteDoc(doc(db,'items',id)); 
}


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-60">
    <div className={`uppercase text-3xl`}> Expense Tracker</div> <br></br>
    <div className="bg-gray-700 p-5 rounded-xl">
    <form>
      <input onChange={(e)=>setNewItem({...newItem,name:e.target.value})} value={newItem.name} placeholder="Enter Item" type='text' className="p-3 m-2 rounded-lg"></input>
      <input onChange={(e)=>setNewItem({...newItem,price:e.target.value})}  value={newItem.price} placeholder="Enter Rs" type='number' className="p-3 m-2 w-28 rounded-lg"></input>
      <button onClick={addItem} type="submit" className="bg-black text-white p-4 m-2 rounded-lg hover:bg-slate-600">+</button>
    </form>
    <ul>
      {items.map((item,id)=>{
       return(
       <li key={id} className='px-5 my-4 w-full flex justify-between bg-gray-700 rounded-lg hover:border-solid hover:border-white-700 hover:border-2'>
        <div className='my-3 w-full p-3 flex justify-between text-white bg-gray-700'>
          <div className='capitalize mx-2'>{item.name}</div>
          <div className='w-28 '>₹ {item.price}</div>
        </div> 
        <button type="submit" onClick={()=>deleteItem(item.id)} className="bg-black text-white p-4 m-2 rounded-lg hover:bg-slate-600">X</button>
       </li>
       ); 
      })}
      <div className='my-3 mx-4 text-3xl w-full p-5 flex justify-between text-white'>Total
      <div className='px-6'>₹ {total}</div> </div>
    </ul>
    </div>
    </main>
  );
}
