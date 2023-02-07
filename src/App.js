import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import logo from "./assets/images/logo-teal.svg";
import Card from "./components/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

function App() {
	const [data, setData] = useState();
	const [isLoading, setIsLoading] = useState(true);
	const [tab, setTab] = useState([]);
	let total = 0;
	useEffect(() => {
		const getData = async () => {
			const response = await axios.get(
				"https://site--backend-deliveroo--y4khgqdvwnm7.code.run/"
			);
			setData(response.data);
			setIsLoading(false);
		};
		getData();
	}, []);

	const handleCounterPlus = (index) => {
		const newTab = [...tab];
		newTab[index].counter++;
		newTab[index].basketPrice = Math.round(
			newTab[index].meal.price * newTab[index].counter,
			2
		);

		setTab(newTab);
	};

	const handleCounterMoins = (index) => {
		const newTab = [...tab];

		if (newTab[index].counter > 1) {
			newTab[index].counter--;
			newTab[index].basketPrice = Math.round(
				newTab[index].meal.price * newTab[index].counter,
				2
			);
		} else {
			newTab.splice(index, 1);
		}

		setTab(newTab);
	};

	return (
		<div className="App">
			{isLoading ? (
				"loading..."
			) : (
				<>
					<header>
						<div className="container">
							<img src={logo} alt="" />
						</div>
					</header>
					<main>
						<section className="grandContainer">
							<div className="first">
								<h1> {data.restaurant.name} </h1>
								<p> {data.restaurant.description} </p>
							</div>
							<div className="second">
								<img src={data.restaurant.picture} alt="" />
							</div>
						</section>
						<section className="containerMain">
							<section className="container2">
								{data.categories.map(
									(cat, index) =>
										cat.meals.length > 1 && (
											<section className="containerCat">
												<h1> {cat.name} </h1>
												<section>
													{cat.meals.map((meal, index) => {
														return (
															<Card
																index={index}
																meal={meal}
																tab={tab}
																setTab={setTab}
															/>
														);
													})}
												</section>
											</section>
										)
								)}
							</section>
							<section className="panier">
								<div className="suPanier">
									<div className="boutonPanier">
										<button
											disabled={tab.length >= 1 ? false : true}
											style={{
												backgroundColor:
													tab.length >= 1 ? "#00CDBD" : "#bac3c3",
											}}
										>
											Valider mon panier
										</button>
									</div>
									{tab.length >= 1 ? (
										<div className="textPanier">
											{tab.map((elem, index) => {
												total += Math.floor(elem.basketPrice);
												return (
													<div className="icon-meal" key={index}>
														<div>
															<span
																className="icon"
																onClick={() => {
																	handleCounterMoins(index);
																}}
															>
																<FontAwesomeIcon icon={faMinus} />
															</span>
															<span> {elem.counter} </span>
															<span
																className="icon"
																onClick={() => {
																	handleCounterPlus(index);
																}}
															>
																<FontAwesomeIcon icon={faPlus} />
															</span>
															<span className="meal"> {elem.meal.title} </span>
														</div>
														<div>
															<span className="price">
																{" "}
																{elem.basketPrice}€{" "}
															</span>
														</div>
													</div>
												);
											})}
											<hr style={{ height: 1, width: "100%" }} />
											<p>Sous Total : {total} €</p>
											<p>Frais de livraison : 2.5 €</p>
											<hr style={{ height: 1, width: "100%" }} />
											<p>Total : {total + 2.5} €</p>
										</div>
									) : (
										<p>Le panier est vide</p>
									)}
								</div>
							</section>
						</section>
					</main>
				</>
			)}
		</div>
	);
}

export default App;
