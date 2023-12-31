import { useState, useEffect } from "react";
import { useParams,useNavigate  } from "react-router-dom";

const AddItem = ({ onAdd = f => f }) => {

    const navigate = useNavigate();

    const [title, setTitle] = useState("")
    const [imageSrc, setImageSrc] = useState("")
    const [price, setPrice] = useState("")
    const [likes, setLikes] = useState("")

    const submitForm = (event) => {
        event.preventDefault();
        onAdd(title, imageSrc, price, likes);
        setTitle("");
        setImageSrc("");
        setPrice("");
        setLikes("");

        // Redirect to the Admin route
        navigate('/admin');
    }

    return ( <div id="wrapperForm">
        <h1>Add New Item</h1>
        <form onSubmit={submitForm}>
            <fieldset className="form-group">
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    className="form-control"
                    placeholder="Enter a Title"
                    onChange={(event) => setTitle(event.target.value)}
                    value={title}
                    required
                />
                <label htmlFor="imageSrc">Image Path</label>
                <input
                    type="text"
                    name="imageSrc"
                    id="imageSrc"
                    className="form-control"
                    placeholder="Enter an Image Path"
                    onChange={(event) => setImageSrc(event.target.value)}
                    value={imageSrc}
                    required
                />
                <label htmlFor="price">Price</label>
                <input
                    type="number"
                    name="price"
                    id="price"
                    className="form-control"
                    placeholder="Enter the Price"
                    onChange={(event) => setPrice(event.target.value)}
                    value={price}
                    required
                />
                <label htmlFor="likes">Number of Likesx</label>
                <input
                    type="number"
                    name="likes"
                    id="likes"
                    className="form-control"
                    placeholder="Enter the Number of Likes"
                    onChange={(event) => setLikes(event.target.value)}
                    value={likes}
                    required
                />
            </fieldset>

            <button className="additem">Let's Add</button>
        </form>
    </div> );
}
 
export default AddItem ;