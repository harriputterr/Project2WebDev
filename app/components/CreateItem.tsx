'use client'
import Item from '@/app/types/item'
import { useState } from 'react';

const MyForm = () => {

    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [color, setColor] = useState('');
    const [price, setPrice] = useState(0);
    const [listImageUrl, setListImageUrl] = useState<string[]>([]);
    const [currentImageUrl, setCurrentImageUrl] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (category === ""){
            alert("Please select a category");
            return;
        }
        const response = await fetch("/api/create-item", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, category, description, color, price, listImageUrl }),
        });
        if (response.ok) {
            alert("Item created successfully");
            resetStates();

        } else {
            alert("Something went wrong");
        }
    };

    const handleImage = () =>{
        if (currentImageUrl){
            setListImageUrl([...listImageUrl, currentImageUrl])
            setCurrentImageUrl('');
        }
        console.log(listImageUrl);
    }

    const resetStates = () => {
        setListImageUrl([]);
        setName('');
        setCategory('');
        setColor('');
        setDescription('');
        setCurrentImageUrl('');
        setName('');
        setPrice(0);
    }
    return (
        <div className=" flex justify-center items-center">
            <form onSubmit={handleSubmit} className="space-y-4 w-2/3 m-20">
                <div >
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input type="text" id="name" name="name" className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>

                <div className="Ap">
                    <header className="App-header">
                        <label className='block text-sm font-medium text-gray-700'>
                            Select a category:
                            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option value="">Select...</option>
                                <option value="home-decor">Home and Decor</option>
                                <option value="fashion-accessories">Fashion and Accessories</option>
                                <option value="personal-care-cosmetics">Personal Care and Cosmetics</option>
                                <option value="general-utilities">General Utilities</option>
                            </select>
                        </label>
                        {category && <p>Selected Category: {category}</p>}
                    </header>
                </div>
                {/* <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                <input type="text" id="category" name="category" className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm" value={category}onChange={(e) => setCategory(e.target.value)}  required />
            </div> */}

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea id="description" name="description" className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                </div>

                <div>
                    <label htmlFor="color" className="block text-sm font-medium text-gray-700">Color</label>
                    <input type="text" id="color" name="color" className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm" value={color} onChange={(e) => setColor(e.target.value)} required />
                </div>

                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                    <input type="number" id="price" name="price" className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm" value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} required />
                </div>

                <div>
                    <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image URL</label>
                    <input type="url" id="imageUrl" name="imageUrl" className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm" value={currentImageUrl} onChange={(e) => setCurrentImageUrl(e.target.value)}  />
                    <button type='button' onClick={handleImage} className="w-fit flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Add Image
                </button>
                </div>

                <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default MyForm;

