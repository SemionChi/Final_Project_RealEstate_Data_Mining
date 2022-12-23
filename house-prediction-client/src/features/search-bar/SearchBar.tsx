import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
    selectSearchInput,
    setSearchInput,
} from './searchBarSlice';
import {
    setPosition as setPrice,
} from '../map/mapSlice';
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { predictPrice } from "../../services/predictionService";

const SearchBar = () => {
    const dispatch = useAppDispatch();
    const filterInput = useAppSelector(selectSearchInput);
    const floors = Array.from(Array(30).keys());
    const rooms = Array.from(Array(10).keys());
    floors.splice(0,1);
    rooms.splice(0,1);
    const [startDate, setStartDate] = useState(new Date());
    const [checked, setChecked] = useState(true);
    const [num, setNum] = useState(0);

    const handleModelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value) == 1 ? 1 : 2;
        console.log(value);
        
        dispatch(setSearchInput({...filterInput.item, model: value}));
    }

    return (
        <div className="flex justify-center items-center w-full gap-10">
            <label htmlFor="rooms" className="block mb-2 text-sm font-medium text-gray-50 dark:text-gray-400">מספר חדרים</label>
            <select defaultValue={-1} onChange={e => {dispatch(setSearchInput({...filterInput.item, rooms: parseInt(e.target.value)}));}}  id="rooms" className="bg-gray-800 border border-gray-300 text-gray-50 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value={-1}></option>
                {rooms.map(room => <option key={room} value={room}>{room}</option>)}
            </select>

            <label htmlFor="floor" className="block mb-2 text-sm font-medium text-gray-50 dark:text-gray-400">קומה</label>
            <select id="floor" defaultValue={-1} onChange={e => dispatch(setSearchInput({...filterInput.item, floor: parseInt(e.target.value)}))} className="bg-gray-800 border border-gray-300 text-gray-50 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value={-1}></option>
                {floors.map(floor => <option key={floor} value={floor}>{floor}</option>)}
            </select>

            <label htmlFor="property_type" className="block mb-2 text-sm font-medium text-gray-50 dark:text-gray-400">סוג הנכס</label>
            <select defaultValue={-1} onChange={e => dispatch(setSearchInput({...filterInput.item, property_type: parseInt(e.target.value)}))} id="property_type" className="bg-gray-800 border border-gray-300 text-gray-50 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value={-1}></option>
                <option value={1}>דירה</option>
                <option value={2}>קוטג' דו-משפחתי</option>
                <option value={3}>דירת גג</option>
                <option value={4}>דירת גן</option>
                <option value={5}>מסחרי</option>
                <option value={6}>וילה</option>
                <option value={7}>קוטג' טורי</option>
            </select>

            <label htmlFor="square_foot" className="block mb-2 text-sm font-medium text-gray-50 dark:text-gray-400">מ"ר</label>
            <input type='number' onChange={e => dispatch(setSearchInput({...filterInput.item, square_foot: parseInt(e.target.value)}))} className="bg-gray-800 border border-gray-300 text-gray-50 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />

            <ReactDatePicker onChange={e => dispatch(setSearchInput({...filterInput.item, day: e?.getDay() ?? -1, month: e?.getMonth() ?? -1, year: e?.getFullYear() ?? -1, }))} className="bg-gray-800 text-gray-50 border rounded-lg" selected={new Date(filterInput.item.year,filterInput.item.month,filterInput.item.day,)} />
        
            <div className="flex items-center">
                <input checked={checked} onClick={e =>{setChecked(!checked); dispatch(setSearchInput({...filterInput.item, model: 1}))}} id="default-radio-1" type="radio" value={1} name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-transparent dark:focus:ring-transparent dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="default-radio-1" className="mr-2 ml-2 text-sm font-medium text-gray-300 dark:text-gray-300">רגרסיה ליניארית</label>
            </div>
            <div className="flex items-center">
                <input checked={!checked} onClick={e => {setChecked(!checked); dispatch(setSearchInput({...filterInput.item, model: 2}))}} id="default-radio-2" type="radio" value={2} name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-transparent dark:focus:ring-transparent dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="default-radio-2" className="mr-2 ml-2 text-sm font-medium text-gray-300 dark:text-gray-300">רגרסיה פולינומיאלית</label>
            </div>
        </div>
    );

}

export default SearchBar;