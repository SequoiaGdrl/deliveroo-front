import './App.css';
import {useState, useEffect} from "react"
import axios from "axios";
import logo from './assets/images/logo-teal.svg';
import Card from './components/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus,faMinus } from '@fortawesome/free-solid-svg-icons'


function App() {
  const [data, setData]=useState();
  const [isLoading, setIsLoading] = useState(true);
  const [tab, setTab]=useState([]);

    





useEffect(()=>{
  const getData = async()=>{
  const response = await axios.get("https://site--backend-deliveroo--y4khgqdvwnm7.code.run/")
  setData(response.data);
  setIsLoading(false)
  }
  getData();
 

},[])


const handleCounterPlus= (index)=>{

  
let result= tab[index].counter;

console.log(result)






}

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

<section className='containerMain'>
  <section className='container2'>
  {data.categories.map((cat, index)=>(
      
        cat.meals.length > 1 && (<section className='containerCat'>
            <h1>{cat.name}</h1>
            <section> 
              {cat.meals.map((meal, index)=>{
                return(
                  <Card index={index}  meal={meal} tab={tab} setTab={setTab}/>
                )
              })}     
            
            </section>

            

          </section>     
        
        )

        ))}
        
        <div> 
              <p>reztgehg</p>
            </div>
  </section>
  <section className='panier'>
    <div className='suPanier'> 
      <div className='boutonPanier'><button>Valider mon panier</button></div>
      <div className='textPanier'>
        
        {tab.map((elem,index)=>{


          return(
             <div className='icon-meal' key={index}>
          <div>
          <span className='icon' onClick={()=>{handleCounterPlus(index)}}>< FontAwesomeIcon icon={faMinus} /></span>
          <span>{elem.counter}</span>
          <span className='icon'>< FontAwesomeIcon icon={faPlus} /></span>
          <span className='meal'>{elem.meal.title}</span>
          </div>
          
          <div>
            <span className='price'> {elem.meal.price}€</span>
          </div>
        </div>
          )
          

        })}
       
       
        
        </div>
        
    </div>
    
  </section>
  {console.log(tab)}
</section>
</main>


</>
)
}

     
    </div>
  );
}

        

    

  


export default App;
