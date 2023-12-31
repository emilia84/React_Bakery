import { FaSignOutAlt ,FaHeart, FaTrash, FaEdit } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom';

const Admin = ({ itemData, onDelete = f => f, onAdd = f => f, onUpdate = f => f, onLogout = f => f }) => {

  const navigate = useNavigate(); // Add useNavigate hook
  
  const handleAddCakeClick = () => {
    // Use navigate to go to the /addcake route
    navigate('/additem');
  };

  
  return (
    <div>
      <div id="wrapper">
        <h1>Bakery Admin</h1>
        <button onClick={handleAddCakeClick} className="additem">Add New Item</button> 

        <FaSignOutAlt onClick={onLogout} className="logoutButton"/><p id="logout">Logout</p> 
                
        <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Image Path</th>
            <th>Price</th>
            <th>Likes</th>
            <th colSpan={2}> Action(s) </th>
          </tr>
        </thead>
        <tbody>

          {itemData.map((item)=>(
            <tr key={item._id}>
            <td>{item.title}</td>
            <td>{item.imageSrc}</td>
            <td>{item.price}</td>
            <td>{item.likes}</td>
            <td><Link to={`/updateitem/${item._id}`}><FaEdit/></Link></td>
            <td><FaTrash id="delete" onClick={() => onDelete(item)} /></td>
          </tr>
          ))}
          
        </tbody>
        </table>
      
      </div>
    </div>
  );
};

export default Admin;
