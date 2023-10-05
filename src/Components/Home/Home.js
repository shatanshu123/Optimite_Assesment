import React, {useState, useEffect} from 'react'
import "./Home.css"
import axios from "axios";
import { DeleteFilled } from '@ant-design/icons';
import { CircularProgress } from '@mui/material';
import logo from "../../Assets/logo.jpg"

const api = "https://fakestoreapi.com/products";

function Home() {

    const [productData, setProductData] = useState([]);
    const [sortingOption, setSortingOption] = useState("");
    const [productImage, setProductImage] = useState("");
    const [productHeading, setProductHeading] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productPrice, setProductPrice] = useState(0);
    const [id, setId] = useState(0);
    const [data, setData] = useState([])

    const getId = async (id) => {
        try{
            const res = await axios(`https://fakestoreapi.com/products/${id}`)
            const data = res.data;
            setId(id)
            setData(data);
        } catch(err) {
            console.log(err)
        }
    }

    const resetIDAndData =() => {
        setId(0);
    }

    const updatedData =  [{
        id : productData.length,
        title : productHeading,
        price : productPrice,
        description : productDescription,
        image : productImage
    }]

    const getProductImage = (e) => {
        e.preventDefault();
        setProductImage(e.target.value);
    }

    const getProductHeading = (e) => {
        e.preventDefault();
        setProductHeading(e.target.value)
    }

    const getProductDescription = (e) => {
        e.preventDefault();
        setProductDescription(e.target.value);
    }

    const getProductPrice = (e) => {
        e.preventDefault();
        setProductPrice(e.target.value);
    }

    const getProductData = async () => {
      try {
        const res = await axios(api);
        const data = res.data;
        setProductData(data);
      } catch (err) {
        console.log(err)
      }
    }

    useEffect(() => {
        getProductData()
    },[])

    const getSortingOption = (e) => {
        e.preventDefault();
        setSortingOption(e.target.value)
    }

   productData.sort((a,b) => {
    if(sortingOption === "low-to-high") {
        return a.price - b.price;
    } else if(sortingOption === "high-to-low") {
        return b.price - a.price;
    }
   })

   const deleteItem = (id) => {
        document.getElementById(id).style.display = "none";
   }

   const openPopup = () => {
        const popup = document.getElementById("popup");
        popup.classList.add("open-popup");
        document.getElementById("cards-container").style.display = "none";

   }

    const closePopup = () => {
        const popup = document.getElementById("popup");
        popup.classList.remove("open-popup");
        document.getElementById("cards-container").style.display = "flex";
    }

    const submitDetails = () => {
        setProductData(productData +  [...updatedData] )
    }


  return (
    <div>
        <nav className='nav-container'>
            <div onClick={() => setId(0)}>
                <img className='logo' src={logo} alt='logo' width="60px" />
            </div>
            {id === 0 ? <div>
                <button className='button'>
                    <select onChange={getSortingOption}>
                        <option value="">Sort by Price</option>
                        <option value="low-to-high">Low to High</option>
                        <option value="high-to-low">High to Low</option>
                    </select>
                </button>
                <button className='button' onClick={openPopup}>Add Product</button>
            </div> : 
            <div>
                <button className='button' onClick={resetIDAndData}>Back</button>
            </div>
            }
        </nav>
        <div className="product-container">
            <div className='popup' id='popup'>
                <form>
                    <label for="img-input">Image</label>
                    <br />
                    <input id='img-input' className='input' type='text' placeholder='Provide Image Link' onChange={getProductImage} required/>
                    <br />
                    <label for="heading-input">Heading</label>
                    <br />
                    <input id='heading-input' className='input' type='text' placeholder='Product Heading' onChange={getProductHeading} required/>
                    <br />
                    <label for="description-input">Description</label>
                    <br />
                    <textarea id='description-input' className='input text-area' type='text' placeholder='Product Description' onChange={getProductDescription} required/>
                    <br />
                    <label for="price-input">Price</label>
                    <br />
                    <input id="price-input" className='input' type='number' placeholder='Product Price' onChange={getProductPrice} required/>
                    <br />
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <button style={{margin: "0px"}} className='button' onClick={closePopup}>Back</button>
                        {productImage === "" || productHeading === "" || productDescription === "" || productPrice === 0 ? 
                            <button className='disabled-button' disabled>Save</button> :
                            <button className='button' onClick={submitDetails}>Save</button>
                        }
                    </div>
                </form>
            </div>

          {
            id === 0 ?
            productData.length === 0 ? 
            <div className='circular-progress-container'>
                <p>Loading Products</p>
                <CircularProgress />
            </div> :
            <div id='cards-container'>
              {productData.map((item) =>
                    <div className='card-container' onClick={() => getId(item.id)} key={item.id} id={item.id}>
                        <header className='card-header'>
                            <img className='card-image' src={item.image} alt={item.category} />
                        </header>
                        <h5 className='product-title'>{`${item.title}`}</h5>
                        <footer className='card-footer'>
                            <h3>{`$ ${item.price}`}</h3>
                            <span onClick={() => deleteItem(item.id)}><DeleteFilled /></span>
                        </footer>
                    </div>
              )}
            </div> :
            <div className='info-container'>
                <div>
                    <img src={data.image} width="300px"/>
                </div>
                <div>
                    <h2>{data.title}</h2>
                    <p style={{opacity: "0.9"}}>{data.description}</p>
                    <h3>{`$ ${data.price}`}</h3>
                </div>
            </div>
          }
      </div>
    </div>
  )
}

export default Home