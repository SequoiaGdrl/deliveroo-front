import './App.css';
import {useState, useEffect} from "react"
import axios from "axios";
import logo from './assets/images/logo-teal.svg';
import Card from './components/Card';

function App() {
  const [data, setData]=useState();
  const [isLoading, setIsLoading] = useState(true);



useEffect(()=>{
  const getData = async()=>{
  const response = await axios.get("https://site--backend-deliveroo--y4khgqdvwnm7.code.run/")
  setData(response.data);
  setIsLoading(false)
  }
  getData();
 

},[])




  return (
    <div className="App">
{isLoading ? 
("loading...") : 
(
<>
<header>
  <div className='container'>
    <img src={logo} alt="" />
  </div> 
</header>
<main>
<section className="grandContainer">
    <div className='first'>
      <h1>{data.restaurant.name}</h1>
      <p>{data.restaurant.description}</p>
    </div>

    <div className='second'>
      <img src={data.restaurant.picture} alt="" />

    </div>
  </section>

<section className='container2'>
 {data.categories.map((cat, index)=>(
    
      cat.meals.length > 1 && (<section className='containerCat'>
          <h1>{cat.name}</h1>
          <section> 
            {cat.meals.map((meal, index)=>{
              return(
                <Card index={index}  meal={meal}/>
              )
            })}     
           
          </section>
        </section>     
      
      )

      ))}
</section>
</main>


</>
)
}

     
    </div>
  );
}

        

    

  


export default App;
